# Children's Party Finder - Implementation Plan

## 1. Project Overview

- **Project Name**: Children's Party Finder
- **Type**: Interactive Web Application (Next.js)
- **Core Functionality**: Help London parents find children's birthday party venues with filters for location, age, activity type, and party size
- **Target Users**: Parents in London planning kids' birthdays, party planners

---

## 2. Tech Stack

| Layer | Technology |
|-------|------------|
| Framework | Next.js 14 (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS |
| Database | SQLite (dev) / PostgreSQL (prod) with Prisma |
| Maps | Leaflet + React-Leaflet (OpenStreetMap) |
| Forms | React Hook Form + Zod |
| HTTP Client | Built-in fetch |
| Hosting | Vercel (ready) |

---

## 3. Project Structure

```
child_party_finder/
├── .env.example                 # Environment variables template
├── .gitignore                   # Git ignore rules
├── next.config.js               # Next.js configuration
├── package.json                 # Dependencies
├── tsconfig.json                # TypeScript config
├── tailwind.config.ts           # Tailwind configuration
├── postcss.config.mjs           # PostCSS configuration
├── prisma/
│   ├── schema.prisma            # Database schema
│   └── seed.ts                  # Seed data script
├── public/
│   └── images/
│       └── placeholder.jpg      # Default venue image
├── src/
│   ├── app/
│   │   ├── layout.tsx           # Root layout
│   │   ├── page.tsx             # Homepage (search + results)
│   │   ├── globals.css          # Global styles
│   │   └── providers/
│   │       └── [id]/
│   │           └── page.tsx     # Venue detail page
│   ├── components/
│   │   ├── ui/
│   │   │   ├── Button.tsx       # Reusable button
│   │   │   ├── Card.tsx         # Venue card
│   │   │   ├── Select.tsx       # Dropdown select
│   │   │   ├── Checkbox.tsx     # Checkbox filter
│   │   │   └── Badge.tsx        # Tag/badge component
│   │   ├── search/
│   │   │   ├── SearchForm.tsx   # Main search form
│   │   │   ├── LocationInput.tsx # Borough/postcode input
│   │   │   ├── AgeFilter.tsx    # Age range filter
│   │   │   ├── ActivityFilter.tsx # Activity type filter
│   │   │   ├── SizeFilter.tsx   # Party size filter
│   │   │   └── SortSelect.tsx   # Sort dropdown
│   │   ├── results/
│   │   │   ├── ResultsGrid.tsx   # Venue results grid
│   │   │   ├── VenueCard.tsx    # Individual venue card
│   │   │   ├── MapView.tsx      # Leaflet map
│   │   │   └── EmptyState.tsx   # No results message
│   │   └── layout/
│   │       ├── Header.tsx       # App header
│   │       └── Footer.tsx       # App footer
│   ├── lib/
│   │   ├── db.ts                # Prisma client
│   │   ├── constants.ts         # Boroughs, activities, etc.
│   │   └── utils.ts             # Helper functions
│   ├── types/
│   │   └── index.ts             # TypeScript interfaces
│   └── data/
│       └── seed-data.ts         # Sample venue data (50+)
└── IMPLEMENTATION_STEPS.md      # This file
```

---

## 4. Implementation Phases

### Phase 1: Foundation (Days 1-2)

| Step | Task | Files |
|------|------|-------|
| 1.1 | Initialize Next.js project with TypeScript + Tailwind | `package.json`, `tsconfig.json`, `tailwind.config.ts` |
| 1.2 | Set up Prisma with SQLite schema | `prisma/schema.prisma` |
| 1.3 | Create seed data with 50+ London venues | `src/data/seed-data.ts`, `prisma/seed.ts` |
| 1.4 | Run seed to populate database | - |
| 1.5 | Set up project folder structure | All directories |

### Phase 2: Core UI Components (Days 3-4)

| Step | Task | Files |
|------|------|-------|
| 2.1 | Create reusable UI components | `src/components/ui/*` |
| 2.2 | Build Header and Footer | `src/components/layout/*` |
| 2.3 | Create filter components | `src/components/search/*` |
| 2.4 | Build VenueCard component | `src/components/results/*` |
| 2.5 | Style with Tailwind (colors from PRD) | - |

### Phase 3: Functionality (Days 5-7)

| Step | Task | Files |
|------|------|-------|
| 3.1 | Build search form with all filters | `SearchForm.tsx` |
| 3.2 | Create API route for provider search | `/app/api/providers/route.ts` |
| 3.3 | Implement filtering logic in Prisma | API route |
| 3.4 | Build results grid with sorting | `ResultsGrid.tsx` |
| 3.5 | Add pagination or "load more" | - |

### Phase 4: Map Integration (Day 8)

| Step | Task | Files |
|------|------|-------|
| 4.1 | Install React-Leaflet | package.json |
| 4.2 | Create MapView component | `MapView.tsx` |
| 4.3 | Add map toggle to results page | Results page |
| 4.4 | Show venue pins on map | - |

### Phase 5: Detail Page & Polish (Days 9-10)

| Step | Task | Files |
|------|------|-------|
| 5.1 | Create venue detail page | `/providers/[id]/page.tsx` |
| 5.2 | Add external link tracking | - |
| 5.3 | Performance optimization | - |
| 5.4 | Mobile responsive testing | - |
| 5.5 | Empty states and edge cases | - |

### Phase 6: Testing & Launch Prep (Days 11-12)

| Step | Task | Files |
|------|------|-------|
| 6.1 | Test all filter combinations | - |
| 6.2 | Verify performance (<3s) | - |
| 6.3 | Test with sample users | - |
| 6.4 | Fix bugs and edge cases | - |
| 6.5 | Prepare for Vercel deployment | - |

---

## 5. Data Model

### Provider (Prisma Schema)

```prisma
model Provider {
  id           String   @id @default(cuid())
  name         String
  slug         String   @unique
  description  String?
  address      String
  borough      String
  postcode     String
  latitude     Float
  longitude    Float
  websiteUrl   String?
  phone        String?
  priceMin     Int?     // Price per child (pence)
  priceMax     Int?     // Price per child (pence)
  pricePackage Int?     // Total package price (pence)
  minCapacity  Int
  maxCapacity  Int
  ageMin       Int
  ageMax       Int
  activities   String   // JSON array stored as string
  isIndoor     Boolean  @default(false)
  isOutdoor    Boolean  @default(false)
  imageUrl     String?
  features     String?  // JSON array: parking, catering, etc.
  lastVerified DateTime @default(now())
  createdAt    DateTime @default(now())
  updatedAt    DateTime @updatedAt
}
```

---

## 6. Filter Logic

### API Query Parameters

| Parameter | Type | Example |
|-----------|------|---------|
| `borough` | string | "Camden" |
| `postcode` | string | "SW1A" |
| `ageMin` | number | 5 |
| `ageMax` | number | 10 |
| `activities` | string[] | ["bowling", "cinema"] |
| `sizeMin` | number | 10 |
| `sizeMax` | number | 20 |
| `sortBy` | enum | "price-asc", "price-desc", "name" |
| `page` | number | 1 |
| `limit` | number | 20 |

### Filtering Rules
- If `borough` provided, filter by exact match
- If `postcode` provided, filter by postcode startsWith
- Age filter: provider must overlap with child's age range
- Activity filter: provider must have ALL selected activities
- Size filter: party size must be within provider's min-max capacity

---

## 7. Sample Seed Data Categories

### Boroughs (10 represented)
Camden, Westminster, Southwark, Lambeth, Wandsworth, Hackney, Islington, Kensington & Chelsea, Richmond, Bromley

### Activity Types (seeded)
Soft Play, Bowling, Trampoline Park, Swimming, Art & Craft, Cooking Class, Magic Show, Dance/Music, Animal Experience, Bouncy Castle, Cinema, Laser Tag, Go Karting, Mini Golf, Climbing Wall

### Price Ranges
£8-£15/child (budget)
£15-£25/child (mid-range)
£25-£40/child (premium)

---

## 8. Acceptance Criteria Check

Before declaring MVP complete:

- [ ] Homepage loads in < 3 seconds
- [ ] All 4 filters work (borough, age, activity, size)
- [ ] Sort by price works (ascending/descending)
- [ ] Results display venue cards with all info
- [ ] Click "Visit Website" opens external link in new tab
- [ ] Mobile responsive (tested at 375px)
- [ ] Empty state shows friendly message
- [ ] 50+ seed venues loaded in database

---

## 9. To Start Implementation

Once you approve this plan, we will:

1. Run `npx create-next-app@latest child_party_finder --typescript --tailwind --eslint`
2. Install dependencies: `npm install @prisma/client prisma react-leaflet leaflet`
3. Set up the file structure as above

---

## 10. Recent Changes & Features (Feb 2026)

### 10.1 Postcode Search & Distance Filtering

**Problem**: Users wanted to find venues near their location using postcodes and distance radius.

**Solution**: Added comprehensive postcode-based search with distance filtering:

| File | Changes |
|------|---------|
| `src/components/search/LocationInput.tsx` | Added 180+ London postcodes with lat/lng coordinates. Supports postcode prefix matching (e.g., "SE8" matches SE8 3ES). Shows "Found: [area]" confirmation when postcode is recognized. |
| `src/components/search/SearchForm.tsx` | Extracts lat/lng from postcode prefix and passes to API as `userLat`, `userLng`, and `radius` parameters. |
| `src/app/api/providers/route.ts` | Added Haversine formula for distance calculation. Filters venues by radius when `userLat`, `userLng`, and `radius` are provided. Supports sorting by distance. |

**Key Logic**:
- When user selects a postcode + specific distance (e.g., 5 miles): Filters venues by distance from that postcode location
- When user selects a postcode + "Any distance": Shows ALL venues (141 total), ignoring postcode filter
- Distance is calculated using Haversine formula for accurate miles calculation
- Results include `distance` field showing miles from user's location

**API Parameters**:
| Parameter | Type | Description |
|-----------|------|-------------|
| `postcode` | string | User's postcode (e.g., "SE8 3ES") |
| `userLat` | number | Latitude extracted from postcode |
| `userLng` | number | Longitude extracted from postcode |
| `radius` | number | Distance in miles (1, 3, 5, 10, 15, or empty for "Any") |
| `sortBy` | string | Can be "distance" to sort by proximity |

**Supported Postcodes** (180+ London areas):
- Central: EC, WC, SW, SE, N, NW, E, W prefixes
- Examples: SE8 (Greenwich), SW19 (Wimbledon), E14 (Canary Wharf), W1 (West End), etc.

### 10.2 Homepage Text Updates

**Problem**: Needed to make it explicitly clear this app helps parents find kids birthday party venues.

**Solution**: Updated homepage text throughout:

| Location | Before | After |
|----------|--------|-------|
| Header badge | 📍 London's Best Party Venues | 🎂 For Parents Planning Kids' Birthday Parties |
| Hero title | Find the Perfect Party Venue | Find the Perfect Birthday Party Venue |
| Hero description | Discover amazing venues for unforgettable children's birthday parties across London | Discover amazing venues for unforgettable children's birthday parties and celebrations across London |
| Bottom section | Use the search filters above to discover amazing party venues in London | Use the search filters above to discover amazing venues for your child's birthday party in London |

**Files Changed**: `src/app/page.tsx`

### 10.3 Bug Fixes

| Issue | Fix |
|-------|-----|
| Type error in seed data | Changed `pricePackage` from string "per child" to numeric values (1500, 2000) in `src/data/seed-data.ts` |
| API 500 error on postcode filter | Removed postcode filter from Prisma query - postcode is now only used for coordinate lookup, not filtering |
| Distance filter returning 0 results for some postcodes | Removed postcode-based filtering entirely when distance is used - only distance-based filtering applies |
| Pagination showing wrong count | `total` now reflects filtered count after distance filtering |

### 10.4 Current API Behavior Summary

```
// No filters → 141 venues (all)
GET /api/providers

// Postcode only (Any distance) → 141 venues (all)
GET /api/providers?postcode=SE8

// Distance filter only → venues within radius from ANY location
GET /api/providers?userLat=51.4825&userLng=-0.0135&radius=5
// Result: 39 venues within 5 miles

// Postcode + Distance → venues within radius from that postcode
GET /api/providers?postcode=SE8&userLat=51.4825&userLng=-0.0135&radius=5
// Result: 39 venues within 5 miles of SE8

// Works for ANY London postcode in the lookup
GET /api/providers?postcode=SW19&userLat=51.4098&userLng=-0.1929&radius=15
// Result: venues within 15 miles of Wimbledon
```

### 10.5 Running the App

```bash
# Development servers available on:
# - http://localhost:3000 (main)
# - http://localhost:3003 (secondary)

# To start:
npm run dev

# Or on specific port:
npm run dev -- -p 3003

# Database seed:
npm run db:seed
```

---

## 11. Seed Data Summary

The database contains **141 venues** across London covering:
- **Boroughs**: All 33 London boroughs
- **Postcodes**: SE, SW, E, W, N, NW, EC, WC prefixes
- **Activities**: Soft Play, Bowling, Trampoline, Swimming, Art & Craft, Cooking, Magic Shows, Dance, Animal Experience, Bouncy Castle, Cinema, Laser Tag, Go Karting, Mini Golf, Climbing, etc.
- **Price Range**: £8-£40 per child
- **Ages**: 1-16 years
- **Capacity**: 5-100 children

Notable venues include:
- Deptford Fun Zone (SE8)
- Greenwich Play Centre (SE8)
- Crystal Palace venues (SE19)
- Various adventure golf, soft play centres, and activity centres across London
