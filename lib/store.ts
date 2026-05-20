"use client";

// Simple localStorage-based store — no backend needed for MVP
// Swap with Supabase calls when ready to go to production

import { Niche } from "./platforms-data";

export interface UserProfile {
  name: string;
  email: string;
  niches: Niche[];
  contentTypes: ("video" | "photo" | "both")[];
  platforms: string[]; // platform ids they've signed up on
  onboarded: boolean;
}

export interface IncomeEntry {
  id: string;
  platformId: string;
  platformName: string;
  brand: string;
  amount: number;
  date: string;
  description: string;
  status: "pending" | "received";
}

const PROFILE_KEY = "ugcbase_profile";
const INCOME_KEY = "ugcbase_income";
const SAVED_OPPS_KEY = "ugcbase_saved_opps";

export function getProfile(): UserProfile | null {
  if (typeof window === "undefined") return null;
  const raw = localStorage.getItem(PROFILE_KEY);
  return raw ? JSON.parse(raw) : null;
}

export function saveProfile(profile: UserProfile): void {
  localStorage.setItem(PROFILE_KEY, JSON.stringify(profile));
}

export function getIncomeEntries(): IncomeEntry[] {
  if (typeof window === "undefined") return [];
  const raw = localStorage.getItem(INCOME_KEY);
  return raw ? JSON.parse(raw) : [];
}

export function addIncomeEntry(entry: IncomeEntry): void {
  const entries = getIncomeEntries();
  entries.push(entry);
  localStorage.setItem(INCOME_KEY, JSON.stringify(entries));
}

export function deleteIncomeEntry(id: string): void {
  const entries = getIncomeEntries().filter((e) => e.id !== id);
  localStorage.setItem(INCOME_KEY, JSON.stringify(entries));
}

export function updateIncomeEntry(updated: IncomeEntry): void {
  const entries = getIncomeEntries().map((e) =>
    e.id === updated.id ? updated : e
  );
  localStorage.setItem(INCOME_KEY, JSON.stringify(entries));
}

export function getSavedOpportunities(): string[] {
  if (typeof window === "undefined") return [];
  const raw = localStorage.getItem(SAVED_OPPS_KEY);
  return raw ? JSON.parse(raw) : [];
}

export function toggleSavedOpportunity(id: string): void {
  const saved = getSavedOpportunities();
  const idx = saved.indexOf(id);
  if (idx === -1) saved.push(id);
  else saved.splice(idx, 1);
  localStorage.setItem(SAVED_OPPS_KEY, JSON.stringify(saved));
}

export function generateId(): string {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
}
