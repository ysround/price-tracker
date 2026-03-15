'use client'

import { useAuth } from '@/hooks/useAuth'

export function Header() {
  const { user, signOut } = useAuth()

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <h1 className="text-xl font-bold text-gray-900">
            🛒 価格比較アプリ
          </h1>

          <div className="flex items-center gap-4">
            {user && (
              <>
                <div className="flex items-center gap-2">
                  {user.photoURL && (
                    <img
                      src={user.photoURL}
                      alt="User avatar"
                      className="w-8 h-8 rounded-full"
                    />
                  )}
                  <span className="text-sm text-gray-700 hidden sm:block">
                    {user.displayName}
                  </span>
                </div>
                <button
                  onClick={signOut}
                  className="text-sm text-gray-600 hover:text-gray-900 transition-colors"
                >
                  ログアウト
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}
