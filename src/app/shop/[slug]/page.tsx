import { Award, FishingHook, Hand, Quote } from "lucide-react";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ProductCard } from "@/components/product/product-card";
import { ProductGallery } from "@/components/product/product-gallery";
import { ProductPurchase } from "@/components/product/product-purchase";
import { Reveal } from "@/components/shared/reveal";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { testimonialsFor } from "@/data/testimonials";
import { getProduct, getRelatedProducts, products } from "@/lib/catalog";
import { formatPrice } from "@/lib/format";
import { site } from "@/lib/site";
import type { Product } from "@/lib/types";

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps<"/shop/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) return {};
  return {
    title: product.fullName,
    description: describe(product),
    alternates: { canonical: `/shop/${product.slug}` },
    openGraph: {
      title: `${product.fullName} | Arctic Spinners`,
      description: describe(product),
      images: [{ url: product.images[0].src, width: product.images[0].width, height: product.images[0].height }],
    },
  };
}

function describe(p: Product) {
  const colors = p.colorParts.map((c) => c.label);
  const combo =
    colors.length > 1 ? `${colors.slice(0, -1).join(", ")} & ${colors[colors.length - 1]}` : colors[0];
  const series = p.isSignature
    ? " It’s one of Arctic Spinners’ signature patterns."
    : p.families.includes("glow")
      ? " Part of the Glow series."
      : "";
  return `The ${p.fullName} is a hand-assembled in-line spinner in a ${combo} color combination.${series} Like every Arctic Spinner, it traces back to the lure fishing guide Jack Wadkins designed in Bear Lake, Michigan in 1967.`;
}

export default async function ProductPage({ params }: PageProps<"/shop/[slug]">) {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) notFound();

  const related = getRelatedProducts(product, 4);
  const story = testimonialsFor(product.families)[0];
  const storyPhoto = story.photos[0];

  const specs: [string, string][] = [
    ["Lure type", "In-line spinner"],
    ["Colors", product.colorParts.map((c) => c.label).join(" / ")],
    ["Weights", product.variants.length ? product.variants.map((v) => v.weight).join(", ") : "—"],
    ["Hardware", "Split ring, treble hook, extra single hook included"],
    ["Assembly", "Hand assembled"],
    ["Price", `${formatPrice(product.priceCents)} (all weights)`],
    ["Manufacturer", "Arctic Spinner Fishing Lures"],
    ...(product.modelNumber ? ([["Model number", product.modelNumber]] as [string, string][]) : []),
  ];

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.fullName,
    image: new URL(product.images[0].src, site.url).toString(),
    description: describe(product),
    brand: { "@type": "Brand", name: "Arctic Spinners" },
    ...(product.modelNumber ? { mpn: product.modelNumber } : {}),
    offers: {
      "@type": "Offer",
      price: (product.priceCents / 100).toFixed(2),
      priceCurrency: "USD",
      availability: product.available ? "https://schema.org/InStock" : "https://schema.org/OutOfStock",
      url: new URL(`/shop/${product.slug}`, site.url).toString(),
    },
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <div className="container-page pt-6 pb-16 sm:pt-8 lg:pb-24">
        <nav aria-label="Breadcrumb" className="mb-6 text-xs text-muted-foreground">
          <Link href="/" className="hover:text-arctic">
            Home
          </Link>{" "}
          /{" "}
          <Link href="/shop" className="hover:text-arctic">
            Shop
          </Link>{" "}
          / <span className="text-navy">{product.name}</span>
        </nav>

        <div className="grid gap-10 lg:grid-cols-12 lg:gap-14">
          <div className="lg:col-span-7">
            <div className="lg:sticky lg:top-28">
              <ProductGallery product={product} />
            </div>
          </div>

          <div className="lg:col-span-5">
            <p className="eyebrow text-arctic">
              Arctic Spinner · {product.isSignature ? "Signature pattern" : product.families.includes("glow") ? "Glow series" : "In-line spinner"}
            </p>
            <h1 className="display mt-3 text-5xl text-navy sm:text-6xl">{product.name}</h1>
            <p className="mt-4 leading-relaxed text-muted-foreground">{describe(product)}</p>

            <div className="mt-8 border-t border-border pt-8">
              <ProductPurchase product={product} />
            </div>

            <ul className="mt-8 grid gap-3 rounded-xl bg-ice p-5 text-sm text-navy">
              <li className="flex items-start gap-3">
                <FishingHook className="mt-0.5 size-4 shrink-0 text-arctic" />
                Comes equipped with a split ring for easy hook setup. Ships with a treble hook, plus an extra single hook
                included just in case.
              </li>
              <li className="flex items-start gap-3">
                <Hand className="mt-0.5 size-4 shrink-0 text-arctic" />
                Hand assembled with professional care using quality components.
              </li>
              <li className="flex items-start gap-3">
                <Award className="mt-0.5 size-4 shrink-0 text-arctic" />
                Over 50 years of fish-catching reputation, since 1967.
              </li>
            </ul>

            <Accordion multiple defaultValue={["specs"]} className="mt-8 border-t border-border">
              <AccordionItem value="specs" className="border-b border-border">
                <AccordionTrigger className="items-center py-5 text-base font-semibold text-navy hover:no-underline">
                  Specifications
                </AccordionTrigger>
                <AccordionContent>
                  <dl className="divide-y divide-border text-sm">
                    {specs.map(([k, v]) => (
                      <div key={k} className="grid grid-cols-[8.5rem_1fr] gap-4 py-2.5">
                        <dt className="text-muted-foreground">{k}</dt>
                        <dd className="font-medium text-navy">{v}</dd>
                      </div>
                    ))}
                  </dl>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="craft" className="border-b border-border">
                <AccordionTrigger className="items-center py-5 text-base font-semibold text-navy hover:no-underline">
                  Craftsmanship
                </AccordionTrigger>
                <AccordionContent className="leading-relaxed text-muted-foreground">
                  <p>
                    Every Arctic Spinner fishing lure is hand assembled with professional care. We use the finest lure
                    components you’ll find anywhere, which makes this lure worth its money just in durability.
                  </p>
                  <p>
                    Nothing rushed to market, but carefully crafted from years of experience. No shortcuts. No gimmicks.
                  </p>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="shipping" className="border-b border-border">
                <AccordionTrigger className="items-center py-5 text-base font-semibold text-navy hover:no-underline">
                  Shipping &amp; questions
                </AccordionTrigger>
                <AccordionContent className="leading-relaxed text-muted-foreground">
                  <p>
                    Shipping options and costs are confirmed at checkout. Questions about a color or an order? Call{" "}
                    <a href={site.phoneHref}>{site.phone}</a> or email <a href={`mailto:${site.email}`}>{site.email}</a>.
                  </p>
                  <p>
                    Prefer to shop in person? <Link href="/dealers">Find an Arctic Spinners dealer</Link> near you.
                  </p>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </div>
      </div>

      {/* From the water */}
      <section className="bg-ice py-16 sm:py-20">
        <div className="container-page grid items-center gap-10 lg:grid-cols-12">
          {storyPhoto && (
            <Reveal className="lg:col-span-5">
              <div className="relative aspect-[4/3] overflow-hidden rounded-2xl">
                <Image src={storyPhoto.src} alt={storyPhoto.alt} fill sizes="(min-width: 1024px) 40vw, 100vw" className="object-cover" />
              </div>
            </Reveal>
          )}
          <Reveal className={storyPhoto ? "lg:col-span-7" : "lg:col-span-12"}>
            <Quote className="size-10 text-arctic" />
            <p className="eyebrow mt-4 text-arctic">From the water · {story.headline}</p>
            <blockquote className="display mt-3 text-4xl leading-[0.95] text-navy sm:text-5xl">“{story.pullQuote}”</blockquote>
            <p className="mt-5 text-sm text-muted-foreground">
              <span className="font-semibold text-navy">{story.author}</span>
              {(story.role || story.location) && ` · ${[story.role, story.location].filter(Boolean).join(" · ")}`}
            </p>
            <Link href={`/testimonials#${story.id}`} className="mt-5 inline-block text-sm font-semibold text-arctic hover:underline">
              Read the full story →
            </Link>
          </Reveal>
        </div>
      </section>

      {related.length > 0 && (
        <section className="py-16 sm:py-24">
          <div className="container-page">
            <div className="flex items-end justify-between gap-4">
              <h2 className="display text-4xl text-navy sm:text-6xl">You may also like</h2>
              <Link href="/shop" className="shrink-0 text-sm font-semibold text-arctic hover:underline">
                Shop all
              </Link>
            </div>
            <div className="mt-8 grid grid-cols-2 gap-x-4 gap-y-10 sm:gap-x-6 lg:grid-cols-4">
              {related.map((p) => (
                <ProductCard key={p.slug} product={p} />
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
