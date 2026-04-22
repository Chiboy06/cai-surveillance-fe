'use client';

import React from 'react';
import { Classroom } from '@/types/attendance';

interface FilterTabsProps {
  classrooms: Classroom[];
  selectedFilter: string;
  onFilterChange: (filter: string) => void;
}

/**
 * Filter tabs component for switching between classroom views
 * Dynamically generates tabs from available classrooms
 */
export function FilterTabs({
  classrooms,
  selectedFilter,
  onFilterChange,
}: FilterTabsProps) {
  // Create filter options
  const filterOptions = [
    {
      id: 'all',
      label: 'All',
      count: classrooms.length,
    },
    {
      id: 'online',
      label: 'Online',
      count: classrooms.filter(c => c.isOnline).length,
    },
    {
      id: 'offline',
      label: 'Offline',
      count: classrooms.filter(c => !c.isOnline).length,
    },
  ];

  return (
    <div className="flex gap-1 sm:gap-2 overflow-x-auto pb-2 px-3 sm:px-4 md:px-6">
      {filterOptions.map(option => (
        <button
          key={option.id}
          onClick={() => onFilterChange(option.id)}
          className={`px-2.5 sm:px-4 py-1.5 sm:py-2 rounded-lg font-medium text-xs sm:text-sm transition-all whitespace-nowrap flex-shrink-0 ${
            selectedFilter === option.id
              ? 'bg-blue-600 text-white shadow-md'
              : 'bg-muted text-foreground hover:bg-muted/80'
          }`}
        >
          {option.label}
          {option.count !== null && (
            <span className="ml-1 sm:ml-2 text-xs opacity-75">({option.count})</span>
          )}
        </button>
      ))}
    </div>
  );
}
