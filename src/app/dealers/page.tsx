import { ArrowRight, Store } from "lucide-react";
import type { Metadata } from "next";
import { ButtonLink } from "@/components/shared/button-link";
import { DealerDirectory } from "@/components/shared/dealer-directory";
import { PageHero } from "@/components/shared/page-hero";
import { dealers, dealerStates } from "@/data/dealers";

export const metadata: Metadata = {
  title: "Find a Dealer",
  description: `Find Arctic Spinners at ${dealers.length} bait and tackle shops across ${dealerStates.join(", ")}.`,
  alternates: { canonical: "/dealers" },
};

export default function DealersPage() {
  const states = dealerStates;
  return (
    <>
      <PageHero eyebrow="Find a dealer" title="Find Arctic Spinners near you.">
        {dealers.length} bait and tackle shops across {states.slice(0, -1).join(", ")} and {states[states.length - 1]} carry
        Arctic Spinners. Selection varies by shop — give them a call before you head over.
      </PageHero>
      <div className="container-page py-8 sm:py-12">
        <DealerDirectory />
      </div>
      <section className="pb-16 sm:pb-24">
        <div className="container-page">
          <div className="flex flex-col items-start justify-between gap-6 rounded-3xl bg-ice p-8 sm:p-12 lg:flex-row lg:items-center">
            <div className="flex items-start gap-5">
              <span className="hidden size-14 shrink-0 items-center justify-center rounded-full bg-arctic text-white sm:flex">
                <Store className="size-6" />
              </span>
              <div>
                <h2 className="display text-4xl text-navy sm:text-5xl">Own a bait &amp; tackle shop?</h2>
                <p className="mt-2 max-w-xl text-muted-foreground">
                  Interested in adding Arctic Spinner fishing lures to your customers’ arsenal? Get in touch for more
                  information.
                </p>
              </div>
            </div>
            <ButtonLink href="/contact?topic=dealer" size="xl">
              Become a dealer <ArrowRight className="size-4" />
            </ButtonLink>
          </div>
        </div>
      </section>
    </>
  );
}
