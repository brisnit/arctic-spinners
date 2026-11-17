import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";

export function Logo({ className, priority }: { className?: string; priority?: boolean }) {
  return (
    <Link
      href="/"
      aria-label="Arctic Spinners — home"
      className={cn("inline-flex shrink-0 items-center rounded-sm", className)}
    >
      <Image
        src="/images/brand/logo-2.png"
        alt="Arctic Spinners, since 1967"
        width={170}
        height={82}
        priority={priority}
        className="h-10 w-auto sm:h-11"
      />
    </Link>
  );
}

/** Text wordmark for dark surfaces where the full-color logo lacks contrast. */
export function Wordmark({ className }: { className?: string }) {
  return (
    <span className={cn("inline-flex flex-col leading-none", className)}>
      <span className="display text-3xl tracking-tight">Arctic Spinners</span>
      <span className="eyebrow mt-1 text-[0.65rem] text-electric">Since 1967</span>
    </span>
  );
}
