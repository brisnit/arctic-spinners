import type { Metadata } from "next";
import { PageHero } from "@/components/shared/page-hero";
import { site } from "@/lib/site";

export const metadata: Metadata = { title: "Privacy Policy", robots: { index: false } };

export default function Page() {
  return (
    <>
      <PageHero eyebrow="Legal" title="Privacy Policy" />
      <div className="container-page max-w-3xl py-14">
        <div className="rounded-xl border border-dashed border-signal/50 bg-[#fff4ec] p-6 text-[#7a3210]">
          <p className="font-semibold">Placeholder content</p>
          <p className="mt-2 text-sm leading-relaxed">
            The privacy policy for Arctic Spinners has not been provided yet. This page is a placeholder and must be replaced with
            reviewed legal copy before the site launches.
          </p>
        </div>
        <p className="mt-8 text-muted-foreground">
          Questions in the meantime? Email{" "}
          <a href={`mailto:${site.email}`} className="font-semibold text-arctic hover:underline">
            {site.email}
          </a>
          .
        </p>
      </div>
    </>
  );
}
