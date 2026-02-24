export interface Provider {
  id: string;
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
  lastVerified: Date;
  createdAt: Date;
  updatedAt: Date;
  distance?: number | null;
}

export interface SearchFilters {
  borough?: string;
  postcode?: string;
  ageMin?: number;
  ageMax?: number;
  activities?: string[];
  sizeMin?: number;
  sizeMax?: number;
  sortBy?: "price-asc" | "price-desc" | "name" | "borough";
}
