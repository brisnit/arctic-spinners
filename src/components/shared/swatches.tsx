import type { ColorPart } from "@/lib/types";
import { cn } from "@/lib/utils";

export function Swatch({ color, className, label }: { color: string; className?: string; label?: string }) {
  return (
    <span
      title={label}
      className={cn("inline-block size-3.5 shrink-0 rounded-full", className)}
      style={{ background: color, boxShadow: "inset 0 0 0 1px rgba(16,43,63,0.22)" }}
    />
  );
}

export function ColorParts({
  parts,
  className,
  size = "sm",
}: {
  parts: ColorPart[];
  className?: string;
  size?: "sm" | "md";
}) {
  return (
    <span
      className={cn("flex items-center", size === "sm" ? "-space-x-1" : "-space-x-1.5", className)}
      aria-label={`Colors: ${parts.map((p) => p.label).join(", ")}`}
      role="img"
    >
      {parts.map((p, i) => (
        <Swatch
          key={`${p.label}-${i}`}
          color={p.swatch}
          label={p.label}
          className={cn(
            "ring-2 ring-white",
            size === "sm" ? "size-3.5" : "size-5",
          )}
        />
      ))}
    </span>
  );
}
