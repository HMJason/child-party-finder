"use client";

import { ACTIVITY_GROUPS } from "@/lib/constants";

interface ActivityGroupFilterProps {
  selectedGroups: string[];
  onGroupsChange: (groups: string[]) => void;
}

export function ActivityGroupFilter({ selectedGroups, onGroupsChange }: ActivityGroupFilterProps) {
  const toggleGroup = (groupValue: string) => {
    if (selectedGroups.includes(groupValue)) {
      onGroupsChange(selectedGroups.filter((g) => g !== groupValue));
    } else {
      onGroupsChange([...selectedGroups, groupValue]);
    }
  };

  return (
    <div>
      <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
        Activity Type
      </p>
      <div className="flex flex-wrap gap-2">
        {ACTIVITY_GROUPS.map((group) => (
          <button
            key={group.value}
            type="button"
            onClick={() => toggleGroup(group.value)}
            className={`px-3 py-1.5 rounded-full text-sm font-medium transition-all ${
              selectedGroups.includes(group.value)
                ? "bg-primary text-white shadow-md"
                : "bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-primary/10"
            }`}
          >
            {group.label}
          </button>
        ))}
      </div>
      {selectedGroups.length > 0 && (
        <p className="text-xs text-gray-500 mt-2">
          {selectedGroups.length} group{selectedGroups.length > 1 ? "s" : ""} selected
        </p>
      )}
    </div>
  );
}
