"use client";

import Link from "next/link";
import { useState } from "react";
import type { Locale } from "@/lib/i18n";
import type { Dictionary } from "@/lib/dictionaries";

type Props = {
  lang: Locale;
  siteName: string;
  nav: Dictionary["nav"];
};

const sections = ["home", "about", "whyUs", "services", "contact"] as const;

const sectionIds: Record<(typeof sections)[number], string> = {
  home: "home",
  about: "about",
  whyUs: "why-us",
  services: "services",
  contact: "contact",
};

export function Header({ lang, siteName, nav }: Props) {
  const [open, setOpen] = useState(false);
  const otherLang: Locale = lang === "es" ? "en" : "es";
  const isEs = lang === "es";

  const links = sections.map((key) => ({
    href: `/${lang}#${sectionIds[key]}`,
    label: nav[key],
  }));

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-[#0b0f17]/90 text-white backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
        <Link
          href={`/${lang}`}
          className="flex items-center"
          aria-label={siteName}
          onClick={() => setOpen(false)}
        >
          <svg
            viewBox="0 0 320 95"
            className="h-10 w-auto"
            role="img"
            aria-label={siteName}
          >
            {/* Texto Speedy */}
            <text
              x="2"
              y="40"
              fill="#FFFFFF"
              fontFamily="system-ui, -apple-system, sans-serif"
              fontWeight="800"
              fontSize="44"
              letterSpacing="-1.5"
            >
              Speedy
            </text>
            {/* Flecha naranja y azul */}
            <polygon points="175,18 228,18 234,24 172,24" fill="#FF6B00" />
            <polygon points="170,28 238,28 248,32 232,40 235,34 167,34" fill="#0066FF" />
            <polygon points="165,37 224,37 219,43 162,43" fill="#FF6B00" />
            {/* Texto Logistics */}
            <text
              x="2"
              y="82"
              fill="#FFFFFF"
              fontFamily="system-ui, -apple-system, sans-serif"
              fontWeight="800"
              fontSize="44"
              letterSpacing="-1.5"
            >
              Logistics
            </text>
            {/* Texto S.A.S */}
            <text
              x="208"
              y="82"
              fill="#FFFFFF"
              fontFamily="system-ui, -apple-system, sans-serif"
              fontWeight="800"
              fontSize="14"
            >
              S.A.S
            </text>
          </svg>
        </Link>

        <nav aria-label={nav.mainNavigation} className="hidden items-center gap-7 md:flex">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm text-slate-300 transition-colors hover:text-white"
            >
              {link.label}
            </a>
          ))}

          <a
            href={`/${lang}#tracking`}
            className="text-sm font-medium text-slate-300 transition-colors hover:text-[#FF6B00]"
          >
            {isEs ? "Rastreo" : "Tracking"}
          </a>

          <Link
            href={`/${otherLang}`}
            hrefLang={otherLang}
            lang={otherLang}
            aria-label={nav.language}
            className="rounded-full border border-white/20 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-slate-200 transition-colors hover:border-[#FF6B00] hover:text-white"
          >
            {otherLang}
          </Link>

          <a
            href={`/${lang}#home`}
            className="rounded-full bg-[#FF6B00] px-4 py-1.5 text-xs font-semibold text-white shadow-sm transition-colors hover:bg-[#e56000]"
          >
            {isEs ? "Cotizar" : "Get Quote"}
          </a>
        </nav>

        <button
          type="button"
          className="flex size-10 items-center justify-center rounded-full text-white md:hidden"
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? nav.closeMenu : nav.openMenu}
          onClick={() => setOpen((value) => !value)}
        >
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={1.75}
            strokeLinecap="round"
            className="size-6"
            aria-hidden="true"
          >
            {open ? <path d="M6 6l12 12M18 6L6 18" /> : <path d="M4 8h16M4 16h16" />}
          </svg>
        </button>
      </div>

      {open ? (
        <nav
          id="mobile-menu"
          aria-label={nav.mainNavigation}
          className="border-t border-white/10 bg-[#0b0f17] md:hidden"
        >
          <ul className="mx-auto flex max-w-6xl flex-col px-6 py-3">
            {links.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="block border-b border-white/10 py-3.5 text-base text-slate-200 hover:text-white"
                >
                  {link.label}
                </a>
              </li>
            ))}
            <li>
              <a
                href={`/${lang}#tracking`}
                onClick={() => setOpen(false)}
                className="block border-b border-white/10 py-3.5 text-base text-slate-200 hover:text-white"
              >
                {isEs ? "Rastreo de carga" : "Cargo Tracking"}
              </a>
            </li>
            <li className="flex items-center justify-between pt-4 pb-2">
              <Link
                href={`/${otherLang}`}
                hrefLang={otherLang}
                lang={otherLang}
                aria-label={nav.language}
                onClick={() => setOpen(false)}
                className="rounded-full border border-white/20 px-4 py-1.5 text-xs font-semibold uppercase text-white"
              >
                {otherLang}
              </Link>
              <a
                href={`/${lang}#home`}
                onClick={() => setOpen(false)}
                className="rounded-full bg-[#FF6B00] px-5 py-2 text-sm font-semibold text-white"
              >
                {isEs ? "Cotizar ahora" : "Quote now"}
              </a>
            </li>
          </ul>
        </nav>
      ) : null}
    </header>
  );
}