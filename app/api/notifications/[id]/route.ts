import { NextResponse } from 'next/server';

// টেম্পোরারি স্টোরেজ (আপনার ডাটাবেস ব্যবহার করুন)
let notifications: any[] = [];

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    notifications = notifications.filter(n => n.id !== id);
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete notification' }, { status: 500 });
  }
}