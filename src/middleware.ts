import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

/**
 * Middleware
 *
 * Note: Firebase Auth (client SDK) はEdge Runtimeで動作しないため、
 * 認証チェックはクライアント側（AuthGuard）で実装しています。
 *
 * このミドルウェアは将来的な拡張（例: セッションCookieベースの認証）のために
 * 残していますが、現在は何も行いません。
 */
export function middleware(request: NextRequest) {
  return NextResponse.next()
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
}
