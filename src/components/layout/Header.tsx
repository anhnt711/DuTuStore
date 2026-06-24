'use client'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { Heart, ShoppingCart, Search, Menu, X } from 'lucide-react'
import { useState } from 'react'
import { useCartStore } from '@/lib/store'

const serif = { fontFamily: "'Cormorant Garamond',Georgia,serif" }

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
    if (search.trim()) { router.push(`/san-pham?q=${encodeURIComponent(search.trim())}`); setMobileOpen(false) }
  }

  return (
    <header style={{ position: 'sticky', top: 0, zIndex: 40, background: 'rgba(255,255,255,.94)', backdropFilter: 'blur(16px)', borderBottom: '1px solid #ecedf2' }}>
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 20px', height: 60, display: 'flex', alignItems: 'center', gap: 16, width: '100%' }}>

        {/* Logo */}
        <Link href="/" onClick={() => setMobileOpen(false)} style={{ display: 'flex', alignItems: 'center', gap: 10, textDecoration: 'none', flexShrink: 0 }}>
          <div style={{ ...serif, width: 38, height: 38, borderRadius: 12, background: 'linear-gradient(135deg,#1e3a8a,#0a0f1e)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#ffffff', fontWeight: 700, fontSize: 20, boxShadow: '0 4px 12px rgba(26,50,114,.35)' }}>D</div>
          <div className="hide-mobile" style={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
            <span style={{ ...serif, fontWeight: 700, color: '#0a0f1e', fontSize: 17, lineHeight: 1 }}>Du Tú Số To</span>
            <span style={{ fontSize: 9, color: '#8593ad', letterSpacing: '0.18em', textTransform: 'uppercase' }}>iPhone Store</span>
          </div>
        </Link>

        {/* Desktop nav */}
        <nav className="hide-mobile" style={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          {navLinks.map((link) => (
            <Link key={link.href} href={link.href} style={{
              padding: '7px 14px', borderRadius: 99, fontSize: 13.5, fontWeight: 600,
              textDecoration: 'none', transition: 'all .15s',
              background: pathname.startsWith(link.href) ? '#eef2fb' : 'transparent',
              color: pathname.startsWith(link.href) ? '#1a3272' : '#33405c'
            }}>
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Search */}
        <form onSubmit={handleSearch} className="hide-mobile" style={{ marginLeft: 'auto', flex: 1, maxWidth: 220, display: 'flex', alignItems: 'center', gap: 8, background: '#f4f6fb', border: '1px solid #ecedf2', borderRadius: 99, padding: '9px 16px' }}>
          <Search size={13} color="#8593ad" />
          <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Tìm iPhone..." style={{ background: 'transparent', border: 'none', outline: 'none', fontSize: 13, color: '#0a0f1e', width: '100%' }} />
        </form>

        {/* Right actions */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginLeft: 'auto' }} className="actions-no-ml-mobile">
          {/* Wishlist */}
          <Link href="/san-pham" style={{ position: 'relative', width: 38, height: 38, borderRadius: '50%', border: '1px solid #ecedf2', display: 'flex', alignItems: 'center', justifyContent: 'center', textDecoration: 'none', background: '#fff' }}>
            <Heart size={16} color="#33405c" />
            {wishlist.length > 0 && (
              <span style={{ position: 'absolute', top: -3, right: -3, minWidth: 17, height: 17, borderRadius: 99, background: '#1a3272', border: '2px solid #fff', color: '#fff', fontSize: 8, fontWeight: 800, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '0 3px' }}>{wishlist.length}</span>
            )}
          </Link>
          {/* Cart */}
          <Link href="/gio-hang" style={{ position: 'relative', width: 38, height: 38, borderRadius: '50%', background: '#0a0f1e', display: 'flex', alignItems: 'center', justifyContent: 'center', textDecoration: 'none' }}>
            <ShoppingCart size={16} color="#ffffff" />
            {cartCount > 0 && (
              <span style={{ position: 'absolute', top: -3, right: -3, minWidth: 17, height: 17, borderRadius: 99, background: '#1a3272', border: '2px solid #fff', color: '#fff', fontSize: 8, fontWeight: 800, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '0 3px' }}>{cartCount}</span>
            )}
          </Link>
          {/* Hamburger */}
          <button onClick={() => setMobileOpen(!mobileOpen)} className="show-mobile" style={{ display: 'none', width: 38, height: 38, borderRadius: '50%', border: '1px solid #ecedf2', background: '#fff', cursor: 'pointer', alignItems: 'center', justifyContent: 'center' }}>
            {mobileOpen ? <X size={16} /> : <Menu size={16} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div style={{ borderTop: '1px solid #ecedf2', background: '#fff', padding: '12px 20px 20px' }} className="show-mobile-block">
          <form onSubmit={handleSearch} style={{ display: 'flex', alignItems: 'center', gap: 8, background: '#f4f6fb', border: '1px solid #ecedf2', borderRadius: 99, padding: '10px 16px', marginBottom: 10 }}>
            <Search size={13} color="#8593ad" />
            <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Tìm iPhone..." style={{ background: 'transparent', border: 'none', outline: 'none', fontSize: 13, color: '#0a0f1e', width: '100%' }} />
          </form>
          {navLinks.map((link) => (
            <Link key={link.href} href={link.href} onClick={() => setMobileOpen(false)} style={{
              display: 'block', padding: '12px 14px', borderRadius: 12, fontSize: 13.5, fontWeight: 600,
              textDecoration: 'none', marginBottom: 2,
              background: pathname.startsWith(link.href) ? '#eef2fb' : 'transparent',
              color: pathname.startsWith(link.href) ? '#1a3272' : '#33405c'
            }}>
              {link.label}
            </Link>
          ))}
        </div>
      )}
    </header>
  )
}
