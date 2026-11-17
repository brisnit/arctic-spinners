import type { Metadata } from "next";
import { CheckoutDemo } from "@/components/cart/checkout-demo";

export const metadata: Metadata = {
  title: "Checkout (Demo)",
  robots: { index: false },
};

export default function CheckoutPage() {
  return (
    <div className="container-page py-10 sm:py-14">
      <CheckoutDemo />
    </div>
  );
}
