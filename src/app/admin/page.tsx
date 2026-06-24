import { mockProducts } from '@/lib/mockData'
import { formatPrice } from '@/lib/utils'
import { TrendingUp, ShoppingBag, Package, Users } from 'lucide-react'

const statsData = [
  { label: 'Doanh thu tháng', value: '2.4 tỷ', change: '+18%', icon: TrendingUp, color: '#1e3a8a' },
  { label: 'Đơn hàng', value: '324', change: '+12%', icon: ShoppingBag, color: '#1f8a5b' },
  { label: 'Sản phẩm', value: String(mockProducts.length), change: '', icon: Package, color: '#d97706' },
  { label: 'Khách hàng mới', value: '1,240', change: '+8%', icon: Users, color: '#7c3aed' },
]

const recentOrders = [
  { code: 'DT-001', customer: 'Nguyễn Văn A', product: 'iPhone 15 Pro Max 256GB', amount: 34990000, status: 'shipping' },
  { code: 'DT-002', customer: 'Trần Thị B', product: 'iPhone 15 Pro 128GB', amount: 28990000, status: 'confirmed' },
  { code: 'DT-003', customer: 'Phạm Văn C', product: 'iPhone 14 512GB', amount: 24990000, status: 'pending' },
  { code: 'DT-004', customer: 'Lê Thị D', product: 'iPhone 15 128GB', amount: 19990000, status: 'delivered' },
  { code: 'DT-005', customer: 'Hoàng Văn E', product: 'iPhone SE 128GB', amount: 12990000, status: 'cancelled' },
]

const statusConfig: Record<string, { label: string; bg: string; text: string }> = {
  pending: { label: 'Chờ xác nhận', bg: '#fef3c7', text: '#d97706' },
  confirmed: { label: 'Đã xác nhận', bg: '#dbeafe', text: '#1e3a8a' },
  shipping: { label: 'Đang giao', bg: '#ede9fe', text: '#7c3aed' },
  delivered: { label: 'Đã giao', bg: '#d1fae5', text: '#065f46' },
  cancelled: { label: 'Đã hủy', bg: '#fee2e2', text: '#b91c1c' },
}

export default function AdminDashboardPage() {
  return (
    <div className="space-y-6">
      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {statsData.map((s) => (
          <div key={s.label} className="bg-white border border-[#eef1f7] rounded-2xl p-5">
            <div className="flex items-center justify-between mb-3">
              <div className="text-xs font-semibold text-[#8593ad] uppercase tracking-wide">{s.label}</div>
              <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ background: s.color + '15' }}>
                <s.icon size={16} style={{ color: s.color }} />
              </div>
            </div>
            <div className="font-serif text-2xl sm:text-3xl font-bold text-[#0f1729]">{s.value}</div>
            {s.change && <div className="text-xs font-semibold text-[#1f8a5b] mt-1">{s.change} so với tháng trước</div>}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-[1.6fr_1fr] gap-6">
        {/* Recent Orders */}
        <div className="bg-white border border-[#eef1f7] rounded-2xl">
          <div className="flex items-center justify-between px-6 py-4 border-b border-[#eef1f7]">
            <h2 className="font-semibold text-[#0f1729] font-serif text-lg">Đơn hàng gần đây</h2>
            <a href="/admin/don-hang" className="text-xs font-semibold text-[#1e3a8a] hover:underline">Xem tất cả</a>
          </div>
          <div className="divide-y divide-[#f1f4f9]">
            {recentOrders.map((o) => {
              const st = statusConfig[o.status]
              return (
                <div key={o.code} className="flex items-center gap-4 px-6 py-4">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-xs font-bold text-[#1e3a8a]">{o.code}</span>
                      <span className="text-xs text-[#8593ad]">·</span>
                      <span className="text-sm font-semibold text-[#0f1729] truncate">{o.customer}</span>
                    </div>
                    <div className="text-xs text-[#8593ad] mt-0.5 truncate">{o.product}</div>
                  </div>
                  <div className="text-right flex-none">
                    <div className="text-sm font-bold text-[#1e3a8a]">{formatPrice(o.amount)}</div>
                    <span className="inline-block mt-1 text-[10px] font-semibold px-2 py-0.5 rounded-full" style={{ background: st.bg, color: st.text }}>
                      {st.label}
                    </span>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Top Products */}
        <div className="bg-white border border-[#eef1f7] rounded-2xl">
          <div className="px-6 py-4 border-b border-[#eef1f7]">
            <h2 className="font-semibold text-[#0f1729] font-serif text-lg">Sản phẩm bán chạy</h2>
          </div>
          <div className="divide-y divide-[#f1f4f9]">
            {mockProducts.filter((p) => p.featured).map((p, i) => (
              <div key={p.id} className="flex items-center gap-3 px-6 py-4">
                <div className="w-6 h-6 rounded-full bg-[#eef2fb] flex items-center justify-center text-xs font-bold text-[#1e3a8a] flex-none">
                  {i + 1}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-semibold text-[#0f1729] truncate">{p.name}</div>
                  <div className="text-xs text-[#8593ad] mt-0.5">★ {p.rating} · {p.review_count.toLocaleString()} đánh giá</div>
                </div>
                <div className="text-sm font-bold text-[#1e3a8a] flex-none">{formatPrice(p.price)}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
