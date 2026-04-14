import { dbConnect } from '@/app/lib/dbConnect';
import Portfolio from '@/app/models/Portfolio';
import { NextRequest, NextResponse } from 'next/server';

// ✅ PUT: আপডেট (Next.js 15 compatible)
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await dbConnect();
    const { id } = await params;  // 👈 await করতে হবে
    const body = await request.json();
    
    console.log('🔍 Updating ID:', id);
    console.log('📦 Update Data:', body);
    
    // ইমেজ URL ট্রিম করুন
    const trimmedImage = body.image?.trim() || '';
    
    const portfolioData = {
      title: body.title,
      category: body.category,
      description: body.description,
      tech: body.tech || [],
      colorKey: body.colorKey,
      stats: body.stats,
      image: trimmedImage,
      imageAlt: body.imageAlt,
      github: body.github || '',
      liveUrl: body.liveUrl || '',
      updatedAt: new Date(),
    };
    
    // প্রথমে id দিয়ে খুঁজুন, না পেলে _id দিয়ে খুঁজুন
    let portfolio = await Portfolio.findOne({ id: id });
    
    // যদি id না পাওয়া যায়, তাহলে _id দিয়ে চেক করুন
    if (!portfolio) {
      portfolio = await Portfolio.findById(id);
    }
    
    if (!portfolio) {
      console.log('❌ Portfolio not found with id:', id);
      return NextResponse.json(
        { error: `Portfolio with id "${id}" not found` },
        { status: 404 }
      );
    }
    
    // আপডেট করুন
    const updatedPortfolio = await Portfolio.findOneAndUpdate(
      { _id: portfolio._id },
      portfolioData,
      { new: true, runValidators: true }
    );
    
    console.log('✅ Update successful:', updatedPortfolio?.id);
    return NextResponse.json(updatedPortfolio, { status: 200 });
    
  } catch (error: any) {
    console.error('❌ PUT Error:', error);
    return NextResponse.json(
      { error: 'Failed to update portfolio', details: error.message },
      { status: 500 }
    );
  }
}

// ✅ DELETE: ডিলিট (Next.js 15 compatible)
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await dbConnect();
    const { id } = await params;  // 👈 await করতে হবে
    
    console.log('🔍 Deleting ID:', id);
    
    // প্রথমে id দিয়ে খুঁজুন, না পেলে _id দিয়ে খুঁজুন
    let portfolio = await Portfolio.findOne({ id: id });
    
    if (!portfolio) {
      portfolio = await Portfolio.findById(id);
    }
    
    if (!portfolio) {
      console.log('❌ Portfolio not found with id:', id);
      return NextResponse.json(
        { error: `Portfolio with id "${id}" not found` },
        { status: 404 }
      );
    }
    
    await Portfolio.deleteOne({ _id: portfolio._id });
    
    console.log('✅ Delete successful:', id);
    return NextResponse.json(
      { message: 'Portfolio deleted successfully', id: id },
      { status: 200 }
    );
    
  } catch (error: any) {
    console.error('❌ DELETE Error:', error);
    return NextResponse.json(
      { error: 'Failed to delete portfolio', details: error.message },
      { status: 500 }
    );
  }
}

// ✅ GET: একক পোর্টফোলিও পাওয়া (optional)
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await dbConnect();
    const { id } = await params;
    
    let portfolio = await Portfolio.findOne({ id: id });
    if (!portfolio) {
      portfolio = await Portfolio.findById(id);
    }
    
    if (!portfolio) {
      return NextResponse.json(
        { error: 'Portfolio not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json(portfolio, { status: 200 });
    
  } catch (error: any) {
    console.error('GET Error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch portfolio' },
      { status: 500 }
    );
  }
}