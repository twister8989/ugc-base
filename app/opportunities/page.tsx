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
    <div className="p-8 max-w-5xl">
      {/* Header */}
      <div className="mb-6">
        <Badge className="mb-3 bg-violet-50 text-violet-700 border-0">
          Feed-first MVP
        </Badge>
        <h1 className="text-2xl font-bold text-gray-900">
          Today&apos;s UGC briefs
        </h1>
        <p className="text-gray-500 mt-1">
          {opportunities.length} open gigs across {sourceCount} platforms.
          Filter by niche, pay attention to posting requirements, and save the
          briefs worth applying to.
        </p>
      </div>

      <div className="grid grid-cols-3 gap-3 mb-6">
        <div className="rounded-2xl border border-gray-100 bg-white p-4">
          <p className="text-xs font-medium uppercase tracking-wide text-gray-400">
            New today
          </p>
          <p className="mt-1 text-2xl font-bold text-gray-900">{newCount}</p>
        </div>
        <div className="rounded-2xl border border-gray-100 bg-white p-4">
          <p className="text-xs font-medium uppercase tracking-wide text-gray-400">
            Paid briefs
          </p>
          <p className="mt-1 text-2xl font-bold text-gray-900">{paidCount}</p>
        </div>
        <div className="rounded-2xl border border-gray-100 bg-white p-4">
          <p className="text-xs font-medium uppercase tracking-wide text-gray-400">
            Your niches
          </p>
          <p className="mt-1 truncate text-2xl font-bold text-gray-900">
            {profileNiches.length || "All"}
          </p>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-3 mb-6">
        <div className="relative flex-1 min-w-48">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <Input
            placeholder="Search brands, gigs..."
            className="pl-9 bg-white border-gray-200"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <Select value={nicheFilter} onValueChange={(v) => setNicheFilter(v ?? "all")}>
          <SelectTrigger className="w-44 bg-white border-gray-200">
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
          <SelectTrigger className="w-44 bg-white border-gray-200">
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
          <SelectTrigger className="w-36 bg-white border-gray-200">
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
              ? "bg-violet-600 hover:bg-violet-700"
              : "border-gray-200 bg-white"
          }
          onClick={() => setShowSaved(!showSaved)}
        >
          <Bookmark className="w-3.5 h-3.5 mr-1.5" />
          Saved
        </Button>
      </div>

      {/* Results count */}
      <p className="text-sm text-gray-500 mb-4">
        {filtered.length} opportunities
        {filtered.filter((o) => o.isNew).length > 0 && (
          <span className="ml-2 text-violet-600 font-medium">
            · {filtered.filter((o) => o.isNew).length} new today
          </span>
        )}
      </p>

      {/* Cards */}
      <div className="space-y-3">
        {filtered.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-2xl border border-gray-100">
            <p className="text-gray-400 mb-2">No opportunities match your filters.</p>
            <Button
              variant="link"
              className="text-violet-600"
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
    <div className="bg-white rounded-2xl border border-gray-100 p-5 hover:border-violet-200 hover:shadow-sm transition-all">
      <div className="flex items-start gap-4">
        {/* Platform badge */}
        <div className="w-10 h-10 rounded-xl bg-violet-50 flex items-center justify-center shrink-0 text-xs font-bold text-violet-700">
          {opp.platformName.slice(0, 2).toUpperCase()}
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-3">
            <div className="min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xs font-medium text-gray-500">
                  {opp.platformName}
                </span>
                {opp.isNew && (
                  <Badge className="text-[10px] bg-green-50 text-green-700 border-0 h-4 px-1.5">
                    New
                  </Badge>
                )}
                {opp.spotsLeft && opp.spotsLeft <= 5 && (
                  <Badge className="text-[10px] bg-red-50 text-red-600 border-0 h-4 px-1.5">
                    {opp.spotsLeft} spots left
                  </Badge>
                )}
                {opp.requiresPosting && (
                  <Badge className="text-[10px] bg-orange-50 text-orange-600 border-0 h-4 px-1.5">
                    Posting required
                  </Badge>
                )}
                {opp.country && (
                  <Badge className="text-[10px] bg-blue-50 text-blue-700 border-0 h-4 px-1.5">
                    {opp.country}
                  </Badge>
                )}
              </div>
              <h3 className="font-semibold text-gray-900">{opp.brand}</h3>
              <p className="text-sm text-gray-600 mt-0.5">{opp.title}</p>
            </div>

            <div className="text-right shrink-0">
              <div className="text-lg font-bold text-green-600">
                {opp.payDisplay}
              </div>
              <div className="text-xs text-gray-400 mt-0.5">
                {opp.contentType === "video"
                  ? "📹 Video"
                  : opp.contentType === "photo"
                  ? "📸 Photo"
                  : "🎬 Video + Photo"}
              </div>
            </div>
          </div>

          <p className="text-sm text-gray-500 mt-2 leading-relaxed line-clamp-2">
            {opp.description}
          </p>

          {/* Deliverables */}
          <div className="flex flex-wrap gap-1.5 mt-3">
            {opp.deliverables.map((d) => (
              <Badge
                key={d}
                variant="secondary"
                className="text-xs bg-gray-50 text-gray-600 border-0"
              >
                {d}
              </Badge>
            ))}
            {opp.niches.slice(0, 2).map((n) => (
              <Badge
                key={n}
                variant="secondary"
                className="text-xs bg-violet-50 text-violet-700 border-0"
              >
                {nicheLookup[n]?.emoji} {nicheLookup[n]?.label ?? n}
              </Badge>
            ))}
            {opp.sourceType && (
              <Badge
                variant="secondary"
                className="text-xs bg-gray-100 text-gray-500 border-0"
              >
                Source: {opp.sourceType}
              </Badge>
            )}
            {opp.followerRequirement && (
              <Badge
                variant="secondary"
                className="text-xs bg-gray-100 text-gray-500 border-0"
              >
                {opp.followerRequirement}
              </Badge>
            )}
          </div>

          {/* Footer */}
          <div className="flex items-center justify-between mt-4">
            <div className="flex items-center gap-3 text-xs text-gray-400">
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
                  <BookmarkCheck className="w-4 h-4 text-violet-600" />
                ) : (
                  <Bookmark className="w-4 h-4 text-gray-400" />
                )}
              </button>
              <a
                href={opp.applyUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button
                  size="sm"
                  className="bg-violet-600 hover:bg-violet-700 gap-1.5 h-8 text-xs"
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
