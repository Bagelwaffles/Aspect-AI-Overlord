import { NextRequest, NextResponse } from 'next/server';
import { CanvaClient } from '../client';

/**
 * GET /api/canva/templates
 * List all brand templates for the authenticated user
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
    const templateId = searchParams.get('templateId');

    // If templateId is provided, get specific template
    if (templateId) {
      const template = await client.getBrandTemplate(templateId);
      return NextResponse.json(template);
    }

    // Otherwise, list all templates
    const templates = await client.listBrandTemplates({
      ...(limit && { limit: parseInt(limit) }),
      ...(continuation && { continuation }),
    });

    return NextResponse.json(templates);
  } catch (error) {
    console.error('Error fetching Canva templates:', error);
    return NextResponse.json(
      { error: 'Failed to fetch templates', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}

/**
 * POST /api/canva/templates
 * Create a new design from a brand template
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
    const { templateId, title } = await request.json();

    if (!templateId) {
      return NextResponse.json(
        { error: 'Template ID is required' },
        { status: 400 }
      );
    }

    const design = await client.createDesignFromBrandTemplate(templateId, { title });

    return NextResponse.json(design, { status: 201 });
  } catch (error) {
    console.error('Error creating design from template:', error);
    return NextResponse.json(
      { error: 'Failed to create design from template', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}
