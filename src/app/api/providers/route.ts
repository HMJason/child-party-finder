import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";

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

  const where: any = {};

  if (borough) {
    where.borough = borough;
  }

  if (ageMin && ageMax) {
    where.ageMin = { lte: parseInt(ageMax) };
    where.ageMax = { gte: parseInt(ageMin) };
  }

  if (sizeMin && sizeMax) {
    where.minCapacity = { lte: parseInt(sizeMax) };
    where.maxCapacity = { gte: parseInt(sizeMin) };
  }

  if (activities.length > 0) {
    for (const activity of activities) {
      where.activities = { contains: activity };
    }
  }

  let orderBy: any = { name: "asc" };
  if (sortBy === "price-asc") {
    orderBy = { priceMin: "asc" };
  } else if (sortBy === "price-desc") {
    orderBy = { priceMin: "desc" };
  } else if (sortBy === "borough") {
    orderBy = { borough: "asc" };
  }

  try {
    let [providers, total] = await Promise.all([
      prisma.provider.findMany({
        where,
        orderBy,
        skip: (page - 1) * limit,
        take: limit,
      }),
      prisma.provider.count({ where }),
    ]);

    if (userLat && userLng && radius) {
      const userLatNum = parseFloat(userLat);
      const userLngNum = parseFloat(userLng);
      const radiusNum = parseFloat(radius);

      const providersWithDistance = providers.map(provider => ({
        ...provider,
        distance: provider.latitude && provider.longitude 
          ? calculateDistance(userLatNum, userLngNum, provider.latitude, provider.longitude)
          : null
      } as typeof provider & { distance: number | null }));

      const filteredProviders = providersWithDistance.filter(p => p.distance !== null && p.distance <= radiusNum);

      if (sortBy === "distance") {
        filteredProviders.sort((a, b) => (a.distance || 0) - (b.distance || 0));
      }
      
      providers = filteredProviders;
      total = filteredProviders.length;
    } else if (userLat && userLng) {
      providers = providers.map(provider => ({
        ...provider,
        distance: provider.latitude && provider.longitude 
          ? calculateDistance(parseFloat(userLat), parseFloat(userLng), provider.latitude, provider.longitude)
          : null
      } as typeof provider & { distance: number | null }));

      if (sortBy === "distance") {
        (providers as Array<typeof providers[0] & { distance: number | null }>).sort((a, b) => (a.distance || 0) - (b.distance || 0));
      }
    }

    return NextResponse.json({
      providers,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error("Search error:", error);
    return NextResponse.json(
      { error: "Failed to search providers" },
      { status: 500 }
    );
  }
}
