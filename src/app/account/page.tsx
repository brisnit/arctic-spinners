import { ArrowRight, UserRound } from "lucide-react";
import type { Metadata } from "next";
import { ButtonLink } from "@/components/shared/button-link";
import { site } from "@/lib/site";

export const metadata: Metadata = { title: "Account", robots: { index: false } };

export default function AccountPage() {
  return (
    <div className="container-page flex min-h-[60vh] items-center py-16">
      <div className="mx-auto max-w-xl text-center">
        <span className="mx-auto flex size-16 items-center justify-center rounded-full bg-ice text-arctic">
          <UserRound className="size-7" />
        </span>
        <p className="eyebrow mt-6 text-arctic">Account</p>
        <h1 className="display mt-2 text-5xl text-navy sm:text-6xl">Customer accounts are coming.</h1>
        <p className="mt-4 text-muted-foreground">
          Sign-in, order history and saved addresses will be available once the store is connected to its commerce platform.
          In the meantime, questions about an order can go to{" "}
          <a href={`mailto:${site.email}`} className="font-semibold text-arctic hover:underline">
            {site.email}
          </a>{" "}
          or {site.phone}.
        </p>
        <ButtonLink href="/shop" size="xl" className="mt-8">
          Shop the lures <ArrowRight className="size-4" />
        </ButtonLink>
      </div>
    </div>
  );
}
