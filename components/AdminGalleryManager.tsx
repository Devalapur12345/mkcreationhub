'use client'

import { FormEvent, useEffect, useMemo, useState } from 'react'
import { ImagePlus, LogOut, Trash2 } from 'lucide-react'
import {
  defaultImages,
  galleryStorageKey,
  getGalleryCategoryLabel,
  galleryFilters,
  normalizeGalleryCategory,
  uploadableGalleryCategories,
  type GalleryCategory,
  type VisibleGalleryCategory,
  type GalleryImage,
} from '@/lib/gallery'
import type { TestimonialImage } from '@/lib/testimonials'

const maxFileSize = 2 * 1024 * 1024
const maxTestimonialImageFileSize = 5 * 1024 * 1024

function readLegacyLocalImages() {
  try {
    const storedImages = window.localStorage.getItem(galleryStorageKey)
    return storedImages ? (JSON.parse(storedImages) as GalleryImage[]) : []
  } catch {
    return []
  }
}

function dataUrlToFile(dataUrl: string, fileName: string) {
  const [meta, data] = dataUrl.split(',')
  const mime = meta.match(/data:(.*?);base64/)?.[1] || 'image/jpeg'
  const binary = window.atob(data)
  const bytes = new Uint8Array(binary.length)

  for (let index = 0; index < binary.length; index += 1) {
    bytes[index] = binary.charCodeAt(index)
  }

  return new File([bytes], fileName, { type: mime })
}

async function readResponseMessage(response: Response, fallback: string) {
  try {
    const data = (await response.json()) as { message?: string }
    return data.message || fallback
  } catch {
    return fallback
  }
}

export default function AdminGalleryManager() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [category, setCategory] = useState<VisibleGalleryCategory>('gift-hampers')
  const [file, setFile] = useState<File | null>(null)
  const [images, setImages] = useState<GalleryImage[]>([])
  const [hiddenDefaultImageIds, setHiddenDefaultImageIds] = useState<string[]>([])
  const [message, setMessage] = useState('')
  const [isSaving, setIsSaving] = useState(false)
  const [testimonialDescription, setTestimonialDescription] = useState('')
  const [testimonialFile, setTestimonialFile] = useState<File | null>(null)
  const [testimonialImages, setTestimonialImages] = useState<TestimonialImage[]>([])
  const [testimonialMessage, setTestimonialMessage] = useState('')
  const [isTestimonialSaving, setIsTestimonialSaving] = useState(false)

  const categoryOptions = useMemo(
    () =>
      galleryFilters.filter(
        (filter): filter is { category: string; id: VisibleGalleryCategory } =>
          uploadableGalleryCategories.includes(filter.id as VisibleGalleryCategory),
      ),
    [],
  )

  const manageableImages = useMemo(
    () => [...images, ...defaultImages.filter((image) => !hiddenDefaultImageIds.includes(image.id))],
    [hiddenDefaultImageIds, images],
  )

  useEffect(() => {
    const checkSession = async () => {
      try {
        const response = await fetch('/api/admin/session', { cache: 'no-store' })
        const data = (await response.json()) as { isLoggedIn?: boolean }
        setIsLoggedIn(Boolean(data.isLoggedIn))
      } catch {
        setIsLoggedIn(false)
      }
    }

    checkSession()
  }, [])

  useEffect(() => {
    if (!isLoggedIn) {
      return
    }

    const loadImages = async () => {
      try {
        const response = await fetch('/api/gallery', { cache: 'no-store' })
        const data = (await response.json()) as { images?: GalleryImage[]; hiddenDefaultImageIds?: string[] }
        let nextImages = data.images ?? []
        let nextHiddenDefaultImageIds = data.hiddenDefaultImageIds ?? []
        const legacyImages = readLegacyLocalImages().filter((image) => image.src.startsWith('data:image/'))

        if (legacyImages.length > 0) {
          setMessage('Moving old browser-only images to live gallery...')

          for (const legacyImage of legacyImages) {
            const formData = new FormData()
            const fileExtension = legacyImage.src.includes('image/png')
              ? 'png'
              : legacyImage.src.includes('image/webp')
                ? 'webp'
                : 'jpg'

            formData.append('title', legacyImage.title)
            formData.append('category', normalizeGalleryCategory(legacyImage.category))
            formData.append('image', dataUrlToFile(legacyImage.src, `${legacyImage.id}.${fileExtension}`))

            const migrateResponse = await fetch('/api/gallery', {
              method: 'POST',
              body: formData,
            })
            const migrateData = (await migrateResponse.json()) as {
              images?: GalleryImage[]
              hiddenDefaultImageIds?: string[]
            }

            if (migrateResponse.ok) {
              nextImages = migrateData.images ?? nextImages
              nextHiddenDefaultImageIds = migrateData.hiddenDefaultImageIds ?? nextHiddenDefaultImageIds
            }
          }

          window.localStorage.removeItem(galleryStorageKey)
          setMessage('Old browser-only images moved to live gallery.')
        }

        setImages(nextImages)
        setHiddenDefaultImageIds(nextHiddenDefaultImageIds)
      } catch {
        setMessage('Could not load uploaded images.')
      }
    }

    loadImages()
  }, [isLoggedIn])

  useEffect(() => {
    if (!isLoggedIn) {
      return
    }

    const loadTestimonialImages = async () => {
      try {
        const response = await fetch('/api/testimonials', { cache: 'no-store' })
        const data = (await response.json()) as { images?: TestimonialImage[] }
        setTestimonialImages(data.images ?? [])
      } catch {
        setTestimonialMessage('Could not load testimonial images.')
      }
    }

    loadTestimonialImages()
  }, [isLoggedIn])

  const handleLogin = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    if (!username.trim() || !password.trim()) {
      setMessage('Please enter both username and password.')
      return
    }

    try {
      const response = await fetch('/api/admin/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      })
      const data = (await response.json()) as { message?: string }

      if (!response.ok) {
        setMessage(data.message || 'Wrong credentials. Please try again.')
        return
      }

      setIsLoggedIn(true)
      setUsername('')
      setPassword('')
      setMessage('')
    } catch {
      setMessage('Could not login. Please try again.')
    }
  }

  const handleLogout = async () => {
    try {
      await fetch('/api/admin/logout', { method: 'POST' })
    } catch {
      // The local UI should still leave the admin area even if the request fails.
    }

    setIsLoggedIn(false)
    setUsername('')
    setPassword('')
    setMessage('')
  }

  const handleUpload = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    if (!file) {
      setMessage('Please choose an image.')
      return
    }

    if (file.size > maxFileSize) {
      setMessage('Please choose an image smaller than 2 MB.')
      return
    }

    const formData = new FormData()
    formData.append('category', category)
    formData.append('image', file)

    setIsSaving(true)
    setMessage('Uploading image...')

    try {
      const response = await fetch('/api/gallery', {
        method: 'POST',
        body: formData,
      })
      const data = (await response.json()) as {
        images?: GalleryImage[]
        hiddenDefaultImageIds?: string[]
        message?: string
      }

      if (!response.ok) {
        setMessage(data.message || 'Could not upload this image.')
        return
      }

      setImages(data.images ?? [])
      setHiddenDefaultImageIds(data.hiddenDefaultImageIds ?? hiddenDefaultImageIds)
      setCategory('gift-hampers')
      setFile(null)
      setMessage('Image added to live gallery.')
    } catch {
      setMessage('Could not upload this image. Please try again.')
    } finally {
      setIsSaving(false)
    }
  }

  const removeImage = async (imageId: string) => {
    setMessage('Removing image...')

    try {
      const response = await fetch('/api/gallery', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id: imageId }),
      })
      const data = (await response.json()) as {
        images?: GalleryImage[]
        hiddenDefaultImageIds?: string[]
        message?: string
      }

      if (!response.ok) {
        setMessage(data.message || 'Could not remove this image.')
        return
      }

      setImages(data.images ?? [])
      setHiddenDefaultImageIds(data.hiddenDefaultImageIds ?? hiddenDefaultImageIds)
      setMessage('Image removed from live gallery.')
    } catch {
      setMessage('Could not remove this image. Please try again.')
    }
  }

  const handleTestimonialImageUpload = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    if (!testimonialFile) {
      setTestimonialMessage('Please choose an image.')
      return
    }

    if (testimonialFile.size > maxTestimonialImageFileSize) {
      setTestimonialMessage('Please choose an image smaller than 5 MB.')
      return
    }

    const formData = new FormData()
    formData.append('description', testimonialDescription)
    formData.append('image', testimonialFile)

    setIsTestimonialSaving(true)
    setTestimonialMessage('Uploading testimonial image...')

    try {
      const response = await fetch('/api/testimonials', {
        method: 'POST',
        body: formData,
      })

      if (!response.ok) {
        setTestimonialMessage(await readResponseMessage(response, 'Could not upload this image.'))
        return
      }

      const data = (await response.json()) as { images?: TestimonialImage[]; message?: string }

      setTestimonialImages(data.images ?? [])
      setTestimonialDescription('')
      setTestimonialFile(null)
      setTestimonialMessage('Image added to testimonial swiper.')
    } catch {
      setTestimonialMessage('Could not upload this image. Please try again.')
    } finally {
      setIsTestimonialSaving(false)
    }
  }

  const removeTestimonialImage = async (imageId: string) => {
    setTestimonialMessage('Removing image...')

    try {
      const response = await fetch(`/api/testimonials?id=${encodeURIComponent(imageId)}`, {
        method: 'DELETE',
      })
      const data = (await response.json()) as { images?: TestimonialImage[]; message?: string }

      if (!response.ok) {
        setTestimonialMessage(data.message || 'Could not remove this image.')
        return
      }

      setTestimonialImages(data.images ?? [])
      setTestimonialMessage('Image removed from testimonial swiper.')
    } catch {
      setTestimonialMessage('Could not remove this image. Please try again.')
    }
  }

  if (!isLoggedIn) {
    return (
      <main className="min-h-[70vh] bg-background py-20">
        <div className="max-w-md mx-auto px-4">
          <div className="bg-card border border-border rounded-lg p-8 shadow-lg">
            <h1 className="text-3xl font-serif font-bold text-foreground mb-2">Admin Login</h1>
            <p className="text-muted-foreground mb-8">Login to add or remove gallery and testimonial images.</p>

            <form onSubmit={handleLogin} className="space-y-5">
              <div>
                <label htmlFor="username" className="block text-sm font-medium text-foreground mb-2">
                  Username
                </label>
                <input
                  id="username"
                  type="text"
                  value={username}
                  onChange={(event) => setUsername(event.target.value)}
                  className="w-full px-4 py-3 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary transition-all"
                  placeholder="Enter username"
                />
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-foreground mb-2">
                  Password
                </label>
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  className="w-full px-4 py-3 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary transition-all"
                  placeholder="Enter password"
                />
              </div>

              {message && <p className="text-sm text-destructive">{message}</p>}

              <button
                type="submit"
                className="w-full px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-accent transition-colors font-semibold"
              >
                Login
              </button>
            </form>
          </div>
        </div>
      </main>
    )
  }

  return (
    <main className="bg-background py-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-10">
          <div>
            <h1 className="text-4xl font-serif font-bold text-foreground mb-2">Gallery & Testimonial Admin</h1>
            <p className="text-muted-foreground">Gallery and testimonial images are saved in public upload folders.</p>
          </div>
          <button
            type="button"
            onClick={handleLogout}
            className="inline-flex items-center justify-center gap-2 px-5 py-3 border border-border rounded-lg text-foreground hover:bg-secondary transition-colors"
          >
            <LogOut className="h-4 w-4" />
            Logout
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[360px_1fr] gap-8">
          <form onSubmit={handleUpload} className="bg-card border border-border rounded-lg p-6 shadow-lg h-fit space-y-5">
            <div>
              <h2 className="text-2xl font-serif font-bold text-foreground mb-2">Add Image</h2>
              <p className="text-sm text-muted-foreground">Use a compressed JPG or PNG under 2 MB.</p>
            </div>

            <div>
              <label htmlFor="category" className="block text-sm font-medium text-foreground mb-2">
                Category
              </label>
              <select
                id="category"
                value={category}
                onChange={(event) => setCategory(event.target.value as VisibleGalleryCategory)}
                className="w-full px-4 py-3 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary transition-all"
              >
                {categoryOptions.map((option) => (
                  <option key={option.id} value={option.id}>
                    {option.category}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="image" className="block text-sm font-medium text-foreground mb-2">
                Image
              </label>
              <input
                id="image"
                type="file"
                accept="image/png,image/jpeg,image/webp"
                onChange={(event) => setFile(event.target.files?.[0] ?? null)}
                key={file ? 'has-file' : 'empty-file'}
                className="w-full text-sm text-muted-foreground file:mr-4 file:rounded-lg file:border-0 file:bg-secondary file:px-4 file:py-3 file:text-foreground hover:file:bg-secondary/80"
              />
            </div>

            {message && <p className="text-sm text-muted-foreground">{message}</p>}

            <button
              type="submit"
              disabled={isSaving}
              className="inline-flex w-full items-center justify-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-accent transition-colors font-semibold"
            >
              <ImagePlus className="h-5 w-5" />
              {isSaving ? 'Uploading...' : 'Add to Gallery'}
            </button>
          </form>

          <section>
            <h2 className="text-2xl font-serif font-bold text-foreground mb-5">Gallery Images</h2>

            {manageableImages.length === 0 ? (
              <div className="bg-card border border-border rounded-lg p-8 text-center">
                <p className="text-muted-foreground">No gallery images yet.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {manageableImages.map((image) => (
                  <div key={image.id} className="bg-card border border-border rounded-lg overflow-hidden shadow-lg">
                    <div className="h-56 bg-secondary/30">
                      <img src={image.src} alt={image.alt} className="h-full w-full object-cover" />
                    </div>
                    <div className="p-5">
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <h3 className="font-semibold text-foreground">{image.title}</h3>
                          <p className="text-sm text-muted-foreground">{getGalleryCategoryLabel(image.category)}</p>
                        </div>
                        <button
                          type="button"
                          onClick={() => removeImage(image.id)}
                          className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-destructive text-white hover:opacity-90 transition-opacity"
                          aria-label={`Remove ${image.title}`}
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </section>
        </div>

        <div className="mt-12 grid grid-cols-1 lg:grid-cols-[360px_1fr] gap-8">
          <form
            onSubmit={handleTestimonialImageUpload}
            className="bg-card border border-border rounded-lg p-6 shadow-lg h-fit space-y-5"
          >
            <div>
              <h2 className="text-2xl font-serif font-bold text-foreground mb-2">Add Testimonial Image</h2>
              <p className="text-sm text-muted-foreground">Upload JPG, PNG, or WebP images under 5 MB for the swiper.</p>
            </div>

            <div>
              <label htmlFor="testimonial-description" className="block text-sm font-medium text-foreground mb-2">
                Small Description
              </label>
              <textarea
                id="testimonial-description"
                value={testimonialDescription}
                onChange={(event) => setTestimonialDescription(event.target.value)}
                className="min-h-28 w-full px-4 py-3 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary transition-all"
                placeholder="Short note from the customer"
              />
            </div>

            <div>
              <label htmlFor="testimonial-image" className="block text-sm font-medium text-foreground mb-2">
                Testimonial Image
              </label>
              <input
                id="testimonial-image"
                type="file"
                accept="image/jpeg,image/png,image/webp"
                onChange={(event) => setTestimonialFile(event.target.files?.[0] ?? null)}
                key={testimonialFile ? 'has-testimonial-image' : 'empty-testimonial-image'}
                className="w-full text-sm text-muted-foreground file:mr-4 file:rounded-lg file:border-0 file:bg-secondary file:px-4 file:py-3 file:text-foreground hover:file:bg-secondary/80"
              />
            </div>

            {testimonialMessage && <p className="text-sm text-muted-foreground">{testimonialMessage}</p>}

            <button
              type="submit"
              disabled={isTestimonialSaving}
              className="inline-flex w-full items-center justify-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-accent transition-colors font-semibold disabled:opacity-70"
            >
              <ImagePlus className="h-5 w-5" />
              {isTestimonialSaving ? 'Uploading...' : 'Add Testimonial Image'}
            </button>
          </form>

          <section>
            <h2 className="text-2xl font-serif font-bold text-foreground mb-5">Testimonial Swiper Images</h2>

            {testimonialImages.length === 0 ? (
              <div className="bg-card border border-border rounded-lg p-8 text-center">
                <p className="text-muted-foreground">No testimonial images yet.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {testimonialImages.map((image) => (
                  <div key={image.id} className="bg-card border border-border rounded-lg overflow-hidden shadow-lg">
                    <div className="aspect-[4/5] bg-secondary/30">
                      <img src={image.src} alt={image.title} className="h-full w-full object-cover" />
                    </div>
                    <div className="p-5">
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <h3 className="font-semibold text-foreground">{image.title}</h3>
                          {image.description && (
                            <p className="mt-1 text-sm text-muted-foreground">{image.description}</p>
                          )}
                        </div>
                        <button
                          type="button"
                          onClick={() => removeTestimonialImage(image.id)}
                          className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-destructive text-white hover:opacity-90 transition-opacity"
                          aria-label={`Remove ${image.title}`}
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </section>
        </div>
      </div>
    </main>
  )
}
