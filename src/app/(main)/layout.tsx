import { Header } from '@/components/layout/Header'
import { BottomNav, SideNav } from '@/components/layout/Navigation'
import { AuthGuard } from '@/components/auth/AuthGuard'

export default function MainLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <AuthGuard>
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="flex">
          <SideNav />
          <main className="flex-1 p-4 md:p-6 pb-20 md:pb-6 max-w-7xl mx-auto w-full">
            {children}
          </main>
        </div>
        <BottomNav />
      </div>
    </AuthGuard>
  )
}
