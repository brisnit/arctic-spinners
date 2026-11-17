import { Mail, Phone } from "lucide-react";
import { FacebookIcon, InstagramIcon } from "@/components/shared/social-icons";
import Link from "next/link";
import { NewsletterForm } from "@/components/shared/newsletter-form";
import { Wordmark } from "@/components/shared/logo";
import { site } from "@/lib/site";

const columns = [
  {
    title: "Shop",
    links: [
      { href: "/shop", label: "All Lures" },
      { href: "/shop?color=glow", label: "Glow Series" },
      { href: "/shop?color=signature", label: "Signature Patterns" },
      { href: "/shop#colors", label: "Shop by Color" },
    ],
  },
  {
    title: "Arctic Spinners",
    links: [
      { href: "/our-story", label: "Our Story" },
      { href: "/testimonials", label: "Testimonials" },
      { href: "/dealers", label: "Find a Dealer" },
      { href: "/contact", label: "Contact" },
    ],
  },
  {
    title: "Support",
    links: [
      { href: "/contact?topic=dealer", label: "Become a Dealer" },
      { href: "/account", label: "Account" },
      { href: "/privacy", label: "Privacy Policy" },
      { href: "/terms", label: "Terms" },
    ],
  },
];

export function SiteFooter() {
  return (
    <footer className="relative overflow-hidden bg-navy text-white">
      <div aria-hidden className="pointer-events-none absolute -bottom-40 -left-40 size-[34rem] rounded-full border-[80px] border-white/[0.03]" />
      <div className="container-page relative grid gap-12 py-16 lg:grid-cols-12 lg:py-20">
        <div className="lg:col-span-4 xl:col-span-3">
          <Wordmark />
          <p className="mt-5 max-w-sm text-sm leading-relaxed text-white/70">
            The Arctic Spinner was designed in 1967 by fishing guide Jack Wadkins in Bear Lake, Michigan. Today every lure is
            hand assembled by {site.owner} in {site.location}.
          </p>
          <div className="mt-6 space-y-2 text-sm">
            <a href={site.phoneHref} className="flex items-center gap-2.5 text-white/85 hover:text-electric">
              <Phone className="size-4" /> {site.phone}
            </a>
            <a href={`mailto:${site.email}`} className="flex items-center gap-2.5 text-white/85 hover:text-electric">
              <Mail className="size-4" /> {site.email}
            </a>
          </div>
          <div className="mt-6 flex gap-2">
            <a
              href={site.social.facebook}
              target="_blank"
              rel="noreferrer"
              aria-label="Arctic Spinners on Facebook"
              className="inline-flex size-10 items-center justify-center rounded-full bg-white/10 transition-colors hover:bg-arctic"
            >
              <FacebookIcon className="size-4" />
            </a>
            <a
              href={site.social.instagram}
              target="_blank"
              rel="noreferrer"
              aria-label="Arctic Spinners on Instagram"
              className="inline-flex size-10 items-center justify-center rounded-full bg-white/10 transition-colors hover:bg-arctic"
            >
              <InstagramIcon className="size-4" />
            </a>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 lg:col-span-8 xl:col-span-5">
          {columns.map((c) => (
            <div key={c.title}>
              <p className="eyebrow mb-4 text-electric">{c.title}</p>
              <ul className="space-y-2.5 text-sm">
                {c.links.map((l) => (
                  <li key={l.href}>
                    <Link href={l.href} className="text-white/75 transition-colors hover:text-white">
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="lg:col-span-6 xl:col-span-4">
          <p className="eyebrow mb-2 text-electric">Newsletter</p>
          <p className="display text-3xl">More fishing. Less inbox.</p>
          <p className="mt-2 mb-4 text-sm text-white/70">New colors, fishing stories and the occasional update.</p>
          <NewsletterForm tone="dark" />
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="container-page flex flex-col gap-2 py-6 text-xs text-white/55 sm:flex-row sm:items-center sm:justify-between">
          <p>© 2026 Arctic Spinners. All rights reserved.</p>
          <p>Prototype storefront · checkout is a demonstration and processes no payments.</p>
        </div>
      </div>
    </footer>
  );
}
