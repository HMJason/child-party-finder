"use client";

import { useState, useEffect } from "react";
import { LocationInput, LONDON_POSTCODES } from "./LocationInput";
import { AgeFilter } from "./AgeFilter";
import { ActivityFilter } from "./ActivityFilter";
import { ActivityGroupFilter } from "./ActivityGroupFilter";
import { SizeFilter } from "./SizeFilter";
import { Button } from "@/components/ui/Button";
import { Accordion } from "@/components/ui/Accordion";
import { AGE_RANGES, PARTY_SIZES, ACTIVITY_GROUPS } from "@/lib/constants";

interface SearchFormProps {
  onSearch: (filters: SearchFilters) => void;
}

export interface SearchFilters {
  borough: string;
  postcode?: string;
  radius?: number;
  userLat?: number;
  userLng?: number;
  ageMin: number | undefined;
  ageMax: number | undefined;
  activities: string[];
  activityGroups?: string[];
  sizeMin: number | undefined;
  sizeMax: number | undefined;
}

export function SearchForm({ onSearch }: SearchFormProps) {
  const [borough, setBorough] = useState("");
  const [postcode, setPostcode] = useState("");
  const [radius, setRadius] = useState("");
  const [selectedAge, setSelectedAge] = useState("");
  const [selectedActivities, setSelectedActivities] = useState<string[]>([]);
  const [selectedGroups, setSelectedGroups] = useState<string[]>([]);
  const [selectedSize, setSelectedSize] = useState("");

  const handleSearch = () => {
    const ageRange = AGE_RANGES.find((r) => r.value === selectedAge);
    const sizeRange = PARTY_SIZES.find((r) => r.value === selectedSize);

    let userLat: number | undefined;
    let userLng: number | undefined;

    if (postcode && postcode.length >= 2) {
      const prefix = postcode.substring(0, 3).toUpperCase();
      const postcodeData = LONDON_POSTCODES[prefix];
      if (postcodeData) {
        userLat = postcodeData.lat;
        userLng = postcodeData.lng;
      }
    }

    const groupActivities = selectedGroups.flatMap(
      (groupValue) => ACTIVITY_GROUPS.find((g) => g.value === groupValue)?.activities || []
    );

    const allActivities = Array.from(new Set([...selectedActivities, ...groupActivities]));

    onSearch({
      borough,
      postcode: postcode || undefined,
      radius: radius ? parseInt(radius) : undefined,
      userLat,
      userLng,
      ageMin: ageRange?.min,
      ageMax: ageRange?.max,
      activities: allActivities,
      activityGroups: selectedGroups,
      sizeMin: sizeRange?.min,
      sizeMax: sizeRange?.max,
    });
  };

  const hasFilters =
    borough || postcode || radius || selectedAge || selectedActivities.length > 0 || selectedGroups.length > 0 || selectedSize;

  const handleClear = () => {
    setBorough("");
    setPostcode("");
    setRadius("");
    setSelectedAge("");
    setSelectedActivities([]);
    setSelectedGroups([]);
    setSelectedSize("");
    onSearch({
      borough: "",
      postcode: undefined,
      radius: undefined,
      userLat: undefined,
      userLng: undefined,
      ageMin: undefined,
      ageMax: undefined,
      activities: [],
      activityGroups: undefined,
      sizeMin: undefined,
      sizeMax: undefined,
    });
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 dark:bg-gray-800">
      <h2 className="text-xl font-heading font-bold text-dark dark:text-white mb-4">
        🎈 Find Party Venues
      </h2>

      <div className="space-y-4">
        <LocationInput 
          borough={borough} 
          onBoroughChange={setBorough}
          postcode={postcode}
          onPostcodeChange={setPostcode}
          radius={radius}
          onRadiusChange={setRadius}
        />

        <Accordion title="Activity Groups" defaultOpen={true}>
          <ActivityGroupFilter
            selectedGroups={selectedGroups}
            onGroupsChange={setSelectedGroups}
          />
        </Accordion>

        <Accordion title="Specific Activities" defaultOpen={false}>
          <ActivityFilter
            selectedActivities={selectedActivities}
            onActivitiesChange={setSelectedActivities}
            selectedGroups={selectedGroups}
          />
        </Accordion>

        <Accordion title="Age Range" defaultOpen={false}>
          <AgeFilter selectedAge={selectedAge} onAgeChange={setSelectedAge} />
        </Accordion>

        <SizeFilter selectedSize={selectedSize} onSizeChange={setSelectedSize} />

        <Button onClick={handleSearch} className="w-full btn-primary" size="lg">
          Search Venues 🔍
        </Button>

        {hasFilters && (
          <button
            type="button"
            onClick={handleClear}
            className="w-full text-sm text-gray-500 hover:text-primary transition-colors dark:text-gray-400"
          >
            Clear all filters
          </button>
        )}
      </div>
    </div>
  );
}
