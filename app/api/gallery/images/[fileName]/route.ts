import { get } from '@vercel/blob'
import { NextRequest, NextResponse } from 'next/server'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

const validFileName = /^custom-[\w-]+\.(jpg|png|webp)$/

export async function GET(
  _request: NextRequest,
  context: { params: Promise<{ fileName: string }> },
) {
  try {
    const { fileName } = await context.params
    const decodedFileName = decodeURIComponent(fileName)

    if (!validFileName.test(decodedFileName)) {
      return NextResponse.json({ message: 'Invalid image.' }, { status: 400 })
    }

    const blob = await get(`gallery/${decodedFileName}`, {
      access: 'private',
      useCache: false,
    })

    if (!blob?.stream) {
      return NextResponse.json({ message: 'Image not found.' }, { status: 404 })
    }

    return new Response(blob.stream, {
      headers: {
        'Cache-Control': 'public, max-age=0, s-maxage=31536000, immutable',
        'Content-Type': blob.blob.contentType || 'application/octet-stream',
      },
    })
  } catch (error) {
    console.error('Gallery image load failed:', error)
    return NextResponse.json({ message: 'Could not load image.' }, { status: 500 })
  }
}
