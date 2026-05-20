"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  Zap,
  LayoutDashboard,
  Search,
  LayoutGrid,
  DollarSign,
} from "lucide-react";

const navItems = [
  { href: "/dashboard", icon: LayoutDashboard, label: "Dashboard" },
  { href: "/opportunities", icon: Search, label: "Opportunities" },
  { href: "/platforms", icon: LayoutGrid, label: "Platforms" },
  { href: "/income", icon: DollarSign, label: "Income" },
];

export function Nav() {
  const pathname = usePathname();

  return (
    <aside className="w-60 shrink-0 border-r border-gray-100 bg-white flex flex-col h-screen sticky top-0">
      {/* Logo */}
      <div className="px-5 py-5 border-b border-gray-100">
        <Link href="/" className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-violet-600 flex items-center justify-center">
            <Zap className="w-4 h-4 text-white" />
          </div>
          <span className="font-bold text-gray-900">UGC Base</span>
        </Link>
      </div>

      {/* Nav links */}
      <nav className="flex-1 px-3 py-4 space-y-1">
        {navItems.map(({ href, icon: Icon, label }) => {
          const active = pathname === href || pathname.startsWith(href + "/");
          return (
            <Link
              key={href}
              href={href}
              className={cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors",
                active
                  ? "bg-violet-50 text-violet-700"
                  : "text-gray-500 hover:bg-gray-50 hover:text-gray-900"
              )}
            >
              <Icon
                className={cn(
                  "w-4 h-4",
                  active ? "text-violet-600" : "text-gray-400"
                )}
              />
              {label}
            </Link>
          );
        })}
      </nav>

      {/* Pro badge */}
      <div className="mx-3 mb-4 p-3 rounded-xl bg-violet-50 border border-violet-100">
        <p className="text-xs font-semibold text-violet-700 mb-1">
          ✨ Upgrade to Pro
        </p>
        <p className="text-xs text-violet-500 mb-2">
          Unlimited history, AI tools & tax reports
        </p>
        <button className="w-full text-xs bg-violet-600 text-white rounded-lg py-1.5 font-medium hover:bg-violet-700 transition-colors">
          $14/mo — Try free
        </button>
      </div>
    </aside>
  );
}
