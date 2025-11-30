import type { User } from '@/app/interfaces/interfaces';

/**
 * Sends a token to the backend for verification.
 * @param token The JWT token to verify.
 * @returns The user object if the token is valid, otherwise null.
 */
export async function verifyTokenWithBackend(token: string): Promise<{ user: User } | null> {
  try {
    // This is the new endpoint you will need to create in your Spring Boot backend
    const backendResponse = await fetch('https://localhost:8081/api/account/user/authenticate', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });

    if (!backendResponse.ok) {
      console.error('Backend token verification failed with status:', backendResponse.status);
      return null;
    }

    const data: { user: User } = await backendResponse.json();
    return data;
  } catch (error) {
    console.error('Error while calling backend for token verification:', error);
    return null;
  }
}
