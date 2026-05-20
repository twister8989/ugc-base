"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import {
  DollarSign,
  Plus,
  Trash2,
  TrendingUp,
  Clock,
  CheckCircle,
} from "lucide-react";
import {
  getIncomeEntries,
  addIncomeEntry,
  deleteIncomeEntry,
  updateIncomeEntry,
  generateId,
  IncomeEntry,
} from "@/lib/store";
import { platforms } from "@/lib/platforms-data";
import { format, startOfMonth, endOfMonth, isWithinInterval } from "date-fns";

const MONTHS = [
  "Jan","Feb","Mar","Apr","May","Jun",
  "Jul","Aug","Sep","Oct","Nov","Dec",
];

export default function IncomePage() {
  const [entries, setEntries] = useState<IncomeEntry[]>([]);
  const [open, setOpen] = useState(false);
  const [filterMonth, setFilterMonth] = useState<string>("all");
  const [filterPlatform, setFilterPlatform] = useState<string>("all");

  // Form state
  const [form, setForm] = useState({
    platformId: "",
    brand: "",
    amount: "",
    date: new Date().toISOString().split("T")[0],
    description: "",
    status: "received" as "received" | "pending",
  });

  const reload = () => setEntries(getIncomeEntries());

  useEffect(() => {
    reload();
  }, []);

  const handleSubmit = () => {
    if (!form.platformId || !form.brand || !form.amount) return;
    const platform = platforms.find((p) => p.id === form.platformId);
    addIncomeEntry({
      id: generateId(),
      platformId: form.platformId,
      platformName: platform?.name ?? form.platformId,
      brand: form.brand,
      amount: parseFloat(form.amount),
      date: form.date,
      description: form.description,
      status: form.status,
    });
    setForm({
      platformId: "",
      brand: "",
      amount: "",
      date: new Date().toISOString().split("T")[0],
      description: "",
      status: "received",
    });
    setOpen(false);
    reload();
  };

  const handleDelete = (id: string) => {
    deleteIncomeEntry(id);
    reload();
  };

  const handleToggleStatus = (entry: IncomeEntry) => {
    updateIncomeEntry({
      ...entry,
      status: entry.status === "received" ? "pending" : "received",
    });
    reload();
  };

  // Filter
  const now = new Date();
  const filtered = entries.filter((e) => {
    if (filterPlatform !== "all" && e.platformId !== filterPlatform) return false;
    if (filterMonth !== "all") {
      const [yr, mo] = filterMonth.split("-").map(Number);
      const start = startOfMonth(new Date(yr, mo - 1));
      const end = endOfMonth(new Date(yr, mo - 1));
      if (!isWithinInterval(new Date(e.date), { start, end })) return false;
    }
    return true;
  });

  const sorted = [...filtered].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  // Stats
  const totalReceived = entries
    .filter((e) => e.status === "received")
    .reduce((s, e) => s + e.amount, 0);
  const totalPending = entries
    .filter((e) => e.status === "pending")
    .reduce((s, e) => s + e.amount, 0);
  const thisMonthTotal = entries
    .filter((e) => {
      const d = new Date(e.date);
      return (
        d.getMonth() === now.getMonth() &&
        d.getFullYear() === now.getFullYear()
      );
    })
    .reduce((s, e) => s + e.amount, 0);

  // By platform breakdown
  const byPlatform = entries.reduce((acc, e) => {
    acc[e.platformName] = (acc[e.platformName] ?? 0) + e.amount;
    return acc;
  }, {} as Record<string, number>);
  const platformBreakdown = Object.entries(byPlatform)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5);

  // Months for filter
  const availableMonths = Array.from(
    new Set(
      entries.map((e) => {
        const d = new Date(e.date);
        return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`;
      })
    )
  ).sort().reverse();

  const usedPlatformIds = Array.from(new Set(entries.map((e) => e.platformId)));

  return (
    <div className="p-8 max-w-5xl">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Income</h1>
          <p className="text-gray-500 mt-1">
            Track every dollar across every platform.
          </p>
        </div>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger className="inline-flex items-center justify-center gap-2 rounded-md bg-violet-600 px-4 py-2 text-sm font-medium text-white hover:bg-violet-700 transition-colors">
            <Plus className="w-4 h-4" />
            Log income
          </DialogTrigger>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Log a deal</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 mt-2">
              <div>
                <Label className="text-sm font-medium mb-1.5 block">Platform</Label>
                <Select
                  value={form.platformId}
                  onValueChange={(v) => setForm({ ...form, platformId: v ?? "" })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select platform..." />
                  </SelectTrigger>
                  <SelectContent>
                    {platforms.map((p) => (
                      <SelectItem key={p.id} value={p.id}>
                        {p.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label className="text-sm font-medium mb-1.5 block">Brand name</Label>
                <Input
                  placeholder="e.g. Nike, SkinCo, PetPals..."
                  value={form.brand}
                  onChange={(e) => setForm({ ...form, brand: e.target.value })}
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <Label className="text-sm font-medium mb-1.5 block">Amount ($)</Label>
                  <Input
                    type="number"
                    placeholder="150"
                    value={form.amount}
                    onChange={(e) => setForm({ ...form, amount: e.target.value })}
                  />
                </div>
                <div>
                  <Label className="text-sm font-medium mb-1.5 block">Date</Label>
                  <Input
                    type="date"
                    value={form.date}
                    onChange={(e) => setForm({ ...form, date: e.target.value })}
                  />
                </div>
              </div>
              <div>
                <Label className="text-sm font-medium mb-1.5 block">Status</Label>
                <Select
                  value={form.status}
                  onValueChange={(v) =>
                    setForm({ ...form, status: (v ?? "received") as "received" | "pending" })
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="received">✅ Received</SelectItem>
                    <SelectItem value="pending">⏳ Pending</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label className="text-sm font-medium mb-1.5 block">
                  Notes{" "}
                  <span className="text-gray-400 font-normal">(optional)</span>
                </Label>
                <Textarea
                  placeholder="e.g. 30-sec skincare review video"
                  rows={2}
                  value={form.description}
                  onChange={(e) =>
                    setForm({ ...form, description: e.target.value })
                  }
                />
              </div>
              <Button
                className="w-full bg-violet-600 hover:bg-violet-700"
                onClick={handleSubmit}
                disabled={!form.platformId || !form.brand || !form.amount}
              >
                Save deal
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4 mb-8">
        <div className="bg-white rounded-2xl border border-gray-100 p-5">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-7 h-7 bg-green-50 rounded-lg flex items-center justify-center">
              <DollarSign className="w-3.5 h-3.5 text-green-600" />
            </div>
            <span className="text-xs text-gray-500 font-medium uppercase tracking-wide">This month</span>
          </div>
          <div className="text-2xl font-bold text-gray-900">
            ${thisMonthTotal.toLocaleString()}
          </div>
        </div>
        <div className="bg-white rounded-2xl border border-gray-100 p-5">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-7 h-7 bg-violet-50 rounded-lg flex items-center justify-center">
              <TrendingUp className="w-3.5 h-3.5 text-violet-600" />
            </div>
            <span className="text-xs text-gray-500 font-medium uppercase tracking-wide">Total received</span>
          </div>
          <div className="text-2xl font-bold text-gray-900">
            ${totalReceived.toLocaleString()}
          </div>
        </div>
        <div className="bg-white rounded-2xl border border-gray-100 p-5">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-7 h-7 bg-orange-50 rounded-lg flex items-center justify-center">
              <Clock className="w-3.5 h-3.5 text-orange-500" />
            </div>
            <span className="text-xs text-gray-500 font-medium uppercase tracking-wide">Pending</span>
          </div>
          <div className="text-2xl font-bold text-gray-900">
            ${totalPending.toLocaleString()}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-6">
        {/* Entries list */}
        <div className="col-span-2">
          {/* Filters */}
          <div className="flex gap-3 mb-4">
            <Select value={filterMonth} onValueChange={(v) => setFilterMonth(v ?? "all")}>
              <SelectTrigger className="w-36 bg-white border-gray-200 text-sm">
                <SelectValue placeholder="All time" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All time</SelectItem>
                {availableMonths.map((m) => {
                  const [yr, mo] = m.split("-");
                  return (
                    <SelectItem key={m} value={m}>
                      {MONTHS[parseInt(mo) - 1]} {yr}
                    </SelectItem>
                  );
                })}
              </SelectContent>
            </Select>

            <Select value={filterPlatform} onValueChange={(v) => setFilterPlatform(v ?? "all")}>
              <SelectTrigger className="w-40 bg-white border-gray-200 text-sm">
                <SelectValue placeholder="All platforms" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All platforms</SelectItem>
                {usedPlatformIds.map((id) => {
                  const p = platforms.find((pl) => pl.id === id);
                  return (
                    <SelectItem key={id} value={id}>
                      {p?.name ?? id}
                    </SelectItem>
                  );
                })}
              </SelectContent>
            </Select>
          </div>

          {sorted.length === 0 ? (
            <div className="bg-white rounded-2xl border border-gray-100 p-12 text-center">
              <DollarSign className="w-10 h-10 text-gray-200 mx-auto mb-3" />
              <p className="text-gray-500 font-medium mb-1">No income logged yet</p>
              <p className="text-sm text-gray-400 mb-4">
                Start tracking your UGC earnings here.
              </p>
              <Button
                className="bg-violet-600 hover:bg-violet-700"
                onClick={() => setOpen(true)}
              >
                <Plus className="w-4 h-4 mr-2" />
                Log your first deal
              </Button>
            </div>
          ) : (
            <div className="space-y-2">
              {sorted.map((entry) => (
                <div
                  key={entry.id}
                  className="bg-white rounded-xl border border-gray-100 px-4 py-3.5 flex items-center justify-between hover:border-gray-200 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-lg bg-violet-50 flex items-center justify-center text-xs font-bold text-violet-700">
                      {entry.platformName.slice(0, 2).toUpperCase()}
                    </div>
                    <div>
                      <p className="font-medium text-sm text-gray-900">
                        {entry.brand}
                      </p>
                      <p className="text-xs text-gray-400">
                        {entry.platformName} ·{" "}
                        {format(new Date(entry.date), "MMM d, yyyy")}
                        {entry.description && ` · ${entry.description}`}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="font-bold text-gray-900">
                      ${entry.amount.toLocaleString()}
                    </span>
                    <button onClick={() => handleToggleStatus(entry)}>
                      <Badge
                        variant="secondary"
                        className={`text-xs cursor-pointer transition-colors ${
                          entry.status === "received"
                            ? "bg-green-50 text-green-700 hover:bg-green-100"
                            : "bg-orange-50 text-orange-600 hover:bg-orange-100"
                        }`}
                      >
                        {entry.status === "received" ? (
                          <><CheckCircle className="w-2.5 h-2.5 mr-1" />received</>
                        ) : (
                          <><Clock className="w-2.5 h-2.5 mr-1" />pending</>
                        )}
                      </Badge>
                    </button>
                    <button
                      onClick={() => handleDelete(entry.id)}
                      className="p-1 text-gray-300 hover:text-red-400 transition-colors"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Platform breakdown */}
        <div>
          <div className="bg-white rounded-2xl border border-gray-100 p-5">
            <h3 className="font-semibold text-gray-900 text-sm mb-4">
              By platform
            </h3>
            {platformBreakdown.length === 0 ? (
              <p className="text-sm text-gray-400">No data yet.</p>
            ) : (
              <div className="space-y-3">
                {platformBreakdown.map(([name, total]) => {
                  const max = platformBreakdown[0][1];
                  const pct = Math.round((total / max) * 100);
                  return (
                    <div key={name}>
                      <div className="flex justify-between text-xs mb-1">
                        <span className="font-medium text-gray-700">{name}</span>
                        <span className="text-gray-500">
                          ${total.toLocaleString()}
                        </span>
                      </div>
                      <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-violet-500 rounded-full"
                          style={{ width: `${pct}%` }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* Tax note */}
          <div className="mt-4 bg-amber-50 border border-amber-100 rounded-2xl p-4">
            <p className="text-xs font-semibold text-amber-800 mb-1">
              📋 Tax tip
            </p>
            <p className="text-xs text-amber-700 leading-relaxed">
              As a UGC creator you&apos;re self-employed. Keep receipts and set
              aside ~25–30% for taxes.
            </p>
            <p className="text-xs text-amber-600 mt-2 font-medium">
              ✨ Pro: Export tax-ready annual reports →
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
