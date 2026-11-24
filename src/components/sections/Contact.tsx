import { Icon, type IconName } from "@/components/icons/Icon";
import { SectionHeading } from "@/components/SectionHeading";
import { SocialLinks } from "@/components/SocialLinks";
import { ContactForm } from "@/components/sections/ContactForm";
import type { Dictionary } from "@/lib/dictionaries";
import { siteConfig } from "@/lib/site";

export function Contact({ contact }: { contact: Dictionary["contact"] }) {
  const info: { icon: IconName; label: string; value: string; href?: string }[] = [
    {
      icon: "phone",
      label: contact.info.phone,
      value: siteConfig.phone,
      href: `tel:${siteConfig.phone.replace(/\s/g, "")}`,
    },
    {
      icon: "mail",
      label: contact.info.email,
      value: siteConfig.email,
      href: `mailto:${siteConfig.email}`,
    },
    { icon: "map", label: contact.info.address, value: siteConfig.address },
    { icon: "clockSmall", label: contact.info.hours, value: contact.info.hoursValue },
  ];

  return (
    <section id="contact" className="bg-white py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeading title={contact.title} subtitle={contact.subtitle} />

        <div className="mt-16 grid gap-12 lg:grid-cols-5">
          <div className="lg:col-span-2">
            <ul className="grid gap-6">
              {info.map((item) => (
                <li key={item.label} className="flex items-start gap-4">
                  <span className="flex size-11 shrink-0 items-center justify-center rounded-2xl bg-brand-soft text-brand">
                    <Icon name={item.icon} className="size-5" />
                  </span>
                  <div>
                    <p className="text-sm text-muted">{item.label}</p>
                    {item.href ? (
                      <a
                        href={item.href}
                        className="text-lg font-medium text-ink transition-colors hover:text-brand"
                      >
                        {item.value}
                      </a>
                    ) : (
                      <p className="text-lg font-medium text-ink">{item.value}</p>
                    )}
                  </div>
                </li>
              ))}
            </ul>
            <SocialLinks className="mt-10" />
          </div>

          <div className="rounded-3xl bg-surface p-6 sm:p-10 lg:col-span-3">
            <ContactForm form={contact.form} />
          </div>
        </div>
      </div>
    </section>
  );
}
