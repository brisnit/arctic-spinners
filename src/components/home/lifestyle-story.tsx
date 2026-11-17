import { ArrowRight } from "lucide-react";
import Image from "next/image";
import { ButtonLink } from "@/components/shared/button-link";
import { PlaceholderChip } from "@/components/shared/placeholder-chip";
import { Reveal } from "@/components/shared/reveal";

export function LifestyleStory() {
  return (
    <section className="relative isolate overflow-hidden bg-navy" aria-labelledby="story-heading">
      <Image
        src="/images/lifestyle/manistee-river-placeholder.jpg"
        alt="A clear Michigan river winding through autumn brush under a blue sky"
        fill
        sizes="100vw"
        className="-z-20 object-cover"
      />
      <div aria-hidden className="absolute inset-0 -z-10 bg-gradient-to-r from-navy/90 via-navy/60 to-navy/10" />
      <PlaceholderChip className="absolute top-4 right-4" label="Placeholder photo · Manistee River, MI" />
      <div className="container-page flex min-h-[620px] items-center py-20 lg:min-h-[720px]">
        <div className="max-w-2xl text-white">
          <Reveal>
            <p className="eyebrow mb-4 text-electric">On the water</p>
            <h2 id="story-heading" className="display text-[3rem] sm:text-7xl lg:text-[5.5rem]">
              Good days are measured in casts.
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="mt-6 space-y-4 text-base leading-relaxed text-white/85 sm:text-lg">
              <p>
                Some mornings it takes ten casts. Some mornings it takes a hundred. Either way, it’s the moment the line comes
                tight that brings you back.
              </p>
              <p>
                For more than five decades, anglers have tied on Arctic Spinners for exactly that moment — steelhead in Great
                Lakes rivers, salmon in Alaska, pike and muskie in Canada. The lure that started in Bear Lake, Michigan still
                does what it was built to do.
              </p>
            </div>
          </Reveal>
          <Reveal delay={0.2}>
            <ButtonLink href="/our-story" size="xl" variant="inverse" className="mt-8">
              Discover our story <ArrowRight className="size-4" />
            </ButtonLink>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
