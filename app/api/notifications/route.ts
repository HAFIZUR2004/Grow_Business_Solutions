import { NextResponse } from 'next/server';

// টেম্পোরারি স্টোরেজ (আপনার ডাটাবেস ব্যবহার করুন)
let notifications: any[] = [
  {
    id: '1',
    title: 'স্বাগতম!',
    message: 'ড্যাশবোর্ডে আপনাকে স্বাগতম',
    type: 'system',
    read: false,
    createdAt: new Date().toISOString(),
    link: '/admin/dashboard'
  }
];

export async function GET() {
  return NextResponse.json(notifications);
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const newNotification = {
      id: Date.now().toString(),
      ...body,
      read: false,
      createdAt: new Date().toISOString()
    };
    
    notifications.unshift(newNotification);
    notifications = notifications.slice(0, 50);
    
    return NextResponse.json(newNotification);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create notification' }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const { notificationId, read } = await request.json();
    const notification = notifications.find(n => n.id === notificationId);
    if (notification) {
      notification.read = read;
    }
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update notification' }, { status: 500 });
  }
}