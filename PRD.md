# Product Requirements Document (PRD)

# Product Name: Children's Party Finder

## 1. Overview

### Problem Statement
Parents in London struggle to find suitable venues and activities for their children's birthday parties. The process involves searching multiple websites, checking availability across different providers, comparing prices, and ensuring activities match the child's age and interests. This is time-consuming and overwhelming, especially for busy parents planning parties under time pressure.

### Product Vision
A one-stop interactive web application that helps parents in London quickly discover, compare, and connect with children's party venues and activity providers. Users can filter by location, age group, activity type, and party size to find the perfect match for their child's birthday celebration.

### Target Users
- **Primary**: Parents in London planning children's birthday parties (ages 1-16)
- **Secondary**: Party plannersorganising events for children
- **Technical proficiency**: Average web user comfortable with standard e-commerce style interfaces
- **Demographics**: London-based families with children, typically middle-income households

---

## 2. Goals & Success Metrics

### Business Goals
- Become the go-to resource for London children's party planning
- Partner with 200+ venue and activity providers within 12 months
- Achieve 10,000 monthly active users within 6 months of launch
- Generate revenue through provider listings and featured placements

### Key Success Metrics (KPIs)
| Metric | Target | Measurement |
|--------|--------|-------------|
| Time to find 5 relevant options | < 2 minutes | User testing with stopwatch |
| Results for 100+ providers | < 3 seconds | Browser console timing |
| Bounce rate | < 40% | Google Analytics |
| User satisfaction (NPS) | > 40 | Post-use survey |
| Filter usage rate | > 70% of users | Analytics event tracking |
| Provider click-through rate | > 30% | Analytics |

---

## 3. User Stories & Requirements

### User Stories
| ID | As a... | I want to... | So that... | Priority |
|----|---------|--------------|------------|----------|
| US-01 | Parent | Enter my borough or postcode | I see venues near me | Must Have |
| US-02 | Parent | Filter by child's age | I find age-appropriate activities | Must Have |
| US-03 | Parent | Filter by activity type (bowling, cinema, outdoor, etc.) | I find activities my child will enjoy | Must Have |
| US-04 | Parent | Filter by number of guests | I find venues that can accommodate my party size | Must Have |
| US-05 | Parent | Sort results by price | I can budget accordingly | Must Have |
| US-06 | Parent | Click through to provider's website | I can book directly | Must Have |
| US-07 | Parent | See clear pricing information | I know what to expect | Must Have |
| US-08 | Parent | View photos of venues | I can visualise the space | Should Have |
| US-09 | Parent | See availability information | I know if they can host my date | Should Have |
| US-10 | Parent | Save favourite venues | I can compare options later | Could Have |
| US-11 | Parent | Filter by dietary options | I can find inclusive venues | Could Have |
| US-12 | Parent | Read reviews from other parents | I can make informed decisions | Could Have |
| US-13 | Parent | Search by postcode with distance radius | I find venues near my location | Must Have |
| US-14 | Parent | Sort by distance from my location | I see the closest venues first | Should Have |

### Functional Requirements

#### F1: Location Search
- **Description**: Users can search by London borough or postcode
- **Acceptance Criteria**:
  - [x] Autocomplete dropdown shows matching boroughs/postcodes as user types
  - [ ] Map view shows pin locations of filtered venues
  - [ ] "Use my location" button retrieves user's current position
  - [x] Distance radius filter (1, 3, 5, 10, 15 miles) for postcode search

#### F1b: Distance Filter
- **Description**: Filter venues by distance from user's postcode
- **Acceptance Criteria**:
  - [x] Dropdown with distance options: Any distance, 1 mile, 3 miles, 5 miles, 10 miles, 15 miles
  - [x] When postcode selected + distance set: show venues within radius from that postcode
  - [x] When postcode selected + "Any distance": show ALL venues (no postcode filter)
  - [x] Distance displayed on each venue card (miles from user's location)
  - [x] Sort by distance option (nearest first)

#### F2: Age Filter
- **Description**: Filter venues by suitable age range
- **Acceptance Criteria**:
  - [ ] Dropdown with age ranges: 0-3, 4-6, 7-9, 10-12, 13-16
  - [ ] Multi-select allowed (e.g., activities suitable for 4-6 AND 7-9)
  - [ ] Age range clearly displayed on each venue card

#### F3: Activity Type Filter
- **Description**: Filter by category of activity
- **Acceptance Criteria**:
  - [ ] Checkbox list with categories: Indoor, Outdoor, Bowling, Cinema, Soft Play, Trampoline, Swimming, Art & Craft, Animal Experience, Sports, Magic Show, Bouncy Castle, Dance/Music, Cooking, Laser Tag, Go Karting
  - [ ] Multi-select enabled
  - [ ] "Show all" option to clear filters

#### F4: Party Size Filter
- **Description**: Filter by number of children
- **Acceptance Criteria**:
  - [ ] Preset ranges: 1-10, 11-20, 21-30, 31-50, 50+
  - [ ] Custom range slider as alternative
  - [ ] Display capacity info on venue cards

#### F5: Price Sorting & Display
- **Description**: Sort and display pricing information
- **Acceptance Criteria**:
  - [ ] Sort dropdown: Price (Low-High), Price (High-Low), Rating, Distance
  - [ ] Price displayed per child or total package price
  - [ ] Clear indication of what's included in price

#### F6: Results Display
- **Description**: Interactive list/grid of venues
- **Acceptance Criteria**:
  - [ ] Card-based layout showing: name, image, location, price, age range, activity tags
  - [ ] Pagination or infinite scroll
  - [ ] "Load more" button for additional results

#### F7: Provider Links
- **Description**: Direct links to booking pages
- **Acceptance Criteria**:
  - [ ] "Visit Website" button opens provider link in new tab
  - [ ] Track clicks for analytics
  - [ ] Fallback message if link unavailable

### Non-Functional Requirements
- **Performance**: Results for 100+ providers load in < 3 seconds
- **Scalability**: Support 10,000+ provider database
- **Mobile Responsive**: Fully functional on mobile devices (375px+)
- **Browser Support**: Chrome, Firefox, Safari, Edge (last 2 versions)
- **Accessibility**: WCAG 2.1 AA compliance
- **Data Accuracy**: Provider information updated within 30 days
- **Uptime**: 99.5% availability

---

## 4. User Experience (UX)

### User Flows

#### Primary Flow: Quick Search
1. User lands on homepage with search form
2. Enters postcode or selects borough from dropdown
3. Selects child's age range
4. Selects activity type(s)
5. Selects party size
6. Clicks "Find Venues"
7. Views filtered results sorted by price
8. Clicks provider to visit booking page

#### Secondary Flow: Browse & Filter
1. User lands on homepage
2. Views all venues on map or list
3. Applies filters dynamically
4. Results update in real-time
5. Sorts by preferred criteria
6. Saves favorites (optional)
7. Books via provider website

### UI/UX Guidelines
- **Visual Style**: Friendly, playful yet professional — suitable for parents
- **Color Palette**:
  - Primary: #FF6B6B (Coral Red - festive, fun)
  - Secondary: #4ECDC4 (Teal - trustworthy)
  - Accent: #FFE66D (Yellow - cheerful)
  - Background: #FFFFFF (White)
  - Text: #2D3436 (Dark Gray)
- **Typography**: 
  - Headings: Poppins (bold, modern)
  - Body: Inter (clean, readable)
- **Components**:
  - Rounded cards with soft shadows
  - Large touch-friendly filter buttons
  - Clear CTAs with hover states
  - Responsive grid (1 col mobile, 2 col tablet, 3-4 col desktop)

### Wireframes/Screens
- **Homepage**: Hero search section with filters, value proposition, featured venues
- **Search Results**: Map + list view, filter sidebar, sort options
- **Venue Card**: Image, name, price, age range, activity tags, distance, CTA button
- **Filter Panel**: Collapsible sections for each filter type with clear selections
- **Empty State**: Friendly message with suggestions to adjust filters

---

## 5. Technical Specifications

### Technology Stack
- **Frontend**: Next.js 14 (React), TypeScript, Tailwind CSS
- **State Management**: React Context + useReducer
- **Maps**: Mapbox GL JS or Leaflet (OpenStreetMap)
- **Backend**: Next.js API Routes (serverless)
- **Database**: PostgreSQL with Prisma ORM (Supabase or Vercel Postgres)
- **Hosting**: Vercel
- **Data Collection**: Custom scraper (Cheerio + Puppeteer) for public data
- **Analytics**: Vercel Analytics or Google Analytics

### Data Model

```
Provider {
  id: string (UUID)
  name: string
  slug: string (URL-friendly)
  description: text
  address: string
  borough: string
  postcode: string
  latitude: decimal
  longitude: decimal
  websiteUrl: string
  phoneNumber: string
  email: string
  pricePerChild: decimal (nullable)
  pricePackage: decimal (nullable)
  minCapacity: integer
  maxCapacity: integer
  ageRangeMin: integer
  ageRangeMax: integer
  activities: string[] (enum values)
  isIndoor: boolean
  isOutdoor: boolean
  images: string[]
  features: string[] (parking, catering, etc.)
  lastVerified: timestamp
  createdAt: timestamp
  updatedAt: timestamp
}

Review {
  id: string (UUID)
  providerId: string (FK)
  userName: string
  rating: integer (1-5)
  comment: text
  createdAt: timestamp
}
```

### API Endpoints
| Endpoint | Method | Description |
|----------|--------|-------------|
| /api/providers | GET | List providers with filters (borough, postcode, age, activities, size, distance, sort) |
| /api/providers/[id] | GET | Get single provider details |
| /api/providers/search | POST | Advanced search with all filters |
| /api/boroughs | GET | List all London boroughs |
| /api/activities | GET | List all activity types |

### API Query Parameters (Current Implementation)
| Parameter | Type | Description |
|-----------|------|-------------|
| `borough` | string | Filter by exact borough match |
| `postcode` | string | User's postcode for coordinate lookup |
| `userLat` | number | Latitude from postcode (for distance calc) |
| `userLng` | number | Longitude from postcode (for distance calc) |
| `radius` | number | Distance filter in miles (1, 3, 5, 10, 15) |
| `ageMin` | number | Minimum child's age |
| `ageMax` | number | Maximum child's age |
| `activities` | string[] | Activity types to filter |
| `sizeMin` | number | Minimum party size |
| `sizeMax` | number | Maximum party size |
| `sortBy` | string | "price-asc", "price-desc", "name", "distance" |
| `page` | number | Page number for pagination |
| `limit` | number | Results per page (default 200) |

### London Boroughs (for filter)
Barking and Dagenham, Barnet, Bexley, Brent, Bromley, Camden, Croydon, Ealing, Enfield, Greenwich, Hackney, Hammersmith and Fulham, Haringey, Harrow, Havering, Hillingdon, Hounslow, Islington, Kensington and Chelsea, Kingston upon Thames, Lambeth, Lewisham, Merton, Newham, Redbridge, Richmond upon Thames, Southwark, Sutton, Tower Hamlets, Waltham Forest, Wandsworth, Westminster

### Supported Postcodes (180+ areas)
All major London postcode districts are supported for distance-based search:
- **Central**: EC, WC (e.g., EC1, WC1, WC2)
- **West**: SW, W (e.g., SW1, SW19, W1)
- **South**: SE (e.g., SE1, SE8, SE19)
- **East**: E (e.g., E1, E14, E20)
- **North**: N, NW (e.g., N1, N6, NW1, NW11)

Each postcode district maps to latitude/longitude coordinates for distance calculation using the Haversine formula.

### Activity Categories
Indoor, Outdoor, Bowling, Cinema, Soft Play, Trampoline Park, Swimming Pool, Art & Craft, Animal Experience, Sports, Magic Show, Bouncy Castle, Dance/Music, Cooking Class, Laser Tag, Go Karting, Climbing Wall, Mini Golf, Science Workshop, Character Visit, Petting Zoo, STEM Activity, Drama Workshop, Face Painting, Balloon Artist, Puppet Show, Karaoke, Video Game Arcade, Escape Room

### Party Size Ranges
- 1-10 children (intimate)
- 11-20 children (small)
- 21-30 children (medium)
- 31-50 children (large)
- 50+ children (venue hire)

### Price Ranges (for sorting/filters)
- Under £10/child
- £10-£15/child
- £15-£20/child
- £20-£30/child
- £30+/child
- Package deals (total price)

---

## 6. Data Collection Strategy

### Public Data Sources
1. **Yell.com** - Business listings for children's party venues
2. **Dayoutwiththekids.co.uk** - Family activity listings
3. **Gongs.com** - Things to do with kids
4. **Timeout.com** - Family-friendly venues
5. **Individual venue websites** - Direct data collection

### Scraping Approach
- Use Cheerio for static page parsing
- Use Puppeteer for dynamic content
- Respect robots.txt and rate limits
- Store data in structured format
- Manual verification for critical fields

### Data Enrichment
- Add missing fields via web research
- Verify prices by checking provider websites
- Collect images from public sources
- Validate locations via postcode API

---

## 7. Roadmap & Milestones

### Phase 1: MVP (Weeks 1-4)
- [x] Core search functionality (location, age, activity, size)
- [x] Basic results display with 50+ providers
- [x] Provider links to external websites
- [x] Mobile-responsive design
- [x] Basic performance optimization
- [x] **Postcode search with distance filtering** (180+ London postcodes)
- [x] **Distance calculation using Haversine formula**
- [x] **Sort by distance**

### Phase 2: Enhanced Features (Weeks 5-8)
- [ ] Interactive map with pins
- [ ] Additional filters (dietary, parking)
- [ ] Venue detail pages
- [ ] Analytics integration

### Phase 3: Growth (Weeks 9-12)
- [ ] User reviews and ratings
- [ ] Save favorites functionality
- [ ] Email notifications for updates
- [ ] Provider claiming/management portal
- [ ] SEO optimization

### Phase 4: Scale (Months 4-6)
- [ ] 200+ provider database
- [ ] Featured listings for providers
- [ ] Newsletter integration
- [ ] Social sharing
- [ ] PWA capabilities

---

## 8. Risks & Dependencies

### Risks
| Risk | Impact | Likelihood | Mitigation |
|------|--------|------------|------------|
| Data scraping blocked by providers | High | Medium | Build relationships with providers for direct data |
| Provider links become invalid | Medium | High | Automated link checking, manual verification |
| Insufficient provider data | High | Medium | Partner with directories, offer free listings |
| Performance issues with large dataset | Medium | Medium | Database indexing, caching, pagination |
| Browser map API costs | Medium | Low | Use OpenStreetMap/Leaflet to avoid paid APIs |

### Dependencies
- **Map data**: OpenStreetMap via Leaflet (free, no API key needed)
- **Postcode validation**: OS Places API (free tier available) or simple regex validation
- **Image hosting**: Cloudinary or direct provider URLs
- **Analytics**: Vercel Analytics (free)

---

## 9. Out of Scope
- Online booking/payments directly in the app
- Vendor reviews with complex moderation
- Real-time availability checking
- Social features (forums, messaging)
- Mobile apps (iOS/Android) — web-only for MVP
- Multi-city expansion — London only initially
- Email marketing integration
- User accounts/authentication for MVP

---

## 10. Success Criteria (Detailed)

### User Goal Achievement
- **Criterion 1**: A parent can find at least 5 relevant options within 2 minutes from opening the app.
  - **Test**: User testing with 5 parents, average time < 2 minutes
  - **Measurement**: Stopwatch timing during user testing sessions

### Performance
- **Criterion 2**: The app can return filtered results for >100 providers in under 3 seconds on a typical machine.
  - **Test**: Lighthouse performance audit, manual timing
  - **Measurement**: Browser DevTools Network tab timing

### Usability
- **Criterion 3**: My friend can use it to plan his kid's next party without needing me to explain anything.
  - **Test**: Hand off to friend with zero instructions, observe completion
  - **Measurement**: Task completion rate, verbal feedback

---

## 11. Appendix

### Glossary
| Term | Definition |
|------|------------|
| Borough | London administrative district (32 boroughs + City of London) |
| Provider | Venue or activity company offering children's party services |
| Package | Bundled offering including venue, activity, food, etc. |
| Capacity | Maximum number of children the venue can accommodate |
| Soft Play | Indoor play centre with foam equipment |

### References
- [List of London Boroughs](https://en.wikipedia.org/wiki/London_boroughs)
- [Yell.com - Children's Party Services](https://www.yell.com/)
- [Days Out with Kids](https://www.dayoutwiththekids.co.uk/)
- [Gongs - Kids Activities](https://www.gongs.com/)

---

**Document Info**
- **Version**: 1.0
- **Created**: 2026-02-24
- **Last Updated**: 2026-02-24
- **Owner**: Children's Party Finder Team
- **Status**: Draft
