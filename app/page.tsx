import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { LogoMark, Wordmark } from "@/components/logo";
import {
  Bell,
  Bookmark,
  ChevronRight,
  ExternalLink,
  Filter,
  Search,
  Sparkles,
} from "lucide-react";

const platformNames = [
  "SideShift",
  "Billo",
  "Insense",
  "JoinBrands",
  "Cohley",
  "Collabstr",
  "Trend",
  "Creator.co",
  "Popular Pays",
  "#paid",
  "Skeepers",
  "Twirl",
  "LTK",
  "TRIBE",
  "Social Native",
  "Brands Meet Creators",
];

const sampleBriefs = [
  {
    platform: "SideShift",
    brand: "SwipeWell",
    title: "Dating app testimonial, TikTok style",
    pay: "$75 + CPM",
    tag: "Tech",
    meta: "Posting required",
  },
  {
    platform: "Billo",
    brand: "NovaSkin",
    title: "30-second skincare routine video",
    pay: "$80",
    tag: "Beauty",
    meta: "Raw footage",
  },
  {
    platform: "Cohley",
    brand: "HomeNest",
    title: "Kitchen appliance lifestyle photos",
    pay: "$300",
    tag: "Home",
    meta: "3 spots left",
  },
];

const features = [
  {
    icon: Search,
    title: "One feed",
    description:
      "A single place to scan paid UGC briefs from fragmented creator platforms.",
  },
  {
    icon: Filter,
    title: "Matched to you",
    description:
      "Filter by niche, platform, content type, country, posting requirement, and pay.",
  },
  {
    icon: Bookmark,
    title: "Shortlist fast",
    description:
      "Save briefs worth applying to and ignore the rest without losing momentum.",
  },
  {
    icon: Bell,
    title: "Daily habit",
    description:
      "The next loop is a morning digest of fresh briefs in your niche.",
  },
];

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-[#fbfaf6] text-[#111111]">
      <nav className="border-b border-[#e8e5dd] px-5 py-4">
        <div className="mx-auto flex max-w-7xl items-center justify-between">
          <Wordmark />
          <div className="flex items-center gap-2">
            <Link href="/opportunities">
              <Button
                variant="ghost"
                size="sm"
                className="rounded-full text-[#3f4743] hover:bg-white"
              >
                View demo
              </Button>
            </Link>
            <Link href="/onboarding">
              <Button
                size="sm"
                className="rounded-full bg-[#12745f] px-5 text-white hover:bg-[#0f604f]"
              >
                Get started
              </Button>
            </Link>
          </div>
        </div>
      </nav>

      <main>
        <section className="px-5 py-14 md:py-20">
          <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[1.02fr_0.98fr] lg:items-center">
            <div>
              <Badge className="mb-6 rounded-full border border-[#ccebe1] bg-white px-3 py-1.5 text-[#12745f] shadow-sm">
                <Sparkles className="mr-1.5 h-3.5 w-3.5" />
                Daily paid UGC brief feed
              </Badge>
              <h1 className="max-w-4xl text-5xl font-semibold leading-[1.02] tracking-tight text-[#111111] md:text-7xl">
                Stop checking every UGC platform.
              </h1>
              <p className="mt-6 max-w-2xl text-lg leading-8 text-[#5f6965] md:text-xl">
                UGC HQ collects paid creator briefs from SideShift, Billo,
                Insense, JoinBrands, Cohley, Collabstr, and more, then turns
                the mess into one clean feed.
              </p>
              <div className="mt-8 flex flex-wrap items-center gap-3">
                <Link href="/onboarding">
                  <Button
                    size="lg"
                    className="h-12 rounded-full bg-[#12745f] px-7 text-base font-semibold text-white hover:bg-[#0f604f]"
                  >
                    Set up my feed
                    <ChevronRight className="ml-1 h-4 w-4" />
                  </Button>
                </Link>
                <Link href="/opportunities">
                  <Button
                    size="lg"
                    variant="outline"
                    className="h-12 rounded-full border-[#d7d2c8] bg-white px-7 text-base text-[#222222] hover:bg-[#f4f1eb]"
                  >
                    Browse demo
                    <ExternalLink className="ml-1 h-4 w-4" />
                  </Button>
                </Link>
              </div>
              <div className="mt-8 flex flex-wrap gap-6 text-sm text-[#68736e]">
                <span>20+ platforms tracked</span>
                <span>Free to try</span>
                <span>Built around briefs, not accounting</span>
              </div>
            </div>

            <div className="relative">
              <div className="absolute -left-8 -top-8 hidden h-28 w-28 rounded-[32px] bg-[#12745f] opacity-10 lg:block" />
              <div className="rounded-[32px] border border-[#dfd9ce] bg-white p-3 shadow-[0_24px_80px_rgba(32,26,18,0.10)]">
                <div className="rounded-[24px] bg-[#10231e] p-4 text-white">
                  <div className="mb-5 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <LogoMark className="h-10 w-10 rounded-[15px]" />
                      <div>
                        <p className="text-sm font-semibold">
                          Today&apos;s matched briefs
                        </p>
                        <p className="text-xs text-white/50">
                          Beauty, tech, home · 14 new
                        </p>
                      </div>
                    </div>
                    <Badge className="rounded-full bg-[#36d5aa]/15 text-[#36d5aa]">
                      Live feed
                    </Badge>
                  </div>

                  <div className="space-y-3">
                    {sampleBriefs.map((brief) => (
                      <div
                        key={`${brief.platform}-${brief.brand}`}
                        className="rounded-[22px] border border-white/8 bg-white/[0.06] p-4"
                      >
                        <div className="mb-3 flex items-start justify-between gap-3">
                          <div>
                            <div className="mb-2 flex items-center gap-2">
                              <span className="rounded-full bg-[#36d5aa]/15 px-2.5 py-1 text-xs font-semibold text-[#36d5aa]">
                                {brief.platform}
                              </span>
                              <span className="text-xs text-white/45">
                                {brief.tag}
                              </span>
                            </div>
                            <p className="font-semibold">{brief.brand}</p>
                            <p className="mt-1 text-sm text-white/60">
                              {brief.title}
                            </p>
                          </div>
                          <span className="rounded-full bg-white px-3 py-1.5 text-sm font-bold text-[#0c8068]">
                            {brief.pay}
                          </span>
                        </div>
                        <p className="text-xs text-white/45">{brief.meta}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="border-y border-[#e8e5dd] bg-white px-5 py-9">
          <div className="mx-auto max-w-7xl">
            <p className="mb-5 text-center text-xs font-semibold uppercase tracking-[0.22em] text-[#8a918d]">
              Built around the places creators already hunt for work
            </p>
            <div className="flex flex-wrap justify-center gap-2">
              {platformNames.map((platform) => (
                <Badge
                  key={platform}
                  variant="secondary"
                  className="rounded-full border border-[#e4e0d8] bg-[#fbfaf6] px-3 py-1.5 text-xs text-[#4f5854]"
                >
                  {platform}
                </Badge>
              ))}
            </div>
          </div>
        </section>

        <section className="px-5 py-16">
          <div className="mx-auto max-w-7xl">
            <div className="mb-10 max-w-2xl">
              <h2 className="text-4xl font-semibold tracking-tight text-[#111111]">
                Built for the daily scan.
              </h2>
              <p className="mt-3 text-lg leading-8 text-[#5f6965]">
                The product is the feed. Everything else should make it faster
                to find a relevant paid brief and apply.
              </p>
            </div>
            <div className="grid gap-4 md:grid-cols-4">
              {features.map((feature) => (
                <div
                  key={feature.title}
                  className="rounded-[28px] border border-[#e8e5dd] bg-white p-5 shadow-sm"
                >
                  <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-2xl bg-[#e5f6f0]">
                    <feature.icon className="h-5 w-5 text-[#12745f]" />
                  </div>
                  <h3 className="font-semibold text-[#111111]">
                    {feature.title}
                  </h3>
                  <p className="mt-2 text-sm leading-6 text-[#64706b]">
                    {feature.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="px-5 pb-20">
          <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-6 rounded-[32px] bg-[#111111] p-8 text-white md:flex-row md:items-center">
            <div>
              <h2 className="text-3xl font-semibold tracking-tight">
                Stop hunting. Start applying.
              </h2>
              <p className="mt-2 max-w-2xl text-[#b6beb9]">
                Start with a free profile, the platform directory, saved
                briefs, and a working demo feed.
              </p>
            </div>
            <Link href="/onboarding">
              <Button className="rounded-full bg-white px-6 text-[#111111] hover:bg-[#e5f6f0]">
                Set up UGC HQ
              </Button>
            </Link>
          </div>
        </section>
      </main>
    </div>
  );
}
