"use client";

import { Check, ShoppingBag } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { LureImage } from "@/components/product/lure-image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { QtyStepper } from "@/components/cart/cart-drawer";
import { ColorParts } from "@/components/shared/swatches";
import { cart } from "@/lib/cart-store";
import { formatPrice } from "@/lib/format";
import type { Product } from "@/lib/types";
import { cn } from "@/lib/utils";

export function ProductPurchase({ product }: { product: Product }) {
  const [variantId, setVariantId] = useState(product.variants[0]?.id ?? "");
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);
  const [showSticky, setShowSticky] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const variant = product.variants.find((v) => v.id === variantId);
  const canBuy = product.available && Boolean(variant);

  // Show the mobile sticky bar once the main Add to Cart button scrolls above the viewport.
  useEffect(() => {
    const onScroll = () => {
      const el = buttonRef.current;
      if (el) setShowSticky(el.getBoundingClientRect().bottom < 0);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  const add = () => {
    if (!variant) return;
    cart.add(variant.id, qty);
    setAdded(true);
    window.setTimeout(() => setAdded(false), 1800);
  };

  return (
    <div>
      <div className="flex items-center gap-3">
        <p className="text-3xl font-bold text-navy tabular-nums">{formatPrice(product.priceCents)}</p>
        {product.available ? (
          <span className="inline-flex items-center gap-1.5 rounded-full bg-[#e8f7ee] px-2.5 py-1 text-xs font-semibold text-[#166b3a]">
            <span className="size-1.5 rounded-full bg-[#1f9d55]" /> In stock
          </span>
        ) : (
          <span className="inline-flex items-center gap-1.5 rounded-full bg-ice px-2.5 py-1 text-xs font-semibold text-muted-foreground">
            Sold out
          </span>
        )}
      </div>

      <div className="mt-7">
        <p className="text-sm font-semibold text-navy">
          Colors <span className="font-normal text-muted-foreground">— {product.colorParts.map((c) => c.label).join(" / ")}</span>
        </p>
        <ColorParts parts={product.colorParts} size="md" className="mt-3" />
      </div>

      <fieldset className="mt-7" disabled={!product.available}>
        <legend className="text-sm font-semibold text-navy">
          Weight {variant && <span className="font-normal text-muted-foreground">— {variant.weight}</span>}
        </legend>
        {product.variants.length ? (
          <div className="mt-3 flex flex-wrap gap-2" role="radiogroup" aria-label="Weight">
            {product.variants.map((v) => (
              <button
                key={v.id}
                type="button"
                role="radio"
                aria-checked={variantId === v.id}
                onClick={() => setVariantId(v.id)}
                className={cn(
                  "h-12 min-w-[5.5rem] rounded-md border-2 px-4 text-sm font-semibold transition-colors",
                  variantId === v.id ? "border-navy bg-navy text-white" : "border-input text-navy hover:border-navy",
                )}
              >
                {v.weight}
              </button>
            ))}
          </div>
        ) : (
          <p className="mt-2 text-sm text-muted-foreground">Weight options will be listed when this color is back in stock.</p>
        )}
      </fieldset>

      <div className="mt-7 flex gap-3">
        {canBuy && <QtyStepper value={qty} onChange={setQty} label={product.name} size="lg" />}
        <button
          ref={buttonRef}
          type="button"
          onClick={add}
          disabled={!canBuy}
          className={cn(
            "inline-flex h-12 flex-1 items-center justify-center gap-2 rounded-md text-[0.8125rem] font-semibold tracking-[0.12em] uppercase transition-colors",
            canBuy
              ? added
                ? "bg-navy text-white"
                : "bg-arctic text-white hover:bg-navy"
              : "cursor-not-allowed bg-ice text-muted-foreground",
          )}
        >
          {added ? <Check className="size-4" /> : <ShoppingBag className="size-4" />}
          {canBuy ? (added ? "Added to cart" : `Add to cart · ${formatPrice(product.priceCents * qty)}`) : "Sold out"}
        </button>
      </div>
      {!product.available && (
        <p className="mt-3 text-sm text-muted-foreground">
          Want to know when it’s back? <Link href="/contact" className="font-semibold text-arctic hover:underline">Contact us</Link>.
        </p>
      )}

      {/* Sticky mobile add-to-cart */}
      <AnimatePresence>
        {showSticky && canBuy && (
          <motion.div
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", stiffness: 380, damping: 38 }}
            className="fixed inset-x-0 bottom-0 z-30 border-t border-border bg-white/95 px-4 pt-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] shadow-[0_-8px_24px_-12px_rgba(16,43,63,0.25)] backdrop-blur lg:hidden"
          >
            <div className="flex items-center gap-3">
              <span className="relative h-12 w-10 shrink-0 overflow-hidden rounded bg-ice">
                <LureImage image={product.images[0]} alt="" sizes="40px" pad="p-0.5" shadow={false} />
              </span>
              <span className="min-w-0 flex-1">
                <span className="block truncate text-sm font-semibold text-navy">{product.name}</span>
                <span className="block text-xs text-muted-foreground">
                  {variant?.weight} · {formatPrice(product.priceCents)}
                </span>
              </span>
              <button
                type="button"
                onClick={add}
                className={cn(
                  "inline-flex h-11 shrink-0 items-center gap-2 rounded-md px-5 text-xs font-semibold tracking-[0.1em] text-white uppercase",
                  added ? "bg-navy" : "bg-arctic",
                )}
              >
                {added ? <Check className="size-4" /> : <ShoppingBag className="size-4" />}
                {added ? "Added" : "Add"}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
