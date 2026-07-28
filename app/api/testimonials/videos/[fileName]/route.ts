import { createReadStream } from 'fs'
import { stat } from 'fs/promises'
import path from 'path'
import { Readable } from 'stream'
import { get } from '@vercel/blob'
import { NextRequest, NextResponse } from 'next/server'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

const uploadsDir = path.join(process.cwd(), 'public', 'testimonials', 'uploads')
const isVercel = process.env.VERCEL === '1' || Boolean(process.env.VERCEL_URL)
const validFileName = /^testimonial-[\w-]+\.(mp4|webm|mov)$/i

const contentTypes: Record<string, string> = {
  mp4: 'video/mp4',
  webm: 'video/webm',
  mov: 'video/quicktime',
}

function getContentType(fileName: string) {
  const extension = path.extname(fileName).slice(1).toLowerCase()
  return contentTypes[extension] || 'application/octet-stream'
}

function parseRange(rangeHeader: string | null, fileSize: number) {
  if (!rangeHeader) {
    return null
  }

  const range = rangeHeader.match(/^bytes=(\d*)-(\d*)$/)

  if (!range) {
    return null
  }

  const start = range[1] ? Number(range[1]) : 0
  const end = range[2] ? Number(range[2]) : fileSize - 1

  if (Number.isNaN(start) || Number.isNaN(end) || start > end || end >= fileSize) {
    return null
  }

  return { start, end }
}

export async function GET(
  request: NextRequest,
  context: { params: Promise<{ fileName: string }> },
) {
  try {
    const { fileName } = await context.params
    const decodedFileName = decodeURIComponent(fileName)

    if (!validFileName.test(decodedFileName)) {
      return NextResponse.json({ message: 'Invalid video.' }, { status: 400 })
    }

    if (isVercel) {
      const blob = await get(`testimonials/${decodedFileName}`, {
        access: 'private',
        useCache: false,
      })

      if (!blob?.stream) {
        return NextResponse.json({ message: 'Video not found.' }, { status: 404 })
      }

      return new Response(blob.stream, {
        headers: {
          'Accept-Ranges': 'bytes',
          'Cache-Control': 'public, max-age=0, s-maxage=31536000, immutable',
          'Content-Type': blob.blob.contentType || getContentType(decodedFileName),
        },
      })
    }

    const filePath = path.join(uploadsDir, decodedFileName)
    const fileStats = await stat(filePath)
    const range = parseRange(request.headers.get('range'), fileStats.size)

    if (range) {
      const stream = createReadStream(filePath, { start: range.start, end: range.end })

      return new Response(Readable.toWeb(stream) as ReadableStream, {
        status: 206,
        headers: {
          'Accept-Ranges': 'bytes',
          'Cache-Control': 'public, max-age=0, must-revalidate',
          'Content-Length': String(range.end - range.start + 1),
          'Content-Range': `bytes ${range.start}-${range.end}/${fileStats.size}`,
          'Content-Type': getContentType(decodedFileName),
        },
      })
    }

    const stream = createReadStream(filePath)

    return new Response(Readable.toWeb(stream) as ReadableStream, {
      headers: {
        'Accept-Ranges': 'bytes',
        'Cache-Control': 'public, max-age=0, must-revalidate',
        'Content-Length': String(fileStats.size),
        'Content-Type': getContentType(decodedFileName),
      },
    })
  } catch (error) {
    console.error('Testimonial video load failed:', error)
    return NextResponse.json({ message: 'Could not load video.' }, { status: 500 })
  }
}
