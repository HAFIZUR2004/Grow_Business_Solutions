// app/api/vacancies/[id]/route.ts
import { NextResponse } from 'next/server';
import { ObjectId } from 'mongodb';
import clientPromise from '@/lib/mongodb';

// GET all vacancies
export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db('portfolio');
    const vacancies = await db.collection('vacancies').find({}).toArray();
    
    return NextResponse.json(vacancies);
  } catch (error) {
    console.error('GET Error:', error);
    return NextResponse.json({ error: 'Failed to fetch vacancies' }, { status: 500 });
  }
}

// POST new vacancy
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const client = await clientPromise;
    const db = client.db('portfolio');
    
    const newVacancy = {
      ...body,
      id: Date.now().toString(),
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    
    const result = await db.collection('vacancies').insertOne(newVacancy);
    
    return NextResponse.json({ ...newVacancy, _id: result.insertedId }, { status: 201 });
  } catch (error) {
    console.error('POST Error:', error);
    return NextResponse.json({ error: 'Failed to create vacancy' }, { status: 500 });
  }
}

// PUT - Update vacancy
export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json();
    const client = await clientPromise;
    const db = client.db('portfolio');
    
    const { id, ...updateData } = body;
    
    const result = await db.collection('vacancies').updateOne(
      { id: params.id }, // Make sure this matches the field name in your database
      { 
        $set: {
          ...updateData,
          updatedAt: new Date(),
        }
      }
    );
    
    if (result.matchedCount === 0) {
      return NextResponse.json({ error: 'Vacancy not found' }, { status: 404 });
    }
    
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('PUT Error:', error);
    return NextResponse.json({ error: 'Failed to update vacancy' }, { status: 500 });
  }
}

// DELETE - Remove vacancy
export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const client = await clientPromise;
    const db = client.db('portfolio');
    
    const result = await db.collection('vacancies').deleteOne({ id: params.id });
    
    if (result.deletedCount === 0) {
      return NextResponse.json({ error: 'Vacancy not found' }, { status: 404 });
    }
    
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('DELETE Error:', error);
    return NextResponse.json({ error: 'Failed to delete vacancy' }, { status: 500 });
  }
}