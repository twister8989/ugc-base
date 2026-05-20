"use client";

import { useEffect, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Search,
  Bookmark,
  BookmarkCheck,
  ExternalLink,
  Clock,
  Users,
  SlidersHorizontal,
  Sparkles,
} from "lucide-react";
import {
  opportunities,
  Opportunity,
} from "@/lib/opportunities-data";
import { niches, Niche } from "@/lib/platforms-data";
import {
  getSavedOpportunities,
  toggleSavedOpportunity,
  getProfile,
} from "@/lib/store";
import { formatDistanceToNow } from "date-fns";

export default function OpportunitiesPage() {
  const [search, setSearch] = useState("");
  const [nicheFilter, setNicheFilter] = useState<string>("all");
  const [platformFilter, setPlatformFilter] = useState<string>("all");
  const [typeFilter, setTypeFilter] = useState<string>("all");
  const [showSaved, setShowSaved] = useState(false);
  const [saved, setSaved] = useState<string[]>([]);
  const [profileNiches, setProfileNiches] = useState<Niche[]>([]);

  useEffect(() => {
    setSaved(getSavedOpportunities());
    const profile = getProfile();
    setProfileNiches(profile?.niches ?? []);
    if (profile?.niches?.length) {
      setNicheFilter(profile.niches[0]);
    }
  }, []);

  const handleSave = (id: string) => {
    toggleSavedOpportunity(id);
    setSaved(getSavedOpportunities());
  };

  const platformNames = Array.from(
    new Set(opportunities.map((o) => o.platformName))
  ).sort();
  const newCount = opportunities.filter((o) => o.isNew).length;
  const sourceCount = new Set(opportunities.map((o) => o.platformId)).size;
  const paidCount = opportunities.filter((o) => !o.giftedOnly).length;

  const filtered = opportunities.filter((opp) => {
    if (showSaved && !saved.includes(opp.id)) return false;
    if (nicheFilter !== "all" && !opp.niches.includes(nicheFilter as Niche))
      return false;
    if (platformFilter !== "all" && opp.platformId !== platformFilter.toLowerCase().replace(" ", "-"))
      return false;
    if (typeFilter !== "all" && opp.contentType !== typeFilter) return false;
    if (
      search &&
      !opp.brand.toLowerCase().includes(search.toLowerCase()) &&
      !opp.title.toLowerCase().includes(search.toLowerCase()) &&
      !opp.description.toLowerCase().includes(search.toLowerCase())
    )
      return false;
    return true;
  });

  return (
    <div className="min-h-screen bg-[#fbfaf6] p-6 lg:p-8">
      <div className="max-w-6xl">
        <div className="mb-6 rounded-[32px] bg-[#10231e] p-6 text-white shadow-[0_20px_70px_rgba(16,35,30,0.18)]">
          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <div>
              <Badge className="mb-4 rounded-full bg-[#36d5aa]/15 text-[#36d5aa]">
                <Sparkles className="mr-1.5 h-3.5 w-3.5" />
                Feed-first MVP
              </Badge>
              <h1 className="text-4xl font-semibold tracking-tight">
                Today&apos;s UGC briefs
              </h1>
              <p className="mt-3 max-w-2xl text-sm leading-6 text-white/62">
                {opportunities.length} open gigs across {sourceCount} platforms.
                Filter by niche, check posting requirements, and save the briefs
                worth applying to.
              </p>
            </div>
            <div className="grid grid-cols-3 gap-2 md:min-w-80">
              <StatPill label="New" value={newCount} />
              <StatPill label="Paid" value={paidCount} />
              <StatPill label="Niches" value={profileNiches.length || "All"} />
            </div>
          </div>
        </div>

      <div className="mb-6 flex flex-wrap gap-3 rounded-[28px] border border-[#e8e5dd] bg-white p-3 shadow-sm">
        <div className="relative flex-1 min-w-48">
          <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[#8a918d]" />
          <Input
            placeholder="Search brands, gigs..."
            className="h-11 rounded-2xl border-[#e4e0d8] bg-[#fbfaf6] pl-10"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <Select value={nicheFilter} onValueChange={(v) => setNicheFilter(v ?? "all")}>
          <SelectTrigger className="h-11 w-44 rounded-2xl border-[#e4e0d8] bg-[#fbfaf6]">
            <SelectValue placeholder="All niches" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All niches</SelectItem>
            {niches.map((n) => (
              <SelectItem key={n.value} value={n.value}>
                {n.emoji} {n.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select value={platformFilter} onValueChange={(v) => setPlatformFilter(v ?? "all")}>
          <SelectTrigger className="h-11 w-44 rounded-2xl border-[#e4e0d8] bg-[#fbfaf6]">
            <SelectValue placeholder="All platforms" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All platforms</SelectItem>
            {platformNames.map((p) => (
              <SelectItem key={p} value={p}>
                {p}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select value={typeFilter} onValueChange={(v) => setTypeFilter(v ?? "all")}>
          <SelectTrigger className="h-11 w-36 rounded-2xl border-[#e4e0d8] bg-[#fbfaf6]">
            <SelectValue placeholder="Type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All types</SelectItem>
            <SelectItem value="video">📹 Video</SelectItem>
            <SelectItem value="photo">📸 Photo</SelectItem>
            <SelectItem value="both">🎬 Both</SelectItem>
          </SelectContent>
        </Select>

        <Button
          variant={showSaved ? "default" : "outline"}
          size="sm"
          className={
            showSaved
              ? "h-11 rounded-2xl bg-[#12745f] hover:bg-[#0f604f]"
              : "h-11 rounded-2xl border-[#e4e0d8] bg-[#fbfaf6]"
          }
          onClick={() => setShowSaved(!showSaved)}
        >
          <Bookmark className="w-3.5 h-3.5 mr-1.5" />
          Saved
        </Button>
      </div>

      {/* Results count */}
      <p className="mb-4 flex items-center gap-2 text-sm text-[#66706b]">
        <SlidersHorizontal className="h-4 w-4" />
        {filtered.length} opportunities
        {filtered.filter((o) => o.isNew).length > 0 && (
          <span className="text-[#12745f] font-medium">
            · {filtered.filter((o) => o.isNew).length} new today
          </span>
        )}
      </p>

      <div className="space-y-3">
        {filtered.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-[28px] border border-[#e8e5dd]">
            <p className="text-gray-400 mb-2">No opportunities match your filters.</p>
            <Button
              variant="link"
              className="text-[#12745f]"
              onClick={() => {
                setSearch("");
                setNicheFilter("all");
                setPlatformFilter("all");
                setTypeFilter("all");
                setShowSaved(false);
              }}
            >
              Clear filters
            </Button>
          </div>
        ) : (
          filtered.map((opp) => (
            <OpportunityCard
              key={opp.id}
              opp={opp}
              saved={saved.includes(opp.id)}
              onSave={() => handleSave(opp.id)}
            />
          ))
        )}
      </div>
      </div>
    </div>
  );
}

function StatPill({ label, value }: { label: string; value: number | string }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.06] p-3">
      <p className="text-[11px] font-medium uppercase tracking-wide text-white/45">
        {label}
      </p>
      <p className="mt-1 text-2xl font-semibold text-white">{value}</p>
    </div>
  );
}

function OpportunityCard({
  opp,
  saved,
  onSave,
}: {
  opp: Opportunity;
  saved: boolean;
  onSave: () => void;
}) {
  const nicheLookup = niches.reduce(
    (acc, n) => ({ ...acc, [n.value]: n }),
    {} as Record<string, (typeof niches)[0]>
  );

  return (
    <div className="group rounded-[28px] border border-[#e8e5dd] bg-white p-5 shadow-sm transition-all hover:-translate-y-0.5 hover:border-[#b7ded1] hover:shadow-[0_18px_50px_rgba(30,25,18,0.08)]">
      <div className="flex items-start gap-4">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-[18px] bg-[#e5f6f0] text-xs font-bold text-[#12745f]">
          {opp.platformName.slice(0, 2).toUpperCase()}
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-3">
            <div className="min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xs font-semibold uppercase tracking-wide text-[#8a918d]">
                  {opp.platformName}
                </span>
                {opp.isNew && (
                  <Badge className="h-5 rounded-full border-0 bg-[#e5f6f0] px-2 text-[10px] text-[#12745f]">
                    New
                  </Badge>
                )}
                {opp.spotsLeft && opp.spotsLeft <= 5 && (
                  <Badge className="h-5 rounded-full border-0 bg-red-50 px-2 text-[10px] text-red-600">
                    {opp.spotsLeft} spots left
                  </Badge>
                )}
                {opp.requiresPosting && (
                  <Badge className="h-5 rounded-full border-0 bg-orange-50 px-2 text-[10px] text-orange-600">
                    Posting required
                  </Badge>
                )}
                {opp.country && (
                  <Badge className="h-5 rounded-full border-0 bg-[#eff3f1] px-2 text-[10px] text-[#56615c]">
                    {opp.country}
                  </Badge>
                )}
              </div>
              <h3 className="text-lg font-semibold tracking-tight text-[#111111]">
                {opp.brand}
              </h3>
              <p className="mt-0.5 text-sm text-[#56615c]">{opp.title}</p>
            </div>

            <div className="text-right shrink-0">
              <div className="rounded-2xl bg-[#10231e] px-3 py-2 text-lg font-bold text-[#36d5aa]">
                {opp.payDisplay}
              </div>
              <div className="mt-1.5 text-xs text-[#8a918d]">
                {opp.contentType === "video"
                  ? "📹 Video"
                  : opp.contentType === "photo"
                  ? "📸 Photo"
                  : "🎬 Video + Photo"}
              </div>
            </div>
          </div>

          <p className="mt-3 line-clamp-2 text-sm leading-6 text-[#66706b]">
            {opp.description}
          </p>

          <div className="flex flex-wrap gap-1.5 mt-3">
            {opp.deliverables.map((d) => (
              <Badge
                key={d}
                variant="secondary"
                className="rounded-full border-0 bg-[#f1eee7] text-xs text-[#5e625f]"
              >
                {d}
              </Badge>
            ))}
            {opp.niches.slice(0, 2).map((n) => (
              <Badge
                key={n}
                variant="secondary"
                className="rounded-full border-0 bg-[#e5f6f0] text-xs text-[#12745f]"
              >
                {nicheLookup[n]?.emoji} {nicheLookup[n]?.label ?? n}
              </Badge>
            ))}
            {opp.sourceType && (
              <Badge
                variant="secondary"
                className="rounded-full border-0 bg-[#eff3f1] text-xs text-[#68736e]"
              >
                Source: {opp.sourceType}
              </Badge>
            )}
            {opp.followerRequirement && (
              <Badge
                variant="secondary"
                className="rounded-full border-0 bg-[#eff3f1] text-xs text-[#68736e]"
              >
                {opp.followerRequirement}
              </Badge>
            )}
          </div>

          <div className="flex items-center justify-between mt-4">
            <div className="flex items-center gap-3 text-xs text-[#8a918d]">
              <span className="flex items-center gap-1">
                <Clock className="w-3 h-3" />
                Posted{" "}
                {formatDistanceToNow(new Date(opp.postedAt), {
                  addSuffix: true,
                })}
              </span>
              {opp.deadline && (
                <span>
                  · Due {new Date(opp.deadline).toLocaleDateString("en-US", { month: "short", day: "numeric" })}
                </span>
              )}
              {opp.spotsLeft && (
                <span className="flex items-center gap-1">
                  <Users className="w-3 h-3" />
                  {opp.spotsLeft} spots
                </span>
              )}
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={onSave}
                className="p-1.5 rounded-lg hover:bg-gray-100 transition-colors"
                title={saved ? "Unsave" : "Save"}
              >
                {saved ? (
                  <BookmarkCheck className="w-4 h-4 text-[#12745f]" />
                ) : (
                  <Bookmark className="w-4 h-4 text-[#8a918d]" />
                )}
              </button>
              <a
                href={opp.applyUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button
                  size="sm"
                  className="h-9 gap-1.5 rounded-full bg-[#12745f] px-4 text-xs hover:bg-[#0f604f]"
                >
                  Apply <ExternalLink className="w-3 h-3" />
                </Button>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
