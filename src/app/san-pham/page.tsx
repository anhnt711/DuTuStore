'use client'
import { useState, useMemo, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import ProductCard from '@/components/product/ProductCard'
import { mockProducts } from '@/lib/mockData'
import { formatPrice } from '@/lib/utils'
import { Search, SlidersHorizontal, X, ChevronDown } from 'lucide-react'

const serif = { fontFamily: "'Cormorant Garamond',Georgia,serif" }

const LINES = ['Tất cả', 'iPhone 15 Series', 'iPhone 14 Series', 'iPhone 13 Series', 'iPhone SE Series']
const SORTS = [
  { label: 'Mới nhất', value: 'newest' },
  { label: 'Giá thấp → cao', value: 'price-asc' },
  { label: 'Giá cao → thấp', value: 'price-desc' },
  { label: 'Đánh giá cao nhất', value: 'rating' },
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

  const clearAll = () => { setSearch(''); setLine('Tất cả'); setOnlyDeal(false); setPriceMax(50000000) }

  return (
    <div style={{ maxWidth: 1280, margin: '0 auto', padding: '32px 20px 64px', width: '100%' }}>
      {/* Page header */}
      <div style={{ marginBottom: 28 }}>
        <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.18em', color: '#1a3272', textTransform: 'uppercase', marginBottom: 6 }}>Cửa hàng</div>
        <h1 style={{ ...serif, fontSize: 'clamp(2rem,4vw,3rem)', fontWeight: 600, color: '#0a0f1e', lineHeight: 1.1, margin: 0 }}>
          Tất cả iPhone
        </h1>
      </div>

      <div style={{ display: 'flex', gap: 32, alignItems: 'flex-start' }}>

        {/* Desktop sidebar */}
        <aside style={{ width: 210, flexShrink: 0, display: 'none' }} className="lg-show">
          <div style={{ position: 'sticky', top: 88 }}>
            <FilterPanel line={line} setLine={setLine} priceMax={priceMax} setPriceMax={setPriceMax} onlyDeal={onlyDeal} setOnlyDeal={setOnlyDeal} onClear={clearAll} />
          </div>
        </aside>

        {/* Main */}
        <div style={{ flex: 1, minWidth: 0 }}>

          {/* Toolbar */}
          <div style={{ display: 'flex', gap: 10, marginBottom: 20, flexWrap: 'wrap', alignItems: 'center' }}>
            {/* Search */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, flex: 1, minWidth: 180, maxWidth: 280, background: '#f4f6fb', border: '1px solid #e8ecf4', borderRadius: 99, padding: '10px 16px' }}>
              <Search size={13} color="#8593ad" />
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Tìm sản phẩm..."
                style={{ background: 'transparent', border: 'none', outline: 'none', fontSize: 13, color: '#0a0f1e', width: '100%' }}
              />
              {search && <button onClick={() => setSearch('')} style={{ border: 'none', background: 'none', cursor: 'pointer', padding: 0 }}><X size={13} color="#8593ad" /></button>}
            </div>

            {/* Sort */}
            <div style={{ position: 'relative' }}>
              <select
                value={sort}
                onChange={(e) => setSort(e.target.value)}
                style={{ appearance: 'none', fontSize: 13, border: '1px solid #e8ecf4', borderRadius: 99, paddingLeft: 16, paddingRight: 32, paddingTop: 10, paddingBottom: 10, background: '#ffffff', color: '#0a0f1e', outline: 'none', cursor: 'pointer', fontWeight: 600 }}
              >
                {SORTS.map((s) => <option key={s.value} value={s.value}>{s.label}</option>)}
              </select>
              <ChevronDown size={12} color="#8593ad" style={{ position: 'absolute', right: 12, top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }} />
            </div>

            {/* Mobile filter btn */}
            <button
              onClick={() => setShowFilters(true)}
              className="mobile-filter-btn"
              style={{ display: 'none', alignItems: 'center', gap: 6, border: '1px solid #e8ecf4', borderRadius: 99, padding: '10px 16px', fontSize: 13, fontWeight: 600, background: '#fff', cursor: 'pointer', color: '#0a0f1e' }}
            >
              <SlidersHorizontal size={13} /> Lọc
            </button>
          </div>

          {/* Line pills */}
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 20 }}>
            {LINES.map((l) => (
              <button
                key={l}
                onClick={() => setLine(l)}
                style={{
                  padding: '8px 18px', borderRadius: 99, fontSize: 12.5, fontWeight: 700,
                  border: 'none', cursor: 'pointer', transition: 'all .2s',
                  background: line === l ? '#0a0f1e' : '#f4f6fb',
                  color: line === l ? '#ffffff' : '#33405c',
                  boxShadow: line === l ? '0 4px 14px rgba(10,15,30,.25)' : 'none'
                }}
              >
                {l}
              </button>
            ))}
          </div>

          {/* Count */}
          <div style={{ fontSize: 13, color: '#8593ad', marginBottom: 20, fontWeight: 600 }}>
            {products.length} sản phẩm
          </div>

          {/* Product grid */}
          {products.length > 0 ? (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(230px,1fr))', gap: 20 }}>
              {products.map((p) => <ProductCard key={p.id} product={p} />)}
            </div>
          ) : (
            <div style={{ textAlign: 'center', padding: '80px 20px', background: '#f7f9fc', borderRadius: 20, border: '1px solid #eef1f7' }}>
              <div style={{ ...serif, fontSize: 22, fontWeight: 600, color: '#0a0f1e' }}>Không tìm thấy sản phẩm</div>
              <div style={{ fontSize: 13, color: '#8593ad', marginTop: 8 }}>Hãy thử điều chỉnh bộ lọc của bạn.</div>
              <button onClick={clearAll} style={{ marginTop: 16, background: '#1a3272', color: '#fff', border: 'none', borderRadius: 99, padding: '10px 24px', fontSize: 13, fontWeight: 700, cursor: 'pointer' }}>Xoá bộ lọc</button>
            </div>
          )}
        </div>
      </div>

      {/* Mobile filter drawer */}
      {showFilters && (
        <div style={{ position: 'fixed', inset: 0, zIndex: 50 }}>
          <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,.35)' }} onClick={() => setShowFilters(false)} />
          <div style={{ position: 'absolute', right: 0, top: 0, width: 290, height: '100%', background: '#fff', padding: 24, overflowY: 'auto', boxShadow: '-8px 0 30px rgba(0,0,0,.15)' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 24 }}>
              <h3 style={{ ...serif, fontWeight: 700, color: '#0a0f1e', fontSize: 20, margin: 0 }}>Bộ lọc</h3>
              <button onClick={() => setShowFilters(false)} style={{ width: 32, height: 32, borderRadius: '50%', border: '1px solid #e8ecf4', background: '#fff', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <X size={16} />
              </button>
            </div>
            <FilterPanel line={line} setLine={(v) => { setLine(v); setShowFilters(false) }} priceMax={priceMax} setPriceMax={setPriceMax} onlyDeal={onlyDeal} setOnlyDeal={setOnlyDeal} onClear={clearAll} />
          </div>
        </div>
      )}
    </div>
  )
}

function FilterPanel({ line, setLine, priceMax, setPriceMax, onlyDeal, setOnlyDeal, onClear }: {
  line: string; setLine: (v: string) => void
  priceMax: number; setPriceMax: (v: number) => void
  onlyDeal: boolean; setOnlyDeal: (v: boolean) => void
  onClear: () => void
}) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 28 }}>
      <div>
        <div style={{ fontSize: 10, fontWeight: 800, letterSpacing: '0.18em', color: '#8593ad', textTransform: 'uppercase', marginBottom: 10 }}>Dòng sản phẩm</div>
        {LINES.map((l) => (
          <button key={l} onClick={() => setLine(l)} style={{
            display: 'block', width: '100%', textAlign: 'left',
            padding: '10px 12px', borderRadius: 12, border: 'none', cursor: 'pointer',
            fontSize: 13, fontWeight: l === line ? 700 : 500,
            background: l === line ? '#eef2fb' : 'transparent',
            color: l === line ? '#1a3272' : '#33405c',
            transition: 'all .15s'
          }}>
            {l}
          </button>
        ))}
      </div>
      <div>
        <div style={{ fontSize: 10, fontWeight: 800, letterSpacing: '0.18em', color: '#8593ad', textTransform: 'uppercase', marginBottom: 10 }}>Giá tối đa</div>
        <input type="range" min={5000000} max={50000000} step={1000000} value={priceMax} onChange={(e) => setPriceMax(Number(e.target.value))} style={{ width: '100%', accentColor: '#1a3272' }} />
        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 8, fontSize: 12, color: '#8593ad' }}>
          <span>5tr</span>
          <span style={{ fontWeight: 700, color: '#0a0f1e' }}>{formatPrice(priceMax)}</span>
          <span>50tr</span>
        </div>
      </div>
      <label style={{ display: 'flex', alignItems: 'center', gap: 10, cursor: 'pointer' }}>
        <div onClick={() => setOnlyDeal(!onlyDeal)} style={{ width: 20, height: 20, borderRadius: 6, border: `2px solid ${onlyDeal ? '#1a3272' : '#dde2ec'}`, background: onlyDeal ? '#1a3272' : 'transparent', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, transition: 'all .15s' }}>
          {onlyDeal && <svg width="10" height="8" viewBox="0 0 10 8" fill="none"><path d="M1 4l3 3 5-6" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>}
        </div>
        <span style={{ fontSize: 13, color: '#33405c', userSelect: 'none' }}>Chỉ hàng khuyến mãi</span>
      </label>
      <button onClick={onClear} style={{ width: '100%', padding: '10px 0', border: '1px solid #dde2ec', borderRadius: 12, fontSize: 13, fontWeight: 700, color: '#7c89a3', background: '#fff', cursor: 'pointer' }}>
        Xoá bộ lọc
      </button>
    </div>
  )
}

export default function CatalogPage() {
  return <Suspense><CatalogContent /></Suspense>
}
