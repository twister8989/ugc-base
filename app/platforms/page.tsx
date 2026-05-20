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
  ExternalLink,
  CheckCircle2,
  Circle,
  Search,
  Star,
  Users,
} from "lucide-react";
import { platforms, Platform, niches, Niche } from "@/lib/platforms-data";
import { getProfile, saveProfile } from "@/lib/store";

const difficultyConfig = {
  easy: { label: "Easy to join", color: "bg-green-50 text-green-700" },
  medium: { label: "Moderate", color: "bg-yellow-50 text-yellow-700" },
  hard: { label: "Selective", color: "bg-red-50 text-red-600" },
};

export default function PlatformsPage() {
  const [search, setSearch] = useState("");
  const [nicheFilter, setNicheFilter] = useState<string>("all");
  const [difficultyFilter, setDifficultyFilter] = useState<string>("all");
  const [typeFilter, setTypeFilter] = useState<string>("all");
  const [joined, setJoined] = useState<string[]>([]);

  useEffect(() => {
    const profile = getProfile();
    setJoined(profile?.platforms ?? []);
  }, []);

  const handleToggleJoined = (id: string) => {
    const profile = getProfile();
    const current = profile?.platforms ?? [];
    const updated = current.includes(id)
      ? current.filter((p) => p !== id)
      : [...current, id];

    const updatedProfile = profile
      ? { ...profile, platforms: updated }
      : {
          name: "",
          email: "",
          niches: [],
          contentTypes: [],
          platforms: updated,
          onboarded: false,
        };
    saveProfile(updatedProfile);
    setJoined(updated);
  };

  const filtered = platforms.filter((p) => {
    if (
      search &&
      !p.name.toLowerCase().includes(search.toLowerCase()) &&
      !p.description.toLowerCase().includes(search.toLowerCase())
    )
      return false;
    if (nicheFilter !== "all" && !p.niches.includes(nicheFilter as Niche))
      return false;
    if (difficultyFilter !== "all" && p.approvalDifficulty !== difficultyFilter)
      return false;
    if (
      typeFilter !== "all" &&
      typeFilter !== "both" &&
      !p.contentTypes.includes(typeFilter as "video" | "photo")
    )
      return false;
    return true;
  });

  const joinedCount = joined.length;
  const notJoinedCount = platforms.length - joinedCount;

  return (
    <div className="p-8 max-w-5xl">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Platform Directory</h1>
        <p className="text-gray-500 mt-1">
          {platforms.length} UGC platforms reviewed. Know where to sign up
          before the feed gets automated.
        </p>
      </div>

      {/* Progress banner */}
      <div className="bg-violet-50 border border-violet-100 rounded-2xl p-4 mb-6 flex items-center justify-between">
        <div>
          <p className="font-semibold text-violet-900 text-sm">
            You&apos;re on {joinedCount} platform{joinedCount !== 1 ? "s" : ""}
          </p>
          <p className="text-xs text-violet-600 mt-0.5">
            {notJoinedCount > 0
              ? `${notJoinedCount} more available — more platforms = more briefs`
              : "You're on all platforms! 🎉"}
          </p>
        </div>
        <div className="flex gap-1">
          {platforms.map((p) => (
            <div
              key={p.id}
              className={`w-2.5 h-2.5 rounded-full ${
                joined.includes(p.id) ? "bg-violet-600" : "bg-violet-200"
              }`}
              title={p.name}
            />
          ))}
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-3 mb-6">
        <div className="relative flex-1 min-w-48">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <Input
            placeholder="Search platforms..."
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

        <Select value={difficultyFilter} onValueChange={(v) => setDifficultyFilter(v ?? "all")}>
          <SelectTrigger className="w-40 bg-white border-gray-200">
            <SelectValue placeholder="Difficulty" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All levels</SelectItem>
            <SelectItem value="easy">Easy to join</SelectItem>
            <SelectItem value="medium">Moderate</SelectItem>
            <SelectItem value="hard">Selective</SelectItem>
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
          </SelectContent>
        </Select>
      </div>

      <p className="text-sm text-gray-500 mb-4">{filtered.length} platforms</p>

      {/* Platform cards */}
      <div className="space-y-3">
        {filtered.map((platform) => (
          <PlatformCard
            key={platform.id}
            platform={platform}
            joined={joined.includes(platform.id)}
            onToggle={() => handleToggleJoined(platform.id)}
          />
        ))}
      </div>
    </div>
  );
}

function PlatformCard({
  platform,
  joined,
  onToggle,
}: {
  platform: Platform;
  joined: boolean;
  onToggle: () => void;
}) {
  const nicheLookup = niches.reduce(
    (acc, n) => ({ ...acc, [n.value]: n }),
    {} as Record<string, (typeof niches)[0]>
  );
  const diff = difficultyConfig[platform.approvalDifficulty];

  return (
    <div
      className={`bg-white rounded-2xl border p-5 transition-all hover:shadow-sm ${
        joined ? "border-violet-200 bg-violet-50/30" : "border-gray-100"
      }`}
    >
      <div className="flex items-start gap-4">
        {/* Logo */}
        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center shrink-0 text-white font-bold text-sm">
          {platform.logo}
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-3">
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-semibold text-gray-900">{platform.name}</h3>
                <div className="flex items-center gap-0.5">
                  <Star className="w-3 h-3 text-yellow-400 fill-yellow-400" />
                  <span className="text-xs text-gray-500">
                    {platform.rating}
                  </span>
                </div>
                {joined && (
                  <Badge className="text-[10px] bg-violet-100 text-violet-700 border-0 h-4 px-1.5">
                    ✓ Joined
                  </Badge>
                )}
              </div>
              <p className="text-sm text-gray-500 mt-0.5 leading-relaxed">
                {platform.description}
              </p>
            </div>

            {/* Pay */}
            <div className="text-right shrink-0">
              <div className="text-base font-bold text-green-600">
                {platform.avgPay}
              </div>
              <div className="text-xs text-gray-400">avg per gig</div>
            </div>
          </div>

          {/* Badges row */}
          <div className="flex flex-wrap gap-2 mt-3">
            <Badge
              variant="secondary"
              className={`text-xs border-0 ${diff.color}`}
            >
              {diff.label}
            </Badge>
            {platform.followerRequired && (
              <Badge
                variant="secondary"
                className="text-xs bg-blue-50 text-blue-700 border-0 flex items-center gap-1"
              >
                <Users className="w-2.5 h-2.5" />
                {platform.minFollowers?.toLocaleString()}+ followers
              </Badge>
            )}
            {platform.contentTypes.map((ct) => (
              <Badge
                key={ct}
                variant="secondary"
                className="text-xs bg-gray-50 text-gray-600 border-0"
              >
                {ct === "video" ? "📹" : ct === "photo" ? "📸" : "🎬"} {ct}
              </Badge>
            ))}
            {platform.niches.slice(0, 3).map((n) => (
              <Badge
                key={n}
                variant="secondary"
                className="text-xs bg-gray-50 text-gray-500 border-0"
              >
                {nicheLookup[n]?.emoji} {nicheLookup[n]?.label ?? n}
              </Badge>
            ))}
            {platform.niches.length > 3 && (
              <Badge
                variant="secondary"
                className="text-xs bg-gray-50 text-gray-400 border-0"
              >
                +{platform.niches.length - 3} more
              </Badge>
            )}
          </div>

          {/* Info row + actions */}
          <div className="flex items-center justify-between mt-4">
            <div className="flex items-center gap-4 text-xs text-gray-400">
              <span>💳 {platform.paymentMethod}</span>
              <span>📅 {platform.paymentFrequency}</span>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={onToggle}
                className="flex items-center gap-1.5 text-xs font-medium text-gray-500 hover:text-violet-700 transition-colors"
              >
                {joined ? (
                  <>
                    <CheckCircle2 className="w-4 h-4 text-violet-600" />
                    Joined
                  </>
                ) : (
                  <>
                    <Circle className="w-4 h-4" />
                    Mark joined
                  </>
                )}
              </button>
              <a
                href={platform.signupUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button
                  size="sm"
                  variant={joined ? "outline" : "default"}
                  className={
                    joined
                      ? "h-8 text-xs border-violet-200 text-violet-700 hover:bg-violet-50"
                      : "h-8 text-xs bg-violet-600 hover:bg-violet-700"
                  }
                >
                  {joined ? "Visit" : "Sign up"}{" "}
                  <ExternalLink className="w-3 h-3 ml-1" />
                </Button>
              </a>
            </div>
          </div>

          {/* Notes */}
          {platform.notes && (
            <p className="mt-3 text-xs text-gray-400 bg-gray-50 rounded-lg px-3 py-2">
              💡 {platform.notes}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
