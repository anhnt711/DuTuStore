'use client'
import { useState } from 'react'
import { Search, Eye, X } from 'lucide-react'
import { formatPrice } from '@/lib/utils'

const ORDERS = [
  { code: 'DT-001', customer: 'Nguyễn Văn A', phone: '0912345678', product: 'iPhone 15 Pro Max 256GB', amount: 34990000, status: 'shipping', date: '24/06/2025', address: '123 Nguyễn Huệ, Q1, TPHCM' },
  { code: 'DT-002', customer: 'Trần Thị B', phone: '0987654321', product: 'iPhone 15 Pro 128GB', amount: 28990000, status: 'confirmed', date: '23/06/2025', address: '45 Hàng Bài, HK, HN' },
  { code: 'DT-003', customer: 'Phạm Văn C', phone: '0901234567', product: 'iPhone 14 Pro Max 512GB', amount: 32990000, status: 'pending', date: '22/06/2025', address: '89 Trần Phú, HC, ĐN' },
  { code: 'DT-004', customer: 'Lê Thị D', phone: '0934567890', product: 'iPhone 15 128GB', amount: 19990000, status: 'delivered', date: '21/06/2025', address: '67 Lê Lợi, Q1, TPHCM' },
  { code: 'DT-005', customer: 'Hoàng Văn E', phone: '0978901234', product: 'iPhone SE 128GB', amount: 12990000, status: 'cancelled', date: '20/06/2025', address: '12 Đinh Tiên Hoàng, Q1, TPHCM' },
]

const statusConfig: Record<string, { label: string; bg: string; text: string }> = {
  pending: { label: 'Chờ xác nhận', bg: '#fef3c7', text: '#d97706' },
  confirmed: { label: 'Đã xác nhận', bg: '#dbeafe', text: '#1e3a8a' },
  shipping: { label: 'Đang giao', bg: '#ede9fe', text: '#7c3aed' },
  delivered: { label: 'Đã giao', bg: '#d1fae5', text: '#065f46' },
  cancelled: { label: 'Đã hủy', bg: '#fee2e2', text: '#b91c1c' },
}

export default function AdminOrdersPage() {
  const [search, setSearch] = useState('')
  const [selected, setSelected] = useState<(typeof ORDERS)[0] | null>(null)
  const [filter, setFilter] = useState('all')

  const filtered = ORDERS.filter((o) => {
    const matchSearch = o.customer.toLowerCase().includes(search.toLowerCase()) || o.code.includes(search)
    const matchFilter = filter === 'all' || o.status === filter
    return matchSearch && matchFilter
  })

  return (
    <div className="space-y-5">
      <div>
        <h2 className="font-serif text-2xl font-semibold text-[#0f1729]">Quản lý đơn hàng</h2>
        <p className="text-sm text-[#8593ad] mt-1">{ORDERS.length} đơn hàng</p>
      </div>

      {/* Filter + search */}
      <div className="flex gap-3 flex-wrap items-center">
        <div className="flex items-center gap-2 bg-white border border-[#eef1f7] rounded-xl px-4 py-2.5 flex-1 min-w-[180px] max-w-xs">
          <Search size={14} className="text-[#8593ad]" />
          <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Tìm đơn hàng..."
            className="bg-transparent outline-none text-sm text-[#0f1729] placeholder:text-[#8593ad] w-full" />
        </div>
        <div className="flex gap-2 flex-wrap">
          {['all', 'pending', 'confirmed', 'shipping', 'delivered', 'cancelled'].map((s) => (
            <button key={s} onClick={() => setFilter(s)}
              className={`px-3.5 py-2 rounded-xl text-xs font-semibold transition-colors ${filter === s ? 'bg-[#0f1729] text-white' : 'bg-white border border-[#eef1f7] text-[#7c89a3] hover:bg-gray-50'}`}>
              {s === 'all' ? 'Tất cả' : statusConfig[s]?.label}
            </button>
          ))}
        </div>
      </div>

      {/* Table */}
      <div className="bg-white border border-[#eef1f7] rounded-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-[#eef1f7] bg-[#f7f9fc]">
                <th className="text-left px-5 py-3.5 text-xs font-semibold text-[#8593ad] uppercase tracking-wide">Mã đơn</th>
                <th className="text-left px-4 py-3.5 text-xs font-semibold text-[#8593ad] uppercase tracking-wide">Khách hàng</th>
                <th className="text-left px-4 py-3.5 text-xs font-semibold text-[#8593ad] uppercase tracking-wide hidden md:table-cell">Sản phẩm</th>
                <th className="text-left px-4 py-3.5 text-xs font-semibold text-[#8593ad] uppercase tracking-wide">Tổng tiền</th>
                <th className="text-left px-4 py-3.5 text-xs font-semibold text-[#8593ad] uppercase tracking-wide">Trạng thái</th>
                <th className="text-right px-5 py-3.5 text-xs font-semibold text-[#8593ad] uppercase tracking-wide">Chi tiết</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#f1f4f9]">
              {filtered.map((o) => {
                const st = statusConfig[o.status]
                return (
                  <tr key={o.code} className="hover:bg-[#f7f9fc] transition-colors">
                    <td className="px-5 py-4">
                      <span className="font-bold text-xs text-[#1e3a8a]">{o.code}</span>
                      <div className="text-[10px] text-[#9aa6bf] mt-0.5">{o.date}</div>
                    </td>
                    <td className="px-4 py-4">
                      <div className="font-semibold text-[#0f1729] text-sm">{o.customer}</div>
                      <div className="text-xs text-[#8593ad]">{o.phone}</div>
                    </td>
                    <td className="px-4 py-4 hidden md:table-cell">
                      <span className="text-xs text-[#7c89a3]">{o.product}</span>
                    </td>
                    <td className="px-4 py-4">
                      <span className="font-bold text-sm text-[#1e3a8a]">{formatPrice(o.amount)}</span>
                    </td>
                    <td className="px-4 py-4">
                      <span className="inline-block text-[10px] font-semibold px-2.5 py-1 rounded-full" style={{ background: st.bg, color: st.text }}>
                        {st.label}
                      </span>
                    </td>
                    <td className="px-5 py-4 text-right">
                      <button onClick={() => setSelected(o)} className="w-8 h-8 rounded-lg border border-[#e6eaf2] flex items-center justify-center ml-auto hover:bg-[#eef2fb] hover:border-[#1e3a8a] transition-colors">
                        <Eye size={13} className="text-[#7c89a3]" />
                      </button>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Detail modal */}
      {selected && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/30" onClick={() => setSelected(null)} />
          <div className="relative bg-white rounded-2xl w-full max-w-md p-6 shadow-2xl">
            <div className="flex items-center justify-between mb-5">
              <h3 className="font-serif text-xl font-semibold text-[#0f1729]">Chi tiết đơn hàng</h3>
              <button onClick={() => setSelected(null)}><X size={18} className="text-[#8593ad]" /></button>
            </div>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between"><span className="text-[#8593ad]">Mã đơn:</span><span className="font-bold text-[#1e3a8a]">{selected.code}</span></div>
              <div className="flex justify-between"><span className="text-[#8593ad]">Ngày đặt:</span><span className="font-medium">{selected.date}</span></div>
              <div className="flex justify-between"><span className="text-[#8593ad]">Khách hàng:</span><span className="font-medium">{selected.customer}</span></div>
              <div className="flex justify-between"><span className="text-[#8593ad]">SĐT:</span><span className="font-medium">{selected.phone}</span></div>
              <div className="flex justify-between"><span className="text-[#8593ad]">Địa chỉ:</span><span className="font-medium text-right max-w-[60%]">{selected.address}</span></div>
              <div className="flex justify-between"><span className="text-[#8593ad]">Sản phẩm:</span><span className="font-medium text-right max-w-[60%]">{selected.product}</span></div>
              <div className="h-px bg-[#eef1f7] my-1" />
              <div className="flex justify-between"><span className="font-semibold text-[#0f1729]">Tổng cộng:</span><span className="font-bold text-[#1e3a8a] text-lg">{formatPrice(selected.amount)}</span></div>
            </div>
            <div className="mt-5 flex gap-2 flex-wrap">
              {Object.entries(statusConfig).map(([val, st]) => (
                <button key={val} className="px-3 py-1.5 rounded-xl text-xs font-semibold transition-colors" style={{ background: st.bg, color: st.text }}>
                  {st.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
