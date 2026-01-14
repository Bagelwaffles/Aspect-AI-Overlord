import { NextRequest, NextResponse } from 'next/server';
import { CanvaClient } from '../client';

/**
 * GET /api/canva/designs
 * List all designs for the authenticated user
 */
export async function GET(request: NextRequest) {
  try {
    const accessToken = request.cookies.get('canva_access_token')?.value;

    if (!accessToken) {
      return NextResponse.json(
        { error: 'Not authenticated with Canva' },
        { status: 401 }
      );
    }

    const client = new CanvaClient({ accessToken });
    
    const { searchParams } = new URL(request.url);
    const limit = searchParams.get('limit');
    const continuation = searchParams.get('continuation');

    const designs = await client.listDesigns({
      ...(limit && { limit: parseInt(limit) }),
      ...(continuation && { continuation }),
    });

    return NextResponse.json(designs);
  } catch (error) {
    console.error('Error fetching Canva designs:', error);
    return NextResponse.json(
      { error: 'Failed to fetch designs', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}

/**
 * POST /api/canva/designs
 * Create a new design
 */
export async function POST(request: NextRequest) {
  try {
    const accessToken = request.cookies.get('canva_access_token')?.value;

    if (!accessToken) {
      return NextResponse.json(
        { error: 'Not authenticated with Canva' },
        { status: 401 }
      );
    }

    const client = new CanvaClient({ accessToken });
    const body = await request.json();

    const design = await client.createDesign(body);

    return NextResponse.json(design, { status: 201 });
  } catch (error) {
    console.error('Error creating Canva design:', error);
    return NextResponse.json(
      { error: 'Failed to create design', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}
