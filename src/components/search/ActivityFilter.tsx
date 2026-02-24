"use client";

import { ACTIVITY_TYPES, ACTIVITY_GROUPS } from "@/lib/constants";
import { Checkbox } from "@/components/ui/Checkbox";

interface ActivityFilterProps {
  selectedActivities: string[];
  onActivitiesChange: (activities: string[]) => void;
  selectedGroups?: string[];
}

export function ActivityFilter({
  selectedActivities,
  onActivitiesChange,
  selectedGroups = [],
}: ActivityFilterProps) {
  const toggleActivity = (activity: string) => {
    if (selectedActivities.includes(activity)) {
      onActivitiesChange(selectedActivities.filter((a) => a !== activity));
    } else {
      onActivitiesChange([...selectedActivities, activity]);
    }
  };

  const clearAll = () => onActivitiesChange([]);

  const filteredActivities = selectedGroups.length > 0
    ? ACTIVITY_GROUPS.filter(g => selectedGroups.includes(g.value))
        .flatMap(g => g.activities)
        .filter((v, i, a) => a.indexOf(v) === i)
    : ACTIVITY_TYPES;

  const uniqueActivities = filteredActivities.filter((v, i, a) => a.indexOf(v) === i);

  return (
    <div>
      <div className="flex justify-between items-center mb-2">
        <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
          {selectedGroups.length > 0 
            ? `Activities in selected groups (${uniqueActivities.length})`
            : "All Activities"}
        </label>
        {selectedActivities.length > 0 && (
          <button
            type="button"
            onClick={clearAll}
            className="text-xs text-primary hover:underline"
          >
            Clear all
          </button>
        )}
      </div>
      {selectedGroups.length > 0 && (
        <p className="text-xs text-gray-500 mb-2">
          Showing only activities from selected groups
        </p>
      )}
      <div className="grid grid-cols-2 gap-2 max-h-48 overflow-y-auto">
        {uniqueActivities.map((activity) => (
          <Checkbox
            key={activity}
            label={activity}
            checked={selectedActivities.includes(activity)}
            onChange={() => toggleActivity(activity)}
          />
        ))}
      </div>
    </div>
  );
}
