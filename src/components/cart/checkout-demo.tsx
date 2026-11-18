"use client";

import { ArrowLeft, Info, Lock, PartyPopper, ShoppingBag } from "lucide-react";
import { LureImage } from "@/components/product/lure-image";
import Link from "next/link";
import { useState } from "react";
import { ButtonLink } from "@/components/shared/button-link";
import { cart, useCart } from "@/lib/cart-store";
import { EMAIL_RE, formatPrice } from "@/lib/format";
import { cn } from "@/lib/utils";

const inputCls =
  "h-12 w-full rounded-md border border-input bg-white px-3.5 text-[0.95rem] text-navy outline-none placeholder:text-muted-foreground/70 focus-visible:border-arctic focus-visible:ring-2 focus-visible:ring-electric/40 aria-invalid:border-destructive";

/**
 * Demonstration checkout. Collects no payment details and places no order.
 * Replace with Shopify Checkout, WooCommerce checkout, or Stripe Checkout.
 */
export function CheckoutDemo() {
  const { items, count, subtotalCents } = useCart();
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState(false);
  const [done, setDone] = useState<null | { count: number; subtotal: number }>(null);

  if (done) {
    return (
      <div className="mx-auto max-w-xl py-10 text-center">
        <span className="mx-auto flex size-16 items-center justify-center rounded-full bg-arctic-50 text-arctic">
          <PartyPopper className="size-7" />
        </span>
        <h1 className="display mt-6 text-5xl text-navy sm:text-6xl">Demo complete</h1>
        <p className="mt-4 text-muted-foreground">
          You walked through the demonstration checkout with {done.count} {done.count === 1 ? "lure" : "lures"} (
          {formatPrice(done.subtotal)}). <strong className="text-navy">No order was placed and no payment was processed.</strong>{" "}
          Your cart has been left as it was.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <ButtonLink href="/shop" size="xl">
            Keep shopping
          </ButtonLink>
          <button
            type="button"
            onClick={() => {
              cart.clear();
              setDone(null);
            }}
            className="inline-flex h-12 items-center rounded-md border border-navy/20 px-6 text-[0.8125rem] font-semibold tracking-[0.12em] text-navy uppercase hover:bg-navy hover:text-white"
          >
            Clear cart
          </button>
        </div>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="mx-auto max-w-lg py-16 text-center">
        <span className="mx-auto flex size-16 items-center justify-center rounded-full bg-ice text-arctic">
          <ShoppingBag className="size-7" />
        </span>
        <h1 className="display mt-6 text-5xl text-navy">Your cart is empty</h1>
        <p className="mt-3 text-muted-foreground">Add a few lures to try the demonstration checkout.</p>
        <ButtonLink href="/shop" size="xl" className="mt-8">
          Shop the lures
        </ButtonLink>
      </div>
    );
  }

  return (
    <div className="grid gap-10 grid-cols-[minmax(0,1fr)] lg:grid-cols-12 lg:gap-14">
      <div className="lg:col-span-7">
        <Link href="/shop" className="inline-flex items-center gap-1.5 text-sm font-semibold text-arctic hover:underline">
          <ArrowLeft className="size-4" /> Continue shopping
        </Link>
        <h1 className="display mt-4 text-5xl text-navy sm:text-6xl">Checkout</h1>

        <div className="mt-6 flex items-start gap-3 rounded-xl border border-signal/30 bg-[#fff4ec] p-4 text-sm text-[#7a3210]">
          <Info className="mt-0.5 size-4 shrink-0" />
          <p>
            <strong>Demonstration checkout.</strong> This prototype does not collect payment information, process payments,
            or place orders. A secure checkout (e.g. Shopify Checkout or Stripe) will be connected before launch.
          </p>
        </div>

        <form
          className="mt-8 space-y-8"
          noValidate
          onSubmit={(e) => {
            e.preventDefault();
            if (!EMAIL_RE.test(email.trim())) {
              setEmailError(true);
              document.getElementById("co-email")?.focus();
              return;
            }
            setDone({ count, subtotal: subtotalCents });
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
        >
          <fieldset>
            <legend className="text-lg font-bold text-navy">Contact</legend>
            <label htmlFor="co-email" className="mt-4 mb-2 block text-sm font-semibold text-navy">
              Email
            </label>
            <input
              id="co-email"
              type="email"
              autoComplete="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setEmailError(false);
              }}
              aria-invalid={emailError}
              aria-describedby={emailError ? "co-email-err" : undefined}
              className={inputCls}
              placeholder="you@example.com"
            />
            {emailError && (
              <p id="co-email-err" className="mt-1.5 text-sm text-destructive" role="alert">
                Please enter a valid email address.
              </p>
            )}
          </fieldset>

          <fieldset>
            <legend className="text-lg font-bold text-navy">Shipping address</legend>
            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              <input aria-label="First name" autoComplete="given-name" placeholder="First name" className={inputCls} />
              <input aria-label="Last name" autoComplete="family-name" placeholder="Last name" className={inputCls} />
              <input aria-label="Address" autoComplete="street-address" placeholder="Address" className={cn(inputCls, "sm:col-span-2")} />
              <input aria-label="City" autoComplete="address-level2" placeholder="City" className={inputCls} />
              <div className="grid grid-cols-2 gap-4">
                <input aria-label="State" autoComplete="address-level1" placeholder="State" className={inputCls} />
                <input aria-label="ZIP code" autoComplete="postal-code" inputMode="numeric" placeholder="ZIP" className={inputCls} />
              </div>
            </div>
          </fieldset>

          <fieldset>
            <legend className="text-lg font-bold text-navy">Payment</legend>
            <div className="mt-4 flex items-center gap-3 rounded-xl border border-dashed border-input bg-ice p-5 text-sm text-muted-foreground">
              <Lock className="size-5 shrink-0 text-arctic" />
              Payment fields are intentionally disabled in this prototype. No card details are requested or stored.
            </div>
          </fieldset>

          <button
            type="submit"
            className="inline-flex h-13 w-full items-center justify-center gap-2 rounded-md bg-arctic text-[0.8125rem] font-semibold tracking-[0.12em] text-white uppercase transition-colors hover:bg-navy"
          >
            Complete demo checkout
          </button>
          <p className="text-center text-xs text-muted-foreground">You will not be charged. No order will be created.</p>
        </form>
      </div>

      <aside className="lg:col-span-5">
        <div className="rounded-2xl bg-ice p-6 lg:sticky lg:top-28">
          <h2 className="text-lg font-bold text-navy">Order summary · {count} {count === 1 ? "item" : "items"}</h2>
          <ul className="mt-5 divide-y divide-border">
            {items.map((i) => (
              <li key={i.variantId} className="flex items-center gap-4 py-3">
                <span className="relative h-16 w-14 shrink-0 overflow-hidden rounded-md bg-white">
                  <LureImage image={i.product.images[0]} alt="" sizes="56px" pad="p-1" shadow={false} />
                  <span className="absolute -top-1.5 -right-1.5 flex size-5 items-center justify-center rounded-full bg-navy text-[0.65rem] font-bold text-white">
                    {i.quantity}
                  </span>
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block truncate text-sm font-semibold text-navy">{i.product.name}</span>
                  <span className="text-xs text-muted-foreground">{i.variant.weight}</span>
                </span>
                <span className="text-sm font-semibold text-navy tabular-nums">{formatPrice(i.lineTotalCents)}</span>
              </li>
            ))}
          </ul>
          <dl className="mt-4 space-y-2 border-t border-border pt-4 text-sm">
            <div className="flex justify-between">
              <dt className="text-muted-foreground">Subtotal</dt>
              <dd className="font-semibold text-navy tabular-nums">{formatPrice(subtotalCents)}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-muted-foreground">Shipping</dt>
              <dd className="text-muted-foreground">Calculated by store</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-muted-foreground">Tax</dt>
              <dd className="text-muted-foreground">Calculated by store</dd>
            </div>
            <div className="flex justify-between border-t border-border pt-3 text-base">
              <dt className="font-bold text-navy">Total before shipping &amp; tax</dt>
              <dd className="font-bold text-navy tabular-nums">{formatPrice(subtotalCents)}</dd>
            </div>
          </dl>
        </div>
      </aside>
    </div>
  );
}
