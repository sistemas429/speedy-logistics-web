import type { SocialNetwork } from "@/components/icons/social-paths";

// ---------------------------------------------------------------------------
// DATOS DE LA EMPRESA — reemplazar con los datos reales del cliente.
// ---------------------------------------------------------------------------

export const siteConfig = {
  name: "Speedy Logistics S.A.S",
  logo: "/logo.png",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  phone: "+57 350 877 4939",
  email: "gerencia@speedylogisticssas.com",
  address: "Av. El Dorado 97-51 Of. 215, Bogotá D.C., Colombia",
  // Para quitar una red social, borra su línea. Para añadir una, agrega
  // su clave (facebook, instagram, whatsapp, linkedin, youtube, tiktok, x).
  socials: [
    { network: "facebook", label: "Facebook", url: "https://www.facebook.com/" },
    { network: "instagram", label: "Instagram", url: "https://www.instagram.com/" },
    { network: "linkedin", label: "LinkedIn", url: "https://www.linkedin.com/" },
    { network: "whatsapp", label: "WhatsApp", url: "https://wa.me/573508774939" },
  ] satisfies { network: SocialNetwork; label: string; url: string }[],
} as const;