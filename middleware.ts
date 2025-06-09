import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const token = request.cookies.get('token')?.value

  // Nếu chưa có token và truy cập vào trang cần bảo vệ
  if (!token) {
    return NextResponse.redirect(new URL('/', request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    '/hello',
    '/product/:path*',   // Bảo vệ tất cả route trong /product
  ],
}
