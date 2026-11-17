import { cn } from "@/lib/utils";

/** Compact editorial page header used on interior pages. */
export function PageHero({
  eyebrow,
  title,
  children,
  className,
}: {
  eyebrow: string;
  title: React.ReactNode;
  children?: React.ReactNode;
  className?: string;
}) {
  return (
    <section className={cn("relative overflow-hidden border-b border-border bg-ice", className)}>
      <div
        aria-hidden
        className="pointer-events-none absolute -top-24 -right-24 size-[28rem] rounded-full border-[56px] border-arctic/[0.06]"
      />
      <div className="container-page relative py-14 sm:py-20">
        <p className="eyebrow mb-4 text-arctic">{eyebrow}</p>
        <h1 className="display max-w-4xl text-5xl text-navy sm:text-7xl lg:text-8xl">{title}</h1>
        {children && <div className="mt-5 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">{children}</div>}
      </div>
    </section>
  );
}
