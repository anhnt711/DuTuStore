'use client'
import Link from 'next/link'
import { Heart, ShoppingCart } from 'lucide-react'
import { useCartStore } from '@/lib/store'
import { formatPrice } from '@/lib/utils'
import type { Product } from '@/lib/types'

const serif = { fontFamily: "'Cormorant Garamond',Georgia,serif" }

interface Props { product: Product }

export default function ProductCard({ product }: Props) {
  const addToCart = useCartStore((s) => s.addToCart)
  const toggleWish = useCartStore((s) => s.toggleWish)
  const wishlist = useCartStore((s) => s.wishlist)
  const isWished = wishlist.includes(product.id)

  const discount = product.original_price
    ? Math.round((1 - product.price / product.original_price) * 100)
    : null

  return (
    <div style={{
      display: 'flex', flexDirection: 'column',
      background: '#ffffff', border: '1px solid #edf0f7',
      borderRadius: 20, overflow: 'hidden',
      transition: 'box-shadow .3s, transform .3s'
    }}
      className="product-card-hover"
    >
      {/* Image area */}
      <Link href={`/san-pham/${product.slug}`} style={{ display: 'block', position: 'relative', textDecoration: 'none' }}>
        <div style={{
          position: 'relative', height: 240,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          overflow: 'hidden',
          background: 'radial-gradient(ellipse 110% 90% at 50% 15%,#ffffff 0%,#eef3fc 55%,#dce6f9 100%)'
        }}>
          {/* Discount badge */}
          {discount && (
            <div style={{
              position: 'absolute', top: 12, left: 12, zIndex: 2,
              background: '#1a3272', color: '#ffffff',
              fontSize: 11, fontWeight: 800,
              padding: '4px 10px', borderRadius: 99
            }}>
              -{discount}%
            </div>
          )}
          {/* Wishlist */}
          <button
            onClick={(e) => { e.preventDefault(); toggleWish(product.id) }}
            style={{
              position: 'absolute', top: 12, right: 12, zIndex: 2,
              width: 34, height: 34, borderRadius: '50%',
              background: 'rgba(255,255,255,.95)',
              border: 'none', cursor: 'pointer',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              boxShadow: '0 2px 8px rgba(0,0,0,.12)'
            }}
          >
            <Heart
              size={15}
              fill={isWished ? '#e53e3e' : 'none'}
              color={isWished ? '#e53e3e' : '#8593ad'}
            />
          </button>
          {/* Product image */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={product.colors[0]?.image || product.images[0]}
            alt={product.name}
            draggable={false}
            className="product-img-hover"
            style={{
              height: 172, width: 'auto', objectFit: 'contain',
              userSelect: 'none', transition: 'transform .5s',
              filter: 'drop-shadow(0 14px 28px rgba(26,50,114,.2))'
            }}
          />
        </div>
      </Link>

      {/* Info */}
      <div style={{ display: 'flex', flexDirection: 'column', flex: 1, padding: '16px 18px 18px' }}>
        {/* Series */}
        <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.16em', color: '#1a3272', textTransform: 'uppercase', marginBottom: 4 }}>
          {product.line}
        </div>
        {/* Name */}
        <Link href={`/san-pham/${product.slug}`} style={{ textDecoration: 'none' }}>
          <h3 style={{ ...serif, fontWeight: 600, color: '#0a0f1e', fontSize: 18, lineHeight: 1.25, margin: 0 }}>
            {product.name}
          </h3>
        </Link>
        {/* Rating */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginTop: 6 }}>
          <span style={{ color: '#1a3272', fontSize: 12 }}>
            {'★'.repeat(Math.round(product.rating))}{'☆'.repeat(5 - Math.round(product.rating))}
          </span>
          <span style={{ fontSize: 11, color: '#8593ad' }}>({product.review_count.toLocaleString()})</span>
        </div>
        {/* Price */}
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 8, marginTop: 12, flexWrap: 'wrap' }}>
          <span style={{ color: '#1a3272', fontWeight: 800, fontSize: 19 }}>{formatPrice(product.price)}</span>
          {product.original_price && (
            <span style={{ color: '#a0aec0', fontSize: 13, textDecoration: 'line-through' }}>{formatPrice(product.original_price)}</span>
          )}
        </div>
        {/* Storage pills */}
        <div style={{ display: 'flex', gap: 6, marginTop: 10, flexWrap: 'wrap' }}>
          {product.storages.map((s) => (
            <span key={s.label} style={{
              padding: '3px 9px', fontSize: 10, fontWeight: 700,
              border: '1px solid #e2e8f4', borderRadius: 99, color: '#7c89a3'
            }}>
              {s.label}
            </span>
          ))}
        </div>
        {/* Spacer */}
        <div style={{ flex: 1 }} />
        {/* Actions */}
        <div style={{ display: 'flex', gap: 8, marginTop: 16 }}>
          <Link href={`/san-pham/${product.slug}`} style={{
            flex: 1, textAlign: 'center',
            padding: '10px 0', fontSize: 13, fontWeight: 700,
            color: '#0a0f1e', border: '2px solid #dde4f0',
            borderRadius: 99, textDecoration: 'none',
            transition: 'all .2s'
          }}
            className="view-btn"
          >
            Xem chi tiết
          </Link>
          <button
            onClick={() => addToCart(product, 0, 0)}
            title="Thêm vào giỏ"
            style={{
              width: 42, height: 42, borderRadius: '50%', flexShrink: 0,
              background: '#0a0f1e', border: 'none', cursor: 'pointer',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              boxShadow: '0 4px 12px rgba(10,15,30,.3)', transition: 'background .2s'
            }}
          >
            <ShoppingCart size={16} color="#ffffff" />
          </button>
        </div>
      </div>
    </div>
  )
}
