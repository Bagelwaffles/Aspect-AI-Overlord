import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';

/**
 * Shopify Product Webhook Handler
 * Triggers automated Canva design generation when products are created/updated
 * 
 * Webhook URL: https://aspectmarketingsolutions.app/api/webhooks/shopify-product
 */

const SHOPIFY_WEBHOOK_SECRET = process.env.SHOPIFY_WEBHOOK_SECRET;
const N8N_WEBHOOK_URL = process.env.N8N_WEBHOOK_URL;

interface ShopifyProduct {
  id: number;
  title: string;
  body_html: string;
  vendor: string;
  product_type: string;
  tags: string;
  variants: Array<{
    id: number;
    price: string;
    sku: string;
  }>;
  images: Array<{
    id: number;
    src: string;
  }>;
}

/**
 * Verify Shopify webhook signature
 */
function verifyShopifyWebhook(body: string, hmacHeader: string): boolean {
  if (!SHOPIFY_WEBHOOK_SECRET) {
    console.error('SHOPIFY_WEBHOOK_SECRET not configured');
    return false;
  }

  const hash = crypto
    .createHmac('sha256', SHOPIFY_WEBHOOK_SECRET)
    .update(body, 'utf8')
    .digest('base64');

  return crypto.timingSafeEqual(
    Buffer.from(hash),
    Buffer.from(hmacHeader)
  );
}

/**
 * POST /api/webhooks/shopify-product
 * Receives Shopify product webhooks and triggers n8n workflow
 */
export async function POST(request: NextRequest) {
  try {
    // Get raw body for signature verification
    const rawBody = await request.text();
    const hmacHeader = request.headers.get('x-shopify-hmac-sha256');

    if (!hmacHeader) {
      console.error('Missing HMAC header');
      return NextResponse.json(
        { error: 'Missing HMAC header' },
        { status: 401 }
      );
    }

    // Verify webhook signature
    if (!verifyShopifyWebhook(rawBody, hmacHeader)) {
      console.error('Invalid webhook signature');
      return NextResponse.json(
        { error: 'Invalid signature' },
        { status: 401 }
      );
    }

    // Parse product data
    const product: ShopifyProduct = JSON.parse(rawBody);
    const webhookTopic = request.headers.get('x-shopify-topic');

    console.log(`Received Shopify webhook: ${webhookTopic} for product ${product.id}`);

    // Prepare data for n8n workflow
    const workflowPayload = {
      event: webhookTopic,
      timestamp: new Date().toISOString(),
      product: {
        id: product.id,
        title: product.title,
        description: product.body_html,
        vendor: product.vendor,
        productType: product.product_type,
        tags: product.tags.split(',').map(tag => tag.trim()),
        price: product.variants[0]?.price || '0',
        sku: product.variants[0]?.sku || '',
        images: product.images.map(img => img.src),
      },
      automation: {
        // Automation configuration
        generateDesigns: true,
        designTypes: [
          'product-feature', // Main product image
          'social-instagram', // Instagram post
          'social-facebook', // Facebook post
          'email-header', // Email campaign header
        ],
        canvaTemplates: {
          productFeature: 'template_id_here', // To be configured
          socialInstagram: 'template_id_here',
          socialFacebook: 'template_id_here',
          emailHeader: 'template_id_here',
        }
      }
    };

    // Forward to n8n workflow
    if (N8N_WEBHOOK_URL) {
      const n8nResponse = await fetch(N8N_WEBHOOK_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(workflowPayload),
      });

      if (!n8nResponse.ok) {
        console.error('Failed to trigger n8n workflow:', await n8nResponse.text());
        return NextResponse.json(
          { error: 'Failed to trigger automation workflow' },
          { status: 500 }
        );
      }

      console.log(`Successfully triggered n8n workflow for product ${product.id}`);
    } else {
      console.warn('N8N_WEBHOOK_URL not configured - workflow not triggered');
    }

    // Return success to Shopify
    return NextResponse.json({
      success: true,
      productId: product.id,
      automationTriggered: !!N8N_WEBHOOK_URL,
    });

  } catch (error) {
    console.error('Shopify webhook error:', error);
    return NextResponse.json(
      { 
        error: 'Webhook processing failed',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}

/**
 * GET /api/webhooks/shopify-product
 * Health check endpoint
 */
export async function GET() {
  return NextResponse.json({
    status: 'active',
    webhook: 'shopify-product',
    endpoints: {
      canva: !!process.env.CANVA_CLIENT_ID,
      n8n: !!process.env.N8N_WEBHOOK_URL,
      shopify: !!process.env.SHOPIFY_WEBHOOK_SECRET,
    }
  });
}
