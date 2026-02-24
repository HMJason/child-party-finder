import { NextRequest, NextResponse } from "next/server";
import { providers as seedProviders } from "@/data/seed-data";

interface Provider {
  name: string;
  slug: string;
  description: string | null;
  address: string;
  borough: string;
  postcode: string;
  latitude: number;
  longitude: number;
  websiteUrl: string | null;
  phone: string | null;
  priceMin: number | null;
  priceMax: number | null;
  pricePackage: number | null;
  minCapacity: number;
  maxCapacity: number;
  ageMin: number;
  ageMax: number;
  activities: string;
  isIndoor: boolean;
  isOutdoor: boolean;
  imageUrl: string | null;
  features: string | null;
}

function calculateDistance(lat1: number, lon1: number, lat2: number, lon2: number): number {
  const R = 3959;
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;
  const a = 
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
    Math.sin(dLon/2) * Math.sin(dLon/2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  return R * c;
}

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;

  const borough = searchParams.get("borough") || undefined;
  const postcode = searchParams.get("postcode") || undefined;
  const userLat = searchParams.get("userLat");
  const userLng = searchParams.get("userLng");
  const radius = searchParams.get("radius");
  const ageMin = searchParams.get("ageMin");
  const ageMax = searchParams.get("ageMax");
  const activities = searchParams.getAll("activities");
  const sizeMin = searchParams.get("sizeMin");
  const sizeMax = searchParams.get("sizeMax");
  const sortBy = searchParams.get("sortBy") || "name";
  const page = parseInt(searchParams.get("page") || "1");
  const limit = parseInt(searchParams.get("limit") || "200");

  let providers: (Provider & { distance?: number | null })[] = [...seedProviders];

  if (borough) {
    providers = providers.filter(p => p.borough.toLowerCase() === borough.toLowerCase());
  }

  if (ageMin && ageMax) {
    const minAge = parseInt(ageMin);
    const maxAge = parseInt(ageMax);
    providers = providers.filter(p => p.ageMin <= maxAge && p.ageMax >= minAge);
  }

  if (sizeMin && sizeMax) {
    const minSize = parseInt(sizeMin);
    const maxSize = parseInt(sizeMax);
    providers = providers.filter(p => p.minCapacity <= maxSize && p.maxCapacity >= minSize);
  }

  if (activities.length > 0) {
    providers = providers.filter(p => {
      const providerActivities = JSON.parse(p.activities);
      return activities.some(act => providerActivities.includes(act));
    });
  }

  if (userLat && userLng) {
    const userLatNum = parseFloat(userLat);
    const userLngNum = parseFloat(userLng);
    
    providers = providers.map(provider => ({
      ...provider,
      distance: calculateDistance(userLatNum, userLngNum, provider.latitude, provider.longitude)
    }));

    if (radius) {
      const radiusNum = parseFloat(radius);
      providers = providers.filter(p => (p.distance || 0) <= radiusNum);
    }
  }

  if (sortBy === "price-asc") {
    providers.sort((a, b) => (a.priceMin || 0) - (b.priceMin || 0));
  } else if (sortBy === "price-desc") {
    providers.sort((a, b) => (b.priceMin || 0) - (a.priceMin || 0));
  } else if (sortBy === "distance" && userLat && userLng) {
    providers.sort((a, b) => (a.distance || 0) - (b.distance || 0));
  } else {
    providers.sort((a, b) => a.name.localeCompare(b.name));
  }

  const total = providers.length;
  const startIndex = (page - 1) * limit;
  const paginatedProviders = providers.slice(startIndex, startIndex + limit);

  return NextResponse.json({
    providers: paginatedProviders,
    pagination: {
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
    },
  });
}
