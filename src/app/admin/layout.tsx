'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { LayoutDashboard, Package, ShoppingBag, BarChart3, Settings, LogOut, Menu, X } from 'lucide-react'
import { useState } from 'react'

const serif = { fontFamily: "'Cormorant Garamond',Georgia,serif" }

const navItems = [
  { href: '/admin', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/admin/san-pham', label: 'Sản phẩm', icon: Package },
  { href: '/admin/don-hang', label: 'Đơn hàng', icon: ShoppingBag },
  { href: '/admin/thong-ke', label: 'Thống kê', icon: BarChart3 },
  { href: '/admin/cai-dat', label: 'Cài đặt', icon: Settings },
]

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const [mobileMenu, setMobileMenu] = useState(false)
  const pageTitle = navItems.find((n) => n.href === pathname)?.label || 'Admin'

  const Sidebar = () => (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', background: '#0a0f1e' }}>
      {/* Logo */}
      <div style={{ padding: '20px 20px', borderBottom: '1px solid rgba(255,255,255,.1)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{ ...serif, width: 34, height: 34, borderRadius: 10, background: 'linear-gradient(135deg,#5b8def,#1a3272)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontWeight: 700, fontSize: 18, flexShrink: 0 }}>D</div>
          <div>
            <div style={{ ...serif, color: '#fff', fontWeight: 700, fontSize: 15 }}>Du Tú Số To</div>
            <div style={{ color: '#8593ad', fontSize: 10 }}>Admin Panel</div>
          </div>
        </div>
      </div>
      {/* Nav */}
      <nav style={{ flex: 1, padding: '12px 12px', display: 'flex', flexDirection: 'column', gap: 3 }}>
        {navItems.map(({ href, label, icon: Icon }) => (
          <Link key={href} href={href} onClick={() => setMobileMenu(false)} style={{
            display: 'flex', alignItems: 'center', gap: 12,
            padding: '10px 14px', borderRadius: 12, fontSize: 14, fontWeight: 600,
            textDecoration: 'none', transition: 'all .15s',
            background: pathname === href ? '#1a3272' : 'transparent',
            color: pathname === href ? '#fff' : '#8593ad'
          }}>
            <Icon size={16} />
            {label}
          </Link>
        ))}
      </nav>
      {/* Footer */}
      <div style={{ padding: '12px 12px', borderTop: '1px solid rgba(255,255,255,.1)' }}>
        <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '10px 14px', borderRadius: 12, fontSize: 14, fontWeight: 600, textDecoration: 'none', color: '#8593ad' }}>
          <LogOut size={16} />
          Về trang chủ
        </Link>
      </div>
    </div>
  )

  return (
    <div style={{ minHeight: '100vh', display: 'flex', background: '#f4f6fb' }}>

      {/* Desktop sidebar */}
      <aside style={{ width: 220, flexShrink: 0, position: 'fixed', top: 0, left: 0, height: '100vh', zIndex: 50 }} className="hide-mobile">
        <Sidebar />
      </aside>

      {/* Mobile sidebar overlay */}
      {mobileMenu && (
        <div style={{ position: 'fixed', inset: 0, zIndex: 100 }} className="show-mobile-block">
          <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,.5)' }} onClick={() => setMobileMenu(false)} />
          <div style={{ position: 'absolute', left: 0, top: 0, width: 240, height: '100%' }}>
            <Sidebar />
          </div>
        </div>
      )}

      {/* Main area */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', marginLeft: 0 }} className="admin-main">

        {/* Top bar */}
        <header style={{ background: '#fff', borderBottom: '1px solid #eef1f7', padding: '0 24px', height: 60, display: 'flex', alignItems: 'center', justifyContent: 'space-between', position: 'sticky', top: 0, zIndex: 40 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
            {/* Mobile hamburger */}
            <button onClick={() => setMobileMenu(true)} className="show-mobile" style={{ display: 'none', border: 'none', background: 'none', cursor: 'pointer', padding: 0 }}>
              <Menu size={20} color="#0a0f1e" />
            </button>
            <h1 style={{ ...serif, fontWeight: 700, color: '#0a0f1e', fontSize: 18, margin: 0 }}>{pageTitle}</h1>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <div style={{ ...serif, width: 34, height: 34, borderRadius: '50%', background: 'linear-gradient(135deg,#1a3272,#0a0f1e)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontWeight: 700, fontSize: 14 }}>A</div>
          </div>
        </header>

        {/* Content */}
        <main style={{ flex: 1, padding: '24px 24px' }}>
          {children}
        </main>
      </div>
    </div>
  )
}
