'use client';

import React from 'react';
import { AttendanceRecord } from '@/types/attendance';
import { CheckCircle2, Clock, XCircle } from 'lucide-react';

interface AttendanceFeedProps {
  events: AttendanceRecord[];
  loading?: boolean;
}

/**
 * Activity feed component displaying real-time attendance events
 * Shows status indicators and student information
 */
export function AttendanceFeed({ events, loading = false }: AttendanceFeedProps) {
  const getStatusIcon = (status: 'present' | 'absent' | 'late') => {
    switch (status) {
      case 'present':
        return <CheckCircle2 className="w-5 h-5 text-green-500" />;
      case 'late':
        return <Clock className="w-5 h-5 text-yellow-500" />;
      case 'absent':
        return <XCircle className="w-5 h-5 text-red-500" />;
      default:
        return null;
    }
  };

  const getStatusLabel = (status: 'present' | 'absent' | 'late') => {
    const labels = {
      present: 'Present',
      absent: 'Absent',
      late: 'Late',
    };
    return labels[status];
  };

  const formatTime = (date: Date) => {
    const now = new Date();
    const time = new Date(date)
    const diff = now.getTime() - time.getTime();
    const minutes = Math.floor(diff / 60000);

    if (minutes === 0) return 'Just now';
    if (minutes < 60) return `${minutes}m ago`;
    if (minutes < 1440) return `${Math.floor(minutes / 60)}h ago`;
    return date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
    });
  };

  return (
    <div className="flex flex-col h-full bg-card rounded-lg overflow-hidden">
      {/* Header - Desktop version */}
      <div className="p-3 sm:p-4 border-b border-border bg-background/50 backdrop-blur-sm sticky top-0 z-10">
        <h2 className="text-base sm:text-lg font-semibold text-foreground">Activity Feed</h2>
        <p className="text-xs sm:text-sm text-muted-foreground mt-1 hidden sm:block">Real-time attendance events</p>
      </div>

      {/* Feed Content */}
      <div className="flex-1 overflow-y-auto">
        {loading ? (
          <div className="space-y-2 sm:space-y-3 p-3 sm:p-4">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="flex gap-2 sm:gap-3 animate-pulse">
                <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-muted flex-shrink-0" />
                <div className="flex-1 space-y-2">
                  <div className="h-2 bg-muted rounded w-3/4" />
                  <div className="h-2 bg-muted rounded w-1/2" />
                </div>
              </div>
            ))}
          </div>
        ) : events.length === 0 ? (
          <div className="flex items-center justify-center h-full p-3 sm:p-4 text-center">
            <div className="space-y-1 sm:space-y-2">
              <p className="text-xs sm:text-sm text-muted-foreground">No attendance events yet</p>
              <p className="text-xs text-muted-foreground/60">
                Events will appear here as students check in
              </p>
            </div>
          </div>
        ) : (
          <div className="divide-y divide-border">
            {events.map(event => (
              <div
                key={event.id}
                className="p-2.5 sm:p-4 hover:bg-muted/50 transition-colors duration-150 group"
              >
                <div className="flex items-start gap-2 sm:gap-3">
                  {/* Status Icon */}
                  <div className="flex-shrink-0 mt-0.5">
                    {getStatusIcon(event.status)}
                  </div>

                  {/* Event Details */}
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1 sm:gap-2">
                      <p className="font-medium text-foreground truncate text-sm sm:text-base">
                        {event.studentName}
                      </p>
                      <span className="text-xs text-muted-foreground whitespace-nowrap flex-shrink-0">
                        {formatTime(event.timestamp)}
                      </span>
                    </div>

                    <div className="mt-1 sm:mt-2 space-y-0.5">
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 sm:gap-2">
                        <p className="text-xs sm:text-sm text-muted-foreground truncate">
                          {event.classroom}
                        </p>
                        <span
                          className={`text-xs font-medium px-2 py-0.5 sm:py-1 rounded-full w-fit ${
                            event.status === 'present'
                              ? 'bg-green-500/10 text-green-600'
                              : event.status === 'late'
                                ? 'bg-yellow-500/10 text-yellow-600'
                                : 'bg-red-500/10 text-red-600'
                          }`}
                        >
                          {getStatusLabel(event.status)}
                        </span>
                      </div>
                      <p className="text-xs text-muted-foreground truncate">
                        {event.cameraFeed}
                      </p>
                    </div>
                  </div>

                  {/* Hover Action - Hidden on mobile */}
                  <button
                    className="hidden sm:flex p-2 rounded opacity-0 group-hover:opacity-100 transition-opacity hover:bg-muted flex-shrink-0"
                    aria-label="View details"
                  >
                    <svg
                      className="w-4 h-4 text-muted-foreground"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Footer - Optional Pagination or Load More */}
      {!loading && events.length > 0 && (
        <div className="p-2 sm:p-3 border-t border-border text-center">
          <button className="text-xs sm:text-sm text-blue-600 hover:text-blue-700 font-medium">
            Load more events
          </button>
        </div>
      )}
    </div>
  );
}
