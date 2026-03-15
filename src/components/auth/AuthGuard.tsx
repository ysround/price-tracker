'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/hooks/useAuth'

interface AuthGuardProps {
  children: React.ReactNode
}

/**
 * AuthGuard コンポーネント
 *
 * 認証が必要なページを保護するコンポーネント。
 * - 認証状態の読み込み中はローディングスピナーを表示
 * - 未認証の場合は /login にリダイレクト
 * - 認証済みの場合は children を表示
 */
export function AuthGuard({ children }: AuthGuardProps) {
  const { user, loading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!loading && !user) {
      router.push('/login')
    }
  }, [loading, user, router])

  // 認証状態の読み込み中
  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="h-12 w-12 animate-spin rounded-full border-4 border-blue-500 border-t-transparent"></div>
      </div>
    )
  }

  // 未認証の場合は何も表示しない（リダイレクト中）
  if (!user) {
    return null
  }

  // 認証済みの場合は children を表示
  return <>{children}</>
}
