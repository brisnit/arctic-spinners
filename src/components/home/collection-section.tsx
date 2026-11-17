"use client";

import { ArrowRight } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useMemo, useState } from "react";
import { ProductCard } from "@/components/product/product-card";
import { ButtonLink } from "@/components/shared/button-link";
import { FEATURED_SLUGS, getProducts, products } from "@/lib/catalog";
import type { ColorFamily, Product } from "@/lib/types";
import { cn } from "@/lib/utils";

const TABS: { id: "featured" | ColorFamily; label: string }[] = [
  { id: "featured", label: "Featured" },
  { id: "signature", label: "Signature" },
  { id: "glow", label: "Glow" },
  { id: "black", label: "Black" },
  { id: "blue", label: "Blue" },
  { id: "chartreuse", label: "Chartreuse" },
];

export function CollectionSection() {
  const [tab, setTab] = useState<(typeof TABS)[number]["id"]>("featured");

  const list: Product[] = useMemo(() => {
    if (tab === "featured") return getProducts(FEATURED_SLUGS);
    return products.filter((p) => p.families.includes(tab) && p.available).slice(0, 8);
  }, [tab]);

  return (
    <section className="py-16 sm:py-24" aria-labelledby="collection-heading">
      <div className="container-page">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="eyebrow mb-3 text-arctic">{products.length} colorways · $6.99 each</p>
            <h2 id="collection-heading" className="display text-[2.75rem] text-navy sm:text-6xl lg:text-7xl">
              Shop the Collection
            </h2>
          </div>
          <ButtonLink href="/shop" variant="outline" size="lg" className="self-start md:self-auto">
            Shop all {products.length} lures <ArrowRight className="size-4" />
          </ButtonLink>
        </div>

        <div
          role="tablist"
          aria-label="Filter featured lures"
          className="scrollbar-none -mx-4 mt-8 flex gap-2 overflow-x-auto px-4 sm:mx-0 sm:px-0"
        >
          {TABS.map((t) => (
            <button
              key={t.id}
              role="tab"
              type="button"
              aria-selected={tab === t.id}
              onClick={() => setTab(t.id)}
              className={cn(
                "relative h-10 shrink-0 rounded-full px-5 text-sm font-semibold transition-colors",
                tab === t.id ? "text-white" : "bg-ice text-navy hover:bg-ice-200",
              )}
            >
              {tab === t.id && (
                <motion.span
                  layoutId="collection-tab"
                  className="absolute inset-0 rounded-full bg-navy"
                  transition={{ type: "spring", stiffness: 420, damping: 34 }}
                />
              )}
              <span className="relative">{t.label}</span>
            </button>
          ))}
        </div>

        <div role="tabpanel" className="mt-8 grid grid-cols-2 gap-x-4 gap-y-10 sm:gap-x-6 md:grid-cols-3 lg:grid-cols-4">
          <AnimatePresence mode="popLayout" initial={false}>
            {list.map((p, i) => (
              <motion.div
                key={`${tab}-${p.slug}`}
                layout
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.97 }}
                transition={{ duration: 0.4, delay: i * 0.035, ease: [0.22, 1, 0.36, 1] }}
              >
                <ProductCard product={p} priority={tab === "featured" && i < 4} />
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
