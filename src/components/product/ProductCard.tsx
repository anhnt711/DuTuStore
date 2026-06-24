'use client'
import Link from 'next/link'
import Image from 'next/image'
import { Heart, ShoppingCart } from 'lucide-react'
import { useCartStore } from '@/lib/store'
import { formatPrice } from '@/lib/utils'
import type { Product } from '@/lib/types'

interface Props {
  product: Product
}

export default function ProductCard({ product }: Props) {
  const addToCart = useCartStore((s) => s.addToCart)
  const toggleWish = useCartStore((s) => s.toggleWish)
  const wishlist = useCartStore((s) => s.wishlist)
  const isWished = wishlist.includes(product.id)

  const discount = product.original_price
    ? Math.round((1 - product.price / product.original_price) * 100)
    : null

  return (
    <div className="group bg-white border border-[#eef1f7] rounded-2xl overflow-hidden hover:shadow-xl hover:shadow-[#1e3a8a]/8 transition-all duration-300">
      {/* Image */}
      <Link href={`/san-pham/${product.slug}`} className="block relative">
        <div className="relative h-52 sm:h-60 bg-gradient-to-br from-white to-[#f1f5fc] flex items-center justify-center overflow-hidden">
          {discount && (
            <div className="absolute top-3 left-3 z-10 bg-[#1e3a8a] text-white text-xs font-bold px-2.5 py-1 rounded-full">
              -{discount}%
            </div>
          )}
          <button
            onClick={(e) => { e.preventDefault(); toggleWish(product.id) }}
            className="absolute top-3 right-3 z-10 w-8 h-8 rounded-full bg-white shadow-sm flex items-center justify-center transition-colors hover:bg-red-50"
          >
            <Heart size={15} fill={isWished ? '#e53e3e' : 'none'} className={isWished ? 'text-red-500' : 'text-[#8593ad]'} />
          </button>
          <Image
            src={product.images[0]}
            alt={product.name}
            width={200}
            height={200}
            className="object-contain h-44 w-auto group-hover:scale-105 transition-transform duration-500"
            unoptimized
          />
        </div>
      </Link>

      {/* Info */}
      <div className="p-4">
        <div className="text-[10px] font-semibold tracking-widest text-[#1e3a8a] uppercase mb-1">{product.line}</div>
        <Link href={`/san-pham/${product.slug}`}>
          <h3 className="font-semibold text-[#0f1729] text-base leading-snug hover:text-[#1e3a8a] transition-colors" style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}>
            {product.name}
          </h3>
        </Link>

        {/* Rating */}
        <div className="flex items-center gap-1.5 mt-1.5">
          <span className="text-[#1e3a8a] text-xs tracking-tight">{'★'.repeat(Math.round(product.rating))}</span>
          <span className="text-xs text-[#8593ad]">({product.review_count.toLocaleString()})</span>
        </div>

        {/* Price */}
        <div className="mt-2.5 flex items-baseline gap-2 flex-wrap">
          <span className="text-[#1e3a8a] font-bold text-lg">{formatPrice(product.price)}</span>
          {product.original_price && (
            <span className="text-[#aab2c2] text-sm line-through">{formatPrice(product.original_price)}</span>
          )}
        </div>

        {/* Storages */}
        <div className="flex gap-1.5 mt-3 flex-wrap">
          {product.storages.map((s) => (
            <span key={s.label} className="px-2 py-0.5 text-[10px] font-semibold border border-[#e6eaf2] rounded-full text-[#7c89a3]">
              {s.label}
            </span>
          ))}
        </div>

        {/* Actions */}
        <div className="flex gap-2 mt-3">
          <Link
            href={`/san-pham/${product.slug}`}
            className="flex-1 text-center py-2.5 text-sm font-semibold text-[#0f1729] border border-[#dde2ec] rounded-full hover:bg-[#0f1729] hover:text-white transition-colors"
          >
            Xem chi tiết
          </Link>
          <button
            onClick={() => addToCart(product, 0, 0)}
            className="w-10 h-10 rounded-full bg-[#0f1729] flex items-center justify-center hover:bg-[#1e3a8a] transition-colors flex-none"
            title="Thêm vào giỏ"
          >
            <ShoppingCart size={16} className="text-white" />
          </button>
        </div>
      </div>
    </div>
  )
}
