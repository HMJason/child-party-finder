"use client";

import { PARTY_SIZES } from "@/lib/constants";

interface SizeFilterProps {
  selectedSize: string;
  onSizeChange: (size: string) => void;
}

export function SizeFilter({ selectedSize, onSizeChange }: SizeFilterProps) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">
        Number of Children
      </label>
      <div className="flex flex-wrap gap-2">
        {PARTY_SIZES.map((size) => (
          <button
            key={size.value}
            type="button"
            onClick={() => onSizeChange(size.value)}
            className={`px-3 py-1.5 rounded-full text-sm font-medium transition-all duration-200 ${
              selectedSize === size.value
                ? "bg-secondary text-white shadow-md"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            {size.label}
          </button>
        ))}
      </div>
    </div>
  );
}
