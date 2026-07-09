import { NextResponse, type NextRequest } from 'next/server'

const pageAliases: Record<string, string> = {
  conntact: 'contact',
  aboutt: 'about',
  gallary: 'gallery',
}

export function proxy(request: NextRequest) {
  const url = request.nextUrl.clone()
  const parts = url.pathname.split('/')
  const firstSegment = parts[1]

  if (!firstSegment) {
    return NextResponse.next()
  }

  const normalizedSegment = pageAliases[firstSegment.toLowerCase()] ?? firstSegment.toLowerCase()

  if (firstSegment !== normalizedSegment) {
    parts[1] = normalizedSegment
    url.pathname = parts.join('/')

    return NextResponse.redirect(url)
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/((?!api|_next|.*\\..*).*)'],
}
