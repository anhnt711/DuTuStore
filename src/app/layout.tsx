import type { Metadata } from 'next'
import './globals.css'
import PromoBar from '@/components/layout/PromoBar'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'

export const metadata: Metadata = {
  title: 'Du Tú Số To – iPhone Chính Hãng',
  description: 'Mua iPhone chính hãng Apple tại Du Tú Số To. Giá tốt nhất, bảo hành 12 tháng, giao hàng 2 giờ.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="vi">
      <body className="min-h-screen flex flex-col">
        <PromoBar />
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  )
}
