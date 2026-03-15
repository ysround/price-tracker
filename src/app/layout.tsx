import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: '価格比較アプリ',
  description: 'スーパーごとの商品価格を記録・比較できるWebアプリ',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ja">
      <body>{children}</body>
    </html>
  )
}
