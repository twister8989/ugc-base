"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Wordmark } from "@/components/logo";
import {
  Search,
  LayoutGrid,
  Bookmark,
  User,
  Bell,
} from "lucide-react";

const navItems = [
  { href: "/opportunities", icon: Search, label: "Opportunities" },
  { href: "/platforms", icon: LayoutGrid, label: "Platforms" },
  { href: "/saved", icon: Bookmark, label: "Saved" },
  { href: "/profile", icon: User, label: "Profile" },
];

export function Nav() {
  const pathname = usePathname();

  return (
    <aside className="sticky top-0 flex h-screen w-64 shrink-0 flex-col border-r border-[#e8e5dd] bg-[#fbfaf6]">
      <div className="px-5 py-5">
        <Wordmark />
      </div>

      <nav className="flex-1 px-3 py-4 space-y-1">
        {navItems.map(({ href, icon: Icon, label }) => {
          const active = pathname === href || pathname.startsWith(href + "/");
          return (
            <Link
              key={href}
              href={href}
              className={cn(
                "flex items-center gap-3 rounded-2xl px-3 py-2.5 text-sm font-medium transition-colors",
                active
                  ? "bg-[#10231e] text-white shadow-sm"
                  : "text-[#66706b] hover:bg-white hover:text-[#111111]"
              )}
            >
              <Icon
                className={cn(
                  "w-4 h-4",
                  active ? "text-[#36d5aa]" : "text-[#9aa29d]"
                )}
              />
              {label}
            </Link>
          );
        })}
      </nav>

      <div className="mx-3 mb-4 rounded-3xl border border-[#d8eee6] bg-white p-4 shadow-sm">
        <div className="mb-3 flex h-9 w-9 items-center justify-center rounded-2xl bg-[#e4f8f1]">
          <Bell className="h-4 w-4 text-[#12745f]" />
        </div>
        <p className="mb-1 text-sm font-semibold text-[#10231e]">
          Daily gig alerts
        </p>
        <p className="mb-3 text-xs leading-5 text-[#69746f]">
          Get fresh paid UGC gigs sent to your inbox every morning.
        </p>
        <button className="w-full rounded-2xl bg-[#12745f] py-2 text-xs font-semibold text-white transition-colors hover:bg-[#0f604f]">
          Join the waitlist
        </button>
      </div>
    </aside>
  );
}
