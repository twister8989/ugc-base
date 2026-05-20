"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { BookmarkCheck, ExternalLink, Search } from "lucide-react";
import { opportunities } from "@/lib/opportunities-data";
import { getSavedOpportunities, toggleSavedOpportunity } from "@/lib/store";

export default function SavedPage() {
  const [savedIds, setSavedIds] = useState<string[]>([]);

  useEffect(() => {
    setSavedIds(getSavedOpportunities());
  }, []);

  const saved = opportunities.filter((opp) => savedIds.includes(opp.id));

  const unsave = (id: string) => {
    toggleSavedOpportunity(id);
    setSavedIds(getSavedOpportunities());
  };

  return (
    <div className="max-w-5xl p-8">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Saved briefs</h1>
        <p className="mt-1 text-gray-500">
          Your shortlist of UGC gigs worth applying to later.
        </p>
      </div>

      {saved.length === 0 ? (
        <div className="rounded-2xl border border-gray-100 bg-white px-6 py-16 text-center">
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-violet-50">
            <BookmarkCheck className="h-6 w-6 text-violet-600" />
          </div>
          <h2 className="font-semibold text-gray-900">No saved briefs yet</h2>
          <p className="mx-auto mt-2 max-w-md text-sm text-gray-500">
            Save anything interesting from the opportunity feed so you can come
            back and apply when you have time.
          </p>
          <Link href="/opportunities" className="mt-6 inline-block">
            <Button className="gap-2 bg-violet-600 hover:bg-violet-700">
              <Search className="h-4 w-4" />
              Browse opportunities
            </Button>
          </Link>
        </div>
      ) : (
        <div className="space-y-3">
          {saved.map((opp) => (
            <div
              key={opp.id}
              className="rounded-2xl border border-gray-100 bg-white p-5"
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <div className="mb-2 flex flex-wrap items-center gap-2">
                    <Badge className="bg-violet-50 text-violet-700 border-0">
                      {opp.platformName}
                    </Badge>
                    {opp.isNew && (
                      <Badge className="bg-green-50 text-green-700 border-0">
                        New
                      </Badge>
                    )}
                    {opp.requiresPosting && (
                      <Badge className="bg-orange-50 text-orange-600 border-0">
                        Posting required
                      </Badge>
                    )}
                  </div>
                  <h2 className="font-semibold text-gray-900">{opp.brand}</h2>
                  <p className="mt-1 text-sm text-gray-600">{opp.title}</p>
                  <p className="mt-2 line-clamp-2 text-sm text-gray-500">
                    {opp.description}
                  </p>
                </div>
                <div className="shrink-0 text-right">
                  <p className="text-lg font-bold text-green-600">
                    {opp.payDisplay}
                  </p>
                  <div className="mt-3 flex justify-end gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      className="h-8 text-xs"
                      onClick={() => unsave(opp.id)}
                    >
                      Unsave
                    </Button>
                    <a
                      href={opp.applyUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Button
                        size="sm"
                        className="h-8 gap-1.5 bg-violet-600 text-xs hover:bg-violet-700"
                      >
                        Apply <ExternalLink className="h-3 w-3" />
                      </Button>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
