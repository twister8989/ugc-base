# UGC HQ

UGC HQ is a feed-first app for creators who want paid UGC work without checking every marketplace one by one.

Core promise:

> Find paid UGC gigs across Billo, SideShift, Insense, JoinBrands, Cohley, Collabstr, and more.

## Product Focus

The app is intentionally centered around the opportunity feed:

- `Opportunities`: the main feed of paid UGC briefs, filterable by niche, platform, and content type.
- `Platforms`: a directory of UGC platforms with signup links, pay ranges, and fit notes.
- `Saved`: a shortlist of briefs to apply to later.
- `Profile`: creator matching settings for niche and content type.

Income tracking still exists at `/income`, but it is no longer part of the main navigation. It can come back later once the feed is valuable enough to become a daily habit.

## Roadmap

1. Expand platform coverage and keep SideShift, Billo, Insense, JoinBrands, Cohley, Collabstr, Trend, Creator.co, Popular Pays, Skeepers, and #paid current.
2. Add live opportunity collection from public pages where possible.
3. Add email digest parsing for logged-in platform opportunities.
4. Add community-submitted briefs.
5. Add daily alerts by niche.
6. Add Supabase auth/data persistence.
7. Add Stripe for paid unlimited alerts and advanced filters.

## Development

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Verification

```bash
npx tsc --noEmit
npm run build
```
