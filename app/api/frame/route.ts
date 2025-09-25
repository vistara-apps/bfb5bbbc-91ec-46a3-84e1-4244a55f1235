import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://your-domain.com';

    // Initial frame
    const frameHtml = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta property="fc:frame" content="vNext" />
          <meta property="fc:frame:image" content="${baseUrl}/api/frame/image" />
          <meta property="fc:frame:button:1" content="Get Roasted! 🔥" />
          <meta property="fc:frame:button:1:action" content="post" />
          <meta property="fc:frame:post_url" content="${baseUrl}/api/frame/action" />
          <meta property="og:title" content="RoastBot - Get Roasted by AI" />
          <meta property="og:description" content="Get hilariously roasted by AI, powered by your X profile" />
          <meta property="og:image" content="${baseUrl}/api/frame/image" />
        </head>
        <body>
          <h1>RoastBot Frame</h1>
        </body>
      </html>
    `;

    return new NextResponse(frameHtml, {
      headers: {
        'Content-Type': 'text/html',
      },
    });

  } catch (error) {
    console.error('Error serving frame:', error);
    return NextResponse.json(
      { error: 'Failed to serve frame' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  // Handle frame actions
  try {
    const body = await request.json();
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://your-domain.com';

    // For now, redirect to the main app
    const frameHtml = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta property="fc:frame" content="vNext" />
          <meta property="fc:frame:image" content="${baseUrl}/api/frame/image" />
          <meta property="fc:frame:button:1" content="Open RoastBot" />
          <meta property="fc:frame:button:1:action" content="link" />
          <meta property="fc:frame:button:1:target" content="${baseUrl}" />
          <meta property="og:title" content="RoastBot - Get Roasted by AI" />
          <meta property="og:description" content="Get hilariously roasted by AI, powered by your X profile" />
          <meta property="og:image" content="${baseUrl}/api/frame/image" />
        </head>
        <body>
          <h1>RoastBot Frame</h1>
        </body>
      </html>
    `;

    return new NextResponse(frameHtml, {
      headers: {
        'Content-Type': 'text/html',
      },
    });

  } catch (error) {
    console.error('Error handling frame action:', error);
    return NextResponse.json(
      { error: 'Failed to handle frame action' },
      { status: 500 }
    );
  }
}

