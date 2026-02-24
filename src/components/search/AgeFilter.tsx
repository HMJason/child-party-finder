"use client";

import { AGE_RANGES } from "@/lib/constants";

interface AgeFilterProps {
  selectedAge: string;
  onAgeChange: (age: string) => void;
}

export function AgeFilter({ selectedAge, onAgeChange }: AgeFilterProps) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">
        Child&apos;s Age
      </label>
      <div className="flex flex-wrap gap-2">
        {AGE_RANGES.map((range) => (
          <button
            key={range.value}
            type="button"
            onClick={() => onAgeChange(range.value)}
            className={`px-3 py-1.5 rounded-full text-sm font-medium transition-all duration-200 ${
              selectedAge === range.value
                ? "bg-primary text-white shadow-md"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            {range.label}
          </button>
        ))}
      </div>
    </div>
  );
}
