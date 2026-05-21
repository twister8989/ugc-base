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
  Bookmark,
  BookmarkCheck,
  Clock,
  ExternalLink,
  Search,
  Users,
} from "lucide-react";
import { motion } from "framer-motion";
import { opportunities, Opportunity } from "@/lib/opportunities-data";
import { niches, Niche } from "@/lib/platforms-data";
import {
  getImportedOpportunities,
  getProfile,
  getSavedOpportunities,
  toggleSavedOpportunity,
} from "@/lib/store";
import { cn } from "@/lib/utils";
import { formatDistanceToNow } from "date-fns";

export default function OpportunitiesPage() {
  const [search, setSearch] = useState("");
  const [nicheFilter, setNicheFilter] = useState<string>("all");
  const [platformFilter, setPlatformFilter] = useState<string>("all");
  const [typeFilter, setTypeFilter] = useState<string>("all");
  const [showSaved, setShowSaved] = useState(false);
  const [saved, setSaved] = useState<string[]>([]);
  const [profileNiches, setProfileNiches] = useState<Niche[]>([]);
  const [allOpportunities, setAllOpportunities] = useState<Opportunity[]>(opportunities);

  useEffect(() => {
    setSaved(getSavedOpportunities());
    const profile = getProfile();
    setProfileNiches(profile?.niches ?? []);
    setAllOpportunities([...getImportedOpportunities(), ...opportunities]);
  }, []);

  const handleSave = (id: string) => {
    toggleSavedOpportunity(id);
    setSaved(getSavedOpportunities());
  };

  const platformNames = Array.from(
    new Set(allOpportunities.map((o) => o.platformName))
  ).sort();
  const newCount = allOpportunities.filter((o) => o.isNew).length;
  const sourceCount = new Set(allOpportunities.map((o) => o.platformId)).size;
  const paidCount = allOpportunities.filter((o) => !o.giftedOnly).length;

  const filtered = allOpportunities.filter((opp) => {
    if (showSaved && !saved.includes(opp.id)) return false;
    if (nicheFilter !== "all" && !opp.niches.includes(nicheFilter as Niche)) {
      return false;
    }
    if (
      platformFilter !== "all" &&
      opp.platformId !== platformFilter.toLowerCase().replace(" ", "-")
    ) {
      return false;
    }
    if (typeFilter !== "all" && opp.contentType !== typeFilter) return false;
    if (
      search &&
      !opp.brand.toLowerCase().includes(search.toLowerCase()) &&
      !opp.title.toLowerCase().includes(search.toLowerCase()) &&
      !opp.description.toLowerCase().includes(search.toLowerCase())
    ) {
      return false;
    }
    return true;
  });

  return (
    <div className="min-h-screen bg-[#fbfaf6] px-6 py-8 lg:px-10">
      <div className="max-w-6xl">
        <motion.header
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35 }}
          className="mb-10"
        >
          <div className="mb-4 text-sm font-semibold uppercase tracking-[0.18em] text-[#12745f]">
            Daily UGC job feed
          </div>
          <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-end">
            <div>
              <h1 className="text-6xl font-semibold leading-[0.92] tracking-[-0.055em] text-[#101410] md:text-7xl">
                Today&apos;s
                <br />
                UGC jobs
              </h1>
              <p className="mt-5 max-w-2xl text-base leading-7 text-[#56615c]">
                {allOpportunities.length} paid UGC jobs across {sourceCount} platforms.
                Filter by niche, save the jobs that fit, then click through to
                apply on the original platform.
              </p>
            </div>

            <div className="grid min-w-72 grid-cols-3 border-y border-[#d9d3c8] text-center">
              <Stat label="New" value={newCount} />
              <Stat label="Paid" value={paidCount} />
              <Stat label="Niches" value={profileNiches.length || "All"} />
            </div>
          </div>
        </motion.header>

        <div className="mb-8 border-y border-[#d9d3c8] py-4">
          {profileNiches.length > 0 && (
            <div className="mb-4 flex flex-wrap items-center gap-2 text-sm">
              <span className="mr-1 text-[#68736e]">Your categories:</span>
              {profileNiches.map((niche) => {
                const details = niches.find((item) => item.value === niche);
                const active = nicheFilter === niche;
                return (
                  <button
                    key={niche}
                    onClick={() => setNicheFilter(active ? "all" : niche)}
                    className={cn(
                      "border px-2.5 py-1 text-xs font-medium transition-colors",
                      active
                        ? "border-[#12745f] bg-[#12745f] text-white"
                        : "border-[#d9d3c8] text-[#56615c] hover:border-[#12745f] hover:text-[#12745f]"
                    )}
                  >
                    {details?.emoji} {details?.label ?? niche}
                  </button>
                );
              })}
            </div>
          )}
          <div className="flex flex-wrap gap-3">
            <div className="relative min-w-60 flex-1">
              <Search className="absolute left-0 top-1/2 h-4 w-4 -translate-y-1/2 text-[#8a918d]" />
              <Input
                placeholder="Search brand, job, platform..."
                className="h-11 rounded-none border-0 border-b border-[#d9d3c8] bg-transparent pl-7 shadow-none focus-visible:ring-0"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>

            <Select
              value={nicheFilter}
              onValueChange={(v) => setNicheFilter(v ?? "all")}
            >
              <SelectTrigger className="h-11 w-44 rounded-none border-0 border-b border-[#d9d3c8] bg-transparent shadow-none">
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

            <Select
              value={platformFilter}
              onValueChange={(v) => setPlatformFilter(v ?? "all")}
            >
              <SelectTrigger className="h-11 w-44 rounded-none border-0 border-b border-[#d9d3c8] bg-transparent shadow-none">
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

            <Select
              value={typeFilter}
              onValueChange={(v) => setTypeFilter(v ?? "all")}
            >
              <SelectTrigger className="h-11 w-36 rounded-none border-0 border-b border-[#d9d3c8] bg-transparent shadow-none">
                <SelectValue placeholder="Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All types</SelectItem>
                <SelectItem value="video">Video</SelectItem>
                <SelectItem value="photo">Photo</SelectItem>
                <SelectItem value="both">Both</SelectItem>
              </SelectContent>
            </Select>

            <Button
              variant={showSaved ? "default" : "outline"}
              className={
                showSaved
                  ? "h-11 rounded-none bg-[#12745f] hover:bg-[#0f604f]"
                  : "h-11 rounded-none border-[#111111] bg-transparent hover:bg-[#111111] hover:text-white"
              }
              onClick={() => setShowSaved(!showSaved)}
            >
              <Bookmark className="mr-2 h-4 w-4" />
              Saved
            </Button>
          </div>
        </div>

        <div className="mb-3 flex items-center justify-between text-sm text-[#68736e]">
          <span>{filtered.length} matching opportunities</span>
          {filtered.filter((o) => o.isNew).length > 0 && (
            <span className="font-semibold text-[#12745f]">
              {filtered.filter((o) => o.isNew).length} new today
            </span>
          )}
        </div>

        <div className="divide-y divide-[#d9d3c8] border-y border-[#d9d3c8]">
          {filtered.length === 0 ? (
            <div className="py-20 text-center">
              <p className="mb-3 text-[#68736e]">
                No opportunities match your filters.
              </p>
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
            filtered.map((opp, index) => (
              <OpportunityRow
                key={opp.id}
                opp={opp}
                index={index}
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

function Stat({ label, value }: { label: string; value: number | string }) {
  return (
    <div className="border-r border-[#d9d3c8] px-5 py-4 last:border-r-0">
      <p className="text-3xl font-semibold tracking-tight">{value}</p>
      <p className="mt-1 text-xs uppercase tracking-[0.18em] text-[#7a837f]">
        {label}
      </p>
    </div>
  );
}

function OpportunityRow({
  opp,
  index,
  saved,
  onSave,
}: {
  opp: Opportunity;
  index: number;
  saved: boolean;
  onSave: () => void;
}) {
  const nicheLookup = niches.reduce(
    (acc, n) => ({ ...acc, [n.value]: n }),
    {} as Record<string, (typeof niches)[0]>
  );

  return (
    <motion.article
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.28, delay: Math.min(index * 0.025, 0.18) }}
      className="grid gap-5 py-6 transition-colors hover:bg-white/65 md:grid-cols-[150px_1fr_140px]"
    >
      <div>
        <p className="text-sm font-semibold text-[#101410]">
          {opp.platformName}
        </p>
        <div className="mt-2 flex flex-wrap gap-1.5">
          {opp.isNew && (
            <Badge className="rounded-none border-0 bg-[#e5f6f0] text-[#12745f]">
              New
            </Badge>
          )}
          {opp.requiresPosting && (
            <Badge className="rounded-none border-0 bg-orange-50 text-orange-700">
              Posting required
            </Badge>
          )}
          {opp.country && (
            <Badge className="rounded-none border-0 bg-[#efede7] text-[#56615c]">
              {opp.country}
            </Badge>
          )}
        </div>
      </div>

      <div className="min-w-0">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h2 className="text-2xl font-semibold tracking-[-0.025em] text-[#101410]">
              {opp.brand}
            </h2>
            <p className="mt-1 text-base text-[#56615c]">{opp.title}</p>
          </div>
          <button
            onClick={onSave}
            className="mt-1 text-[#7a837f] transition-colors hover:text-[#12745f]"
            title={saved ? "Unsave" : "Save"}
          >
            {saved ? (
              <BookmarkCheck className="h-5 w-5 text-[#12745f]" />
            ) : (
              <Bookmark className="h-5 w-5" />
            )}
          </button>
        </div>

        <p className="mt-3 max-w-3xl text-sm leading-6 text-[#68736e]">
          {opp.description}
        </p>

        <div className="mt-4 flex flex-wrap gap-x-4 gap-y-2 text-xs text-[#6f7974]">
          {opp.deliverables.slice(0, 2).map((deliverable) => (
            <span key={deliverable}>{deliverable}</span>
          ))}
          {opp.niches.slice(0, 2).map((niche) => (
            <span key={niche}>
              {nicheLookup[niche]?.emoji} {nicheLookup[niche]?.label ?? niche}
            </span>
          ))}
          {opp.spotsLeft && (
            <span className="inline-flex items-center gap-1">
              <Users className="h-3 w-3" />
              {opp.spotsLeft} spots
            </span>
          )}
          <span className="inline-flex items-center gap-1">
            <Clock className="h-3 w-3" />
            Posted{" "}
            {formatDistanceToNow(new Date(opp.postedAt), {
              addSuffix: true,
            })}
          </span>
        </div>
      </div>

      <div className="flex items-start justify-between gap-3 md:block md:text-right">
        <div>
          <p className="text-2xl font-semibold tracking-tight text-[#12745f]">
            {opp.payDisplay}
          </p>
          <p className="mt-1 text-xs uppercase tracking-[0.14em] text-[#7a837f]">
            {opp.contentType}
          </p>
        </div>
        <a href={opp.applyUrl} target="_blank" rel="noopener noreferrer">
          <Button className="mt-0 rounded-none bg-[#111111] px-4 hover:bg-[#12745f] md:mt-5">
            Apply
            <ExternalLink className="ml-2 h-3.5 w-3.5" />
          </Button>
        </a>
      </div>
    </motion.article>
  );
}
