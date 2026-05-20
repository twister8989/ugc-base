"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { getProfile, UserProfile } from "@/lib/store";
import { niches, platforms } from "@/lib/platforms-data";
import { LayoutGrid, Search, User } from "lucide-react";

export default function ProfilePage() {
  const [profile, setProfile] = useState<UserProfile | null>(null);

  useEffect(() => {
    setProfile(getProfile());
  }, []);

  const selectedNiches = niches.filter((niche) =>
    profile?.niches?.includes(niche.value)
  );
  const joinedCount = profile?.platforms?.length ?? 0;

  return (
    <div className="max-w-5xl p-8">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Profile</h1>
        <p className="mt-1 text-gray-500">
          Your matching settings for the opportunity feed.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-[1fr_0.85fr]">
        <div className="rounded-2xl border border-gray-100 bg-white p-6">
          <div className="mb-5 flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#e5f6f0]">
              <User className="h-6 w-6 text-[#12745f]" />
            </div>
            <div>
              <p className="font-semibold text-gray-900">
                {profile?.name || "Creator"}
              </p>
              <p className="text-sm text-gray-400">UGC HQ feed profile</p>
            </div>
          </div>

          <div className="space-y-5">
            <div>
              <p className="mb-2 text-sm font-medium text-gray-900">Niches</p>
              <div className="flex flex-wrap gap-2">
                {selectedNiches.length ? (
                  selectedNiches.map((niche) => (
                    <Badge
                      key={niche.value}
                      className="bg-[#e5f6f0] text-[#12745f] border-[#b7ded1]"
                    >
                      {niche.emoji} {niche.label}
                    </Badge>
                  ))
                ) : (
                  <span className="text-sm text-gray-400">
                    No niches selected yet.
                  </span>
                )}
              </div>
            </div>

            <div>
              <p className="mb-2 text-sm font-medium text-gray-900">
                Content types
              </p>
              <div className="flex flex-wrap gap-2">
                {profile?.contentTypes?.length ? (
                  profile.contentTypes.map((type) => (
                    <Badge
                      key={type}
                      variant="secondary"
                      className="bg-gray-50 text-gray-600"
                    >
                      {type}
                    </Badge>
                  ))
                ) : (
                  <span className="text-sm text-gray-400">
                    No content types selected yet.
                  </span>
                )}
              </div>
            </div>
          </div>

          <Link href="/onboarding" className="mt-6 inline-block">
            <Button variant="outline">Update feed profile</Button>
          </Link>
        </div>

        <div className="space-y-4">
          <div className="rounded-2xl border border-gray-100 bg-white p-5">
            <div className="mb-2 flex items-center gap-2">
              <Search className="h-4 w-4 text-[#12745f]" />
              <p className="font-semibold text-gray-900">Feed status</p>
            </div>
            <p className="text-sm leading-6 text-gray-500">
              Your feed is currently matched against seeded jobs. The next
              build step is live collection from public listings, email digests,
              and community submissions.
            </p>
          </div>

          <div className="rounded-2xl border border-gray-100 bg-white p-5">
            <div className="mb-2 flex items-center gap-2">
              <LayoutGrid className="h-4 w-4 text-[#12745f]" />
              <p className="font-semibold text-gray-900">Platform coverage</p>
            </div>
            <p className="text-sm text-gray-500">
              You&apos;ve marked {joinedCount} of {platforms.length} platforms
              as joined.
            </p>
            <Link href="/platforms" className="mt-4 inline-block">
              <Button size="sm" className="rounded-full bg-[#12745f] hover:bg-[#0f604f]">
                Manage platforms
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
