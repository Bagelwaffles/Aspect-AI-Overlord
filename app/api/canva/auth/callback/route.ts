import { NextRequest, NextResponse } from 'next/server';

const CANVA_CLIENT_ID = process.env.CANVA_CLIENT_ID;
const CANVA_CLIENT_SECRET = process.env.CANVA_CLIENT_SECRET;
const CANVA_REDIRECT_URI = process.env.CANVA_REDIRECT_URI || 'https://aspectmarketingsolutions.app/api/canva/auth/callback';
const CANVA_TOKEN_URL = 'https://api.canva.com/rest/v1/oauth/token';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const code = searchParams.get('code');
    const state = searchParams.get('state');
    const error = searchParams.get('error');

    // Check for errors from Canva
    if (error) {
      console.error('Canva OAuth error:', error);
      return NextResponse.json(
        { error: 'Authorization failed', details: error },
        { status: 400 }
      );
    }

    // Validate state for CSRF protection
    const storedState = request.cookies.get('canva_oauth_state')?.value;
    if (!state || state !== storedState) {
      return NextResponse.json(
        { error: 'Invalid state parameter' },
        { status: 400 }
      );
    }

    if (!code) {
      return NextResponse.json(
        { error: 'Authorization code missing' },
        { status: 400 }
      );
    }

    // Exchange code for access token
    const tokenResponse = await fetch(CANVA_TOKEN_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        grant_type: 'authorization_code',
        code,
        client_id: CANVA_CLIENT_ID!,
        client_secret: CANVA_CLIENT_SECRET!,
        redirect_uri: CANVA_REDIRECT_URI,
      }),
    });

    if (!tokenResponse.ok) {
      const errorData = await tokenResponse.json();
      console.error('Token exchange failed:', errorData);
      return NextResponse.json(
        { error: 'Failed to exchange authorization code', details: errorData },
        { status: 500 }
      );
    }

    const tokenData = await tokenResponse.json();

    // Store tokens securely (implement your storage logic here)
    // For now, return success with token data
    const response = NextResponse.json({
      success: true,
      message: 'Canva authorization successful',
      expiresIn: tokenData.expires_in,
    });

    // Clear the state cookie
    response.cookies.delete('canva_oauth_state');

    // Store access token in httpOnly cookie (more secure alternative)
    response.cookies.set('canva_access_token', tokenData.access_token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: tokenData.expires_in,
    });

    if (tokenData.refresh_token) {
      response.cookies.set('canva_refresh_token', tokenData.refresh_token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: 60 * 60 * 24 * 365, // 1 year
      });
    }

    return response;
  } catch (error) {
    console.error('Canva OAuth callback error:', error);
    return NextResponse.json(
      { error: 'Internal server error during authorization' },
      { status: 500 }
    );
  }
}
