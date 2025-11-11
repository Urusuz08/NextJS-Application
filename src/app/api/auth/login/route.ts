import { NextResponse } from 'next/server';
import https from 'https';

// IMPORTANT: This agent is used to bypass SSL certificate verification in a local development environment.
// This is necessary when the backend (e.g., Spring Boot) is running with a self-signed certificate.
// DO NOT use this in a production environment.
const agent = new https.Agent({
  rejectUnauthorized: false,
});

export async function POST(req: Request) {
  try {
    const { username, password } = await req.json();

    const backendResponse = await fetch('https://localhost:8081/api/account/user/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ 
        "username": username,
        "password": password,
        "type": "USER",
        "status": false
      }),
      // Use the custom agent only in development
      ...(process.env.NODE_ENV === 'development' && { agent }),
    });

    if (!backendResponse.ok) {
      // Log the error from the backend for better debugging
      const errorBody = await backendResponse.text();
      console.error('Backend login failed:', backendResponse.status, errorBody);
      return NextResponse.json({ message: 'Invalid credentials' }, { status: 401 });
    }

    const { token, user } = await backendResponse.json();

    const response = NextResponse.json({ user });
    response.cookies.set('authToken', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV !== 'development',
      sameSite: 'strict',
      maxAge: 60 * 60 * 24, // 1 day
      path: '/',
    });

    return response;
  } catch (error) {
    console.error('Login API Proxy Error:', error);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}
