# Child Party Finder 🎂

A Next.js web application that helps parents find the perfect birthday party venue for their children across London.

## Features

- **Postcode Search** - Enter your London postcode to find venues near you
- **Distance Filtering** - Filter venues by radius (1, 3, 5, 10, 15 miles)
- **Filter by Age** - Find venues suitable for your child's age group
- **Filter by Activity** - Search by activity type (soft play, bowling, art & craft, etc.)
- **Filter by Party Size** - Find venues that accommodate your guest count
- **Sort Results** - Sort by price, name, or distance
- **39+ Venues** - Pre-seeded database of London party venues

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Database**: SQLite with Prisma ORM
- **Icons**: Custom emoji-based UI

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/HMJason/child-party-finder.git
cd child-party-finder

# Install dependencies
npm install

# Set up the database
npx prisma db push

# Seed the database with venues
npm run db:seed

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build for Production

```bash
npm run build
npm start
```

## API Endpoints

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/providers` | GET | List providers with filters |
| `/api/providers/search` | POST | Advanced search |
| `/api/boroughs` | GET | List London boroughs |
| `/api/activities` | GET | List activity types |

### Query Parameters

- `borough` - Filter by borough
- `postcode` - Your postcode for distance calculation
- `radius` - Distance in miles (1, 3, 5, 10, 15)
- `ageMin` / `ageMax` - Age range
- `activities` - Activity type filter
- `sizeMin` / `sizeMax` - Party size range
- `sortBy` - "price-asc", "price-desc", "name", "distance"

## Project Structure

```
src/
├── app/
│   ├── api/
│   │   └── providers/
│   │       └── route.ts      # API endpoint
│   ├── globals.css           # Tailwind styles
│   ├── layout.tsx           # Root layout
│   └── page.tsx             # Main page
├── components/
│   ├── layout/
│   │   ├── Footer.tsx
│   │   └── Header.tsx
│   ├── results/
│   │   ├── EmptyState.tsx
│   │   ├── ResultsGrid.tsx
│   │   └── VenueCard.tsx
│   ├── search/
│   │   ├── ActivityFilter.tsx
│   │   ├── ActivityGroupFilter.tsx
│   │   ├── AgeFilter.tsx
│   │   ├── LocationInput.tsx
│   │   ├── SearchForm.tsx
│   │   ├── SizeFilter.tsx
│   │   └── SortSelect.tsx
│   └── ui/                   # Reusable UI components
├── data/
│   └── seed-data.ts         # Venue seed data
├── lib/
│   ├── constants.ts         # App constants
│   ├── db.ts               # Prisma client
│   └── utils.ts            # Utility functions
└── types/
    └── index.ts            # TypeScript types
```

## Supported Postcodes

180+ London postcode districts are supported for distance-based search:

- **Central**: EC, WC
- **West**: SW, W
- **South**: SE
- **East**: E
- **North**: N, NW

## Supported Activities

Indoor, Outdoor, Bowling, Cinema, Soft Play, Trampoline Park, Swimming Pool, Art & Craft, Animal Experience, Sports, Magic Show, Bouncy Castle, Dance/Music, Cooking Class, Laser Tag, Go Karting, Climbing Wall, Mini Golf, Science Workshop, Character Visit, Petting Zoo, STEM Activity, Drama Workshop, Face Painting, Balloon Artist, Puppet Show, Karaoke, Video Game Arcade, Escape Room

## License

MIT
