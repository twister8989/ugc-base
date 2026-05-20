"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Zap, ChevronRight, Check } from "lucide-react";
import { niches, Niche } from "@/lib/platforms-data";
import { saveProfile } from "@/lib/store";
import { cn } from "@/lib/utils";
import { LogoMark } from "@/components/logo";

const steps = ["Welcome", "Your niche", "Content type", "Done"];

export default function OnboardingPage() {
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [name, setName] = useState("");
  const [selectedNiches, setSelectedNiches] = useState<Niche[]>([]);
  const [contentTypes, setContentTypes] = useState<string[]>([]);

  const toggleNiche = (n: Niche) => {
    setSelectedNiches((prev) =>
      prev.includes(n) ? prev.filter((x) => x !== n) : [...prev, n]
    );
  };

  const toggleContent = (c: string) => {
    setContentTypes((prev) =>
      prev.includes(c) ? prev.filter((x) => x !== c) : [...prev, c]
    );
  };

  const handleFinish = () => {
    saveProfile({
      name,
      email: "",
      niches: selectedNiches,
      contentTypes: contentTypes as ("video" | "photo" | "both")[],
      platforms: [],
      onboarded: true,
    });
    router.push("/opportunities");
  };

  return (
    <div className="min-h-screen bg-[#fbfaf6] flex items-center justify-center px-4">
      <div className="w-full max-w-lg">
        {/* Logo */}
        <div className="flex items-center justify-center gap-2 mb-8">
          <LogoMark />
          <span className="font-bold text-xl text-gray-900">UGC HQ</span>
        </div>

        {/* Progress */}
        <div className="flex items-center justify-center gap-2 mb-8">
          {steps.map((s, i) => (
            <div key={s} className="flex items-center gap-2">
              <div
                className={cn(
                  "w-7 h-7 rounded-full flex items-center justify-center text-xs font-medium transition-all",
                  i < step
                    ? "bg-[#12745f] text-white"
                    : i === step
                    ? "bg-[#12745f] text-white"
                    : "bg-gray-200 text-gray-400"
                )}
              >
                {i < step ? <Check className="w-3.5 h-3.5" /> : i + 1}
              </div>
              {i < steps.length - 1 && (
                <div
                  className={cn(
                    "w-8 h-0.5 transition-all",
                    i < step ? "bg-[#12745f]" : "bg-gray-200"
                  )}
                />
              )}
            </div>
          ))}
        </div>

        {/* Card */}
        <div className="bg-white rounded-[32px] border border-[#e8e5dd] shadow-sm p-8">
          {step === 0 && (
            <div>
              <h1 className="text-2xl font-bold text-gray-900 mb-2">
                Welcome to UGC HQ
              </h1>
              <p className="text-gray-500 mb-8">
                Let&apos;s set up your opportunity feed. Takes about 60 seconds.
              </p>
              <div>
                <Label className="text-sm font-medium mb-2 block">
                  What&apos;s your name?
                </Label>
                <Input
                  placeholder="e.g. Jordan"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="text-base"
                  onKeyDown={(e) => e.key === "Enter" && name && setStep(1)}
                  autoFocus
                />
              </div>
              <Button
                className="w-full mt-6 bg-[#12745f] hover:bg-[#0f604f] gap-2 rounded-full"
                disabled={!name.trim()}
                onClick={() => setStep(1)}
              >
                Continue <ChevronRight className="w-4 h-4" />
              </Button>
            </div>
          )}

          {step === 1 && (
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                What&apos;s your niche?
              </h2>
              <p className="text-gray-500 mb-6">
                Pick everything that fits — we&apos;ll filter opportunities for you.
              </p>
              <div className="flex flex-wrap gap-2 mb-6">
                {niches.map((n) => {
                  const active = selectedNiches.includes(n.value);
                  return (
                    <button
                      key={n.value}
                      onClick={() => toggleNiche(n.value)}
                      className={cn(
                        "px-3.5 py-2 rounded-xl text-sm font-medium border transition-all",
                        active
                          ? "bg-[#12745f] text-white border-[#12745f]"
                          : "bg-white text-gray-700 border-gray-200 hover:border-[#12745f]"
                      )}
                    >
                      {n.emoji} {n.label}
                    </button>
                  );
                })}
              </div>
              <div className="flex gap-3">
                <Button
                  variant="outline"
                  className="flex-1"
                  onClick={() => setStep(0)}
                >
                  Back
                </Button>
                <Button
                  className="flex-1 bg-[#12745f] hover:bg-[#0f604f] gap-2 rounded-full"
                  disabled={selectedNiches.length === 0}
                  onClick={() => setStep(2)}
                >
                  Continue <ChevronRight className="w-4 h-4" />
                </Button>
              </div>
            </div>
          )}

          {step === 2 && (
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                What do you create?
              </h2>
              <p className="text-gray-500 mb-6">
                This helps us match you with the right platforms.
              </p>
              <div className="space-y-3 mb-6">
                {[
                  {
                    id: "video",
                    emoji: "📹",
                    label: "Video",
                    desc: "TikTok, Reels, YouTube Shorts style UGC",
                  },
                  {
                    id: "photo",
                    emoji: "📸",
                    label: "Photo",
                    desc: "Lifestyle, product, and editorial photos",
                  },
                ].map((ct) => {
                  const active = contentTypes.includes(ct.id);
                  return (
                    <button
                      key={ct.id}
                      onClick={() => toggleContent(ct.id)}
                      className={cn(
                        "w-full p-4 rounded-xl border text-left transition-all",
                        active
                          ? "border-[#12745f] bg-[#e5f6f0]"
                          : "border-gray-200 hover:border-[#b7ded1] bg-white"
                      )}
                    >
                      <div className="flex items-center gap-3">
                        <span className="text-2xl">{ct.emoji}</span>
                        <div>
                          <p
                            className={cn(
                              "font-semibold",
                              active ? "text-[#12745f]" : "text-gray-900"
                            )}
                          >
                            {ct.label}
                          </p>
                          <p className="text-sm text-gray-500">{ct.desc}</p>
                        </div>
                        {active && (
                          <div className="ml-auto w-5 h-5 rounded-full bg-[#12745f] flex items-center justify-center">
                            <Check className="w-3 h-3 text-white" />
                          </div>
                        )}
                      </div>
                    </button>
                  );
                })}
              </div>
              <div className="flex gap-3">
                <Button
                  variant="outline"
                  className="flex-1"
                  onClick={() => setStep(1)}
                >
                  Back
                </Button>
                <Button
                  className="flex-1 bg-[#12745f] hover:bg-[#0f604f] gap-2 rounded-full"
                  disabled={contentTypes.length === 0}
                  onClick={() => setStep(3)}
                >
                  Continue <ChevronRight className="w-4 h-4" />
                </Button>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="text-center">
              <div className="w-16 h-16 rounded-2xl bg-[#e5f6f0] flex items-center justify-center mx-auto mb-6">
                <Zap className="w-8 h-8 text-[#12745f]" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                You&apos;re all set, {name.split(" ")[0]}!
              </h2>
              <p className="text-gray-500 mb-6">
                Your feed is ready. Here&apos;s what you&apos;ve unlocked:
              </p>
              <div className="space-y-2 text-left mb-8">
                {[
                  `Opportunity feed filtered to ${selectedNiches.length} niche${selectedNiches.length !== 1 ? "s" : ""}`,
                  `${contentTypes.join(" + ")} opportunities highlighted`,
                  "Full platform directory with sign-up links",
                  "Saved briefs list for anything you want to apply to later",
                ].map((item) => (
                  <div key={item} className="flex items-center gap-2 text-sm text-gray-700">
                    <span className="text-green-500 font-bold">✓</span>
                    {item}
                  </div>
                ))}
              </div>
              <div className="flex flex-wrap gap-1.5 justify-center mb-6">
                {selectedNiches.map((n) => {
                  const niche = niches.find((x) => x.value === n);
                  return (
                    <Badge
                      key={n}
                      className="bg-[#e5f6f0] text-[#12745f] border-[#b7ded1]"
                    >
                      {niche?.emoji} {niche?.label}
                    </Badge>
                  );
                })}
              </div>
              <Button
                className="w-full bg-[#12745f] hover:bg-[#0f604f] gap-2 text-base py-5 rounded-full"
                onClick={handleFinish}
              >
                Go to my feed <ChevronRight className="w-4 h-4" />
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
