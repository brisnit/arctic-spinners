import { cn } from "@/lib/utils";

export function SectionHeading({
  eyebrow,
  title,
  children,
  className,
  align = "left",
  as: Tag = "h2",
}: {
  eyebrow?: string;
  title: React.ReactNode;
  children?: React.ReactNode;
  className?: string;
  align?: "left" | "center";
  as?: "h1" | "h2";
}) {
  return (
    <div className={cn("max-w-3xl", align === "center" && "mx-auto text-center", className)}>
      {eyebrow && <p className="eyebrow mb-3 text-arctic">{eyebrow}</p>}
      <Tag className="display text-[2.5rem] text-navy sm:text-5xl lg:text-6xl">{title}</Tag>
      {children && <div className="mt-4 text-base leading-relaxed text-muted-foreground sm:text-lg">{children}</div>}
    </div>
  );
}
