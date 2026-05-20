import Link from "next/link";
import { cn } from "@/lib/utils";

export function LogoMark({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "relative h-9 w-9 overflow-hidden rounded-[13px] bg-[#12745f] shadow-[inset_0_-10px_18px_rgba(0,0,0,0.08)]",
        className
      )}
    >
      <div className="absolute -right-2 -top-2 h-5 w-5 rounded-full bg-[#18a17f]/60" />
      <div className="absolute bottom-2 right-2 h-2 w-2 rounded-full bg-white/18" />
    </div>
  );
}

export function Wordmark({ href = "/" }: { href?: string }) {
  return (
    <Link href={href} className="flex items-center gap-3">
      <LogoMark />
      <span className="text-xl font-semibold tracking-tight">
        <span className="text-[#111111]">UGC</span>
        <span className="mx-2 text-gray-300"> </span>
        <span className="text-[#0c8068]">HQ</span>
      </span>
    </Link>
  );
}
