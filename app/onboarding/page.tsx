"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";
import { LogoMark } from "@/components/logo";
import { niches, Niche } from "@/lib/platforms-data";
import { saveProfile } from "@/lib/store";
import { cn } from "@/lib/utils";

export default function OnboardingPage() {
  const router = useRouter();
  const [selectedNiches, setSelectedNiches] = useState<Niche[]>([]);

  const toggleNiche = (n: Niche) => {
    setSelectedNiches((prev) =>
      prev.includes(n) ? prev.filter((x) => x !== n) : [...prev, n]
    );
  };

  const showFeed = () => {
    saveProfile({
      name: "",
      email: "",
      niches: selectedNiches,
      contentTypes: [],
      platforms: [],
      onboarded: true,
    });
    router.push("/opportunities");
  };

  const skip = () => {
    saveProfile({
      name: "",
      email: "",
      niches: [],
      contentTypes: [],
      platforms: [],
      onboarded: true,
    });
    router.push("/opportunities");
  };

  return (
    <div className="min-h-screen bg-[#fbfaf6] px-5 py-8">
      <div className="mx-auto max-w-5xl">
        <div className="mb-12 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <LogoMark />
            <span className="text-xl font-semibold tracking-tight">
              <span className="text-[#111111]">UGC</span>{" "}
              <span className="text-[#0c8068]">HQ</span>
            </span>
          </div>
          <button
            onClick={skip}
            className="text-sm font-medium text-[#68736e] transition-colors hover:text-[#12745f]"
          >
            Skip and see all jobs
          </button>
        </div>

        <div className="grid gap-10 lg:grid-cols-[0.78fr_1fr] lg:items-start">
          <div>
            <p className="mb-4 text-sm font-semibold uppercase tracking-[0.18em] text-[#12745f]">
              Optional filter
            </p>
            <h1 className="text-5xl font-semibold leading-none tracking-[-0.045em] text-[#101410] md:text-6xl">
              Pick your categories.
            </h1>
            <p className="mt-6 text-lg leading-8 text-[#56615c]">
              We&apos;ll use this to show relevant UGC jobs first. You can skip
              this and browse every paid opportunity right away.
            </p>
          </div>

          <div>
            <div className="border-y border-[#d9d3c8] py-6">
              <div className="flex flex-wrap gap-2.5">
                {niches.map((n) => {
                  const active = selectedNiches.includes(n.value);
                  return (
                    <button
                      key={n.value}
                      onClick={() => toggleNiche(n.value)}
                      className={cn(
                        "border px-3.5 py-2 text-sm font-medium transition-all",
                        active
                          ? "border-[#12745f] bg-[#12745f] text-white"
                          : "border-[#d9d3c8] bg-transparent text-[#3f4743] hover:border-[#12745f] hover:text-[#12745f]"
                      )}
                    >
                      {n.emoji} {n.label}
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="mt-6 flex flex-wrap items-center gap-3">
              <Button
                className="h-12 rounded-none bg-[#12745f] px-7 text-base font-semibold text-white hover:bg-[#0f604f]"
                onClick={showFeed}
              >
                {selectedNiches.length
                  ? `Show ${selectedNiches.length} filtered ${
                      selectedNiches.length === 1 ? "category" : "categories"
                    }`
                  : "Show all jobs"}
                <ChevronRight className="ml-2 h-4 w-4" />
              </Button>
              <button
                onClick={skip}
                className="text-sm font-medium text-[#68736e] hover:text-[#12745f]"
              >
                I just want to browse everything
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
