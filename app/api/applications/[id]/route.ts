// app/api/applications/[id]/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { ObjectId } from 'mongodb';
import clientPromise from '@/lib/mongodb';

const DB_NAME = 'growbusinessDB';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const client = await clientPromise;
    const db = client.db(DB_NAME);
    const { id } = await params; // Promise থেকে id বের করুন

    console.log('Fetching application with ID:', id);

    let application = null;

    // প্রথমে ObjectId দিয়ে চেষ্টা
    if (ObjectId.isValid(id)) {
      application = await db.collection('applications').findOne({
        _id: new ObjectId(id)
      });
    }

    // না পেলে string id দিয়ে চেষ্টা
    if (!application) {
      application = await db.collection('applications').findOne({
        id: id
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
    console.error('GET Application Error:', error);
    return NextResponse.json(
      { error: 'অ্যাপ্লিকেশন লোড করতে ব্যর্থ হয়েছে' },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const client = await clientPromise;
    const db = client.db(DB_NAME);
    const { id } = await params; // Promise থেকে id বের করুন
    const { status } = await request.json();

    let result = null;

    if (ObjectId.isValid(id)) {
      result = await db.collection('applications').updateOne(
        { _id: new ObjectId(id) },
        { $set: { status, updatedAt: new Date() } }
      );
    } else {
      result = await db.collection('applications').updateOne(
        { id: id },
        { $set: { status, updatedAt: new Date() } }
      );
    }

    if (result.matchedCount === 0) {
      return NextResponse.json(
        { error: 'অ্যাপ্লিকেশন পাওয়া যায়নি' },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, status });
  } catch (error) {
    console.error('PUT Application Error:', error);
    return NextResponse.json(
      { error: 'স্ট্যাটাস আপডেট করতে ব্যর্থ হয়েছে' },
      { status: 500 }
    );
  }
}