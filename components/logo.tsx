import Link from "next/link";
import { cn } from "@/lib/utils";

export function LogoMark({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "relative flex h-9 w-9 items-center justify-center overflow-hidden rounded-[13px] bg-[#12745f] shadow-[inset_0_-10px_18px_rgba(0,0,0,0.08)]",
        className
      )}
    >
      <span className="relative z-10 text-[10px] font-black leading-none tracking-[-0.08em] text-white">
        UGC
      </span>
      <div className="absolute bottom-1 right-1 h-2 w-2 border-b-2 border-r-2 border-white/75" />
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
