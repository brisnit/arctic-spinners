/**
 * Site-wide configuration. Everything here is verified against
 * arcticspinner.com unless explicitly marked as a placeholder.
 */
export const site = {
  name: "Arctic Spinners",
  tagline: "Made to Catch. Built to Last.",
  founded: 1967,
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://arcticspinner.com",
  description:
    "Hand-assembled in-line spinner fishing lures with a legacy dating back to 1967. Designed by fishing guide Jack Wadkins in Bear Lake, Michigan.",
  phone: "419-320-4406",
  phoneHref: "tel:+14193204406",
  email: "Operations@ArcticSpinner.com",
  owner: "Doug Richardson",
  location: "Luckey, Ohio",
  social: {
    facebook: "https://www.facebook.com/luremaker/",
    instagram: "https://www.instagram.com/arcticspinners",
  },
  /**
   * Announcement bar. Configurable — set `enabled: false` or edit the
   * messages. Do not add shipping/discount promises unless they are real.
   */
  announcement: {
    enabled: true,
    messages: [
      "Hand-assembled in-line spinners since 1967",
      "Questions about a color? Call us at 419-320-4406",
    ],
  },
  /** Show small "placeholder" chips on temporary lifestyle photography. */
  showPlaceholderLabels: true,
} as const;

export const nav = [
  { href: "/shop", label: "Shop All" },
  { href: "/shop#colors", label: "Shop by Color" },
  { href: "/our-story", label: "Our Story" },
  { href: "/testimonials", label: "Testimonials" },
  { href: "/dealers", label: "Find a Dealer" },
] as const;
