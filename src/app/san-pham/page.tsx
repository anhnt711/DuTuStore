'use client'
import { useState, useMemo } from 'react'
import { useSearchParams } from 'next/navigation'
import { Suspense } from 'react'
import ProductCard from '@/components/product/ProductCard'
import { mockProducts } from '@/lib/mockData'
import { Search, SlidersHorizontal, X } from 'lucide-react'

const LINES = ['Tất cả', 'iPhone 15 Series', 'iPhone 14 Series', 'iPhone 13 Series', 'iPhone SE Series']
const SORTS = [
  { label: 'Mới nhất', value: 'newest' },
  { label: 'Giá thấp', value: 'price-asc' },
  { label: 'Giá cao', value: 'price-desc' },
  { label: 'Đánh giá cao', value: 'rating' },
]

function CatalogContent() {
  const params = useSearchParams()
  const [search, setSearch] = useState(params.get('q') || '')
  const [line, setLine] = useState('Tất cả')
  const [sort, setSort] = useState('newest')
  const [showFilters, setShowFilters] = useState(false)
  const [priceMax, setPriceMax] = useState(50000000)
  const [onlyDeal, setOnlyDeal] = useState(false)

  const products = useMemo(() => {
    let list = [...mockProducts]
    if (search) list = list.filter((p) => p.name.toLowerCase().includes(search.toLowerCase()))
    if (line !== 'Tất cả') list = list.filter((p) => p.line === line)
    if (onlyDeal) list = list.filter((p) => p.deal)
    list = list.filter((p) => p.price <= priceMax)
    switch (sort) {
      case 'price-asc': list.sort((a, b) => a.price - b.price); break
      case 'price-desc': list.sort((a, b) => b.price - a.price); break
      case 'rating': list.sort((a, b) => b.rating - a.rating); break
    }
    return list
  }, [search, line, sort, priceMax, onlyDeal])

  return (
    <div className="max-w-screen-xl mx-auto px-4 py-8">
      {/* Page title */}
      <div className="mb-6">
        <div className="text-xs font-semibold tracking-widest text-[#1e3a8a] uppercase">Cửa hàng</div>
        <h1 className="font-serif text-3xl sm:text-4xl font-semibold text-[#0f1729] mt-2">Tất cả iPhone</h1>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Sidebar filters - desktop */}
        <aside className="hidden lg:block w-56 flex-none">
          <div className="sticky top-24">
            <FilterPanel
              line={line} setLine={setLine}
              priceMax={priceMax} setPriceMax={setPriceMax}
              onlyDeal={onlyDeal} setOnlyDeal={setOnlyDeal}
            />
          </div>
        </aside>

        <div className="flex-1 min-w-0">
          {/* Search + sort bar */}
          <div className="flex items-center gap-3 mb-6 flex-wrap">
            <div className="flex items-center gap-2 flex-1 min-w-[180px] bg-[#f4f6fb] border border-gray-100 rounded-full px-3.5 py-2.5">
              <Search size={14} className="text-[#8593ad] flex-none" />
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Tìm sản phẩm..."
                className="bg-transparent outline-none text-sm text-[#0f1729] placeholder:text-[#8593ad] w-full"
              />
              {search && <X size={14} className="text-[#8593ad] cursor-pointer" onClick={() => setSearch('')} />}
            </div>

            <select
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              className="text-sm border border-gray-100 rounded-full px-4 py-2.5 bg-white text-[#0f1729] outline-none cursor-pointer"
            >
              {SORTS.map((s) => <option key={s.value} value={s.value}>{s.label}</option>)}
            </select>

            <button
              onClick={() => setShowFilters(true)}
              className="lg:hidden flex items-center gap-2 border border-gray-100 rounded-full px-4 py-2.5 text-sm font-medium text-[#0f1729]"
            >
              <SlidersHorizontal size={14} />
              Lọc
            </button>
          </div>

          {/* Line pills */}
          <div className="flex gap-2 flex-wrap mb-6">
            {LINES.map((l) => (
              <button
                key={l}
                onClick={() => setLine(l)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  line === l
                    ? 'bg-[#0f1729] text-white'
                    : 'bg-[#f4f6fb] text-[#33405c] hover:bg-[#eef2fb]'
                }`}
              >
                {l}
              </button>
            ))}
          </div>

          {/* Results count */}
          <div className="text-sm text-[#8593ad] mb-5">
            {products.length} sản phẩm
          </div>

          {/* Grid */}
          {products.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
              {products.map((p) => <ProductCard key={p.id} product={p} />)}
            </div>
          ) : (
            <div className="text-center py-20 bg-[#f7f9fc] border border-[#eef1f7] rounded-2xl">
              <div className="font-serif text-xl font-semibold text-[#0f1729]">Không tìm thấy sản phẩm</div>
              <div className="text-sm text-[#8593ad] mt-2">Hãy thử điều chỉnh bộ lọc của bạn.</div>
              <button
                onClick={() => { setSearch(''); setLine('Tất cả'); setOnlyDeal(false); setPriceMax(50000000) }}
                className="mt-4 bg-[#1e3a8a] text-white rounded-full px-6 py-2.5 text-sm font-semibold"
              >
                Xoá bộ lọc
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Mobile filter drawer */}
      {showFilters && (
        <div className="fixed inset-0 z-50 flex lg:hidden">
          <div className="absolute inset-0 bg-black/30" onClick={() => setShowFilters(false)} />
          <div className="relative ml-auto w-72 bg-white h-full p-6 overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-semibold text-[#0f1729]">Bộ lọc</h3>
              <button onClick={() => setShowFilters(false)}><X size={20} /></button>
            </div>
            <FilterPanel
              line={line} setLine={(v) => { setLine(v); setShowFilters(false) }}
              priceMax={priceMax} setPriceMax={setPriceMax}
              onlyDeal={onlyDeal} setOnlyDeal={setOnlyDeal}
            />
          </div>
        </div>
      )}
    </div>
  )
}

function FilterPanel({ line, setLine, priceMax, setPriceMax, onlyDeal, setOnlyDeal }: {
  line: string; setLine: (v: string) => void
  priceMax: number; setPriceMax: (v: number) => void
  onlyDeal: boolean; setOnlyDeal: (v: boolean) => void
}) {
  return (
    <div className="space-y-6">
      <div>
        <h4 className="text-xs font-semibold tracking-widest text-[#8593ad] uppercase mb-3">Dòng sản phẩm</h4>
        <div className="flex flex-col gap-1.5">
          {LINES.map((l) => (
            <button
              key={l}
              onClick={() => setLine(l)}
              className={`text-left px-3 py-2 rounded-xl text-sm transition-colors ${
                line === l ? 'bg-[#eef2fb] text-[#1e3a8a] font-semibold' : 'text-[#33405c] hover:bg-gray-50'
              }`}
            >
              {l}
            </button>
          ))}
        </div>
      </div>

      <div>
        <h4 className="text-xs font-semibold tracking-widest text-[#8593ad] uppercase mb-3">Giá tối đa</h4>
        <input
          type="range"
          min={5000000}
          max={50000000}
          step={1000000}
          value={priceMax}
          onChange={(e) => setPriceMax(Number(e.target.value))}
          className="w-full accent-[#1e3a8a]"
        />
        <div className="text-sm text-[#0f1729] mt-1 font-semibold">
          {new Intl.NumberFormat('vi-VN').format(priceMax)}đ
        </div>
      </div>

      <div>
        <label className="flex items-center gap-3 cursor-pointer">
          <input
            type="checkbox"
            checked={onlyDeal}
            onChange={(e) => setOnlyDeal(e.target.checked)}
            className="w-4 h-4 accent-[#1e3a8a] rounded"
          />
          <span className="text-sm text-[#33405c]">Chỉ hàng đang khuyến mãi</span>
        </label>
      </div>
    </div>
  )
}

export default function CatalogPage() {
  return (
    <Suspense>
      <CatalogContent />
    </Suspense>
  )
}
