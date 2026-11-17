"use client";

import { ArrowRight, Minus, Plus, ShoppingBag, Trash2 } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { LureImage } from "@/components/product/lure-image";
import Link from "next/link";
import { ButtonLink } from "@/components/shared/button-link";
import { Swatch } from "@/components/shared/swatches";
import { Sheet, SheetContent, SheetDescription, SheetTitle } from "@/components/ui/sheet";
import { FAMILY_META } from "@/lib/catalog";
import { cart, useCart } from "@/lib/cart-store";
import { formatPrice } from "@/lib/format";
import { cn } from "@/lib/utils";

export function CartDrawer() {
  const { items, count, subtotalCents, open, lastAdded, maxQty } = useCart();

  return (
    <Sheet open={open} onOpenChange={cart.setOpen}>
      <SheetContent side="right" className="w-full gap-0 bg-white p-0 sm:max-w-md">
        <div className="flex items-center justify-between border-b border-border px-5 py-4 pr-14 sm:px-6">
          <SheetTitle className="display text-2xl text-navy">
            Your Cart{" "}
            {count > 0 && <span className="text-arctic tabular-nums">({count})</span>}
          </SheetTitle>
          <SheetDescription className="sr-only">Review the lures in your cart</SheetDescription>
        </div>

        {items.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center px-8 text-center">
            <div className="mb-5 flex size-20 items-center justify-center rounded-full bg-ice">
              <ShoppingBag className="size-8 text-arctic" />
            </div>
            <p className="display text-3xl text-navy">Your tackle box is empty</p>
            <p className="mt-2 max-w-xs text-sm text-muted-foreground">
              51 hand-assembled colorways, $6.99 each. Find the one that gets bit.
            </p>
            <ButtonLink href="/shop" size="xl" className="mt-6" onClick={() => cart.close()}>
              Shop the lures
            </ButtonLink>
            <div className="mt-8 flex flex-wrap justify-center gap-2">
              {FAMILY_META.slice(0, 6).map((f) => (
                <Link
                  key={f.id}
                  href={`/shop?color=${f.id}`}
                  onClick={() => cart.close()}
                  className="inline-flex items-center gap-1.5 rounded-full border border-border px-3 py-1.5 text-xs font-medium text-navy hover:border-arctic hover:text-arctic"
                >
                  <Swatch color={f.swatch} className="size-3" /> {f.label}
                </Link>
              ))}
            </div>
          </div>
        ) : (
          <>
            <ul className="flex-1 divide-y divide-border overflow-y-auto px-5 sm:px-6">
              <AnimatePresence initial={false}>
                {items.map((item) => (
                  <motion.li
                    key={item.variantId}
                    layout
                    initial={{ opacity: 0, x: 24 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, height: 0, paddingTop: 0, paddingBottom: 0 }}
                    transition={{ duration: 0.25 }}
                    className={cn("flex gap-4 overflow-hidden py-5", lastAdded === item.variantId && "")}
                  >
                    <Link
                      href={`/shop/${item.product.slug}`}
                      onClick={() => cart.close()}
                      className="relative h-24 w-20 shrink-0 overflow-hidden rounded-lg bg-ice"
                    >
                      <LureImage image={item.product.images[0]} sizes="80px" pad="p-1.5" shadow={false} />
                    </Link>
                    <div className="flex min-w-0 flex-1 flex-col">
                      <div className="flex items-start justify-between gap-3">
                        <div className="min-w-0">
                          <Link
                            href={`/shop/${item.product.slug}`}
                            onClick={() => cart.close()}
                            className="block truncate font-semibold text-navy hover:text-arctic"
                          >
                            {item.product.name}
                          </Link>
                          <p className="text-xs text-muted-foreground">
                            Arctic Spinner · {item.variant.weight}
                          </p>
                          {lastAdded === item.variantId && (
                            <p className="mt-1 text-xs font-semibold text-arctic">Just added</p>
                          )}
                        </div>
                        <p className="text-sm font-semibold text-navy tabular-nums">{formatPrice(item.lineTotalCents)}</p>
                      </div>
                      <div className="mt-auto flex items-center justify-between pt-3">
                        <QtyStepper
                          value={item.quantity}
                          max={maxQty}
                          label={item.product.name}
                          onChange={(q) => cart.setQuantity(item.variantId, q)}
                        />
                        <button
                          type="button"
                          onClick={() => cart.remove(item.variantId)}
                          className="inline-flex items-center gap-1 rounded-md px-2 py-1 text-xs font-medium text-muted-foreground hover:bg-ice hover:text-destructive"
                          aria-label={`Remove ${item.product.name} ${item.variant.weight}`}
                        >
                          <Trash2 className="size-3.5" /> Remove
                        </button>
                      </div>
                    </div>
                  </motion.li>
                ))}
              </AnimatePresence>
            </ul>

            <div className="border-t border-border bg-ice px-5 pt-5 pb-[max(1.25rem,env(safe-area-inset-bottom))] sm:px-6">
              <div className="flex items-baseline justify-between">
                <span className="text-sm font-medium text-navy">Subtotal</span>
                <span className="text-xl font-bold text-navy tabular-nums">{formatPrice(subtotalCents)}</span>
              </div>
              <p className="mt-1 text-xs text-muted-foreground">
                Shipping and taxes are calculated at checkout.
              </p>
              <ButtonLink href="/checkout" size="xl" className="mt-4 w-full" onClick={() => cart.close()}>
                Checkout <ArrowRight className="size-4" />
              </ButtonLink>
              <button
                type="button"
                onClick={() => cart.close()}
                className="mt-2 w-full py-2 text-center text-sm font-medium text-navy underline-offset-4 hover:underline"
              >
                Continue shopping
              </button>
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
}

export function QtyStepper({
  value,
  onChange,
  max = 99,
  label,
  size = "sm",
}: {
  value: number;
  onChange: (n: number) => void;
  max?: number;
  label: string;
  size?: "sm" | "lg";
}) {
  const h = size === "lg" ? "h-12" : "h-9";
  const w = size === "lg" ? "w-12" : "w-9";
  return (
    <div className={cn("inline-flex items-center rounded-md border border-input bg-white", h)}>
      <button
        type="button"
        className={cn("inline-flex h-full items-center justify-center text-navy hover:bg-ice disabled:opacity-40", w)}
        onClick={() => onChange(value - 1)}
        disabled={size === "lg" && value <= 1}
        aria-label={`Decrease quantity of ${label}`}
      >
        <Minus className="size-3.5" />
      </button>
      <input
        type="number"
        inputMode="numeric"
        min={1}
        max={max}
        value={value}
        onChange={(e) => {
          const n = parseInt(e.target.value, 10);
          if (!Number.isNaN(n)) onChange(Math.min(max, Math.max(1, n)));
        }}
        className="h-full w-10 [appearance:textfield] bg-transparent text-center text-sm font-semibold text-navy tabular-nums outline-none [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
        aria-label={`Quantity of ${label}`}
      />
      <button
        type="button"
        className={cn("inline-flex h-full items-center justify-center text-navy hover:bg-ice disabled:opacity-40", w)}
        onClick={() => onChange(value + 1)}
        disabled={value >= max}
        aria-label={`Increase quantity of ${label}`}
      >
        <Plus className="size-3.5" />
      </button>
    </div>
  );
}
