import { NextResponse } from 'next/server';
import { ObjectId } from 'mongodb';
import clientPromise from '@/lib/mongodb';

const DB_NAME = 'growbusinessDB';

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const client = await clientPromise;
    const db = client.db(DB_NAME);

    const id = params.id;

    console.log('Fetching ID:', id);

    let application;

    try {
      // FIRST চেষ্টা → ObjectId
      application = await db.collection('applications').findOne({
        _id: new ObjectId(id),
      });
    } catch {
      console.log('Invalid ObjectId, skipping...');
    }

    // যদি না পায় → fallback
    if (!application) {
      application = await db.collection('applications').findOne({
        id: id,
      });
    }

    if (!application) {
      return NextResponse.json(
        { error: 'অ্যাপ্লিকেশন পাওয়া যায়নি' },
        { status: 404 }
      );
    }

    return NextResponse.json(application);
  } catch (error) {
    console.error('GET Error:', error);
    return NextResponse.json(
      { error: 'লোড করতে ব্যর্থ হয়েছে' },
      { status: 500 }
    );
  }
}