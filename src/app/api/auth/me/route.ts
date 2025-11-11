
import { NextResponse, NextRequest } from 'next/server';
import { verifyTokenWithBackend } from '@/lib/auth';

export async function GET(req: NextRequest) {
  const token = req.cookies.get('authToken')?.value;

  if (!token) {
    return NextResponse.json({ user: null }, { status: 401 });
  }

  try {
    const user = await verifyTokenWithBackend(token);

    if (!user) {
      return NextResponse.json({ user: null }, { status: 401 });
    }
    
    return NextResponse.json({ user });
  } catch (err) {
    console.error('"Me" API Error:', err);
    return NextResponse.json({ user: null }, { status: 401 });
  }
}
