'use client';

import React, { useMemo } from 'react';
import { Classroom, ClassroomFilter, StreamStatus } from '@/types/attendance';
import { ClassroomCard } from './ClassroomCard';

interface ClassroomGridProps {
  classrooms: Classroom[];
  selectedFilter: string;
  streamStatuses: Record<string, StreamStatus>;
  loading?: boolean;
}

/**
 * Grid component that displays multiple classroom cards
 * Handles filtering and responsive layout
 */
export function ClassroomGrid({
  classrooms,
  selectedFilter,
  streamStatuses,
  loading = false,
}: ClassroomGridProps) {
  // Filter classrooms based on selected filter
  const filteredClassrooms = useMemo(() => {
    if (selectedFilter === 'all') return classrooms;
    if (selectedFilter === 'online') return classrooms.filter(c => c.isOnline);
    if (selectedFilter === 'offline') return classrooms.filter(c => !c.isOnline);
    return classrooms.filter(c => c.name.toLowerCase().includes(selectedFilter.toLowerCase()));
  }, [classrooms, selectedFilter]);

  if (loading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-2 sm:gap-3 md:gap-4">
        {[...Array(4)].map((_, i) => (
          <div
            key={i}
            className="rounded-lg bg-muted aspect-video animate-pulse"
          />
        ))}
      </div>
    );
  }

  if (filteredClassrooms.length === 0) {
    return (
      <div className="flex items-center justify-center p-6 sm:p-12 text-center min-h-96">
        <div className="space-y-2 sm:space-y-3">
          <p className="text-base sm:text-lg font-medium text-foreground">No classrooms found</p>
          <p className="text-xs sm:text-sm text-muted-foreground">
            {selectedFilter !== 'all'
              ? 'Try adjusting your filter'
              : 'No classrooms are currently available'}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-2 sm:gap-3 md:gap-4">
      {filteredClassrooms.map(classroom => (
        <ClassroomCard
          key={classroom.id}
          classroom={classroom}
          streamStatus={streamStatuses[classroom.id] || getDefaultStreamStatus()}
        />
      ))}
    </div>
  );
}

function getDefaultStreamStatus(): StreamStatus {
  return {
    isActive: true,
    quality: 'high',
    bandwidth: 2500,
    fps: 30,
  };
}
