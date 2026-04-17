import clientPromise from '@/lib/mongodb';
import { NextResponse } from 'next/server';

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