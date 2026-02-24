export function formatPrice(pence: number | null): string {
  if (pence === null) return "Contact for price";
  const pounds = pence / 100;
  return `£${pounds.toFixed(0)}`;
}

export function formatPriceRange(
  min: number | null,
  max: number | null
): string {
  if (min === null && max === null) return "Contact for price";
  if (min !== null && max !== null) {
    return `£${(min / 100).toFixed(0)} - £${(max / 100).toFixed(0)}`;
  }
  if (min !== null) return `From £${(min / 100).toFixed(0)}`;
  return `Up to £${((max || 0) / 100).toFixed(0)}`;
}

export function parseActivities(activitiesJson: string): string[] {
  try {
    return JSON.parse(activitiesJson);
  } catch {
    return [];
  }
}

export function parseFeatures(featuresJson: string | null): string[] {
  if (!featuresJson) return [];
  try {
    return JSON.parse(featuresJson);
  } catch {
    return [];
  }
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "");
}
