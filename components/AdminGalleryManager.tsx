'use client'

import { FormEvent, useEffect, useMemo, useState } from 'react'
import { ImagePlus, LogOut, Trash2 } from 'lucide-react'
import {
  adminSessionKey,
  galleryFilters,
  galleryStorageKey,
  type GalleryCategory,
  type GalleryImage,
} from '@/lib/gallery'

const adminUsername = 'Kabir2528'
const adminPassword = 'Kabir@28'
const maxFileSize = 2 * 1024 * 1024

function readUploadedImages() {
  try {
    const storedImages = window.localStorage.getItem(galleryStorageKey)
    return storedImages ? (JSON.parse(storedImages) as GalleryImage[]) : []
  } catch {
    return []
  }
}

function saveUploadedImages(images: GalleryImage[]) {
  window.localStorage.setItem(galleryStorageKey, JSON.stringify(images))
}

export default function AdminGalleryManager() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [title, setTitle] = useState('')
  const [category, setCategory] = useState<GalleryCategory>('gifts')
  const [file, setFile] = useState<File | null>(null)
  const [images, setImages] = useState<GalleryImage[]>([])
  const [message, setMessage] = useState('')

  const categoryOptions = useMemo(
    () => galleryFilters.filter((filter) => filter.id !== 'all') as { category: string; id: GalleryCategory }[],
    [],
  )

  useEffect(() => {
    setIsLoggedIn(window.localStorage.getItem(adminSessionKey) === 'true')
    setImages(readUploadedImages())
  }, [])

  const handleLogin = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    if (!username.trim() || !password.trim()) {
      setMessage('Please enter both username and password.')
      return
    }

    if (username !== adminUsername || password !== adminPassword) {
      setMessage('Wrong credentials. Please try again.')
      return
    }

    window.localStorage.setItem(adminSessionKey, 'true')
    setIsLoggedIn(true)
    setUsername('')
    setPassword('')
    setMessage('')
  }

  const handleLogout = () => {
    window.localStorage.removeItem(adminSessionKey)
    setIsLoggedIn(false)
    setUsername('')
    setPassword('')
    setMessage('')
  }

  const handleUpload = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    if (!file) {
      setMessage('Please choose an image.')
      return
    }

    if (file.size > maxFileSize) {
      setMessage('Please choose an image smaller than 2 MB.')
      return
    }

    const reader = new FileReader()

    reader.onload = () => {
      const imageTitle = title.trim() || 'Gallery Image'
      const uploadedImage: GalleryImage = {
        id: `custom-${Date.now()}`,
        src: String(reader.result),
        alt: imageTitle,
        category,
        title: imageTitle,
        isCustom: true,
      }

      const nextImages = [uploadedImage, ...images]
      saveUploadedImages(nextImages)
      setImages(nextImages)
      setTitle('')
      setCategory('gifts')
      setFile(null)
      setMessage('Image added to gallery.')
    }

    reader.onerror = () => setMessage('Could not read this image. Please try another file.')
    reader.readAsDataURL(file)
  }

  const removeImage = (imageId: string) => {
    const nextImages = images.filter((image) => image.id !== imageId)
    saveUploadedImages(nextImages)
    setImages(nextImages)
    setMessage('Image removed from gallery.')
  }

  if (!isLoggedIn) {
    return (
      <main className="min-h-[70vh] bg-background py-20">
        <div className="max-w-md mx-auto px-4">
          <div className="bg-card border border-border rounded-lg p-8 shadow-lg">
            <h1 className="text-3xl font-serif font-bold text-foreground mb-2">Admin Login</h1>
            <p className="text-muted-foreground mb-4">Login to add or remove gallery images.</p>
            <p className="mb-8 rounded-lg bg-secondary/40 px-3 py-2 text-sm text-muted-foreground">
              Use username <span className="font-semibold text-foreground"></span> and password{' '}
              <span className="font-semibold text-foreground"></span>.
            </p>

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
            <h1 className="text-4xl font-serif font-bold text-foreground mb-2">Gallery Admin</h1>
            <p className="text-muted-foreground">Uploaded images are saved in this browser localStorage.</p>
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
              <label htmlFor="title" className="block text-sm font-medium text-foreground mb-2">
                Image Title
              </label>
              <input
                id="title"
                value={title}
                onChange={(event) => setTitle(event.target.value)}
                className="w-full px-4 py-3 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary transition-all"
                placeholder="Gift basket"
              />
            </div>

            <div>
              <label htmlFor="category" className="block text-sm font-medium text-foreground mb-2">
                Category
              </label>
              <select
                id="category"
                value={category}
                onChange={(event) => setCategory(event.target.value as GalleryCategory)}
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
                className="w-full text-sm text-muted-foreground file:mr-4 file:rounded-lg file:border-0 file:bg-secondary file:px-4 file:py-3 file:text-foreground hover:file:bg-secondary/80"
              />
            </div>

            {message && <p className="text-sm text-muted-foreground">{message}</p>}

            <button
              type="submit"
              className="inline-flex w-full items-center justify-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-accent transition-colors font-semibold"
            >
              <ImagePlus className="h-5 w-5" />
              Add to Gallery
            </button>
          </form>

          <section>
            <h2 className="text-2xl font-serif font-bold text-foreground mb-5">Uploaded Images</h2>

            {images.length === 0 ? (
              <div className="bg-card border border-border rounded-lg p-8 text-center">
                <p className="text-muted-foreground">No uploaded images yet.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {images.map((image) => (
                  <div key={image.id} className="bg-card border border-border rounded-lg overflow-hidden shadow-lg">
                    <div className="h-56 bg-secondary/30">
                      <img src={image.src} alt={image.alt} className="h-full w-full object-cover" />
                    </div>
                    <div className="p-5">
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <h3 className="font-semibold text-foreground">{image.title}</h3>
                          <p className="text-sm text-muted-foreground capitalize">{image.category}</p>
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
      </div>
    </main>
  )
}
