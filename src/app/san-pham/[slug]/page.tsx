'use client'
import { useParams, useRouter } from 'next/navigation'
import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Heart, ShoppingCart, Shield, Truck, RotateCcw, Star } from 'lucide-react'
import { mockProducts } from '@/lib/mockData'
import { useCartStore } from '@/lib/store'
import { formatPrice } from '@/lib/utils'
import ProductCard from '@/components/product/ProductCard'

export default function ProductDetailPage() {
  const { slug } = useParams<{ slug: string }>()
  const router = useRouter()
  const product = mockProducts.find((p) => p.slug === slug)

  const [colorIdx, setColorIdx] = useState(0)
  const [storageIdx, setStorageIdx] = useState(0)
  const [qty, setQty] = useState(1)

  const addToCart = useCartStore((s) => s.addToCart)
  const toggleWish = useCartStore((s) => s.toggleWish)
  const wishlist = useCartStore((s) => s.wishlist)

  if (!product) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center gap-4 text-center px-4">
        <div className="font-serif text-3xl font-semibold text-[#0f1729]">Không tìm thấy sản phẩm</div>
        <Link href="/san-pham" className="text-[#1e3a8a] underline text-sm">Quay lại cửa hàng</Link>
      </div>
    )
  }

  const isWished = wishlist.includes(product.id)
  const selectedStorage = product.storages[storageIdx]
  const currentPrice = selectedStorage?.price ?? product.price
  const discount = product.original_price
    ? Math.round((1 - product.price / product.original_price) * 100)
    : null
  const related = mockProducts.filter((p) => p.id !== product.id && p.line === product.line).slice(0, 4)

  const handleAddToCart = () => {
    addToCart(product, colorIdx, storageIdx, qty)
  }

  const handleBuyNow = () => {
    addToCart(product, colorIdx, storageIdx, qty)
    router.push('/gio-hang')
  }

  return (
    <div className="max-w-screen-xl mx-auto px-4 py-8 pb-16">
      {/* Breadcrumb */}
      <nav className="text-xs text-[#9aa6bf] mb-6 flex items-center gap-2 flex-wrap">
        <Link href="/" className="hover:text-[#1e3a8a]">Trang chủ</Link>
        <span>/</span>
        <Link href="/san-pham" className="hover:text-[#1e3a8a]">Sản phẩm</Link>
        <span>/</span>
        <span className="text-[#1e3a8a] font-medium">{product.name}</span>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-start">
        {/* Gallery */}
        <div className="lg:sticky lg:top-24">
          <div className="relative h-72 sm:h-96 md:h-[480px] bg-gradient-to-br from-white to-[#f1f5fc] border border-[#eef1f7] rounded-3xl flex items-center justify-center overflow-hidden">
            {discount && (
              <div className="absolute top-4 left-4 bg-[#1e3a8a] text-white text-xs font-bold px-3 py-1.5 rounded-full z-10">
                -{discount}%
              </div>
            )}
            <Image
              src={product.colors[colorIdx]?.image || product.images[0]}
              alt={product.name}
              width={320}
              height={320}
              className="object-contain h-64 sm:h-80 w-auto"
              style={{ filter: 'drop-shadow(0 44px 54px rgba(30,58,138,.25))' }}
              unoptimized
            />
          </div>
          {/* Color thumbnails */}
          <div className="grid grid-cols-4 gap-3 mt-4">
            {product.colors.map((c, i) => (
              <button
                key={c.name}
                onClick={() => setColorIdx(i)}
                className={`h-20 flex items-center justify-center bg-[#f7f9fc] rounded-xl border-2 transition-colors ${
                  colorIdx === i ? 'border-[#1e3a8a]' : 'border-transparent'
                }`}
              >
                <Image src={c.image} alt={c.name} width={60} height={60} className="object-contain h-14 w-auto" unoptimized />
              </button>
            ))}
          </div>
        </div>

        {/* Info */}
        <div>
          <div className="text-xs font-semibold tracking-widest text-[#1e3a8a] uppercase">{product.line}</div>
          <h1 className="font-serif mt-2 text-3xl sm:text-4xl lg:text-5xl font-semibold text-[#0f1729] leading-tight">{product.name}</h1>

          {/* Rating */}
          <div className="flex items-center gap-3 mt-4 flex-wrap">
            <div className="flex items-center gap-1.5">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={14} fill={i < Math.round(product.rating) ? '#1e3a8a' : 'none'} className={i < Math.round(product.rating) ? 'text-[#1e3a8a]' : 'text-[#d6dbe6]'} />
              ))}
              <span className="font-semibold text-sm text-[#0f1729] ml-1">{product.rating}</span>
              <span className="text-sm text-[#8593ad]">({product.review_count.toLocaleString()} đánh giá)</span>
            </div>
            <span className="flex items-center gap-1.5 text-sm font-semibold text-[#1f8a5b]">
              <span className="w-2 h-2 rounded-full bg-[#1f8a5b] inline-block" />
              Còn hàng
            </span>
          </div>

          {/* Price */}
          <div className="flex items-baseline gap-3 mt-5 flex-wrap">
            <span className="font-bold text-3xl sm:text-4xl text-[#1e3a8a]">{formatPrice(currentPrice)}</span>
            {product.original_price && (
              <>
                <span className="text-lg text-[#aab2c2] line-through">{formatPrice(product.original_price)}</span>
                <span className="text-xs font-semibold text-[#1f8a5b] bg-[#e8f5ee] px-2.5 py-1 rounded-lg">
                  Tiết kiệm {formatPrice(product.original_price - currentPrice)}
                </span>
              </>
            )}
          </div>

          <div className="h-px bg-[#eef1f7] my-6" />

          {/* Color picker */}
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm font-semibold text-[#0f1729]">Màu sắc</span>
            <span className="text-sm text-[#8593ad]">{product.colors[colorIdx]?.name}</span>
          </div>
          <div className="flex gap-3 flex-wrap">
            {product.colors.map((c, i) => (
              <button
                key={c.name}
                onClick={() => setColorIdx(i)}
                title={c.name}
                className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all ${
                  colorIdx === i ? 'border-[#1e3a8a] scale-110' : 'border-gray-200'
                }`}
              >
                <span className="w-7 h-7 rounded-full shadow-inner" style={{ background: c.hex, boxShadow: 'inset 0 0 0 1px rgba(15,23,41,.15)' }} />
              </button>
            ))}
          </div>

          {/* Storage picker */}
          <div className="mt-6">
            <span className="text-sm font-semibold text-[#0f1729]">Dung lượng</span>
            <div className="grid grid-cols-3 gap-3 mt-3">
              {product.storages.map((s, i) => (
                <button
                  key={s.label}
                  onClick={() => setStorageIdx(i)}
                  className={`py-3 rounded-xl border-2 text-center transition-all ${
                    storageIdx === i
                      ? 'border-[#1e3a8a] bg-[#eef2fb] text-[#1e3a8a]'
                      : 'border-[#e6eaf2] text-[#33405c] hover:border-[#b5c0d8]'
                  }`}
                >
                  <div className="font-semibold text-sm">{s.label}</div>
                  <div className="text-xs mt-1 opacity-70">{formatPrice(s.price)}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Qty + actions */}
          <div className="flex items-center gap-3 mt-7 flex-wrap">
            <div className="flex items-center border-2 border-[#e6eaf2] rounded-full overflow-hidden flex-none">
              <button onClick={() => setQty(Math.max(1, qty - 1))} className="w-11 h-11 text-xl text-[#0f1729] hover:bg-gray-50 transition-colors">−</button>
              <span className="w-10 text-center font-semibold text-[#0f1729]">{qty}</span>
              <button onClick={() => setQty(qty + 1)} className="w-11 h-11 text-xl text-[#0f1729] hover:bg-gray-50 transition-colors">+</button>
            </div>
            <button
              onClick={handleAddToCart}
              className="flex-1 min-w-[140px] flex items-center justify-center gap-2 h-12 border-2 border-[#0f1729] text-[#0f1729] rounded-full font-semibold text-sm hover:bg-[#0f1729] hover:text-white transition-colors"
            >
              <ShoppingCart size={16} />
              Thêm vào giỏ
            </button>
            <button
              onClick={handleBuyNow}
              className="flex-1 min-w-[120px] h-12 bg-[#1e3a8a] text-white rounded-full font-semibold text-sm hover:bg-[#16306b] transition-colors shadow-lg shadow-[#1e3a8a]/30"
            >
              Mua ngay
            </button>
            <button
              onClick={() => toggleWish(product.id)}
              className={`w-12 h-12 rounded-full border-2 flex items-center justify-center transition-colors flex-none ${
                isWished ? 'border-red-400 bg-red-50' : 'border-[#e6eaf2]'
              }`}
            >
              <Heart size={18} fill={isWished ? '#e53e3e' : 'none'} className={isWished ? 'text-red-500' : 'text-[#8593ad]'} />
            </button>
          </div>

          {/* Guarantees */}
          <div className="grid grid-cols-3 gap-3 mt-6">
            {[
              { icon: Shield, text: 'BH 12 tháng' },
              { icon: Truck, text: 'Giao 2 giờ' },
              { icon: RotateCcw, text: 'Đổi 30 ngày' },
            ].map(({ icon: Icon, text }) => (
              <div key={text} className="flex items-center gap-2 p-3 bg-[#f7f9fc] rounded-xl">
                <Icon size={14} className="text-[#1e3a8a] flex-none" />
                <span className="text-xs font-medium text-[#33405c]">{text}</span>
              </div>
            ))}
          </div>

          {/* Specs */}
          <div className="mt-8 border border-[#eef1f7] rounded-2xl overflow-hidden">
            <div className="px-5 py-4 bg-[#f7f9fc] border-b border-[#eef1f7]">
              <h3 className="font-semibold text-sm text-[#0f1729]">Thông số kỹ thuật</h3>
            </div>
            <div className="divide-y divide-[#f1f4f9]">
              {Object.entries(product.specs).map(([k, v]) => (
                <div key={k} className="flex px-5 py-3 gap-4">
                  <span className="text-xs text-[#8593ad] w-28 flex-none">{k}</span>
                  <span className="text-xs font-medium text-[#0f1729]">{v}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Related products */}
      {related.length > 0 && (
        <div className="mt-16">
          <h2 className="font-serif text-2xl sm:text-3xl font-semibold text-[#0f1729] mb-6 text-center">Cùng dòng sản phẩm</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {related.map((p) => <ProductCard key={p.id} product={p} />)}
          </div>
        </div>
      )}
    </div>
  )
}
