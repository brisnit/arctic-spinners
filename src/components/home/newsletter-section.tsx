import { LureImage } from "@/components/product/lure-image";
import { getProduct } from "@/lib/catalog";
import { NewsletterForm } from "@/components/shared/newsletter-form";
import { Reveal } from "@/components/shared/reveal";

export function NewsletterSection() {
  const lure = getProduct("glow-chartreuse")!;
  return (
    <section className="py-16 sm:py-24" aria-labelledby="newsletter-heading">
      <div className="container-page">
        <div className="relative grid grid-cols-[minmax(0,1fr)] overflow-hidden rounded-3xl bg-arctic text-white lg:grid-cols-12">
          <div aria-hidden className="pointer-events-none absolute -top-24 -left-24 size-80 rounded-full border-[48px] border-white/10" />
          <div className="relative p-8 sm:p-12 lg:col-span-7 lg:p-16">
            <Reveal>
              <p className="eyebrow mb-3 text-white/80">The Arctic Spinners newsletter</p>
              <h2 id="newsletter-heading" className="display text-[3rem] sm:text-7xl">
                More fishing.
                <br />
                Less inbox.
              </h2>
              <p className="mt-4 max-w-md text-white/85">
                Product news, new colors, fishing stories and the occasional update. That’s it.
              </p>
            </Reveal>
            <Reveal delay={0.1} className="mt-8 max-w-lg">
              <NewsletterForm tone="dark" />
              <p className="mt-3 text-xs text-white/65">Unsubscribe anytime. We’ll never share your email.</p>
            </Reveal>
          </div>
          <div className="relative hidden min-h-[22rem] lg:col-span-5 lg:block">
            <div className="absolute inset-y-10 right-10 left-0 rounded-2xl bg-white/95">
              <LureImage image={lure.images[0]} alt="" sizes="30vw" pad="p-14" className="rotate-[14deg]" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
