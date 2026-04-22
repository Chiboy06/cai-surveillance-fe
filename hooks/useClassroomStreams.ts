'use client';

import { useState, useCallback, useEffect } from 'react';
import { Classroom, StreamStatus } from '@/types/attendance';

/**
 * Custom hook for managing classroom streams
 * Handles fetching, caching, and real-time updates from the server
 */
export function useClassroomStreams() {
  const [classrooms, setClassrooms] = useState<Classroom[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [streamStatuses, setStreamStatuses] = useState<Record<string, StreamStatus>>({});

  // Fetch classrooms from server
  const fetchClassrooms = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      
      // Replace with your actual server endpoint
      const response = await fetch('/api/classrooms');
      
      if (!response.ok) throw new Error('Failed to fetch classrooms');
      
      const data = await response.json();
      setClassrooms(data);
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Unknown error';
      setError(message);
      
      // Fallback demo data
      setClassrooms(getDemoClassrooms());
    } finally {
      setLoading(false);
    }
  }, []);

  // Subscribe to live stream updates via WebSocket or polling
  useEffect(() => {
    fetchClassrooms();

    // Set up polling interval (adjust as needed)
    const interval = setInterval(fetchClassrooms, 30000); // 30 seconds

    return () => clearInterval(interval);
  }, [fetchClassrooms]);

  // Get stream status for a specific classroom
  const getStreamStatus = useCallback((classroomId: string): StreamStatus => {
    return streamStatuses[classroomId] || getDefaultStreamStatus();
  }, [streamStatuses]);

  // Update stream status (can be called when connecting to stream)
  const updateStreamStatus = useCallback((classroomId: string, status: StreamStatus) => {
    setStreamStatuses(prev => ({
      ...prev,
      [classroomId]: status
    }));
  }, []);

  return {
    classrooms,
    loading,
    error,
    getStreamStatus,
    updateStreamStatus,
    refetch: fetchClassrooms,
  };
}

// Demo data generator
function getDemoClassrooms(): Classroom[] {
  return [
    {
      id: '1',
      name: 'Class A',
      camera: 'Camera 1',
      location: 'Building A - Room 101',
      streamUrl: 'rtmp://your-server/stream/classroom-1',
      isOnline: true,
      studentCount: 28,
      lastUpdated: new Date(),
    },
    {
      id: '2',
      name: 'Class B',
      camera: 'Camera 2',
      location: 'Building A - Room 102',
      streamUrl: 'rtmp://your-server/stream/classroom-2',
      isOnline: true,
      studentCount: 25,
      lastUpdated: new Date(),
    },
    {
      id: '3',
      name: 'Class C',
      camera: 'Camera 3',
      location: 'Building B - Room 201',
      streamUrl: 'rtmp://your-server/stream/classroom-3',
      isOnline: true,
      studentCount: 30,
      lastUpdated: new Date(),
    },
    {
      id: '4',
      name: 'Class D',
      camera: 'Camera 4',
      location: 'Building B - Room 202',
      streamUrl: 'rtmp://your-server/stream/classroom-4',
      isOnline: false,
      studentCount: 0,
      lastUpdated: new Date(),
    },
  ];
}

function getDefaultStreamStatus(): StreamStatus {
  return {
    isActive: true,
    quality: 'high',
    bandwidth: 2500,
    fps: 30,
  };
}
