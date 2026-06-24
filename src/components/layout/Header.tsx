'use client'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { Heart, ShoppingCart, Search, Menu, X } from 'lucide-react'
import { useState } from 'react'
import { useCartStore } from '@/lib/store'

const navLinks = [
  { href: '/san-pham', label: 'Sản phẩm' },
  { href: '/khuyen-mai', label: 'Khuyến mãi' },
  { href: '/ve-chung-toi', label: 'Về chúng tôi' },
]

export default function Header() {
  const pathname = usePathname()
  const router = useRouter()
  const [search, setSearch] = useState('')
  const [mobileOpen, setMobileOpen] = useState(false)
  const cartCount = useCartStore((s) => s.cartCount())
  const wishlist = useCartStore((s) => s.wishlist)

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (search.trim()) {
      router.push(`/san-pham?q=${encodeURIComponent(search.trim())}`)
      setMobileOpen(false)
    }
  }

  return (
    <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-gray-100">
      <div className="max-w-screen-xl mx-auto px-4 h-16 flex items-center gap-4">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5 flex-none">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#1e3a8a] to-[#0f1729] flex items-center justify-center text-white font-bold text-lg" style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}>
            D
          </div>
          <div className="hidden sm:flex flex-col leading-none">
            <span className="font-bold text-[#0f1729] text-base" style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}>Du Tú Số To</span>
            <span className="text-[10px] text-[#8593ad] tracking-widest uppercase">iPhone Store</span>
          </div>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-1 ml-2">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`px-3.5 py-2 rounded-full text-sm font-semibold transition-colors ${
                pathname.startsWith(link.href)
                  ? 'bg-[#eef2fb] text-[#1e3a8a]'
                  : 'text-[#33405c] hover:bg-gray-50'
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Search - desktop */}
        <form onSubmit={handleSearch} className="hidden md:flex items-center gap-2 flex-1 max-w-xs bg-[#f4f6fb] border border-gray-100 rounded-full px-3.5 py-2.5 ml-auto">
          <Search size={14} className="text-[#8593ad] flex-none" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Tìm iPhone..."
            className="bg-transparent outline-none text-sm text-[#0f1729] placeholder:text-[#8593ad] w-full"
          />
        </form>

        {/* Actions */}
        <div className="flex items-center gap-2 ml-auto md:ml-0">
          {/* Wishlist */}
          <Link
            href="/san-pham?wishlist=true"
            className="relative w-10 h-10 rounded-full border border-gray-100 bg-white flex items-center justify-center hover:bg-gray-50 transition-colors"
            title="Yêu thích"
          >
            <Heart size={18} className="text-[#33405c]" />
            {wishlist.length > 0 && (
              <span className="absolute -top-1 -right-1 w-4.5 h-4.5 min-w-[18px] h-[18px] px-1 rounded-full bg-[#1e3a8a] border-2 border-white text-white text-[9px] font-bold flex items-center justify-center">
                {wishlist.length}
              </span>
            )}
          </Link>

          {/* Cart */}
          <Link
            href="/gio-hang"
            className="relative w-10 h-10 rounded-full bg-[#0f1729] flex items-center justify-center hover:bg-[#1e3a8a] transition-colors"
            title="Giỏ hàng"
          >
            <ShoppingCart size={18} className="text-white" />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 min-w-[18px] h-[18px] px-1 rounded-full bg-[#1e3a8a] border-2 border-white text-white text-[9px] font-bold flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </Link>

          {/* Mobile menu toggle */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden w-10 h-10 rounded-full border border-gray-100 flex items-center justify-center"
          >
            {mobileOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden border-t border-gray-100 bg-white px-4 pb-4">
          <form onSubmit={handleSearch} className="flex items-center gap-2 bg-[#f4f6fb] border border-gray-100 rounded-full px-3.5 py-2.5 mt-3">
            <Search size={14} className="text-[#8593ad] flex-none" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Tìm iPhone..."
              className="bg-transparent outline-none text-sm text-[#0f1729] placeholder:text-[#8593ad] w-full"
            />
          </form>
          <nav className="flex flex-col gap-1 mt-3">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className={`px-4 py-3 rounded-xl text-sm font-semibold transition-colors ${
                  pathname.startsWith(link.href)
                    ? 'bg-[#eef2fb] text-[#1e3a8a]'
                    : 'text-[#33405c] hover:bg-gray-50'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  )
}
