import { site } from "@/lib/site";
import { cn } from "@/lib/utils";

/** Flags temporary photography that should be replaced before launch. */
export function PlaceholderChip({ className, label = "Placeholder photo" }: { className?: string; label?: string }) {
  if (!site.showPlaceholderLabels) return null;
  return (
    <span
      className={cn(
        "pointer-events-none inline-flex items-center gap-1.5 rounded-full bg-black/45 px-2.5 py-1 text-[0.625rem] font-medium tracking-wide text-white/90 uppercase backdrop-blur-sm",
        className,
      )}
    >
      <span className="size-1.5 rounded-full bg-signal" aria-hidden />
      {label}
    </span>
  );
}
