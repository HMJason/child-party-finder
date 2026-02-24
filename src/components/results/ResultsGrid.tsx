"use client";

import { VenueCard } from "./VenueCard";
import type { Provider } from "@/types";

interface ResultsGridProps {
  providers: Provider[];
}

export function ResultsGrid({ providers }: ResultsGridProps) {
  if (providers.length === 0) {
    return null;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {providers.map((provider) => (
        <VenueCard key={provider.id} provider={provider} />
      ))}
    </div>
  );
}
