import type { Testimonial } from "@/lib/types";

/**
 * Customer testimonials, reproduced verbatim from
 * https://arcticspinner.com/reviews/ and the legacy /testimonials/ page.
 * Headlines are the titles used on the current site. No star ratings are
 * shown because the source site does not publish any.
 */
export const testimonials: Testimonial[] = [
  {
    id: "trev",
    headline: "Caught My Biggest on Arctic Spinner",
    author: "Trev",
    body: [
      "Arctic Spinners are one of many go-to tactics I use on regular basis while targeting steelhead through out the year in the Great Lakes region. I grew-up tossing them around the Northwestern Lower Peninsula of Michigan and have used them successfully in my travels around the region ever since, including fly-in fishing trips to Northern Ontario for pike and walleye.",
      "When a situation calls for spinners, I pull out my variety box of Arctics and fish with confidence. I can’t wait until I can take them to the West Coast someday for my dream trips!",
      "Here are the pictures from my last trip to Tippy this spring. First is me with the biggest of the trip, 32+ incher caught on All Black with Red beads.",
      "Second is my buddy Bobby. He had never caught a steelhead on a spinner before this trip! Pulled two under my nose on All Blue. We did 8 in one day, all on Arctics, and were the only ones catching fish on both sides of the river that day.",
    ],
    pullQuote:
      "We did 8 in one day, all on Arctics, and were the only ones catching fish on both sides of the river that day.",
    photos: [
      { src: "/images/catches/succ_pic05a.jpg", width: 600, height: 501, alt: "Angler standing in a river holding a large steelhead" },
      { src: "/images/catches/succ_pic05b.jpg", width: 1400, height: 1050, alt: "Angler in waders holding a steelhead with a blue Arctic Spinner in its jaw" },
      { src: "/images/catches/succ_pic05c.jpg", width: 600, height: 450, alt: "Close-up of a steelhead with a blue Arctic Spinner hooked in its mouth" },
    ],
    mentions: ["black", "red", "blue"],
  },
  {
    id: "brian-kelly",
    headline: "Best Spinner in My Arsenal",
    author: "Brian Kelly",
    role: "Outdoor Writer",
    location: "Westfield, NY",
    body: [
      "Arctic Spinners have been my best producing lure for salmon, steelhead and trout year in and year out. Their unique action and triggering properties provoke big fish to bite when nothing else does.",
    ],
    pullQuote:
      "Their unique action and triggering properties provoke big fish to bite when nothing else does.",
    photos: [
      { src: "/images/catches/Coho_on_Pink2.jpg", width: 600, height: 450, alt: "Angler kneeling at a riverbank holding a coho salmon caught on a pink Arctic Spinner" },
      { src: "/images/catches/Coho_on_Pink3.jpg", width: 600, height: 531, alt: "Coho salmon caught on a pink Arctic Spinner" },
    ],
    mentions: ["pink"],
  },
  {
    id: "matt-hogan",
    headline: "Arctic Spinners are My Go-to Lure",
    author: "Matt Hogan",
    location: "Midland, MI",
    body: [
      "Arctic Spinners are my go to lure for fishing spinners in rivers. The way they spin in slow water is too much for the fish to resist. With Arctic Spinners I can out-fish guys using the big company spinners 2-1.",
    ],
    pullQuote: "The way they spin in slow water is too much for the fish to resist.",
    photos: [],
    mentions: [],
  },
  {
    id: "jay-osga",
    headline: "Best Arctic Spinners EVER!!!",
    author: "Jay Osga",
    role: "Hooker Custom Rods & Flies",
    body: [
      "Doug, I would like to thank you for continuing to make this fantastic lure that has proven itself time and time again. I have used and successfully caught Salmon, Brown Trout, Coho, Steelhead, Walleyes, Pike and Bass on your lures.",
      "Thank you for making the smaller ones for me. I will be incorporating these into a countdown lure with artificial bait for suspended walleye on Saginaw Bay, Portage Lake, Lake Michigan and Lake Erie. Since I fish solely out of my kayak, casting, slip-bobbering and jigging are my go to methods, so it is real convenient that your spinners allow me to cast while I have bobbers out soaking.",
      "I have tried and spent a lot of money on other lures that have not produced, so to use a time tested spinner like yours saves me not only money but precious time.",
    ],
    pullQuote:
      "To use a time tested spinner like yours saves me not only money but precious time.",
    photos: [],
    mentions: [],
  },
  {
    id: "craig-beck",
    headline: "White Arctic Spinner with Red Beads Got Me 2 Hits Immediately!",
    author: "Craig Beck",
    location: "Willoughby Hill",
    body: [
      "I caught this 25 inch steelhead on the Arctic Spinner this weekend up at Mentor Headlands off the break wall (it’s at the mouth of the Grand River). I was using the white spinner with red beads that had the silver spinner. I had another hit but missed it because I wasn’t paying attention. I just thought you would like to know.",
    ],
    pullQuote: "I caught this 25 inch steelhead on the Arctic Spinner this weekend up at Mentor Headlands.",
    photos: [
      { src: "/images/catches/succ_pic04.jpg", width: 600, height: 555, alt: "Smiling angler holding a 25 inch steelhead" },
    ],
    mentions: ["white", "red", "metallic"],
  },
  {
    id: "roger-gates",
    headline: "Hooked and Reeling within 10 casts with Arctic Spinner",
    author: "Roger Gates",
    body: [
      "Just learning it’s something I’ve always wanted to do. Started going every weekend a month ago. I pitched everything from floating skein, wobble glows, bottom bouncing sacks, floating beads and bouncing beads and never got a bite. Then I tied on a spinner and less than ten cast later caught my first one. I’ve caught at least one the last few weekends all off your spinners. Thanks for the confidence boost.",
    ],
    pullQuote: "Then I tied on a spinner and less than ten cast later caught my first one.",
    photos: [
      { src: "/images/catches/roger-gates.jpg", width: 328, height: 246, alt: "Trout resting in a landing net" },
    ],
    mentions: [],
  },
];

/** Catch photos sent to Arctic Spinners without an accompanying essay. */
export const catchGallery = [
  { src: "/images/catches/succ_pic01.jpg", width: 450, height: 600, alt: "Angler on a misty riverbank holding up a large salmon" },
  { src: "/images/catches/succ_pic03.jpg", width: 480, height: 640, alt: "Angler in waders holding a steelhead in an autumn river" },
  { src: "/images/catches/succ_pic02.jpg", width: 450, height: 600, alt: "Angler holding a salmon in a backyard" },
  { src: "/images/catches/succ_pic06.jpg", width: 600, height: 447, alt: "Kayak angler holding a silver salmon on open water" },
  { src: "/images/catches/walleye01.jpg", width: 600, height: 447, alt: "Four walleye laid side by side" },
];

export function testimonialsFor(families: string[]) {
  const relevant = testimonials.filter((t) => t.mentions.some((m) => families.includes(m)));
  return relevant.length ? relevant : testimonials.filter((t) => t.id === "matt-hogan" || t.id === "brian-kelly");
}
