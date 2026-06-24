'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { LayoutDashboard, Package, ShoppingBag, BarChart3, Settings, LogOut } from 'lucide-react'

const navItems = [
  { href: '/admin', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/admin/san-pham', label: 'Sản phẩm', icon: Package },
  { href: '/admin/don-hang', label: 'Đơn hàng', icon: ShoppingBag },
  { href: '/admin/thong-ke', label: 'Thống kê', icon: BarChart3 },
  { href: '/admin/cai-dat', label: 'Cài đặt', icon: Settings },
]

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()

  return (
    <div className="min-h-screen flex bg-[#f7f9fc]">
      {/* Sidebar */}
      <aside className="fixed left-0 top-0 h-full w-56 bg-[#0f1729] flex flex-col z-50 hidden md:flex">
        {/* Logo */}
        <div className="p-5 border-b border-white/10">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-[#5b8def] to-[#1e3a8a] flex items-center justify-center text-white font-bold font-serif">D</div>
            <div>
              <div className="text-white font-semibold text-sm font-serif">Du Tú Số To</div>
              <div className="text-[#8593ad] text-[10px]">Admin Panel</div>
            </div>
          </div>
        </div>

        {/* Nav */}
        <nav className="flex-1 p-4 space-y-1">
          {navItems.map(({ href, label, icon: Icon }) => (
            <Link
              key={href}
              href={href}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                pathname === href
                  ? 'bg-[#1e3a8a] text-white'
                  : 'text-[#8593ad] hover:bg-white/10 hover:text-white'
              }`}
            >
              <Icon size={16} />
              {label}
            </Link>
          ))}
        </nav>

        {/* Footer */}
        <div className="p-4 border-t border-white/10">
          <Link href="/" className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-[#8593ad] hover:bg-white/10 hover:text-white transition-colors">
            <LogOut size={16} />
            Về trang chủ
          </Link>
        </div>
      </aside>

      {/* Main */}
      <div className="flex-1 md:ml-56 flex flex-col">
        {/* Top bar */}
        <header className="bg-white border-b border-[#eef1f7] px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3 md:hidden">
            <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-[#1e3a8a] to-[#0f1729] flex items-center justify-center text-white font-bold text-sm font-serif">D</div>
            <span className="font-semibold text-[#0f1729] text-sm font-serif">Admin</span>
          </div>
          <div className="hidden md:block">
            <h1 className="font-semibold text-[#0f1729] capitalize">
              {navItems.find((n) => n.href === pathname)?.label || 'Admin'}
            </h1>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#1e3a8a] to-[#0f1729] flex items-center justify-center text-white font-bold text-xs font-serif">A</div>
          </div>
        </header>

        <main className="flex-1 p-4 md:p-6">{children}</main>
      </div>
    </div>
  )
}
