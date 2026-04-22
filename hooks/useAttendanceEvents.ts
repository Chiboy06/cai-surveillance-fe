'use client';

import { useState, useCallback, useEffect } from 'react';
import { AttendanceRecord } from '@/types/attendance';

/**
 * Custom hook for managing attendance events and activity feed
 * Handles real-time attendance updates from the server
 */
export function useAttendanceEvents() {
  const [events, setEvents] = useState<AttendanceRecord[]>([]);
  const [loading, setLoading] = useState(false);

  // Fetch attendance events from server
  const fetchEvents = useCallback(async (limit: number = 20) => {
    try {
      setLoading(true);
      
      // Replace with your actual server endpoint
      const response = await fetch(`/api/attendance?limit=${limit}`);
      
      if (!response.ok) throw new Error('Failed to fetch attendance events');
      
      const data = await response.json();
      setEvents(data);
    } catch (err) {
      console.error('[v0] Attendance fetch error:', err);
      // Fallback to demo data
      setEvents(getDemoAttendanceEvents(limit));
    } finally {
      setLoading(false);
    }
  }, []);

  // Subscribe to real-time events on mount
  useEffect(() => {
    fetchEvents();

    // Set up polling interval
    const interval = setInterval(() => fetchEvents(20), 10000); // 10 seconds

    return () => clearInterval(interval);
  }, [fetchEvents]);

  // Add new event to the feed (for real-time WebSocket updates)
  const addEvent = useCallback((event: AttendanceRecord) => {
    setEvents(prev => [event, ...prev].slice(0, 50)); // Keep last 50 events
  }, []);

  // Clear all events
  const clearEvents = useCallback(() => {
    setEvents([]);
  }, []);

  return {
    events,
    loading,
    addEvent,
    clearEvents,
    refetch: fetchEvents,
  };
}

// Demo data generator
function getDemoAttendanceEvents(limit: number): AttendanceRecord[] {
  const classrooms = ['Class A', 'Class B', 'Class C', 'Class D'];
  const studentNames = [
    'John Smith',
    'Emma Davis',
    'Michael Johnson',
    'Sarah Wilson',
    'Alex Brown',
    'Jessica Lee',
    'David Martinez',
    'Rachel Anderson',
  ];
  const statuses: Array<'present' | 'absent' | 'late'> = ['present', 'late', 'present'];

  const events: AttendanceRecord[] = [];

  for (let i = 0; i < limit; i++) {
    const now = new Date();
    const timestamp = new Date(now.getTime() - i * 60000); // Offset by minutes

    events.push({
      id: `event-${i}`,
      studentId: `student-${Math.floor(Math.random() * 100)}`,
      studentName: studentNames[Math.floor(Math.random() * studentNames.length)],
      classroom: classrooms[Math.floor(Math.random() * classrooms.length)],
      timestamp,
      status: statuses[Math.floor(Math.random() * statuses.length)],
      cameraFeed: `Camera ${Math.floor(Math.random() * 4) + 1}`,
    });
  }

  return events;
}
