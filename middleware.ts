// middleware.ts - প্রোজেক্টের রুটে
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  
  // শুধু /admin দিয়ে শুরু হওয়া পাথে Basic Auth লাগবে
  if (pathname.startsWith('/admin')) {
    const authHeader = request.headers.get('authorization');
    
    console.log('Path:', pathname); // ডিবাগিং এর জন্য
    console.log('Auth Header:', authHeader); // ডিবাগিং এর জন্য
    
    if (!authHeader) {
      console.log('No auth header - asking for credentials');
      return new NextResponse('Unauthorized', {
        status: 401,
        headers: {
          'WWW-Authenticate': 'Basic realm="Admin Access"',
        },
      });
    }

    const base64Credentials = authHeader.split(' ')[1];
    const credentials = Buffer.from(base64Credentials, 'base64').toString();
    const [username, password] = credentials.split(':');
    
    console.log('Username:', username); // ডিবাগিং এর জন্য
    console.log('Password:', password); // ডিবাগিং এর জন্য
    
    // হার্ডকোডেড ক্রেডেনশিয়াল (টেস্টিং এর জন্য)
    if (username === 'hafiz' && password === 'admin123') {
      console.log('Auth success');
      return NextResponse.next();
    }
    
    console.log('Auth failed');
    return new NextResponse('Unauthorized', {
      status: 401,
      headers: {
        'WWW-Authenticate': 'Basic realm="Admin Access"',
      },
    });
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*'],
};