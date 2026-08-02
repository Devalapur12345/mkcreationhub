import { randomUUID } from 'crypto'
import { mkdir, readFile, unlink, writeFile } from 'fs/promises'
import path from 'path'
import { get, put, del } from '@vercel/blob'
import { NextRequest, NextResponse } from 'next/server'
import { requireAdmin } from '@/lib/admin-auth'
import type { TestimonialImage } from '@/lib/testimonials'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

const uploadsDir = path.join(process.cwd(), 'public', 'testimonials', 'uploads')
const manifestPath = path.join(uploadsDir, 'images.json')
const isVercel = process.env.VERCEL === '1' || Boolean(process.env.VERCEL_URL)
const maxFileSize = 5 * 1024 * 1024

const allowedTypes = new Map([
  ['image/jpeg', 'jpg'],
  ['image/png', 'png'],
  ['image/webp', 'webp'],
])

const allowedExtensions = new Set(['jpg', 'jpeg', 'png', 'webp'])

async function ensureUploadsDir() {
  if (!isVercel) {
    await mkdir(uploadsDir, { recursive: true })
  }
}

async function readImages() {
  if (isVercel) {
    try {
      const blob = await get('testimonials/images.json', { access: 'private' })
      if (!blob) {
        return []
      }

      const text = await new Response(blob.stream).text()
      return JSON.parse(text) as TestimonialImage[]
    } catch {
      return []
    }
  }

  await ensureUploadsDir()

  try {
    const file = await readFile(manifestPath, 'utf8')
    return JSON.parse(file) as TestimonialImage[]
  } catch {
    return []
  }
}

async function saveImages(images: TestimonialImage[]) {
  if (isVercel) {
    await put('testimonials/images.json', JSON.stringify(images, null, 2), {
      access: 'private',
      contentType: 'application/json',
      allowOverwrite: true,
    })
    return
  }

  await ensureUploadsDir()
  await writeFile(manifestPath, JSON.stringify(images, null, 2), 'utf8')
}

function jsonResponse(body: unknown, init?: ResponseInit) {
  const response = NextResponse.json(body, init)
  response.headers.set('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate')
  response.headers.set('Pragma', 'no-cache')
  response.headers.set('Expires', '0')
  return response
}

function jsonError(message: string, status = 400) {
  return jsonResponse({ message }, { status })
}

function getErrorMessage(error: unknown) {
  return error instanceof Error ? error.message : 'Unknown server error'
}

function getImageExtension(file: File) {
  const extensionFromType = allowedTypes.get(file.type)

  if (extensionFromType) {
    return extensionFromType
  }

  const extensionFromName = file.name.split('.').pop()?.toLowerCase()

  if (extensionFromName && allowedExtensions.has(extensionFromName)) {
    return extensionFromName
  }

  return null
}

export async function GET() {
  const images = await readImages()
  return jsonResponse({ images })
}

export async function POST(request: NextRequest) {
  try {
    const authError = await requireAdmin(request)

    if (authError) {
      return authError
    }

    const formData = await request.formData()
    const file = formData.get('image')
    const titleValue = formData.get('title')
    const descriptionValue = formData.get('description')

    if (!(file instanceof File)) {
      return jsonError('Please choose an image.')
    }

    if (file.size > maxFileSize) {
      return jsonError('Please choose an image smaller than 5 MB.')
    }

    const extension = getImageExtension(file)

    if (!extension) {
      return jsonError('Only JPG, PNG, and WebP images are allowed.')
    }

    const imageTitle = String(titleValue || '').trim() || 'Customer Moment'
    const imageDescription = String(descriptionValue || '').trim()
    const imageId = `testimonial-${Date.now()}-${randomUUID()}`
    const fileName = `${imageId}.${extension === 'jpeg' ? 'jpg' : extension}`
    const bytes = Buffer.from(await file.arrayBuffer())

    const publicSrc = `/api/testimonials/images/${encodeURIComponent(fileName)}`

    if (isVercel) {
      await put(`testimonials/${fileName}`, bytes, {
        access: 'private',
        contentType: file.type || `image/${extension}`,
        allowOverwrite: true,
      })
    } else {
      await ensureUploadsDir()
      await writeFile(path.join(uploadsDir, fileName), bytes)
    }

    const uploadedImage: TestimonialImage = {
      id: imageId,
      src: publicSrc,
      title: imageTitle,
      description: imageDescription,
      isCustom: true,
    }

    const images = await readImages()
    const nextImages = [uploadedImage, ...images]
    await saveImages(nextImages)

    return jsonResponse({ image: uploadedImage, images: nextImages }, { status: 201 })
  } catch (error) {
    console.error('Testimonial image upload failed:', error)
    return jsonError(`Could not upload this image: ${getErrorMessage(error)}`, 500)
  }
}

export async function DELETE(request: NextRequest) {
  const authError = await requireAdmin(request)

  if (authError) {
    return authError
  }

  const imageId = request.nextUrl.searchParams.get('id')

  if (!imageId) {
    return jsonError('Missing image id.')
  }

  const images = await readImages()
  const imageToDelete = images.find((image) => image.id === imageId)
  const nextImages = images.filter((image) => image.id !== imageId)

  if (imageToDelete?.src.startsWith('/testimonials/uploads/') || imageToDelete?.src.startsWith('/api/testimonials/images/')) {
    const fileName = decodeURIComponent(path.basename(imageToDelete.src))

    try {
      if (!isVercel) {
        await unlink(path.join(uploadsDir, fileName))
      }
    } catch {
      // Keep the manifest correct even if the image file was already removed.
    }
  }

  if (isVercel && imageToDelete) {
    try {
      const fileName = imageToDelete.src.startsWith('/api/testimonials/images/')
        ? decodeURIComponent(path.basename(imageToDelete.src))
        : path.basename(imageToDelete.src)

      await del(`testimonials/${fileName}`)
    } catch {
      // Keep the manifest correct even if the image file was already removed.
    }
  }

  await saveImages(nextImages)

  return jsonResponse({ images: nextImages })
}
