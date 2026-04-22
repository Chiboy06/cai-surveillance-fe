'use client';

import React, { useState, useEffect } from 'react';
import { SidebarNav } from '@/components/SidebarNav';
import { Header } from '@/components/Header';
import { FilterTabs } from '@/components/FilterTabs';
import { ClassroomGrid } from '@/components/ClassroomGrid';
import { AttendanceFeed } from '@/components/AttendanceFeed';
import { useClassroomStreams } from '@/hooks/useClassroomStreams';
import { useAttendanceEvents } from '@/hooks/useAttendanceEvents';
import { Menu, X } from 'lucide-react';

/**
 * Main page component for Student Attendance Monitoring System
 * Displays live classroom streams and real-time attendance events
 * Fully responsive with mobile-first design
 */
export default function Home() {
  const [activeNavItem, setActiveNavItem] = useState('dashboard');
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [feedOpen, setFeedOpen] = useState(false);

  // Fetch classroom streams
  const {
    classrooms,
    loading: classroomsLoading,
    error: classroomsError,
    getStreamStatus,
    updateStreamStatus,
  } = useClassroomStreams();

  // Fetch attendance events
  const { events: attendanceEvents, loading: eventsLoading } = useAttendanceEvents();

  // Prepare stream statuses for grid
  const streamStatuses = React.useMemo(() => {
    const statuses: Record<string, any> = {};
    classrooms.forEach(classroom => {
      statuses[classroom.id] = getStreamStatus(classroom.id);
    });
    return statuses;
  }, [classrooms, getStreamStatus]);

  return (
    <div className="flex h-screen bg-background overflow-hidden">
      {/* Sidebar Navigation - Hidden on mobile, visible on desktop */}
      <div className="hidden lg:flex">
        <SidebarNav activeItem={activeNavItem} onItemClick={setActiveNavItem} />
      </div>

      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Mobile Sidebar - Fixed position */}
      <div
        className={`fixed left-0 top-0 h-full w-20 bg-card border-r border-border z-50 lg:hidden transform transition-transform duration-300 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <SidebarNav
          activeItem={activeNavItem}
          onItemClick={(item) => {
            setActiveNavItem(item);
            setSidebarOpen(false);
          }}
        />
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Header */}
        <Header
          title="Attendance Monitor"
          onMenuClick={() => setSidebarOpen(!sidebarOpen)}
          onFeedClick={() => setFeedOpen(!feedOpen)}
          showMenuButton={true}
          showFeedButton={true}
        />

        {/* Content Area */}
        <div className="flex-1 flex flex-col lg:flex-row min-h-0 overflow-hidden gap-0 lg:gap-0">
          {/* Left: Main Stream View */}
          <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
            {/* Filter Tabs */}
            <div className="border-b border-border bg-background/50 backdrop-blur-sm overflow-x-auto">
              <FilterTabs
                classrooms={classrooms}
                selectedFilter={selectedFilter}
                onFilterChange={setSelectedFilter}
              />
            </div>

            {/* Classroom Grid */}
            <div className="flex-1 overflow-auto p-3 sm:p-4 md:p-6">
              {classroomsError && (
                <div className="mb-4 p-3 sm:p-4 rounded-lg bg-red-500/10 border border-red-500/20">
                  <p className="text-xs sm:text-sm text-red-600">
                    Error loading classrooms: {classroomsError}
                  </p>
                </div>
              )}
              <ClassroomGrid
                classrooms={classrooms}
                selectedFilter={selectedFilter}
                streamStatuses={streamStatuses}
                loading={classroomsLoading}
              />
            </div>
          </div>

          {/* Right: Attendance Feed - Mobile overlay, desktop sidebar */}
          <div
            className={`fixed bottom-0 left-0 right-0 h-96 lg:relative lg:h-auto lg:w-80 border-t lg:border-t-0 lg:border-l border-border flex flex-col overflow-hidden bg-card rounded-t-lg lg:rounded-none z-40 transform transition-transform duration-300 lg:translate-y-0 lg:static ${
              feedOpen ? 'translate-y-0' : 'translate-y-full lg:translate-y-0'
            }`}
          >
            {/* Mobile Header for Feed */}
            <div className="lg:hidden px-4 py-3 border-b border-border flex items-center justify-between bg-background/50 backdrop-blur-sm">
              <h3 className="font-semibold text-foreground">Activity Feed</h3>
              <button
                onClick={() => setFeedOpen(false)}
                className="p-1 hover:bg-muted rounded transition-colors"
                aria-label="Close feed"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <AttendanceFeed events={attendanceEvents} loading={eventsLoading} />
          </div>
        </div>
      </div>
    </div>
  );
}
