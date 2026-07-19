import { randomUUID } from 'crypto'
import { mkdir, readFile, writeFile } from 'fs/promises'
import path from 'path'
import { get, put, del } from '@vercel/blob'
import { NextRequest, NextResponse } from 'next/server'
import { requireAdmin } from '@/lib/admin-auth'
import { uploadableGalleryCategories, type GalleryCategory, type GalleryImage } from '@/lib/gallery'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

const uploadsDir = path.join(process.cwd(), 'public', 'gallery', 'uploads')
const manifestPath = path.join(uploadsDir, 'images.json')
const isVercel = process.env.VERCEL === '1' || Boolean(process.env.VERCEL_URL)
const maxFileSize = 2 * 1024 * 1024

const allowedTypes = new Map([
  ['image/jpeg', 'jpg'],
  ['image/png', 'png'],
  ['image/webp', 'webp'],
])

const allowedCategories = uploadableGalleryCategories

async function ensureUploadsDir() {
  if (!isVercel) {
    await mkdir(uploadsDir, { recursive: true })
  }
}

async function readImages() {
  if (isVercel) {
    try {
      const blob = await get('gallery/images.json', { access: 'private', useCache: false })
      if (!blob) {
        return []
      }

      const text = await new Response(blob.stream).text()
      return JSON.parse(text) as GalleryImage[]
    } catch {
      return []
    }
  }

  await ensureUploadsDir()

  try {
    const file = await readFile(manifestPath, 'utf8')
    return JSON.parse(file) as GalleryImage[]
  } catch {
    return []
  }
}

async function saveImages(images: GalleryImage[]) {
  if (isVercel) {
    await put('gallery/images.json', JSON.stringify(images, null, 2), {
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

function getImageBlobPath(image: GalleryImage) {
  if (image.blobPath) {
    return image.blobPath
  }

  if (image.src.startsWith('/api/gallery/images/')) {
    const fileName = image.src.split('/').pop()
    return fileName ? `gallery/${decodeURIComponent(fileName)}` : null
  }

  if (image.src.startsWith('https://')) {
    return image.src
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
    const categoryValue = formData.get('category')

    if (!(file instanceof File)) {
      return jsonError('Please choose an image.')
    }

    if (file.size > maxFileSize) {
      return jsonError('Please choose an image smaller than 2 MB.')
    }

    const extension = allowedTypes.get(file.type)

    if (!extension) {
      return jsonError('Only JPG, PNG, and WebP images are allowed.')
    }

    const category = String(categoryValue || 'gift-hampers') as GalleryCategory

    if (!allowedCategories.includes(category)) {
      return jsonError('Please choose a valid category.')
    }

    const imageTitle = String(titleValue || '').trim() || 'Gallery Image'
    const imageId = `custom-${Date.now()}-${randomUUID()}`
    const fileName = `${imageId}.${extension}`
    const bytes = Buffer.from(await file.arrayBuffer())
    const blobPath = `gallery/${fileName}`

    let publicSrc = `/gallery/uploads/${fileName}`

    if (isVercel) {
      await put(blobPath, bytes, {
        access: 'private',
        contentType: file.type,
      })
      publicSrc = `/api/gallery/images/${encodeURIComponent(fileName)}`
    } else {
      await ensureUploadsDir()
      await writeFile(path.join(uploadsDir, fileName), bytes)
    }

    const uploadedImage: GalleryImage = {
      id: imageId,
      src: publicSrc,
      alt: imageTitle,
      category,
      title: imageTitle,
      isCustom: true,
      ...(isVercel ? { blobPath } : {}),
    }

    const images = await readImages()
    const nextImages = [uploadedImage, ...images]
    await saveImages(nextImages)

    return jsonResponse({ image: uploadedImage, images: nextImages }, { status: 201 })
  } catch (error) {
    console.error('Gallery upload failed:', error)
    return jsonError(`Could not upload this image: ${getErrorMessage(error)}`, 500)
  }
}

export async function DELETE(request: NextRequest) {
  const authError = await requireAdmin(request)

  if (authError) {
    return authError
  }

  const imageId = request.nextUrl.searchParams.get('id') || (await request.json().catch(() => null) as { id?: string } | null)?.id

  if (!imageId) {
    return jsonError('Missing image id.')
  }

  const images = await readImages()
  const imageToDelete = images.find((image) => image.id === imageId)
  const nextImages = images.filter((image) => image.id !== imageId)

  if (imageToDelete?.src.startsWith('/gallery/uploads/')) {
    const fileName = path.basename(imageToDelete.src)

    try {
      if (!isVercel) {
        await import('fs/promises').then(({ unlink }) => unlink(path.join(uploadsDir, fileName)))
      }
    } catch {
      // The gallery index should still be cleaned up if the file is already gone.
    }
  }

  const blobPath = imageToDelete ? getImageBlobPath(imageToDelete) : null

  if (isVercel && blobPath) {
    try {
      await del(blobPath)
    } catch {
      // The gallery index should still be cleaned up if the file is already gone.
    }
  }

  await saveImages(nextImages)

  return jsonResponse({ images: nextImages })
}
