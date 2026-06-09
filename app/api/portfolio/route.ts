import { NextResponse } from 'next/server';
import { dbConnect } from '@/lib/dbConnect';

// Force dynamic rendering for production
export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function GET() {
  console.log('🔵 API GET called');
  
  try {
    // Check MongoDB URI
    if (!process.env.MONGODB_URI) {
      console.error('❌ MONGODB_URI is not defined');
      return NextResponse.json(
        { error: 'Database configuration missing' },
        { status: 500 }
      );
    }
    
    console.log('🟢 Connecting to database...');
    await dbConnect();
    console.log('✅ Database connected');
    
    // Dynamic import to avoid build issues
    const Portfolio = (await import('@/app/models/Portfolio')).default;
    const portfolios = await Portfolio.find({}).sort({ createdAt: -1 });
    
    console.log(`📊 Found ${portfolios.length} portfolios`);
    return NextResponse.json(portfolios, { status: 200 });
    
  } catch (error: any) {
    console.error('❌ API Error:', error);
    return NextResponse.json(
      { 
        error: 'Failed to fetch portfolios',
        details: error.message 
      },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  console.log('🔵 API POST called');
  
  try {
    const body = await request.json();
    console.log('📝 Request body:', body);
    
    if (!process.env.MONGODB_URI) {
      return NextResponse.json(
        { error: 'Database configuration missing' },
        { status: 500 }
      );
    }
    
    await dbConnect();
    const Portfolio = (await import('@/app/models/Portfolio')).default;
    
    const trimmedImage = body.image?.trim() || '';
    const count = await Portfolio.countDocuments();
    const newId = String(count + 1).padStart(2, '0');
    
    const portfolioData = {
      id: newId,
      title: body.title,
      category: body.category,
      description: body.description,
      tech: body.tech || [],
      colorKey: body.colorKey || 'purple',
      stats: body.stats || '',
      image: trimmedImage,
      imageAlt: body.imageAlt || body.title,
      github: body.github || '',
      liveUrl: body.liveUrl || '',
    };
    
    const portfolio = await Portfolio.create(portfolioData);
    console.log('✅ Created portfolio:', portfolio.id);
    
    return NextResponse.json(portfolio, { status: 201 });
    
  } catch (error: any) {
    console.error('❌ POST Error:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to create portfolio' },
      { status: 500 }
    );
  }
}