import { mockProducts } from '@/lib/mockData'
import { formatPrice } from '@/lib/utils'
import { TrendingUp, ShoppingBag, Package, Users } from 'lucide-react'

const serif = { fontFamily: "'Cormorant Garamond',Georgia,serif" }

const statsData = [
  { label: 'Doanh thu tháng', value: '2.4 tỷ', change: '+18%', icon: TrendingUp, color: '#1a3272' },
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

const statusConfig: Record<string, { label: string; bg: string; color: string }> = {
  pending:   { label: 'Chờ xác nhận', bg: '#fef3c7', color: '#d97706' },
  confirmed: { label: 'Đã xác nhận',  bg: '#dbeafe', color: '#1a3272' },
  shipping:  { label: 'Đang giao',    bg: '#ede9fe', color: '#7c3aed' },
  delivered: { label: 'Đã giao',      bg: '#d1fae5', color: '#065f46' },
  cancelled: { label: 'Đã hủy',       bg: '#fee2e2', color: '#b91c1c' },
}

export default function AdminDashboardPage() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>

      {/* Stats grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(200px,1fr))', gap: 16 }}>
        {statsData.map((s) => (
          <div key={s.label} style={{ background: '#fff', border: '1px solid #eef1f7', borderRadius: 18, padding: '20px 20px' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
              <div style={{ fontSize: 11, fontWeight: 700, color: '#8593ad', textTransform: 'uppercase', letterSpacing: '0.1em' }}>{s.label}</div>
              <div style={{ width: 36, height: 36, borderRadius: 10, background: s.color + '18', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <s.icon size={16} style={{ color: s.color }} />
              </div>
            </div>
            <div style={{ ...serif, fontSize: 28, fontWeight: 700, color: '#0a0f1e', lineHeight: 1 }}>{s.value}</div>
            {s.change && <div style={{ fontSize: 12, fontWeight: 700, color: '#1f8a5b', marginTop: 6 }}>{s.change} so với tháng trước</div>}
          </div>
        ))}
      </div>

      {/* Orders + Top Products */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(320px,1fr))', gap: 20 }}>

        {/* Recent Orders */}
        <div style={{ background: '#fff', border: '1px solid #eef1f7', borderRadius: 18, overflow: 'hidden' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px 20px', borderBottom: '1px solid #eef1f7' }}>
            <h2 style={{ ...serif, fontWeight: 700, color: '#0a0f1e', fontSize: 18, margin: 0 }}>Đơn hàng gần đây</h2>
            <a href="/admin/don-hang" style={{ fontSize: 12, fontWeight: 700, color: '#1a3272', textDecoration: 'none' }}>Xem tất cả</a>
          </div>
          <div>
            {recentOrders.map((o) => {
              const st = statusConfig[o.status]
              return (
                <div key={o.code} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '14px 20px', borderBottom: '1px solid #f1f4f9' }}>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 6, flexWrap: 'wrap' }}>
                      <span style={{ fontSize: 11, fontWeight: 800, color: '#1a3272' }}>{o.code}</span>
                      <span style={{ fontSize: 11, color: '#ccc' }}>·</span>
                      <span style={{ fontSize: 13, fontWeight: 700, color: '#0a0f1e', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{o.customer}</span>
                    </div>
                    <div style={{ fontSize: 11, color: '#8593ad', marginTop: 2, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{o.product}</div>
                  </div>
                  <div style={{ textAlign: 'right', flexShrink: 0 }}>
                    <div style={{ fontSize: 13, fontWeight: 800, color: '#1a3272' }}>{formatPrice(o.amount)}</div>
                    <span style={{ display: 'inline-block', marginTop: 4, fontSize: 10, fontWeight: 700, padding: '3px 8px', borderRadius: 99, background: st.bg, color: st.color }}>
                      {st.label}
                    </span>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Top Products */}
        <div style={{ background: '#fff', border: '1px solid #eef1f7', borderRadius: 18, overflow: 'hidden' }}>
          <div style={{ padding: '16px 20px', borderBottom: '1px solid #eef1f7' }}>
            <h2 style={{ ...serif, fontWeight: 700, color: '#0a0f1e', fontSize: 18, margin: 0 }}>Sản phẩm bán chạy</h2>
          </div>
          <div>
            {mockProducts.filter((p) => p.featured).map((p, i) => (
              <div key={p.id} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '14px 20px', borderBottom: '1px solid #f1f4f9' }}>
                <div style={{ width: 26, height: 26, borderRadius: '50%', background: '#eef2fb', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, fontWeight: 800, color: '#1a3272', flexShrink: 0 }}>
                  {i + 1}
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: 13, fontWeight: 700, color: '#0a0f1e', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{p.name}</div>
                  <div style={{ fontSize: 11, color: '#8593ad', marginTop: 2 }}>★ {p.rating} · {p.review_count.toLocaleString()} đánh giá</div>
                </div>
                <div style={{ fontSize: 13, fontWeight: 800, color: '#1a3272', flexShrink: 0 }}>{formatPrice(p.price)}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
