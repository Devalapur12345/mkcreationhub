import { createReadStream } from 'fs'
import { stat } from 'fs/promises'
import path from 'path'
import { Readable } from 'stream'
import { get } from '@vercel/blob'
import { NextResponse } from 'next/server'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

const uploadsDir = path.join(process.cwd(), 'public', 'testimonials', 'uploads')
const isVercel = process.env.VERCEL === '1' || Boolean(process.env.VERCEL_URL)
const validFileName = /^testimonial-[\w-]+\.(jpg|jpeg|png|webp)$/i

const contentTypes: Record<string, string> = {
  jpg: 'image/jpeg',
  jpeg: 'image/jpeg',
  png: 'image/png',
  webp: 'image/webp',
}

function getContentType(fileName: string) {
  const extension = path.extname(fileName).slice(1).toLowerCase()
  return contentTypes[extension] || 'application/octet-stream'
}

export async function GET(
  _request: Request,
  context: { params: Promise<{ fileName: string }> },
) {
  try {
    const { fileName } = await context.params
    const decodedFileName = decodeURIComponent(fileName)

    if (!validFileName.test(decodedFileName)) {
      return NextResponse.json({ message: 'Invalid image.' }, { status: 400 })
    }

    if (isVercel) {
      const blob = await get(`testimonials/${decodedFileName}`, {
        access: 'private',
        useCache: false,
      })

      if (!blob?.stream) {
        return NextResponse.json({ message: 'Image not found.' }, { status: 404 })
      }

      return new Response(blob.stream, {
        headers: {
          'Cache-Control': 'public, max-age=0, s-maxage=31536000, immutable',
          'Content-Type': blob.blob.contentType || getContentType(decodedFileName),
        },
      })
    }

    const filePath = path.join(uploadsDir, decodedFileName)
    const fileStats = await stat(filePath)
    const stream = createReadStream(filePath)

    return new Response(Readable.toWeb(stream) as ReadableStream, {
      headers: {
        'Cache-Control': 'public, max-age=0, must-revalidate',
        'Content-Length': String(fileStats.size),
        'Content-Type': getContentType(decodedFileName),
      },
    })
  } catch (error) {
    console.error('Testimonial image load failed:', error)
    return NextResponse.json({ message: 'Could not load image.' }, { status: 500 })
  }
}
