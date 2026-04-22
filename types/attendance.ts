/**
 * Core types for the Student Attendance Monitoring System
 */

export interface Classroom {
  id: string;
  name: string;
  camera: string;
  location: string;
  streamUrl: string;
  isOnline: boolean;
  studentCount: number;
  lastUpdated: Date;
}

export interface AttendanceRecord {
  id: string;
  studentId: string;
  studentName: string;
  classroom: string;
  timestamp: Date;
  status: 'present' | 'absent' | 'late';
  cameraFeed: string;
}

export interface ClassroomFilter {
  id: string;
  label: string;
  value: string;
}

export interface StreamStatus {
  isActive: boolean;
  quality: 'high' | 'medium' | 'low';
  bandwidth: number;
  fps: number;
}
