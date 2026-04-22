'use client';

import React, { useState, useEffect } from 'react';
import { Classroom, StreamStatus } from '@/types/attendance';
import { MoreVertical, Wifi, WifiOff } from 'lucide-react';

interface ClassroomCardProps {
  classroom: Classroom;
  streamStatus: StreamStatus;
}

/**
 * Individual classroom card component
 * Displays live stream placeholder, status, and metadata
 * Ready to integrate with actual video stream (RTMP, HLS, WebRTC)
 */
export function ClassroomCard({ classroom, streamStatus }: ClassroomCardProps) {
  const [imageError, setImageError] = useState(false);

  const formatTime = (date: Date) => {
    return new Date(date).toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
    });
  };

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString('en-US', {
      month: '2-digit',
      day: '2-digit',
      year: 'numeric',
    });
  };

  return (
    <div className="relative group rounded-lg overflow-hidden bg-muted aspect-video">
      {/* Stream Container - Replace with actual video element */}
      <div className="absolute inset-0 bg-gradient-to-b from-muted-foreground/10 to-muted-foreground/30 flex items-center justify-center">
        {/* Placeholder for video stream */}
        <div className="text-center space-y-2">
          <div className="text-5xl font-light text-muted-foreground/40">📹</div>
          <p className="text-xs text-muted-foreground/60">
            {classroom.isOnline ? 'Stream Ready' : 'Camera Offline'}
          </p>
          <p className="text-xs text-muted-foreground/50">{classroom.streamUrl}</p>
        </div>

        {/* Overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
      </div>

      {/* Top Bar - Status and Signal Strength */}
      <div className="absolute top-0 left-0 right-0 p-2 sm:p-3 flex items-center justify-between bg-gradient-to-b from-black/40 to-transparent gap-1">
        {/* Left: Signal and Status */}
        <div className="flex items-center gap-1 sm:gap-2 min-w-0">
          {classroom.isOnline ? (
            <div className="flex items-center gap-0.5 sm:gap-1 bg-black/40 px-1.5 sm:px-2 py-0.5 sm:py-1 rounded text-xs">
              <Wifi className="w-3 h-3 text-green-400 flex-shrink-0" />
              <span className="font-medium text-green-400 hidden sm:inline truncate">
                {streamStatus.quality.toUpperCase()}
              </span>
            </div>
          ) : (
            <div className="flex items-center gap-0.5 sm:gap-1 bg-black/40 px-1.5 sm:px-2 py-0.5 sm:py-1 rounded text-xs">
              <WifiOff className="w-3 h-3 text-red-400 flex-shrink-0" />
              <span className="font-medium text-red-400 hidden sm:inline">OFFLINE</span>
            </div>
          )}
          {/* Bandwidth indicator - Hidden on mobile */}
          <div className="hidden sm:block bg-black/40 px-2 py-1 rounded text-xs text-gray-300 whitespace-nowrap">
            {streamStatus.bandwidth} Mbps
          </div>
        </div>

        {/* Right: Menu button */}
        <button
          className="p-1 sm:p-1.5 bg-black/40 rounded hover:bg-black/60 transition-colors flex-shrink-0"
          aria-label="More options"
        >
          <MoreVertical className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-gray-300" />
        </button>
      </div>

      {/* Bottom Bar - Info and Metadata */}
      <div className="absolute bottom-0 left-0 right-0 p-2 sm:p-3 bg-gradient-to-t from-black/80 via-black/40 to-transparent">
        <div className="space-y-0.5 sm:space-y-1">
          {/* Camera name */}
          <p className="text-xs sm:text-sm font-semibold text-white truncate">{classroom.camera}</p>

          {/* Date and time */}
          <p className="text-xs text-gray-300 truncate">
            {formatDate(classroom.lastUpdated)} • {formatTime(classroom.lastUpdated)}
          </p>

          {/* Location and student count */}
          <p className="text-xs text-gray-400 truncate">{classroom.location}</p>
          <p className="text-xs text-gray-400 truncate">
            👥 {classroom.studentCount} Students • {classroom.name}
          </p>
        </div>
      </div>

      {/* Hover overlay with quick actions - Hidden on mobile */}
      <div className="hidden sm:flex absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-200 items-center justify-center gap-2 sm:gap-3">
        <button className="px-3 sm:px-4 py-1.5 sm:py-2 bg-blue-600 text-white rounded text-xs sm:text-sm font-medium hover:bg-blue-700 transition-colors">
          View Stream
        </button>
        <button className="px-3 sm:px-4 py-1.5 sm:py-2 bg-gray-700 text-white rounded text-xs sm:text-sm font-medium hover:bg-gray-600 transition-colors">
          More Info
        </button>
      </div>
    </div>
  );
}
