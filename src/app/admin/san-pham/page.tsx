'use client'
import { useState } from 'react'
import Image from 'next/image'
import { Plus, Search, Edit, Trash2, X } from 'lucide-react'
import { mockProducts } from '@/lib/mockData'
import { formatPrice } from '@/lib/utils'
import type { Product } from '@/lib/types'

export default function AdminProductsPage() {
  const [products, setProducts] = useState<Product[]>(mockProducts)
  const [search, setSearch] = useState('')
  const [showModal, setShowModal] = useState(false)
  const [editing, setEditing] = useState<Product | null>(null)
  const [form, setForm] = useState({ name: '', line: '', price: '', original_price: '' })

  const filtered = products.filter((p) => p.name.toLowerCase().includes(search.toLowerCase()))

  const handleDelete = (id: string) => {
    if (confirm('Xoá sản phẩm này?')) {
      setProducts((prev) => prev.filter((p) => p.id !== id))
    }
  }

  const openEdit = (p: Product) => {
    setEditing(p)
    setForm({ name: p.name, line: p.line, price: String(p.price), original_price: String(p.original_price ?? '') })
    setShowModal(true)
  }

  const openCreate = () => {
    setEditing(null)
    setForm({ name: '', line: '', price: '', original_price: '' })
    setShowModal(true)
  }

  const handleSave = () => {
    if (!form.name || !form.price) return
    if (editing) {
      setProducts((prev) => prev.map((p) => p.id === editing.id ? {
        ...p, name: form.name, line: form.line, price: Number(form.price),
        original_price: form.original_price ? Number(form.original_price) : null,
      } : p))
    }
    setShowModal(false)
  }

  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h2 className="font-serif text-2xl font-semibold text-[#0f1729]">Quản lý sản phẩm</h2>
          <p className="text-sm text-[#8593ad] mt-1">{products.length} sản phẩm</p>
        </div>
        <button onClick={openCreate} className="flex items-center gap-2 bg-[#0f1729] text-white rounded-xl px-4 py-2.5 text-sm font-semibold hover:bg-[#1e3a8a] transition-colors">
          <Plus size={16} />
          Thêm sản phẩm
        </button>
      </div>

      {/* Search */}
      <div className="flex items-center gap-2 bg-white border border-[#eef1f7] rounded-xl px-4 py-2.5 max-w-sm">
        <Search size={14} className="text-[#8593ad]" />
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Tìm sản phẩm..."
          className="bg-transparent outline-none text-sm text-[#0f1729] placeholder:text-[#8593ad] w-full"
        />
      </div>

      {/* Table */}
      <div className="bg-white border border-[#eef1f7] rounded-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-[#eef1f7] bg-[#f7f9fc]">
                <th className="text-left px-5 py-3.5 text-xs font-semibold text-[#8593ad] uppercase tracking-wide">Sản phẩm</th>
                <th className="text-left px-4 py-3.5 text-xs font-semibold text-[#8593ad] uppercase tracking-wide hidden sm:table-cell">Dòng</th>
                <th className="text-left px-4 py-3.5 text-xs font-semibold text-[#8593ad] uppercase tracking-wide">Giá</th>
                <th className="text-left px-4 py-3.5 text-xs font-semibold text-[#8593ad] uppercase tracking-wide hidden md:table-cell">Đánh giá</th>
                <th className="text-left px-4 py-3.5 text-xs font-semibold text-[#8593ad] uppercase tracking-wide">Trạng thái</th>
                <th className="text-right px-5 py-3.5 text-xs font-semibold text-[#8593ad] uppercase tracking-wide">Hành động</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#f1f4f9]">
              {filtered.map((p) => (
                <tr key={p.id} className="hover:bg-[#f7f9fc] transition-colors">
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-[#f1f5fc] flex items-center justify-center flex-none overflow-hidden">
                        <Image src={p.images[0]} alt={p.name} width={36} height={36} className="object-contain w-9 h-9" unoptimized />
                      </div>
                      <div>
                        <div className="font-semibold text-[#0f1729] text-sm">{p.name}</div>
                        <div className="text-xs text-[#8593ad] mt-0.5">{p.storages.length} phiên bản</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-4 hidden sm:table-cell">
                    <span className="text-xs font-medium text-[#7c89a3]">{p.line}</span>
                  </td>
                  <td className="px-4 py-4">
                    <div className="font-semibold text-[#1e3a8a] text-sm">{formatPrice(p.price)}</div>
                    {p.original_price && (
                      <div className="text-xs text-[#aab2c2] line-through">{formatPrice(p.original_price)}</div>
                    )}
                  </td>
                  <td className="px-4 py-4 hidden md:table-cell">
                    <div className="text-xs text-[#0f1729]">★ {p.rating} <span className="text-[#8593ad]">({p.review_count.toLocaleString()})</span></div>
                  </td>
                  <td className="px-4 py-4">
                    <span className={`inline-block text-[10px] font-semibold px-2.5 py-1 rounded-full ${p.in_stock ? 'bg-[#d1fae5] text-[#065f46]' : 'bg-[#fee2e2] text-[#b91c1c]'}`}>
                      {p.in_stock ? 'Còn hàng' : 'Hết hàng'}
                    </span>
                  </td>
                  <td className="px-5 py-4">
                    <div className="flex items-center justify-end gap-2">
                      <button onClick={() => openEdit(p)} className="w-8 h-8 rounded-lg border border-[#e6eaf2] flex items-center justify-center hover:bg-[#eef2fb] hover:border-[#1e3a8a] transition-colors">
                        <Edit size={13} className="text-[#7c89a3]" />
                      </button>
                      <button onClick={() => handleDelete(p.id)} className="w-8 h-8 rounded-lg border border-[#e6eaf2] flex items-center justify-center hover:bg-red-50 hover:border-red-300 transition-colors">
                        <Trash2 size={13} className="text-[#aab2c2]" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/30" onClick={() => setShowModal(false)} />
          <div className="relative bg-white rounded-2xl w-full max-w-md p-6 shadow-2xl">
            <div className="flex items-center justify-between mb-5">
              <h3 className="font-serif text-xl font-semibold text-[#0f1729]">{editing ? 'Sửa sản phẩm' : 'Thêm sản phẩm'}</h3>
              <button onClick={() => setShowModal(false)}><X size={18} className="text-[#8593ad]" /></button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="text-xs font-semibold text-[#8593ad] block mb-1.5">Tên sản phẩm *</label>
                <input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="w-full border border-[#dde2ec] rounded-xl px-4 py-2.5 text-sm outline-none focus:border-[#1e3a8a]" placeholder="iPhone 15 Pro Max" />
              </div>
              <div>
                <label className="text-xs font-semibold text-[#8593ad] block mb-1.5">Dòng sản phẩm</label>
                <input value={form.line} onChange={(e) => setForm({ ...form, line: e.target.value })}
                  className="w-full border border-[#dde2ec] rounded-xl px-4 py-2.5 text-sm outline-none focus:border-[#1e3a8a]" placeholder="iPhone 15 Series" />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-semibold text-[#8593ad] block mb-1.5">Giá bán *</label>
                  <input type="number" value={form.price} onChange={(e) => setForm({ ...form, price: e.target.value })}
                    className="w-full border border-[#dde2ec] rounded-xl px-4 py-2.5 text-sm outline-none focus:border-[#1e3a8a]" placeholder="34990000" />
                </div>
                <div>
                  <label className="text-xs font-semibold text-[#8593ad] block mb-1.5">Giá gốc</label>
                  <input type="number" value={form.original_price} onChange={(e) => setForm({ ...form, original_price: e.target.value })}
                    className="w-full border border-[#dde2ec] rounded-xl px-4 py-2.5 text-sm outline-none focus:border-[#1e3a8a]" placeholder="39990000" />
                </div>
              </div>
            </div>
            <div className="flex gap-3 mt-6">
              <button onClick={() => setShowModal(false)} className="flex-1 py-2.5 border border-[#dde2ec] rounded-xl text-sm font-semibold text-[#33405c] hover:bg-gray-50">Huỷ</button>
              <button onClick={handleSave} className="flex-1 py-2.5 bg-[#0f1729] text-white rounded-xl text-sm font-semibold hover:bg-[#1e3a8a] transition-colors">
                {editing ? 'Lưu thay đổi' : 'Thêm mới'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
