
import { NextResponse, NextRequest } from 'next/server';
import { jwtVerify } from 'jose';

const secret = new TextEncoder().encode(process.env.JWT_SECRET);

export async function GET(req: NextRequest) {
  const token = req.cookies.get('authToken')?.value;

  if (!token) {
    return NextResponse.json({ user: null }, { status: 401 });
  }

  try {
    const { payload } = await jwtVerify(token, secret);
    // You might want to fetch fresh user data from your DB here
    const user = {
      id: payload.id,
      username: payload.username,
      role: payload.role,
    };
    return NextResponse.json({ user });
  } catch (err) {
    console.error('"Me" API Error:', err);
    return NextResponse.json({ user: null }, { status: 401 });
  }
}
