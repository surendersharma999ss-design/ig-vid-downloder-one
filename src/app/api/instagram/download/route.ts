import { NextRequest, NextResponse } from 'next/server';
import { getInstagramVideoUrl } from '../../../../features/api/requests/instagram';

export async function POST(req: NextRequest) {
  try {
    const { url } = await req.json();
    if (!url || typeof url !== 'string') {
      return NextResponse.json({ error: 'Invalid or missing Instagram URL.' }, { status: 400 });
    }

    // Extract shortcode from the Instagram URL
    const match = url.match(/instagram\.com\/p\/([\w-]+)/);
    if (!match || !match[1]) {
      return NextResponse.json({ error: 'Invalid Instagram post URL.' }, { status: 400 });
    }
    const shortcode = match[1];

    // Use existing logic to get the download link
    const videoUrl = await getInstagramVideoUrl(shortcode);
    if (!videoUrl) {
      return NextResponse.json({ error: 'Unable to fetch video URL.' }, { status: 404 });
    }

    return NextResponse.json({ downloadUrl: videoUrl });
  } catch (error) {
    return NextResponse.json({ error: 'Server error.' }, { status: 500 });
  }
}
