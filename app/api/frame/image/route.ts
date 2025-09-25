import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    // For now, return a simple SVG image
    // In production, you'd generate dynamic images or use a static image
    const svg = `
      <svg width="1200" height="630" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style="stop-color:#1a1a2e;stop-opacity:1" />
            <stop offset="100%" style="stop-color:#16213e;stop-opacity:1" />
          </linearGradient>
        </defs>
        <rect width="1200" height="630" fill="url(#bg)"/>
        <text x="600" y="200" text-anchor="middle" fill="#ff6b6b" font-family="Arial, sans-serif" font-size="48" font-weight="bold">
          🔥 RoastBot 🔥
        </text>
        <text x="600" y="280" text-anchor="middle" fill="#ffffff" font-family="Arial, sans-serif" font-size="24">
          Get Hilariously Roasted by AI
        </text>
        <text x="600" y="340" text-anchor="middle" fill="#cccccc" font-family="Arial, sans-serif" font-size="18">
          Powered by your X profile
        </text>
        <text x="600" y="400" text-anchor="middle" fill="#ff6b6b" font-family="Arial, sans-serif" font-size="16">
          Click to get roasted! 🔥
        </text>
      </svg>
    `;

    return new NextResponse(svg, {
      headers: {
        'Content-Type': 'image/svg+xml',
        'Cache-Control': 'public, max-age=3600',
      },
    });

  } catch (error) {
    console.error('Error generating frame image:', error);
    return NextResponse.json(
      { error: 'Failed to generate frame image' },
      { status: 500 }
    );
  }
}

