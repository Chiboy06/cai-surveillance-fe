/**
 * GET /api/attendance?limit=20
 * 
 * Fetches recent attendance events from the database
 * Replace this with your actual backend API call or database query
 */

import { AttendanceRecord } from '@/types/attendance';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const limit = parseInt(searchParams.get('limit') || '20', 10);

    // Option 1: Call your external backend API
    // const response = await fetch(`https://your-api.example.com/attendance?limit=${limit}`, {
    //   headers: {
    //     'Authorization': `Bearer ${process.env.API_KEY}`,
    //   }
    // });
    // const events = await response.json();
    // return Response.json(events);

    // Option 2: Query from your database
    // const events = await db.query(
    //   'SELECT * FROM attendance_records ORDER BY timestamp DESC LIMIT $1',
    //   [limit]
    // );
    // return Response.json(events);

    // Option 3: Return mock data (for development)
    const mockEvents: AttendanceRecord[] = generateMockAttendanceEvents(limit);

    return Response.json(mockEvents);
  } catch (error) {
    console.error('[API] Error fetching attendance events:', error);
    return Response.json(
      { error: 'Failed to fetch attendance events' },
      { status: 500 }
    );
  }
}

function generateMockAttendanceEvents(limit: number): AttendanceRecord[] {
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
    'James Wilson',
    'Lisa Brown',
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
