import { z } from "zod";

// Recibe el formulario de contacto, lo valida en el servidor y lo reenvía al
// formulario de Google configurado en las variables de entorno (.env.local).

const schema = z.object({
  name: z.string().trim().min(2).max(100),
  email: z.email().max(150),
  phone: z.string().trim().max(30).optional().default(""),
  message: z.string().trim().min(10).max(2000),
  // Honeypot: debe llegar vacío. Si trae contenido, es un bot.
  website: z.string().optional().default(""),
});

type ErrorCode = "validation" | "rate_limited" | "not_configured" | "upstream";

function fail(error: ErrorCode, status: number) {
  return Response.json({ ok: false, error }, { status });
}

// Límite simple por IP: 5 envíos cada 10 minutos. Vive en la memoria del proceso,
// así que es una defensa básica (se reinicia con cada despliegue y no se comparte
// entre varias instancias).
const WINDOW_MS = 10 * 60 * 1000;
const MAX_REQUESTS = 5;
const hits = new Map<string, number[]>();

function isRateLimited(ip: string) {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((time) => now - time < WINDOW_MS);
  recent.push(now);
  hits.set(ip, recent);
  return recent.length > MAX_REQUESTS;
}

export async function POST(request: Request) {
  // Solo se aceptan envíos que vienen desde el propio sitio.
  const origin = request.headers.get("origin");
  const host = request.headers.get("host");
  if (origin && host && new URL(origin).host !== host) {
    return fail("validation", 403);
  }

  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";
  if (isRateLimited(ip)) return fail("rate_limited", 429);

  const body = await request.json().catch(() => null);
  const parsed = schema.safeParse(body);
  if (!parsed.success) return fail("validation", 400);

  const { name, email, phone, message, website } = parsed.data;

  // Un bot llenó el campo trampa: respondemos "ok" sin enviar nada.
  if (website) return Response.json({ ok: true });

  const formUrl = process.env.GOOGLE_FORM_URL;
  const fields = {
    [process.env.GOOGLE_FORM_ENTRY_NAME ?? ""]: name,
    [process.env.GOOGLE_FORM_ENTRY_EMAIL ?? ""]: email,
    [process.env.GOOGLE_FORM_ENTRY_PHONE ?? ""]: phone,
    [process.env.GOOGLE_FORM_ENTRY_MESSAGE ?? ""]: message,
  };

  if (!formUrl || Object.keys(fields).includes("")) {
    console.error("[contact] Faltan variables de entorno de Google Forms (ver .env.example).");
    return fail("not_configured", 503);
  }

  try {
    const response = await fetch(formUrl, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams(fields),
      // Google responde con una redirección al guardar; no hace falta seguirla.
      redirect: "manual",
    });

    const saved = response.ok || (response.status >= 300 && response.status < 400);
    if (!saved) {
      console.error(`[contact] Google Forms respondió con estado ${response.status}`);
      return fail("upstream", 502);
    }
    return Response.json({ ok: true });
  } catch (error) {
    console.error("[contact] Error al contactar con Google Forms:", error);
    return fail("upstream", 502);
  }
}
