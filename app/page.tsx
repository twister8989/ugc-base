import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Zap,
  TrendingUp,
  Search,
  DollarSign,
  LayoutGrid,
  ChevronRight,
  Star,
} from "lucide-react";

const features = [
  {
    icon: Search,
    title: "Opportunity Feed",
    description:
      "Every open gig across 20+ platforms, filtered to your niche. Updated daily.",
    color: "text-violet-600",
    bg: "bg-violet-50",
  },
  {
    icon: LayoutGrid,
    title: "Platform Directory",
    description:
      "All 20+ UGC platforms in one place — pay rates, niche fit, difficulty, and sign-up links.",
    color: "text-blue-600",
    bg: "bg-blue-50",
  },
  {
    icon: DollarSign,
    title: "Income Dashboard",
    description:
      "Track every dollar across every platform. Monthly totals, by-platform breakdown, and tax-ready exports.",
    color: "text-green-600",
    bg: "bg-green-50",
  },
  {
    icon: TrendingUp,
    title: "Growth Tracker",
    description:
      "See which platforms are earning you the most and where you're leaving money on the table.",
    color: "text-orange-600",
    bg: "bg-orange-50",
  },
];

const stats = [
  { value: "20+", label: "Platforms tracked" },
  { value: "$500–$5k", label: "Creator monthly range" },
  { value: "1 app", label: "Instead of 20 tabs" },
];

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Nav */}
      <nav className="border-b border-gray-100 px-6 py-4">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-violet-600 flex items-center justify-center">
              <Zap className="w-4 h-4 text-white" />
            </div>
            <span className="font-bold text-lg text-gray-900">UGC Base</span>
          </div>
          <div className="flex items-center gap-3">
            <Link href="/dashboard">
              <Button variant="ghost" size="sm">
                Sign in
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

      {/* Hero */}
      <section className="px-6 pt-20 pb-16 text-center">
        <div className="max-w-3xl mx-auto">
          <Badge
            variant="secondary"
            className="mb-6 bg-violet-50 text-violet-700 border-violet-200"
          >
            <Zap className="w-3 h-3 mr-1" />
            The UGC creator OS
          </Badge>
          <h1 className="text-5xl font-bold text-gray-900 mb-6 leading-tight">
            Stop juggling 20 tabs.
            <br />
            <span className="text-violet-600">Run your UGC business here.</span>
          </h1>
          <p className="text-xl text-gray-500 mb-10 leading-relaxed">
            UGC Base is headquarters for creators. Find opportunities across
            every platform, track your income in one place, and grow your
            business — without the chaos.
          </p>
          <div className="flex items-center justify-center gap-4 flex-wrap">
            <Link href="/onboarding">
              <Button
                size="lg"
                className="bg-violet-600 hover:bg-violet-700 gap-2 text-base px-8"
              >
                Start for free
                <ChevronRight className="w-4 h-4" />
              </Button>
            </Link>
            <Link href="/dashboard">
              <Button size="lg" variant="outline" className="text-base px-8">
                View demo
              </Button>
            </Link>
          </div>
          <p className="text-sm text-gray-400 mt-4">
            Free forever · No credit card required
          </p>
        </div>
      </section>

      {/* Stats */}
      <section className="px-6 py-12 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-3 gap-8 text-center">
            {stats.map((stat) => (
              <div key={stat.label}>
                <div className="text-3xl font-bold text-gray-900 mb-1">
                  {stat.value}
                </div>
                <div className="text-sm text-gray-500">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="px-6 py-20">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Everything you need, nothing you don&apos;t
            </h2>
            <p className="text-gray-500 text-lg">
              Built specifically for UGC creators who want to treat this like a
              real business.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {features.map((f) => (
              <div
                key={f.title}
                className="p-6 rounded-2xl border border-gray-100 hover:border-violet-200 hover:shadow-sm transition-all"
              >
                <div
                  className={`w-10 h-10 rounded-xl ${f.bg} flex items-center justify-center mb-4`}
                >
                  <f.icon className={`w-5 h-5 ${f.color}`} />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">{f.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">
                  {f.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Platform strip */}
      <section className="px-6 py-16 bg-gray-50">
        <div className="max-w-5xl mx-auto text-center">
          <p className="text-sm text-gray-400 uppercase tracking-wider mb-6 font-medium">
            Covering all the platforms you care about
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            {[
              "Billo",
              "Insense",
              "JoinBrands",
              "Cohley",
              "Collabstr",
              "Twirl",
              "Trend",
              "Creator.co",
              "Popular Pays",
              "Hashtagpaid",
              "LTK",
              "Peersway",
              "TRIBE",
              "Social Native",
              "Obviously",
              "Skeepers",
              "+ more",
            ].map((p) => (
              <Badge
                key={p}
                variant="secondary"
                className="bg-white border border-gray-200 text-gray-600 text-xs px-3 py-1"
              >
                {p}
              </Badge>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="px-6 py-20">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Simple pricing
          </h2>
          <p className="text-gray-500 mb-12">
            Free until you&apos;re ready to go pro. No tricks.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Free */}
            <div className="p-8 rounded-2xl border-2 border-gray-200 text-left">
              <div className="text-xl font-bold text-gray-900 mb-1">Free</div>
              <div className="text-3xl font-bold text-gray-900 mb-6">
                $0
                <span className="text-base font-normal text-gray-400">
                  /mo
                </span>
              </div>
              <ul className="space-y-3 text-sm text-gray-600">
                {[
                  "Full platform directory",
                  "Opportunity feed (your niche)",
                  "Income tracker (manual)",
                  "90 days of history",
                ].map((item) => (
                  <li key={item} className="flex items-center gap-2">
                    <span className="text-green-500">✓</span> {item}
                  </li>
                ))}
              </ul>
              <Link href="/onboarding" className="block mt-8">
                <Button variant="outline" className="w-full">
                  Start free
                </Button>
              </Link>
            </div>
            {/* Pro */}
            <div className="p-8 rounded-2xl border-2 border-violet-600 text-left relative">
              <Badge className="absolute top-4 right-4 bg-violet-600 text-white text-xs">
                <Star className="w-3 h-3 mr-1" />
                Most popular
              </Badge>
              <div className="text-xl font-bold text-gray-900 mb-1">Pro</div>
              <div className="text-3xl font-bold text-gray-900 mb-6">
                $14
                <span className="text-base font-normal text-gray-400">
                  /mo
                </span>
              </div>
              <ul className="space-y-3 text-sm text-gray-600">
                {[
                  "Everything in Free",
                  "Unlimited income history",
                  "Tax-ready annual reports",
                  "AI script & pitch generator",
                  "Platform match quiz",
                  "Priority opportunity alerts",
                ].map((item) => (
                  <li key={item} className="flex items-center gap-2">
                    <span className="text-violet-500">✓</span> {item}
                  </li>
                ))}
              </ul>
              <Link href="/onboarding" className="block mt-8">
                <Button className="w-full bg-violet-600 hover:bg-violet-700">
                  Start free trial
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-100 px-6 py-8">
        <div className="max-w-6xl mx-auto flex items-center justify-between text-sm text-gray-400">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded bg-violet-600 flex items-center justify-center">
              <Zap className="w-3 h-3 text-white" />
            </div>
            <span className="font-medium text-gray-600">UGC Base</span>
          </div>
          <span>Built for creators, by creators.</span>
        </div>
      </footer>
    </div>
  );
}
