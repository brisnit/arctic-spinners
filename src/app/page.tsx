import { CollectionSection } from "@/components/home/collection-section";
import { ColorSection } from "@/components/home/color-section";
import { Hero } from "@/components/home/hero";
import { LifestyleStory } from "@/components/home/lifestyle-story";
import { NewsletterSection } from "@/components/home/newsletter-section";
import { StoriesCarousel } from "@/components/home/stories-carousel";
import { TrustStrip } from "@/components/home/trust-strip";
import { WhySection } from "@/components/home/why-section";

export default function HomePage() {
  return (
    <>
      <Hero />
      <TrustStrip />
      <CollectionSection />
      <WhySection />
      <ColorSection id="home-colors" />
      <LifestyleStory />
      <StoriesCarousel />
      <NewsletterSection />
    </>
  );
}
