"use client";

import { FormEvent, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { ArrowUpRight, Trash2 } from "lucide-react";
import { Opportunity } from "@/lib/opportunities-data";
import { niches, Niche, platforms } from "@/lib/platforms-data";
import {
  addImportedOpportunity,
  deleteImportedOpportunity,
  generateId,
  getImportedOpportunities,
} from "@/lib/store";
import { cn } from "@/lib/utils";

type FormState = {
  platformId: string;
  brand: string;
  title: string;
  description: string;
  payDisplay: string;
  payMin: string;
  payMax: string;
  applyUrl: string;
  deadline: string;
  country: string;
  contentType: "video" | "photo" | "both";
  deliverables: string;
  spotsLeft: string;
  sourceType: "public" | "logged-in" | "email" | "community";
  requiresPosting: boolean;
  giftedOnly: boolean;
  followerRequirement: string;
};

const initialForm: FormState = {
  platformId: "sideshift",
  brand: "",
  title: "",
  description: "",
  payDisplay: "",
  payMin: "",
  payMax: "",
  applyUrl: "",
  deadline: "",
  country: "US",
  contentType: "video",
  deliverables: "",
  spotsLeft: "",
  sourceType: "public",
  requiresPosting: false,
  giftedOnly: false,
  followerRequirement: "",
};

export default function ImportPage() {
  const [form, setForm] = useState<FormState>(initialForm);
  const [selectedNiches, setSelectedNiches] = useState<Niche[]>([]);
  const [imported, setImported] = useState<Opportunity[]>([]);

  useEffect(() => {
    setImported(getImportedOpportunities());
  }, []);

  const selectedPlatform = useMemo(
    () => platforms.find((platform) => platform.id === form.platformId),
    [form.platformId]
  );

  const update = <K extends keyof FormState>(key: K, value: FormState[K]) => {
    setForm((current) => ({ ...current, [key]: value }));
  };

  const toggleNiche = (niche: Niche) => {
    setSelectedNiches((current) =>
      current.includes(niche)
        ? current.filter((item) => item !== niche)
        : [...current, niche]
    );
  };

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    if (!selectedPlatform) return;

    const opportunity: Opportunity = {
      id: `manual-${generateId()}`,
      platformId: selectedPlatform.id,
      platformName: selectedPlatform.name,
      brand: form.brand.trim(),
      title: form.title.trim(),
      description: form.description.trim(),
      payMin: Number(form.payMin) || 0,
      payMax: Number(form.payMax) || Number(form.payMin) || 0,
      payDisplay: form.payDisplay.trim() || "Pay listed on platform",
      niches: selectedNiches.length ? selectedNiches : ["lifestyle"],
      contentType: form.contentType,
      deliverables: form.deliverables
        .split(",")
        .map((item) => item.trim())
        .filter(Boolean),
      deadline: form.deadline || undefined,
      postedAt: new Date().toISOString().slice(0, 10),
      applyUrl: form.applyUrl.trim() || selectedPlatform.signupUrl,
      isNew: true,
      spotsLeft: form.spotsLeft ? Number(form.spotsLeft) : undefined,
      country: form.country.trim() || undefined,
      sourceType: form.sourceType,
      requiresPosting: form.requiresPosting,
      giftedOnly: form.giftedOnly,
      followerRequirement: form.followerRequirement.trim() || undefined,
    };

    addImportedOpportunity(opportunity);
    setImported(getImportedOpportunities());
    setForm({
      ...initialForm,
      platformId: form.platformId,
      country: form.country,
      sourceType: form.sourceType,
    });
    setSelectedNiches([]);
  };

  const removeImported = (id: string) => {
    deleteImportedOpportunity(id);
    setImported(getImportedOpportunities());
  };

  return (
    <div className="min-h-screen px-6 py-8 lg:px-10">
      <div className="max-w-6xl">
        <div className="mb-10 grid gap-8 lg:grid-cols-[1fr_auto] lg:items-end">
          <div>
            <p className="mb-4 text-sm font-semibold uppercase tracking-[0.18em] text-[#12745f]">
              Internal importer
            </p>
            <h1 className="text-5xl font-semibold leading-none tracking-[-0.045em] text-[#101410] md:text-6xl">
              Add a UGC job.
            </h1>
            <p className="mt-5 max-w-2xl text-base leading-7 text-[#56615c]">
              Paste real opportunities here as you find them. Imported jobs show
              up immediately at the top of the public feed on this browser.
            </p>
          </div>
          <Link href="/opportunities">
            <Button
              variant="outline"
              className="rounded-none border-[#111111] bg-transparent hover:bg-[#111111] hover:text-white"
            >
              View feed
              <ArrowUpRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>

        <div className="grid gap-10 lg:grid-cols-[1fr_0.78fr]">
          <form
            onSubmit={handleSubmit}
            className="border-y border-[#d9d3c8] py-6"
          >
            <div className="grid gap-5 md:grid-cols-2">
              <Field label="Platform">
                <Select
                  value={form.platformId}
                  onValueChange={(value) => update("platformId", value ?? "billo")}
                >
                  <SelectTrigger className="rounded-none border-[#d9d3c8] bg-transparent">
                    <SelectValue placeholder="Select platform" />
                  </SelectTrigger>
                  <SelectContent>
                    {platforms.map((platform) => (
                      <SelectItem key={platform.id} value={platform.id}>
                        {platform.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </Field>

              <Field label="Apply URL">
                <Input
                  className="rounded-none border-[#d9d3c8] bg-transparent"
                  placeholder="https://..."
                  value={form.applyUrl}
                  onChange={(event) => update("applyUrl", event.target.value)}
                />
              </Field>

              <Field label="Brand">
                <Input
                  required
                  className="rounded-none border-[#d9d3c8] bg-transparent"
                  placeholder="Brand name"
                  value={form.brand}
                  onChange={(event) => update("brand", event.target.value)}
                />
              </Field>

              <Field label="Job title">
                <Input
                  required
                  className="rounded-none border-[#d9d3c8] bg-transparent"
                  placeholder="Short job title"
                  value={form.title}
                  onChange={(event) => update("title", event.target.value)}
                />
              </Field>

              <Field label="Pay display">
                <Input
                  required
                  className="rounded-none border-[#d9d3c8] bg-transparent"
                  placeholder="$150, $75-$120, product + $100"
                  value={form.payDisplay}
                  onChange={(event) => update("payDisplay", event.target.value)}
                />
              </Field>

              <div className="grid grid-cols-2 gap-3">
                <Field label="Pay min">
                  <Input
                    className="rounded-none border-[#d9d3c8] bg-transparent"
                    inputMode="numeric"
                    placeholder="75"
                    value={form.payMin}
                    onChange={(event) => update("payMin", event.target.value)}
                  />
                </Field>
                <Field label="Pay max">
                  <Input
                    className="rounded-none border-[#d9d3c8] bg-transparent"
                    inputMode="numeric"
                    placeholder="150"
                    value={form.payMax}
                    onChange={(event) => update("payMax", event.target.value)}
                  />
                </Field>
              </div>

              <Field label="Content type">
                <Select
                  value={form.contentType}
                  onValueChange={(value) =>
                    update("contentType", (value ?? "video") as FormState["contentType"])
                  }
                >
                  <SelectTrigger className="rounded-none border-[#d9d3c8] bg-transparent">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="video">Video</SelectItem>
                    <SelectItem value="photo">Photo</SelectItem>
                    <SelectItem value="both">Video + photo</SelectItem>
                  </SelectContent>
                </Select>
              </Field>

              <Field label="Deadline">
                <Input
                  type="date"
                  className="rounded-none border-[#d9d3c8] bg-transparent"
                  value={form.deadline}
                  onChange={(event) => update("deadline", event.target.value)}
                />
              </Field>

              <Field label="Country">
                <Input
                  className="rounded-none border-[#d9d3c8] bg-transparent"
                  placeholder="US, UK, CA..."
                  value={form.country}
                  onChange={(event) => update("country", event.target.value)}
                />
              </Field>

              <Field label="Source">
                <Select
                  value={form.sourceType}
                  onValueChange={(value) =>
                    update("sourceType", (value ?? "public") as FormState["sourceType"])
                  }
                >
                  <SelectTrigger className="rounded-none border-[#d9d3c8] bg-transparent">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="public">Public listing</SelectItem>
                    <SelectItem value="logged-in">Logged-in platform</SelectItem>
                    <SelectItem value="email">Email digest</SelectItem>
                    <SelectItem value="community">Community submitted</SelectItem>
                  </SelectContent>
                </Select>
              </Field>

              <Field label="Spots left">
                <Input
                  className="rounded-none border-[#d9d3c8] bg-transparent"
                  inputMode="numeric"
                  placeholder="Optional"
                  value={form.spotsLeft}
                  onChange={(event) => update("spotsLeft", event.target.value)}
                />
              </Field>

              <Field label="Follower requirement">
                <Input
                  className="rounded-none border-[#d9d3c8] bg-transparent"
                  placeholder="No minimum listed"
                  value={form.followerRequirement}
                  onChange={(event) =>
                    update("followerRequirement", event.target.value)
                  }
                />
              </Field>

              <div className="md:col-span-2">
                <Field label="Description">
                  <Textarea
                    required
                    className="min-h-28 rounded-none border-[#d9d3c8] bg-transparent"
                    placeholder="What does the creator need to make?"
                    value={form.description}
                    onChange={(event) =>
                      update("description", event.target.value)
                    }
                  />
                </Field>
              </div>

              <div className="md:col-span-2">
                <Field label="Deliverables">
                  <Input
                    className="rounded-none border-[#d9d3c8] bg-transparent"
                    placeholder="1x 30-sec video, raw footage, 3 story clips"
                    value={form.deliverables}
                    onChange={(event) =>
                      update("deliverables", event.target.value)
                    }
                  />
                </Field>
              </div>

              <div className="md:col-span-2">
                <Label className="mb-2 block text-sm font-semibold text-[#101410]">
                  Categories
                </Label>
                <div className="flex flex-wrap gap-2">
                  {niches.map((niche) => {
                    const active = selectedNiches.includes(niche.value);
                    return (
                      <button
                        key={niche.value}
                        type="button"
                        onClick={() => toggleNiche(niche.value)}
                        className={cn(
                          "border px-2.5 py-1.5 text-xs font-medium transition-colors",
                          active
                            ? "border-[#12745f] bg-[#12745f] text-white"
                            : "border-[#d9d3c8] text-[#56615c] hover:border-[#12745f] hover:text-[#12745f]"
                        )}
                      >
                        {niche.emoji} {niche.label}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="flex flex-wrap gap-5 md:col-span-2">
                <label className="flex items-center gap-2 text-sm text-[#56615c]">
                  <input
                    type="checkbox"
                    checked={form.requiresPosting}
                    onChange={(event) =>
                      update("requiresPosting", event.target.checked)
                    }
                  />
                  Requires posting
                </label>
                <label className="flex items-center gap-2 text-sm text-[#56615c]">
                  <input
                    type="checkbox"
                    checked={form.giftedOnly}
                    onChange={(event) =>
                      update("giftedOnly", event.target.checked)
                    }
                  />
                  Gifted/product-only
                </label>
              </div>
            </div>

            <Button
              type="submit"
              className="mt-7 rounded-none bg-[#12745f] px-7 hover:bg-[#0f604f]"
            >
              Import job
            </Button>
          </form>

          <aside>
            <div className="mb-4 border-b border-[#d9d3c8] pb-3">
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#12745f]">
                Imported locally
              </p>
              <p className="mt-1 text-sm text-[#68736e]">
                {imported.length} manual jobs in this browser.
              </p>
            </div>

            <div className="space-y-4">
              {imported.length === 0 ? (
                <p className="text-sm leading-6 text-[#68736e]">
                  No manual jobs yet. Import one and it will appear at the top
                  of the Opportunities feed.
                </p>
              ) : (
                imported.map((opportunity) => (
                  <div
                    key={opportunity.id}
                    className="border-b border-[#d9d3c8] pb-4"
                  >
                    <div className="mb-2 flex items-start justify-between gap-3">
                      <div>
                        <p className="text-sm font-semibold text-[#101410]">
                          {opportunity.brand}
                        </p>
                        <p className="mt-1 text-sm text-[#68736e]">
                          {opportunity.title}
                        </p>
                      </div>
                      <button
                        type="button"
                        onClick={() => removeImported(opportunity.id)}
                        className="text-[#8a918d] transition-colors hover:text-red-600"
                        title="Delete imported job"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      <Badge className="rounded-none bg-[#e5f6f0] text-[#12745f]">
                        {opportunity.platformName}
                      </Badge>
                      <Badge className="rounded-none bg-[#efede7] text-[#56615c]">
                        {opportunity.payDisplay}
                      </Badge>
                    </div>
                  </div>
                ))
              )}
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}

function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <Label className="mb-2 block text-sm font-semibold text-[#101410]">
        {label}
      </Label>
      {children}
    </div>
  );
}
