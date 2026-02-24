"use client";

import { Button } from "@/components/ui/Button";

interface EmptyStateProps {
  message?: string;
  onClearFilters?: () => void;
}

export function EmptyState({
  message = "No venues found matching your criteria",
  onClearFilters,
}: EmptyStateProps) {
  return (
    <div className="text-center py-16">
      <div className="text-6xl mb-4">🔍</div>
      <h3 className="text-xl font-heading font-bold text-dark mb-2">
        No Results Found
      </h3>
      <p className="text-gray-600 mb-6 max-w-md mx-auto">{message}</p>
      {onClearFilters && (
        <Button onClick={onClearFilters} variant="outline">
          Clear Filters
        </Button>
      )}
    </div>
  );
}
