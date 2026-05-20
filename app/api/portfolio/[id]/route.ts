// app/api/portfolio/[id]/route.ts
export const dynamic = 'force-dynamic';

import { NextRequest, NextResponse } from 'next/server';
import Portfolio from '@/app/models/Portfolio';
import { dbConnect } from '@/lib/dbConnect';
import mongoose from 'mongoose';

// GET single portfolio
export async function GET(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    await dbConnect();
    const { id } = await context.params;
    
    // Try to find by _id first (MongoDB ObjectId), then by custom id field
    let portfolio;
    if (mongoose.Types.ObjectId.isValid(id)) {
      portfolio = await Portfolio.findById(id);
    }
    if (!portfolio) {
      portfolio = await Portfolio.findOne({ id: id });
    }
    
    if (!portfolio) {
      return NextResponse.json(
        { error: 'Portfolio not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json(portfolio, { status: 200 });
  } catch (error) {
    console.error('GET Error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch portfolio' },
      { status: 500 }
    );
  }
}

// PUT update portfolio
export async function PUT(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    await dbConnect();
    const { id } = await context.params;
    const body = await request.json();
    
    // Remove id from body if present to avoid conflicts
    const { id: _, ...updateData } = body;
    
    let updatedPortfolio;
    
    // First try to find by MongoDB _id
    if (mongoose.Types.ObjectId.isValid(id)) {
      updatedPortfolio = await Portfolio.findByIdAndUpdate(
        id,
        { 
          ...updateData,
          updatedAt: new Date()
        },
        { new: true, runValidators: true }
      );
    }
    
    // If not found by _id, try by custom id field
    if (!updatedPortfolio) {
      updatedPortfolio = await Portfolio.findOneAndUpdate(
        { id: id },
        { 
          ...updateData,
          updatedAt: new Date()
        },
        { new: true, runValidators: true }
      );
    }
    
    if (!updatedPortfolio) {
      return NextResponse.json(
        { error: 'Portfolio not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json(updatedPortfolio, { status: 200 });
  } catch (error) {
    console.error('PUT Error:', error);
    return NextResponse.json(
      { error: 'Failed to update portfolio' },
      { status: 500 }
    );
  }
}

// DELETE portfolio
export async function DELETE(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    await dbConnect();
    const { id } = await context.params;
    
    let deletedPortfolio;
    
    // First try to delete by MongoDB _id
    if (mongoose.Types.ObjectId.isValid(id)) {
      deletedPortfolio = await Portfolio.findByIdAndDelete(id);
    }
    
    // If not found by _id, try by custom id field
    if (!deletedPortfolio) {
      deletedPortfolio = await Portfolio.findOneAndDelete({ id: id });
    }
    
    if (!deletedPortfolio) {
      return NextResponse.json(
        { error: 'Portfolio not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error('DELETE Error:', error);
    return NextResponse.json(
      { error: 'Failed to delete portfolio' },
      { status: 500 }
    );
  }
}