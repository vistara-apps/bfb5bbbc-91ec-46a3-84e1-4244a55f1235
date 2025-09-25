import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://your-domain.com';

    // Extract user information from Farcaster frame data
    const { untrustedData } = body;
    const fid = untrustedData?.fid;

    // Create a personalized frame response
    const frameHtml = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta property="fc:frame" content="vNext" />
          <meta property="fc:frame:image" content="${baseUrl}/api/frame/image?fid=${fid}" />
          <meta property="fc:frame:button:1" content="Open RoastBot" />
          <meta property="fc:frame:button:1:action" content="link" />
          <meta property="fc:frame:button:1:target" content="${baseUrl}?fid=${fid}" />
          <meta property="fc:frame:button:2" content="Share Frame" />
          <meta property="fc:frame:button:2:action" content="link" />
          <meta property="fc:frame:button:2:target" content="https://warpcast.com/~/compose?text=Just%20got%20roasted%20by%20AI%20on%20RoastBot!%20%F0%9F%94%A5%20Try%20it%20out!&embeds[]=${encodeURIComponent(baseUrl)}" />
          <meta property="og:title" content="RoastBot - Get Roasted by AI" />
          <meta property="og:description" content="Get hilariously roasted by AI, powered by your X profile" />
          <meta property="og:image" content="${baseUrl}/api/frame/image" />
        </head>
        <body>
          <h1>RoastBot Frame Action</h1>
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

