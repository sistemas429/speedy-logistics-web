# Sitio web informativo — Transportadora

Sitio informativo bilingüe (español / inglés) para una empresa de transporte de carga.

**Stack:** Next.js 16 (App Router) · TypeScript · Tailwind CSS 4 · Zod · formulario conectado a Google Forms.
No usa base de datos: el contenido vive en archivos JSON y los mensajes del formulario llegan a Google Forms.

## Puesta en marcha

Requisitos: Node.js 20.9 o superior (probado con Node 22) y npm.

```bash
npm install
cp .env.example .env.local   # y completa los valores (ver "Formulario de Google")
npm run dev                  # http://localhost:3000
```

Otros comandos: `npm run build` (compilar para producción), `npm start` (servir lo compilado), `npm run lint`.

## Cómo está organizado

```
src/
├── proxy.ts                  # Se ejecuta ANTES de cada petición: redirige "/" a "/es" o "/en"
├── app/
│   ├── globals.css           # Colores de marca, tipografía y estilos base (tokens de Tailwind)
│   ├── [lang]/               # [lang] = "es" o "en": todas las páginas viven aquí dentro
│   │   ├── layout.tsx        # Estructura común: <html lang>, Header, Footer y metadatos SEO
│   │   └── page.tsx          # Página única: junta las 5 secciones
│   ├── api/contact/route.ts  # Endpoint del formulario (valida y reenvía a Google Forms)
│   ├── sitemap.ts            # /sitemap.xml
│   └── robots.ts             # /robots.txt
├── components/
│   ├── Header.tsx            # Menú fijo + selector de idioma (componente de cliente)
│   ├── Footer.tsx
│   ├── SocialLinks.tsx       # Íconos que enlazan a las redes sociales
│   ├── SectionHeading.tsx
│   ├── icons/                # Íconos SVG propios (sin librerías extra)
│   ├── illustrations/        # Ilustraciones SVG: TruckScene (hero), WarehouseScene (nosotros), RouteMap
│   └── sections/             # Hero, About, FeatureGrid (Por qué elegirnos y Servicios), CoverageBand, Contact
├── dictionaries/             # Textos: es.json y en.json (misma estructura)
└── lib/
    ├── site.ts               # Datos de la empresa: nombre, teléfono, correo, redes sociales
    ├── i18n.ts               # Lista de idiomas y utilidades
    └── dictionaries.ts       # Carga el diccionario del idioma pedido
```

**Ruta de una petición** (útil para entender Next.js): el navegador pide `/` → `proxy.ts` lo redirige a `/es`
→ Next.js busca `app/[lang]/page.tsx` con `lang = "es"` → la página carga `es.json` y arma las secciones
→ como las páginas se generan en el build, se sirven como HTML ya hecho (rápido).

## Qué personalizar (todo son marcadores de posición)

| Qué | Dónde |
|---|---|
| Nombre, teléfono, correo, dirección, redes sociales | `src/lib/site.ts` |
| Colores corporativos | `src/app/globals.css` (bloque `@theme`, variables `--color-brand*` y `--color-accent`) |
| Textos de todas las secciones (ES y EN) | `src/dictionaries/es.json` y `en.json` |
| Imágenes | Las ilustraciones de `src/components/illustrations/` toman los colores de marca solas. Para usar fotos reales de la flota: guárdalas en `public/` y reemplaza el componente por `<Image src="/flota.jpg" width={1200} height={800} alt="..." priority />` (con `priority` solo en la imagen del hero) |
| Logo | Hay marcas de ejemplo dentro del camión, la bodega y el encabezado: reemplazar por el logo real |
| Dominio público (SEO) | `NEXT_PUBLIC_SITE_URL` en `.env.local` |

Los textos actuales son genéricos y sirven solo como borrador: deben revisarse y aprobarse con el cliente.

## Formulario de Google

El navegador envía el formulario a `/api/contact`; el servidor valida los datos (Zod), descarta bots
(campo trampa), limita envíos repetidos por IP y los reenvía a tu Google Form.

1. Crea un Google Form con 4 preguntas (nombre, correo, teléfono, mensaje). No debe exigir iniciar sesión
   ni tener la opción "limitar a una respuesta".
2. Obtén los códigos `entry.XXXX` con **⋮ > Obtener enlace prellenado**, llenando las 4 preguntas.
3. Completa `GOOGLE_FORM_*` en `.env.local` (instrucciones en `.env.example`). `GOOGLE_FORM_URL` es la
   dirección del formulario terminada en `/formResponse`.

Limitaciones: este envío no usa una API oficial de Google, así que Google podría cambiarlo en el futuro;
y el límite de envíos vive en memoria (se reinicia al desplegar y no se comparte entre instancias).
Si falta alguna variable, el endpoint responde con error 503 y lo registra en la consola del servidor.

## Despliegue

El sitio necesita un entorno con Node.js (por `proxy.ts` y `/api/contact`):

- **Vercel**: importa el repositorio y define las variables de entorno. Gratis para empezar.
- **Hostinger**: planes Business/Cloud con "Node.js Web Apps" (despliegue desde GitHub o .zip). Verifica
  en el panel que el plan incluya Node.js, y define allí las mismas variables de entorno.
- **VPS**: `npm run build` y `npm start` detrás de Nginx, con PM2 o Docker.

## Notas sobre esta versión de Next.js

- Es Next.js 16: el antiguo `middleware.ts` ahora se llama `proxy.ts`.
- `next.config.ts` trae activado **Cache Components** (viene así por defecto en la plantilla). Por eso el
  año del pie de página se calcula en una función con `"use cache"`: leer la hora actual directamente
  en un componente rompe el build.
- La documentación de esta versión está dentro de `node_modules/next/dist/docs/`.
- `npm audit` reporta vulnerabilidades en la cadena de herramientas de desarrollo (`eslint-config-next`),
  que no forma parte del sitio publicado. No ejecutes `npm audit fix --force`: propone una versión
  anterior de Next.js. Se resolverá con una actualización de la plantilla.

## Pendientes antes de publicar

- [ ] Colores corporativos reales y logo
- [ ] Textos definitivos en español e inglés
- [ ] Datos de contacto y redes sociales reales
- [ ] Fotos reales de la flota / equipo (con licencia o propias) para reemplazar las ilustraciones si el cliente lo prefiere
- [ ] Crear el Google Form y configurar variables de entorno
- [ ] Medir rendimiento con PageSpeed Insights / Lighthouse (meta: LCP < 2 s en móvil)
- [ ] Revisar contraste de colores y navegación con teclado
