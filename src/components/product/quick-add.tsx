"use client";

import { Check, Plus } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { cart } from "@/lib/cart-store";
import type { Product } from "@/lib/types";
import { cn } from "@/lib/utils";

export function QuickAdd({ product }: { product: Product }) {
  const [picking, setPicking] = useState(false);
  const [added, setAdded] = useState<string | null>(null);

  if (!product.available || product.variants.length === 0) return null;

  const add = (variantId: string) => {
    cart.add(variantId, 1);
    setAdded(variantId);
    setPicking(false);
    window.setTimeout(() => setAdded(null), 1600);
  };

  const single = product.variants.length === 1 ? product.variants[0] : null;

  return (
    <div
      className={cn(
        "absolute inset-x-2.5 bottom-2.5 z-20 transition-all duration-300 ease-out-quint sm:inset-x-3 sm:bottom-3",
        "lg:translate-y-3 lg:opacity-0 lg:group-focus-within/card:translate-y-0 lg:group-focus-within/card:opacity-100 lg:group-hover/card:translate-y-0 lg:group-hover/card:opacity-100",
        picking && "lg:translate-y-0 lg:opacity-100",
      )}
      onMouseLeave={() => setPicking(false)}
    >
      <AnimatePresence initial={false} mode="wait">
        {picking ? (
          <motion.div
            key="pick"
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 6 }}
            transition={{ duration: 0.18 }}
            className="rounded-lg bg-white p-2 shadow-lg shadow-navy/10 ring-1 ring-navy/5"
            role="group"
            aria-label={`Choose a weight for ${product.name}`}
          >
            <p className="px-1 pb-1.5 text-[0.65rem] font-semibold tracking-wider text-muted-foreground uppercase">
              Choose weight
            </p>
            <div className="grid grid-cols-3 gap-1.5">
              {product.variants.map((v) => (
                <button
                  key={v.id}
                  type="button"
                  onClick={() => add(v.id)}
                  className="h-9 rounded-md bg-ice text-xs font-semibold text-navy transition-colors hover:bg-arctic hover:text-white"
                >
                  {v.weight}
                </button>
              ))}
            </div>
          </motion.div>
        ) : (
          <motion.button
            key="btn"
            type="button"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            onClick={() => (single ? add(single.id) : setPicking(true))}
            className={cn(
              "flex h-10 w-full items-center justify-center gap-1.5 rounded-lg text-[0.7rem] font-semibold tracking-[0.12em] uppercase shadow-lg shadow-navy/10 transition-colors sm:h-11",
              added ? "bg-navy text-white" : "bg-white text-navy hover:bg-arctic hover:text-white",
            )}
            aria-label={single ? `Quick add ${product.name}, ${single.weight}` : `Quick add ${product.name}`}
          >
            {added ? <Check className="size-4" /> : <Plus className="size-4" />}
            {added ? "Added" : single ? `Quick Add · ${single.weight}` : "Quick Add"}
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
}
