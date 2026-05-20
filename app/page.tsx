import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Bell,
  Bookmark,
  ChevronRight,
  ExternalLink,
  Filter,
  Search,
  Zap,
} from "lucide-react";

const platformNames = [
  "Billo",
  "SideShift",
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
    brand: "Creator App",
    title: "Tech app testimonial, TikTok style",
    pay: "$75 + CPM",
    tag: "Tech",
  },
  {
    platform: "Billo",
    brand: "NovaSkin",
    title: "30-second skincare routine video",
    pay: "$80",
    tag: "Beauty",
  },
  {
    platform: "Cohley",
    brand: "HomeNest",
    title: "Kitchen appliance lifestyle photos",
    pay: "$300",
    tag: "Home",
  },
];

const features = [
  {
    icon: Search,
    title: "Every paid brief in one place",
    description:
      "Stop opening 20 tabs. UGC HQ collects creator opportunities across the platforms people actually use.",
  },
  {
    icon: Filter,
    title: "Filtered to your niche",
    description:
      "Beauty, fitness, tech, food, pets, lifestyle, and more. See the gigs that match your profile first.",
  },
  {
    icon: Bookmark,
    title: "Save now, apply later",
    description:
      "Keep a clean shortlist of briefs worth applying to before they fill up or disappear.",
  },
  {
    icon: Bell,
    title: "Daily alerts are next",
    description:
      "The roadmap is simple: a fresh digest of the best paid briefs in your niche every morning.",
  },
];

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white">
      <nav className="border-b border-gray-100 px-6 py-4">
        <div className="mx-auto flex max-w-6xl items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-violet-600">
              <Zap className="h-4 w-4 text-white" />
            </div>
            <span className="text-lg font-bold text-gray-900">UGC HQ</span>
          </Link>
          <div className="flex items-center gap-3">
            <Link href="/opportunities">
              <Button variant="ghost" size="sm">
                View demo
              </Button>
            </Link>
            <Link href="/onboarding">
              <Button size="sm" className="bg-violet-600 hover:bg-violet-700">
                Get started free
              </Button>
            </Link>
          </div>
        </div>
      </nav>

      <section className="px-6 py-16 md:py-20">
        <div className="mx-auto grid max-w-6xl gap-10 md:grid-cols-[1.05fr_0.95fr] md:items-center">
          <div>
            <Badge
              variant="secondary"
              className="mb-5 border-violet-200 bg-violet-50 text-violet-700"
            >
              <Zap className="mr-1 h-3 w-3" />
              Paid UGC briefs, collected daily
            </Badge>
            <h1 className="max-w-3xl text-5xl font-bold leading-tight text-gray-950">
              Find paid UGC gigs without checking 20 platforms.
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-gray-500">
              UGC HQ tracks creator opportunities across Billo, SideShift,
              Insense, JoinBrands, Cohley, Collabstr, and more, then filters
              the best briefs to your niche.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Link href="/onboarding">
                <Button
                  size="lg"
                  className="gap-2 bg-violet-600 px-7 text-base hover:bg-violet-700"
                >
                  Start finding briefs
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </Link>
              <Link href="/opportunities">
                <Button size="lg" variant="outline" className="gap-2 text-base">
                  Browse demo feed
                  <ExternalLink className="h-4 w-4" />
                </Button>
              </Link>
            </div>
            <p className="mt-4 text-sm text-gray-400">
              Free to try. No credit card. Built for creators who are tired of
              hunting.
            </p>
          </div>

          <div className="rounded-2xl border border-gray-100 bg-gray-50 p-3 shadow-sm">
            <div className="rounded-xl bg-white p-4">
              <div className="mb-4 flex items-center justify-between">
                <div>
                  <p className="text-sm font-semibold text-gray-900">
                    Today&apos;s matched briefs
                  </p>
                  <p className="text-xs text-gray-400">
                    Beauty, tech, home · 12 new
                  </p>
                </div>
                <Badge className="bg-green-50 text-green-700">Live feed</Badge>
              </div>
              <div className="space-y-3">
                {sampleBriefs.map((brief) => (
                  <div
                    key={`${brief.platform}-${brief.brand}`}
                    className="rounded-xl border border-gray-100 p-4"
                  >
                    <div className="mb-2 flex items-center justify-between gap-3">
                      <div className="flex items-center gap-2">
                        <span className="rounded-md bg-violet-50 px-2 py-1 text-xs font-semibold text-violet-700">
                          {brief.platform}
                        </span>
                        <span className="text-xs text-gray-400">
                          {brief.tag}
                        </span>
                      </div>
                      <span className="text-sm font-bold text-green-600">
                        {brief.pay}
                      </span>
                    </div>
                    <p className="font-medium text-gray-900">{brief.brand}</p>
                    <p className="mt-1 text-sm text-gray-500">{brief.title}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-y border-gray-100 bg-gray-50 px-6 py-10">
        <div className="mx-auto max-w-6xl">
          <p className="mb-5 text-center text-xs font-semibold uppercase tracking-wider text-gray-400">
            Built around the fragmented platforms creators already use
          </p>
          <div className="flex flex-wrap justify-center gap-2">
            {platformNames.map((platform) => (
              <Badge
                key={platform}
                variant="secondary"
                className="border border-gray-200 bg-white px-3 py-1 text-xs text-gray-600"
              >
                {platform}
              </Badge>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 py-16">
        <div className="mx-auto max-w-6xl">
          <div className="mb-10 max-w-2xl">
            <h2 className="text-3xl font-bold text-gray-950">
              The product is the feed.
            </h2>
            <p className="mt-3 text-gray-500">
              Everything else supports one habit: open UGC HQ, find relevant
              paid briefs, save the best ones, apply faster.
            </p>
          </div>
          <div className="grid gap-4 md:grid-cols-4">
            {features.map((feature) => (
              <div
                key={feature.title}
                className="rounded-2xl border border-gray-100 p-5"
              >
                <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-violet-50">
                  <feature.icon className="h-5 w-5 text-violet-600" />
                </div>
                <h3 className="font-semibold text-gray-900">{feature.title}</h3>
                <p className="mt-2 text-sm leading-6 text-gray-500">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 pb-20">
        <div className="mx-auto max-w-4xl rounded-2xl bg-gray-950 px-6 py-10 text-center text-white">
          <h2 className="text-3xl font-bold">Stop hunting. Start applying.</h2>
          <p className="mx-auto mt-3 max-w-2xl text-gray-300">
            The first version is free: platform directory, niche profile, saved
            briefs, and a working opportunity feed.
          </p>
          <Link href="/onboarding" className="mt-7 inline-block">
            <Button className="bg-white text-gray-950 hover:bg-gray-100">
              Set up your feed
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
