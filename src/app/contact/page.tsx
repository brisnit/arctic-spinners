import { Mail, MapPin, Phone, Store } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import { ContactForm } from "@/components/shared/contact-form";
import { PageHero } from "@/components/shared/page-hero";
import { FacebookIcon, InstagramIcon } from "@/components/shared/social-icons";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact",
  description: `Contact Arctic Spinners. Call ${site.phone} or email ${site.email}.`,
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return (
    <>
      <PageHero eyebrow="Contact" title="Let’s talk fishing.">
        If you have any questions or comments about the Arctic Spinner, please don’t hesitate to reach out.
      </PageHero>
      <div className="container-page grid grid-cols-[minmax(0,1fr)] gap-12 py-14 sm:py-20 lg:grid-cols-12 lg:gap-16">
        <aside className="space-y-4 lg:col-span-4">
          <a href={site.phoneHref} className="group flex items-start gap-4 rounded-xl border border-border p-5 transition-colors hover:border-arctic">
            <span className="flex size-11 shrink-0 items-center justify-center rounded-full bg-arctic-50 text-arctic group-hover:bg-arctic group-hover:text-white">
              <Phone className="size-5" />
            </span>
            <span>
              <span className="eyebrow block text-[0.65rem] text-muted-foreground">Call</span>
              <span className="mt-1 block text-lg font-semibold text-navy">{site.phone}</span>
            </span>
          </a>
          <a href={`mailto:${site.email}`} className="group flex items-start gap-4 rounded-xl border border-border p-5 transition-colors hover:border-arctic">
            <span className="flex size-11 shrink-0 items-center justify-center rounded-full bg-arctic-50 text-arctic group-hover:bg-arctic group-hover:text-white">
              <Mail className="size-5" />
            </span>
            <span className="min-w-0">
              <span className="eyebrow block text-[0.65rem] text-muted-foreground">Email</span>
              <span className="mt-1 block truncate text-lg font-semibold text-navy">{site.email}</span>
            </span>
          </a>
          <div className="flex items-start gap-4 rounded-xl border border-border p-5">
            <span className="flex size-11 shrink-0 items-center justify-center rounded-full bg-arctic-50 text-arctic">
              <MapPin className="size-5" />
            </span>
            <span>
              <span className="eyebrow block text-[0.65rem] text-muted-foreground">Based in</span>
              <span className="mt-1 block text-lg font-semibold text-navy">{site.location}</span>
            </span>
          </div>
          <Link href="/contact?topic=dealer" className="group flex items-start gap-4 rounded-xl bg-navy p-5 text-white">
            <span className="flex size-11 shrink-0 items-center justify-center rounded-full bg-white/10 text-electric">
              <Store className="size-5" />
            </span>
            <span>
              <span className="block font-semibold">Dealer inquiries</span>
              <span className="mt-1 block text-sm text-white/70">
                Interested in carrying Arctic Spinners in your shop? Choose “Become a dealer” in the form.
              </span>
            </span>
          </Link>
          <div className="flex gap-2 pt-2">
            <a href={site.social.facebook} target="_blank" rel="noreferrer" aria-label="Facebook" className="inline-flex size-11 items-center justify-center rounded-full bg-ice text-navy hover:bg-arctic hover:text-white">
              <FacebookIcon className="size-5" />
            </a>
            <a href={site.social.instagram} target="_blank" rel="noreferrer" aria-label="Instagram" className="inline-flex size-11 items-center justify-center rounded-full bg-ice text-navy hover:bg-arctic hover:text-white">
              <InstagramIcon className="size-5" />
            </a>
          </div>
        </aside>
        <div className="lg:col-span-8">
          <h2 className="display mb-8 text-4xl text-navy sm:text-5xl">Send us a message</h2>
          <Suspense fallback={<div className="h-96 animate-pulse rounded-2xl bg-ice" />}>
            <ContactForm />
          </Suspense>
        </div>
      </div>
    </>
  );
}
