import { SocialIcon } from "@/components/icons/Icon";
import { siteConfig } from "@/lib/site";

// Íconos que redirigen a las redes sociales de la empresa (se abren en otra pestaña).
export function SocialLinks({ className = "" }: { className?: string }) {
  return (
    <ul className={`flex items-center gap-3 ${className}`}>
      {siteConfig.socials.map(({ network, label, url }) => (
        <li key={network}>
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={label}
            title={label}
            className="flex size-10 items-center justify-center rounded-full bg-surface text-ink transition-colors hover:bg-brand hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"
          >
            <SocialIcon network={network} className="size-[18px]" />
          </a>
        </li>
      ))}
    </ul>
  );
}
