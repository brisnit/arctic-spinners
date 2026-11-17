"use client";

import { useMemo, useSyncExternalStore } from "react";
import { getVariant } from "./catalog";
import type { CartLine } from "./types";

/**
 * Client-side cart prototype.
 * A tiny external store persisted to localStorage. Swap the action
 * implementations for Shopify Storefront / WooCommerce Store API calls
 * when a commerce backend is connected.
 */

const STORAGE_KEY = "arctic-spinners:cart:v1";
const MAX_QTY = 99;

interface CartState {
  lines: CartLine[];
  open: boolean;
  /** Variant id of the most recently added item (for drawer highlight). */
  lastAdded: string | null;
}

const SERVER_STATE: CartState = { lines: [], open: false, lastAdded: null };
let state: CartState = SERVER_STATE;
let hydrated = false;
const listeners = new Set<() => void>();

function readStorage(): CartLine[] {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as CartLine[];
    if (!Array.isArray(parsed)) return [];
    // Drop anything that no longer exists in the catalog.
    return parsed
      .filter((l) => l && typeof l.variantId === "string" && getVariant(l.variantId))
      .map((l) => ({ variantId: l.variantId, quantity: clampQty(l.quantity) }));
  } catch {
    return [];
  }
}

function writeStorage(lines: CartLine[]) {
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(lines));
  } catch {
    /* storage unavailable (private mode) — cart still works in-memory */
  }
}

function clampQty(n: number) {
  if (!Number.isFinite(n)) return 1;
  return Math.max(1, Math.min(MAX_QTY, Math.floor(n)));
}

function ensureHydrated() {
  if (hydrated || typeof window === "undefined") return;
  hydrated = true;
  state = { ...state, lines: readStorage() };
  window.addEventListener("storage", (e) => {
    if (e.key === STORAGE_KEY) {
      state = { ...state, lines: readStorage() };
      emit();
    }
  });
}

function emit() {
  for (const l of listeners) l();
}

function setState(next: Partial<CartState>, persist = false) {
  state = { ...state, ...next };
  if (persist) writeStorage(state.lines);
  emit();
}

function subscribe(listener: () => void) {
  ensureHydrated();
  listeners.add(listener);
  return () => listeners.delete(listener);
}

function getSnapshot() {
  ensureHydrated();
  return state;
}

function getServerSnapshot() {
  return SERVER_STATE;
}

export const cart = {
  add(variantId: string, quantity = 1, { openDrawer = true } = {}) {
    const found = getVariant(variantId);
    if (!found || !found.variant.available) return;
    const existing = state.lines.find((l) => l.variantId === variantId);
    const lines = existing
      ? state.lines.map((l) =>
          l.variantId === variantId ? { ...l, quantity: clampQty(l.quantity + quantity) } : l,
        )
      : [...state.lines, { variantId, quantity: clampQty(quantity) }];
    setState({ lines, lastAdded: variantId, open: openDrawer ? true : state.open }, true);
  },
  setQuantity(variantId: string, quantity: number) {
    if (quantity <= 0) return cart.remove(variantId);
    setState(
      {
        lines: state.lines.map((l) =>
          l.variantId === variantId ? { ...l, quantity: clampQty(quantity) } : l,
        ),
      },
      true,
    );
  },
  remove(variantId: string) {
    setState({ lines: state.lines.filter((l) => l.variantId !== variantId) }, true);
  },
  clear() {
    setState({ lines: [], lastAdded: null }, true);
  },
  open() {
    setState({ open: true });
  },
  close() {
    setState({ open: false, lastAdded: null });
  },
  setOpen(open: boolean) {
    if (open) cart.open();
    else cart.close();
  },
};

export function useCartState() {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}

export function useCart() {
  const s = useCartState();
  return useMemo(() => {
    const items = s.lines
      .map((line) => {
        const found = getVariant(line.variantId);
        if (!found) return null;
        return {
          ...line,
          product: found.product,
          variant: found.variant,
          lineTotalCents: found.variant.priceCents * line.quantity,
        };
      })
      .filter((x): x is NonNullable<typeof x> => x !== null);
    const count = items.reduce((n, i) => n + i.quantity, 0);
    const subtotalCents = items.reduce((n, i) => n + i.lineTotalCents, 0);
    return { items, count, subtotalCents, open: s.open, lastAdded: s.lastAdded, maxQty: MAX_QTY };
  }, [s]);
}
