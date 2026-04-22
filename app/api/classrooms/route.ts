/**
 * GET /api/classrooms
 * 
 * Fetches list of all available classrooms with stream information
 * Replace this with your actual backend API call or database query
 */

import { Classroom } from '@/types/attendance';

export async function GET() {
  try {
    // Option 1: Call your external backend API
    // const response = await fetch('https://your-api.example.com/classrooms', {
    //   headers: {
    //     'Authorization': `Bearer ${process.env.API_KEY}`,
    //   }
    // });
    // const classrooms = await response.json();
    // return Response.json(classrooms);

    // Option 2: Query from your database (Supabase, PostgreSQL, etc.)
    // const classrooms = await db.query('SELECT * FROM classrooms WHERE is_active = true');
    // return Response.json(classrooms);

    // Option 3: Return mock data (for development)
    const mockClassrooms: Classroom[] = [
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

    return Response.json(mockClassrooms);
  } catch (error) {
    console.error('[API] Error fetching classrooms:', error);
    return Response.json(
      { error: 'Failed to fetch classrooms' },
      { status: 500 }
    );
  }
}
