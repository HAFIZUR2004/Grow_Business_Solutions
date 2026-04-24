// app/api/vacancies/[id]/route.ts
export const dynamic = 'force-dynamic';

import { NextRequest, NextResponse } from 'next/server';
import { ObjectId } from 'mongodb';
import clientPromise from '@/lib/mongodb';

const DB_NAME = 'growbusinessDB';

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const body = await request.json();
    const client = await clientPromise;
    const db = client.db(DB_NAME);
    const { id } = await params;
    
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
    if (ObjectId.isValid(id)) {
      result = await db.collection('vacancies').updateOne(
        { _id: new ObjectId(id) }, 
        { $set: updateData }
      );
    } else {
      result = await db.collection('vacancies').updateOne(
        { id: id }, 
        { $set: updateData }
      );
    }
    
    if (result.matchedCount === 0) {
      return NextResponse.json(
        { error: 'ভ্যাকেন্সি পাওয়া যায়নি' }, 
        { status: 404 }
      );
    }
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('PUT Error:', error);
    return NextResponse.json(
      { error: 'আপডেট করতে ব্যর্থ হয়েছে' }, 
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const client = await clientPromise;
    const db = client.db(DB_NAME);
    const { id } = await params;
    
    let result;
    if (ObjectId.isValid(id)) {
      result = await db.collection('vacancies').deleteOne({ _id: new ObjectId(id) });
    } else {
      result = await db.collection('vacancies').deleteOne({ id: id });
    }
    
    if (result.deletedCount === 0) {
      return NextResponse.json(
        { error: 'ভ্যাকেন্সি পাওয়া যায়নি' }, 
        { status: 404 }
      );
    }
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('DELETE Error:', error);
    return NextResponse.json(
      { error: 'ডিলিট করতে ব্যর্থ হয়েছে' }, 
      { status: 500 }
    );
  }
}

// GET single vacancy (যদি প্রয়োজন হয়)
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const client = await clientPromise;
    const db = client.db(DB_NAME);
    const { id } = await params;
    
    let vacancy = null;
    if (ObjectId.isValid(id)) {
      vacancy = await db.collection('vacancies').findOne({ _id: new ObjectId(id) });
    } else {
      vacancy = await db.collection('vacancies').findOne({ id: id });
    }
    
    if (!vacancy) {
      return NextResponse.json(
        { error: 'ভ্যাকেন্সি পাওয়া যায়নি' }, 
        { status: 404 }
      );
    }
    
    return NextResponse.json(vacancy);
  } catch (error) {
    console.error('GET Error:', error);
    return NextResponse.json(
      { error: 'ভ্যাকেন্সি লোড করতে ব্যর্থ হয়েছে' }, 
      { status: 500 }
    );
  }
}