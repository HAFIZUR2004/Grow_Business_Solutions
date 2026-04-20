import { NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';

const DB_NAME = 'growbusinessDB';

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db(DB_NAME);
    const applications = await db.collection('applications').find({}).sort({ appliedAt: -1 }).toArray();
    return NextResponse.json(applications);
  } catch (error) {
    console.error('GET Applications Error:', error);
    return NextResponse.json({ error: 'অ্যাপ্লিকেশন লোড করতে ব্যর্থ হয়েছে' }, { status: 500 });
  }
}