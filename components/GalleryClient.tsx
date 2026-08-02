'use client'

import { useEffect, useRef, useState } from 'react'
import {
  Baby,
  Candy,
  Cherry,
  ChevronLeft,
  ChevronRight,
  Crown,
  Footprints,
  Gift,
  PackageCheck,
  Ribbon,
  RotateCcw,
  Star,
  X,
  ZoomIn,
  ZoomOut,
  type LucideIcon,
} from 'lucide-react'
import { defaultImages, galleryFilters, normalizeGalleryCategory, type GalleryImage } from '@/lib/gallery'

const categoryIcons = {
  all: Gift,
  bride: Crown,
  groom: Ribbon,
  'gift-hampers': PackageCheck,
  footwear: Footprints,
  'chocolates-sweet': Candy,
  'dry-fruits-fruits': Cherry,
  'baby-gifts': Baby,
  'birthday-gifts': Gift,
  'success-stories': Star,
} satisfies Record<(typeof galleryFilters)[number]['id'], LucideIcon>

export default function GalleryClient() {
  const [activeCategory, setActiveCategory] = useState('all')
  const [customImages, setCustomImages] = useState<GalleryImage[]>([])
  const [hiddenDefaultImageIds, setHiddenDefaultImageIds] = useState<string[]>([])
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null)
  const [zoomLevel, setZoomLevel] = useState(1)
  const categoryScrollRef = useRef<HTMLDivElement | null>(null)

  const scrollCategory = (direction: 'left' | 'right') => {
    const container = categoryScrollRef.current
    if (!container) return
    const scrollAmount = container.clientWidth * 0.75
    container.scrollBy({ left: direction === 'left' ? -scrollAmount : scrollAmount, behavior: 'smooth' })
  }

  useEffect(() => {
    const loadCustomImages = async () => {
      try {
        const response = await fetch('/api/gallery', { cache: 'no-store' })
        const data = (await response.json()) as { images?: GalleryImage[]; hiddenDefaultImageIds?: string[] }

        if (response.ok) {
          setCustomImages(data.images ?? [])
          setHiddenDefaultImageIds(data.hiddenDefaultImageIds ?? [])
        }
      } catch {
        setCustomImages([])
        setHiddenDefaultImageIds([])
      }
    }

    loadCustomImages()
  }, [])

  useEffect(() => {
    if (!selectedImage) {
      return
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setSelectedImage(null)
        setZoomLevel(1)
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [selectedImage])

  const visibleDefaultImages = defaultImages.filter((image) => !hiddenDefaultImageIds.includes(image.id))
  const images = [...customImages, ...visibleDefaultImages]
  const filteredImages =
    activeCategory === 'all' ? images : images.filter((img) => normalizeGalleryCategory(img.category) === activeCategory)

  const openPreview = (image: GalleryImage) => {
    setSelectedImage(image)
    setZoomLevel(1)
  }

  const closePreview = () => {
    setSelectedImage(null)
    setZoomLevel(1)
  }

  const zoomIn = () => setZoomLevel((value) => Math.min(value + 0.25, 3))
  const zoomOut = () => setZoomLevel((value) => Math.max(value - 0.25, 1))
  const resetZoom = () => setZoomLevel(1)

  return (
    <>
      <section className="py-12 border-b border-border">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative">
            <button
              type="button"
              onClick={() => scrollCategory('left')}
              className="absolute left-0 top-8 z-10 rounded-full bg-background/95 p-2 text-primary shadow-lg shadow-black/10 ring-1 ring-border transition hover:bg-secondary lg:hidden"
              aria-label="Scroll categories left"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>

            <div
              ref={categoryScrollRef}
              className="flex snap-x gap-5 overflow-x-auto px-11 py-2 scroll-smooth [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden sm:gap-6 lg:grid lg:grid-cols-10 lg:gap-4 lg:overflow-visible lg:px-0"
            >
              {galleryFilters.map((gallery) => {
                const CategoryIcon = categoryIcons[gallery.id]
                const isActive = activeCategory === gallery.id

                return (
                  <button
                    key={gallery.id}
                    type="button"
                    onClick={() => setActiveCategory(gallery.id)}
                    className="group flex min-w-[82px] snap-start flex-col items-center gap-2 text-center outline-none sm:min-w-[94px] lg:min-w-0"
                    aria-pressed={isActive}
                  >
                    <span
                      className={`flex h-14 w-14 items-center justify-center rounded-full ring-1 transition-all duration-300 sm:h-16 sm:w-16 ${
                        isActive
                          ? 'bg-primary text-primary-foreground shadow-lg shadow-primary/25 ring-primary'
                          : 'bg-secondary/75 text-primary ring-secondary hover:bg-secondary hover:shadow-md'
                      }`}
                    >
                      <CategoryIcon className="h-6 w-6 sm:h-7 sm:w-7" strokeWidth={1.8} />
                    </span>
                    <span
                      className={`max-w-24 text-[11px] font-semibold leading-tight transition-colors sm:text-xs ${
                        isActive ? 'text-primary' : 'text-foreground group-hover:text-primary'
                      }`}
                    >
                      {gallery.category}
                    </span>
                  </button>
                )
              })}
            </div>

            <button
              type="button"
              onClick={() => scrollCategory('right')}
              className="absolute right-0 top-8 z-10 rounded-full bg-background/95 p-2 text-primary shadow-lg shadow-black/10 ring-1 ring-border transition hover:bg-secondary lg:hidden"
              aria-label="Scroll categories right"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredImages.map((image) => (
              <button
                key={image.id}
                type="button"
                onClick={() => openPreview(image)}
                className="group relative overflow-hidden rounded-lg bg-card shadow-lg transition-all duration-300 hover:-translate-y-2 hover:shadow-xl"
                aria-label={`Preview ${image.alt}`}
              >
                <div className="relative h-64 md:h-72 overflow-hidden bg-secondary/30">
                  <img
                    src={image.src}
                    alt={image.alt}
                    className="h-full w-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-black/0 transition-colors duration-300 group-hover:bg-black/15" />
                </div>
              </button>
            ))}
          </div>

          {filteredImages.length === 0 && (
            <div className="text-center py-16">
              <p className="text-lg text-muted-foreground">No images found in this category.</p>
            </div>
          )}
        </div>
      </section>

      {selectedImage && (
        <div
          className="fixed inset-0 z-[60] flex items-center justify-center bg-black/85 p-4 backdrop-blur-sm"
          onClick={closePreview}
        >
          <div
            className="relative w-full max-w-6xl rounded-2xl bg-card p-3 shadow-2xl"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="absolute right-3 top-3 z-10 flex gap-2">
              <button
                type="button"
                onClick={zoomOut}
                className="rounded-full bg-background/90 p-2 text-foreground shadow-md hover:bg-secondary"
                aria-label="Zoom out"
              >
                <ZoomOut className="h-4 w-4" />
              </button>
              <button
                type="button"
                onClick={resetZoom}
                className="rounded-full bg-background/90 p-2 text-foreground shadow-md hover:bg-secondary"
                aria-label="Reset zoom"
              >
                <RotateCcw className="h-4 w-4" />
              </button>
              <button
                type="button"
                onClick={zoomIn}
                className="rounded-full bg-background/90 p-2 text-foreground shadow-md hover:bg-secondary"
                aria-label="Zoom in"
              >
                <ZoomIn className="h-4 w-4" />
              </button>
              <button
                type="button"
                onClick={closePreview}
                className="rounded-full bg-background/90 p-2 text-foreground shadow-md hover:bg-secondary"
                aria-label="Close preview"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="overflow-hidden rounded-xl bg-background/80">
              <img
                src={selectedImage.src}
                alt={selectedImage.alt}
                className="h-[75vh] w-full object-contain transition-transform duration-200"
                style={{ transform: `scale(${zoomLevel})` }}
              />
            </div>
          </div>
        </div>
      )}

      <section className="py-20 bg-primary/10">
        <div className="max-w-2xl mx-auto text-center px-4">
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-foreground mb-6">Impressed by Our Work?</h2>
          <p className="text-lg text-muted-foreground mb-8">
            Call us to create something equally beautiful for your special occasion
          </p>
          <a
            href="/contact"
            className="inline-block px-8 py-4 bg-primary text-primary-foreground rounded-lg hover:bg-accent transition-colors font-semibold text-lg"
          >
            Contact Us
          </a>
        </div>
      </section>
    </>
  )
}
