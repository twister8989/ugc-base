"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DollarSign,
  Search,
  LayoutGrid,
  TrendingUp,
  ChevronRight,
  Zap,
  Clock,
} from "lucide-react";
import { getIncomeEntries, getProfile, IncomeEntry, UserProfile } from "@/lib/store";
import { opportunities } from "@/lib/opportunities-data";
import { platforms } from "@/lib/platforms-data";
import { format } from "date-fns";

export default function DashboardPage() {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [entries, setEntries] = useState<IncomeEntry[]>([]);

  useEffect(() => {
    setProfile(getProfile());
    setEntries(getIncomeEntries());
  }, []);

  const now = new Date();
  const thisMonth = entries.filter((e) => {
    const d = new Date(e.date);
    return d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear();
  });
  const monthTotal = thisMonth.reduce((sum, e) => sum + e.amount, 0);
  const allTimeTotal = entries.reduce((sum, e) => sum + e.amount, 0);
  const pendingTotal = entries
    .filter((e) => e.status === "pending")
    .reduce((sum, e) => sum + e.amount, 0);

  // Filter opportunities to user's niches
  const userNiches = profile?.niches ?? [];
  const matchedOpps = opportunities.filter(
    (o) => userNiches.length === 0 || o.niches.some((n) => userNiches.includes(n))
  );
  const newOpps = matchedOpps.filter((o) => o.isNew).slice(0, 3);

  const platformsJoined = profile?.platforms?.length ?? 0;
  const recentEntries = [...entries]
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 4);

  return (
    <div className="p-8 max-w-5xl">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">
          {profile?.name ? `Hey, ${profile.name.split(" ")[0]} 👋` : "Welcome to UGC Base 👋"}
        </h1>
        <p className="text-gray-500 mt-1">Here&apos;s what&apos;s happening with your UGC business.</p>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-4 gap-4 mb-8">
        <Card className="border-0 shadow-sm">
          <CardContent className="p-5">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs text-gray-500 font-medium uppercase tracking-wide">This month</span>
              <div className="w-7 h-7 bg-green-50 rounded-lg flex items-center justify-center">
                <DollarSign className="w-3.5 h-3.5 text-green-600" />
              </div>
            </div>
            <div className="text-2xl font-bold text-gray-900">${monthTotal.toLocaleString()}</div>
            <div className="text-xs text-gray-400 mt-1">{thisMonth.length} deals</div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-sm">
          <CardContent className="p-5">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs text-gray-500 font-medium uppercase tracking-wide">All time</span>
              <div className="w-7 h-7 bg-violet-50 rounded-lg flex items-center justify-center">
                <TrendingUp className="w-3.5 h-3.5 text-violet-600" />
              </div>
            </div>
            <div className="text-2xl font-bold text-gray-900">${allTimeTotal.toLocaleString()}</div>
            <div className="text-xs text-gray-400 mt-1">{entries.length} total entries</div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-sm">
          <CardContent className="p-5">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs text-gray-500 font-medium uppercase tracking-wide">Pending</span>
              <div className="w-7 h-7 bg-orange-50 rounded-lg flex items-center justify-center">
                <Clock className="w-3.5 h-3.5 text-orange-500" />
              </div>
            </div>
            <div className="text-2xl font-bold text-gray-900">${pendingTotal.toLocaleString()}</div>
            <div className="text-xs text-gray-400 mt-1">awaiting payment</div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-sm">
          <CardContent className="p-5">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs text-gray-500 font-medium uppercase tracking-wide">Platforms</span>
              <div className="w-7 h-7 bg-blue-50 rounded-lg flex items-center justify-center">
                <LayoutGrid className="w-3.5 h-3.5 text-blue-600" />
              </div>
            </div>
            <div className="text-2xl font-bold text-gray-900">{platformsJoined}</div>
            <div className="text-xs text-gray-400 mt-1">of {platforms.length} available</div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-2 gap-6">
        {/* New opportunities */}
        <Card className="border-0 shadow-sm">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-semibold text-gray-900 flex items-center gap-2">
                <Search className="w-4 h-4 text-violet-600" />
                New opportunities
              </CardTitle>
              <Link href="/opportunities">
                <Button variant="ghost" size="sm" className="text-xs text-violet-600 hover:text-violet-700 h-7 px-2">
                  View all <ChevronRight className="w-3 h-3 ml-0.5" />
                </Button>
              </Link>
            </div>
          </CardHeader>
          <CardContent className="space-y-3">
            {newOpps.length === 0 ? (
              <div className="text-center py-6">
                <p className="text-sm text-gray-400">No opportunities yet.</p>
                <Link href="/onboarding">
                  <Button variant="link" className="text-xs text-violet-600 mt-1 h-auto p-0">
                    Set your niche →
                  </Button>
                </Link>
              </div>
            ) : (
              newOpps.map((opp) => (
                <a
                  key={opp.id}
                  href={opp.applyUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block p-3 rounded-xl bg-gray-50 hover:bg-violet-50 transition-colors group"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-0.5">
                        <span className="text-xs font-medium text-gray-500">{opp.platformName}</span>
                        <Badge className="text-[10px] bg-green-50 text-green-700 border-0 h-4 px-1.5">New</Badge>
                      </div>
                      <p className="text-sm font-medium text-gray-800 truncate">{opp.brand}</p>
                      <p className="text-xs text-gray-500 truncate">{opp.title}</p>
                    </div>
                    <span className="text-sm font-semibold text-green-600 ml-3 shrink-0">{opp.payDisplay}</span>
                  </div>
                </a>
              ))
            )}
          </CardContent>
        </Card>

        {/* Recent income */}
        <Card className="border-0 shadow-sm">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-semibold text-gray-900 flex items-center gap-2">
                <DollarSign className="w-4 h-4 text-green-600" />
                Recent income
              </CardTitle>
              <Link href="/income">
                <Button variant="ghost" size="sm" className="text-xs text-violet-600 hover:text-violet-700 h-7 px-2">
                  View all <ChevronRight className="w-3 h-3 ml-0.5" />
                </Button>
              </Link>
            </div>
          </CardHeader>
          <CardContent className="space-y-3">
            {recentEntries.length === 0 ? (
              <div className="text-center py-6">
                <p className="text-sm text-gray-400 mb-2">No income logged yet.</p>
                <Link href="/income">
                  <Button size="sm" className="bg-violet-600 hover:bg-violet-700 text-xs h-8">
                    Log your first deal
                  </Button>
                </Link>
              </div>
            ) : (
              recentEntries.map((entry) => (
                <div key={entry.id} className="flex items-center justify-between p-3 rounded-xl bg-gray-50">
                  <div>
                    <p className="text-sm font-medium text-gray-800">{entry.brand}</p>
                    <p className="text-xs text-gray-500">{entry.platformName} · {format(new Date(entry.date), "MMM d")}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-semibold text-gray-900">${entry.amount}</p>
                    <Badge
                      variant="secondary"
                      className={`text-[10px] h-4 px-1.5 ${
                        entry.status === "received"
                          ? "bg-green-50 text-green-700"
                          : "bg-orange-50 text-orange-600"
                      }`}
                    >
                      {entry.status}
                    </Badge>
                  </div>
                </div>
              ))
            )}
          </CardContent>
        </Card>
      </div>

      {/* Platform progress */}
      {platformsJoined < platforms.length && (
        <Card className="border-0 shadow-sm mt-6">
          <CardContent className="p-5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-violet-50 rounded-xl flex items-center justify-center">
                  <Zap className="w-5 h-5 text-violet-600" />
                </div>
                <div>
                  <p className="font-medium text-gray-900 text-sm">You&apos;re on {platformsJoined} of {platforms.length} platforms</p>
                  <p className="text-xs text-gray-500 mt-0.5">
                    More platforms = more income. Explore the ones you&apos;re missing.
                  </p>
                </div>
              </div>
              <Link href="/platforms">
                <Button size="sm" className="bg-violet-600 hover:bg-violet-700 gap-1">
                  Explore platforms <ChevronRight className="w-3.5 h-3.5" />
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
