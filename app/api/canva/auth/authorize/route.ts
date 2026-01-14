import { NextRequest, NextResponse } from 'next/server';

const CANVA_CLIENT_ID = process.env.CANVA_CLIENT_ID;
const CANVA_REDIRECT_URI = process.env.CANVA_REDIRECT_URI || 'https://aspectmarketingsolutions.app/api/canva/auth/callback';
const CANVA_AUTH_URL = 'https://www.canva.com/api/oauth/authorize';

export async function GET(request: NextRequest) {
  try {
    // Generate state for CSRF protection
    const state = Math.random().toString(36).substring(7);
    
    // Store state in session or cookie for validation in callback
    const response = NextResponse.redirect(
      `${CANVA_AUTH_URL}?` +
      `response_type=code&` +
      `client_id=${CANVA_CLIENT_ID}&` +
      `redirect_uri=${encodeURIComponent(CANVA_REDIRECT_URI)}&` +
      `state=${state}&` +
      `scope=app:read asset:read asset:write design:content:read design:content:write`
    );
    
    // Set state cookie for CSRF validation
    response.cookies.set('canva_oauth_state', state, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 600 // 10 minutes
    });
    
    return response;
  } catch (error) {
    console.error('Canva OAuth authorization error:', error);
    return NextResponse.json(
      { error: 'Failed to initiate Canva authorization' },
      { status: 500 }
    );
  }
}
