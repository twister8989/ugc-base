"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { LogoMark, Wordmark } from "@/components/logo";
import {
  ArrowUpRight,
  Bookmark,
  ChevronRight,
  Filter,
  Search,
  Send,
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

const sampleGigs = [
  {
    platform: "SideShift",
    brand: "SwipeWell",
    title: "Dating app testimonial, TikTok style",
    pay: "$75 + CPM",
    tag: "Tech",
  },
  {
    platform: "Cohley",
    brand: "HomeNest",
    title: "Kitchen appliance lifestyle photos",
    pay: "$300",
    tag: "Home",
  },
  {
    platform: "Billo",
    brand: "NovaSkin",
    title: "30-second skincare routine video",
    pay: "$80",
    tag: "Beauty",
  },
];

const principles = [
  {
    icon: Search,
    label: "See all the jobs",
    description:
      "UGC HQ pulls paid opportunities from creator platforms into one feed.",
  },
  {
    icon: Filter,
    label: "Filter to your niche",
    description:
      "Beauty, fitness, tech, pets, food, lifestyle, and more. No scrolling through irrelevant work.",
  },
  {
    icon: Bookmark,
    label: "Save the best gigs",
    description:
      "Keep a shortlist of jobs worth applying to before they fill up.",
  },
  {
    icon: Send,
    label: "Apply on the platform",
    description:
      "Click through to Billo, SideShift, Insense, JoinBrands, Cohley, and the rest.",
  },
];

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-[#fbfaf6] text-[#101410]">
      <nav className="px-5 py-5">
        <div className="mx-auto flex max-w-7xl items-center justify-between">
          <Wordmark />
          <div className="flex items-center gap-2">
            <Link href="/opportunities">
              <Button
                variant="ghost"
                size="sm"
                className="rounded-none text-[#505b55] hover:bg-transparent hover:text-[#12745f]"
              >
                Demo
              </Button>
            </Link>
            <Link href="/onboarding">
              <Button
                size="sm"
                className="rounded-none bg-[#111111] px-5 text-white hover:bg-[#12745f]"
              >
                Start free
              </Button>
            </Link>
          </div>
        </div>
      </nav>

      <main>
        <section className="relative overflow-hidden px-5 pb-10 pt-12 md:pt-20">
          <div className="absolute left-[7%] top-24 hidden h-40 w-40 bg-[#12745f]/10 blur-3xl md:block" />
          <div className="absolute right-[9%] top-10 hidden h-52 w-52 bg-[#36d5aa]/10 blur-3xl md:block" />

          <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[1fr_0.82fr] lg:items-end">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, ease: "easeOut" }}
            >
              <div className="mb-8 inline-flex items-center gap-3 border-l-2 border-[#12745f] pl-4 text-sm text-[#56615c]">
                <span className="font-semibold text-[#12745f]">
                  Daily UGC job feed
                </span>
                <span>for creators tired of platform hopping</span>
              </div>

              <h1 className="max-w-5xl text-[clamp(3.75rem,9vw,8.8rem)] font-semibold leading-[0.88] tracking-[-0.05em]">
                Paid UGC jobs,
                <br />
                one clean feed.
              </h1>

              <div className="mt-8 grid max-w-3xl gap-6 md:grid-cols-[1fr_0.62fr]">
                <p className="text-lg leading-8 text-[#505b55]">
                  UGC HQ is a job board for UGC creators. It collects paid gigs
                  from platforms like SideShift, Billo, Insense, JoinBrands,
                  Cohley, and Collabstr so you can find work without checking
                  every app.
                </p>
                <div className="border-l border-[#d9d3c8] pl-5 text-sm leading-7 text-[#68736e]">
                  Open UGC HQ, scan new paid opportunities, save the ones that
                  fit, and click through to apply on the original platform.
                </div>
              </div>

              <div className="mt-9 flex flex-wrap items-center gap-3">
                <Link href="/onboarding">
                  <Button
                    size="lg"
                    className="h-12 rounded-none bg-[#12745f] px-7 text-base font-semibold text-white hover:bg-[#0f604f]"
                  >
                    Set up my feed
                    <ChevronRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
                <Link href="/opportunities">
                  <Button
                    size="lg"
                    variant="outline"
                    className="h-12 rounded-none border-[#111111] bg-transparent px-7 text-base hover:bg-[#111111] hover:text-white"
                  >
                    Browse demo
                    <ArrowUpRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, delay: 0.1, ease: "easeOut" }}
              className="relative"
            >
              <div className="mb-5 flex items-center justify-between border-b border-[#d9d3c8] pb-4">
                <div className="flex items-center gap-3">
                  <LogoMark className="h-10 w-10 rounded-[14px]" />
                  <div>
                    <p className="font-semibold">Matched jobs today</p>
                    <p className="text-sm text-[#748079]">14 new paid gigs</p>
                  </div>
                </div>
                <span className="text-sm font-semibold text-[#12745f]">
                  live
                </span>
              </div>

              <div className="divide-y divide-[#d9d3c8] border-y border-[#d9d3c8]">
                {sampleGigs.map((gig, index) => (
                  <motion.div
                    key={`${gig.platform}-${gig.brand}`}
                    initial={{ opacity: 0, x: 18 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.45, delay: 0.18 + index * 0.08 }}
                    className="grid grid-cols-[1fr_auto] gap-5 py-5"
                  >
                    <div>
                      <div className="mb-2 flex items-center gap-2 text-xs uppercase tracking-[0.18em] text-[#7a837f]">
                        <span>{gig.platform}</span>
                        <span className="h-1 w-1 bg-[#12745f]" />
                        <span>{gig.tag}</span>
                      </div>
                      <p className="text-lg font-semibold">{gig.brand}</p>
                      <p className="mt-1 text-sm text-[#59645f]">
                        {gig.title}
                      </p>
                    </div>
                    <div className="self-start text-right text-xl font-semibold text-[#12745f]">
                      {gig.pay}
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        <section className="px-5 py-10">
          <div className="mx-auto max-w-7xl border-y border-[#d9d3c8] py-7">
            <div className="flex flex-wrap gap-x-7 gap-y-3 text-sm text-[#56615c]">
              {platformNames.map((platform) => (
                <span key={platform}>{platform}</span>
              ))}
            </div>
          </div>
        </section>

        <section className="px-5 py-14">
          <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.85fr_1fr]">
            <div>
              <p className="mb-3 text-sm font-semibold uppercase tracking-[0.18em] text-[#12745f]">
                Product loop
              </p>
              <h2 className="text-5xl font-semibold leading-none tracking-[-0.04em]">
                How creators use it.
              </h2>
            </div>
            <div className="grid gap-x-8 gap-y-7 md:grid-cols-2">
              {principles.map((item) => (
                <div key={item.label} className="border-t border-[#d9d3c8] pt-5">
                  <item.icon className="mb-8 h-5 w-5 text-[#12745f]" />
                  <p className="text-xl font-semibold">{item.label}</p>
                  <p className="mt-2 text-sm leading-6 text-[#68736e]">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
