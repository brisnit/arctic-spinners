import { Award, Fish, FishingHook, Hand } from "lucide-react";

const items = [
  { icon: Award, title: "Since 1967", text: "Designed by a Michigan fishing guide" },
  { icon: Hand, title: "Hand assembled", text: "With professional care, one at a time" },
  { icon: FishingHook, title: "Ready to fish", text: "Split ring, treble hook + spare single" },
  { icon: Fish, title: "Multi-species", text: "Trout, salmon, steelhead, pike & muskie" },
];

export function TrustStrip() {
  return (
    <section aria-label="Why anglers choose Arctic Spinners" className="border-b border-border bg-white">
      <ul className="container-page grid grid-cols-2 gap-x-4 gap-y-6 py-7 sm:py-8 lg:grid-cols-4">
        {items.map(({ icon: Icon, title, text }) => (
          <li key={title} className="flex items-start gap-3 sm:items-center">
            <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-arctic-50 text-arctic sm:size-11">
              <Icon className="size-5" strokeWidth={1.75} />
            </span>
            <span>
              <span className="block text-sm font-semibold text-navy">{title}</span>
              <span className="block text-xs leading-snug text-muted-foreground sm:text-[0.8rem]">{text}</span>
            </span>
          </li>
        ))}
      </ul>
    </section>
  );
}
