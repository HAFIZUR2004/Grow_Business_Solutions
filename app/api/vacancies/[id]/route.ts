import { NextResponse } from 'next/server';
import { ObjectId } from 'mongodb';
import clientPromise from '@/lib/mongodb';

const DB_NAME = 'growbusinessDB';

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  try {
    const body = await request.json();
    const client = await clientPromise;
    const db = client.db(DB_NAME);
    
    const updateData = {
      title: body.title,
      desc: body.desc,
      tags: body.tags,
      stack: body.stack,
      salary: body.salary,
      featured: body.featured,
      color: body.color,
      department: body.department,
      updatedAt: new Date(),
    };
    
    let result;
    if (ObjectId.isValid(params.id)) {
      result = await db.collection('vacancies').updateOne({ _id: new ObjectId(params.id) }, { $set: updateData });
    } else {
      result = await db.collection('vacancies').updateOne({ id: params.id }, { $set: updateData });
    }
    
    if (result.matchedCount === 0) {
      return NextResponse.json({ error: 'ভ্যাকেন্সি পাওয়া যায়নি' }, { status: 404 });
    }
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('PUT Error:', error);
    return NextResponse.json({ error: 'আপডেট করতে ব্যর্থ হয়েছে' }, { status: 500 });
  }
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  try {
    const client = await clientPromise;
    const db = client.db(DB_NAME);
    
    let result;
    if (ObjectId.isValid(params.id)) {
      result = await db.collection('vacancies').deleteOne({ _id: new ObjectId(params.id) });
    } else {
      result = await db.collection('vacancies').deleteOne({ id: params.id });
    }
    
    if (result.deletedCount === 0) {
      return NextResponse.json({ error: 'ভ্যাকেন্সি পাওয়া যায়নি' }, { status: 404 });
    }
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('DELETE Error:', error);
    return NextResponse.json({ error: 'ডিলিট করতে ব্যর্থ হয়েছে' }, { status: 500 });
  }
}