import Link from 'next/link'
import ProductCard from '@/components/product/ProductCard'
import { mockProducts, trustBadges, reviews, stats, benefits } from '@/lib/mockData'

const serif = { fontFamily: "'Cormorant Garamond',Georgia,serif" }
const center1280 = { maxWidth: 1280, margin: '0 auto', padding: '0 20px', width: '100%' }
const center1100 = { maxWidth: 1100, margin: '0 auto', padding: '0 20px', width: '100%' }

export default function HomePage() {
  const featured = mockProducts.filter((p) => p.featured)

  return (
    <div style={{ background: '#ffffff' }}>

      {/* ─── HERO ─── */}
      <section
        style={{
          position: 'relative',
          overflow: 'hidden',
          background: 'linear-gradient(165deg,#0a0f1e 0%,#12214a 50%,#1a3272 100%)',
        }}
      >
        {/* Background glow blob */}
        <div style={{
          position: 'absolute', top: -120, left: '50%', transform: 'translateX(-50%)',
          width: 900, height: 900, borderRadius: '50%', pointerEvents: 'none',
          background: 'radial-gradient(circle,rgba(80,120,230,.3),transparent 62%)'
        }} />

        {/* Hero text content */}
        <div style={{ ...center1100, paddingTop: 64, paddingBottom: 0, textAlign: 'center', position: 'relative' }}>

          {/* Badge */}
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: 8,
            padding: '6px 18px', borderRadius: 99,
            border: '1px solid rgba(255,255,255,.22)', background: 'rgba(255,255,255,.1)',
            fontSize: 11, fontWeight: 700, letterSpacing: '0.18em', color: '#c5d5f0', textTransform: 'uppercase'
          }}>
            Ra mắt · iPhone 15 Pro Max
          </div>

          {/* Heading */}
          <h1 style={{
            ...serif,
            marginTop: 20,
            fontSize: 'clamp(2.8rem,6.5vw,5.5rem)',
            fontWeight: 600, lineHeight: 1.07,
            letterSpacing: '-0.01em', color: '#ffffff'
          }}>
            Sang trọng được<br />tái định nghĩa.
          </h1>

          {/* Subtext */}
          <p style={{
            marginTop: 20, maxWidth: 480,
            marginLeft: 'auto', marginRight: 'auto',
            fontSize: 16, color: '#b0c4e8', lineHeight: 1.75
          }}>
            Khung Titanium · Chip A17 Pro · Camera 48MP.<br />
            Tinh hoa Apple, phục vụ bởi Du Tú Số To.
          </p>

          {/* CTA buttons */}
          <div style={{ display: 'flex', justifyContent: 'center', gap: 12, marginTop: 32, flexWrap: 'wrap' }}>
            <Link href="/san-pham/iphone-15-pro-max" style={{
              display: 'inline-flex', alignItems: 'center', gap: 8,
              background: '#ffffff', color: '#0a0f1e', borderRadius: 99,
              padding: '13px 34px', fontWeight: 700, fontSize: 14,
              textDecoration: 'none', boxShadow: '0 8px 30px rgba(0,0,0,.3)',
              transition: 'transform .2s'
            }}>
              Đặt mua ngay
            </Link>
            <Link href="/san-pham" style={{
              display: 'inline-flex', alignItems: 'center', gap: 8,
              background: 'rgba(255,255,255,.12)', color: '#ffffff',
              border: '1px solid rgba(255,255,255,.28)', borderRadius: 99,
              padding: '13px 34px', fontWeight: 700, fontSize: 14,
              textDecoration: 'none'
            }}>
              Xem tất cả →
            </Link>
          </div>

          {/* Phone image */}
          <div style={{ position: 'relative', height: 480, marginTop: 24, display: 'flex', justifyContent: 'center', alignItems: 'flex-end' }}>
            {/* Vignette overlay — hides white edges of Apple CDN image */}
            <div style={{
              position: 'absolute', inset: 0, zIndex: 2, pointerEvents: 'none',
              background: 'radial-gradient(ellipse 55% 65% at 50% 42%, transparent 48%, #12214a 82%)'
            }} />
            {/* Glow under phone */}
            <div style={{
              position: 'absolute', bottom: 20, left: '50%', transform: 'translateX(-50%)',
              width: 200, height: 40, borderRadius: '50%', zIndex: 1,
              background: 'radial-gradient(ellipse,rgba(80,130,240,.65),transparent 70%)'
            }} />
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="https://store.storeimages.cdn-apple.com/4668/as-images.apple.com/is/iphone-15-pro-finish-select-202309-6-7inch-naturaltitanium?wid=800&hei=800&fmt=png-alpha&.v=1692845702708"
              alt="iPhone 15 Pro Max"
              className="animate-floaty"
              draggable={false}
              style={{
                height: '100%', width: 'auto', objectFit: 'contain',
                position: 'relative', zIndex: 1, userSelect: 'none',
                filter: 'drop-shadow(0 32px 64px rgba(80,130,240,.55))'
              }}
            />
          </div>
        </div>

        {/* Countdown strip */}
        <div style={{ background: 'rgba(255,255,255,.06)', borderTop: '1px solid rgba(255,255,255,.1)', marginTop: 0 }}>
          <div style={{ ...center1100, paddingTop: 14, paddingBottom: 14, display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 16, flexWrap: 'wrap' }}>
            <span style={{ color: '#b0c4e8', fontSize: 13, fontWeight: 600 }}>Ưu đãi kết thúc sau</span>
            <div style={{ display: 'flex', gap: 8 }}>
              {[['02','NGÀY'],['14','GIỜ'],['37','PHÚT']].map(([n,l]) => (
                <div key={l} style={{ background: 'rgba(255,255,255,.12)', borderRadius: 10, padding: '8px 14px', textAlign: 'center', minWidth: 52 }}>
                  <div style={{ color: '#ffffff', fontWeight: 800, fontSize: 16, lineHeight: 1 }}>{n}</div>
                  <div style={{ color: '#8aa4d8', fontSize: 9, marginTop: 4, letterSpacing: '0.15em' }}>{l}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ─── TRUST BADGES ─── */}
      <section style={{ borderBottom: '1px solid #eef1f7' }}>
        <div style={{ ...center1280, paddingTop: 20, paddingBottom: 20 }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(200px,1fr))', gap: 8 }}>
            {trustBadges.map((b) => (
              <div key={b.title} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '8px 10px' }}>
                <span style={{ fontSize: 24, flexShrink: 0 }}>{b.icon}</span>
                <div>
                  <div style={{ fontWeight: 700, color: '#0a0f1e', fontSize: 13, lineHeight: 1.3 }}>{b.title}</div>
                  <div style={{ fontSize: 11, color: '#8593ad', marginTop: 2 }}>{b.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── FEATURED PRODUCTS ─── */}
      <section style={{ ...center1280, paddingTop: 56, paddingBottom: 56 }}>
        <div style={{ textAlign: 'center', marginBottom: 40 }}>
          <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.18em', color: '#1e3a8a', textTransform: 'uppercase' }}>Bộ sưu tập nổi bật</div>
          <h2 style={{ ...serif, marginTop: 12, fontSize: 'clamp(1.8rem,3vw,2.6rem)', fontWeight: 600, color: '#0a0f1e', lineHeight: 1.15 }}>
            iPhone được yêu thích nhất
          </h2>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(240px,1fr))', gap: 20 }}>
          {featured.map((p) => <ProductCard key={p.id} product={p} />)}
        </div>
        <div style={{ textAlign: 'center', marginTop: 40 }}>
          <Link href="/san-pham" style={{
            display: 'inline-flex', alignItems: 'center', gap: 8,
            border: '2px solid #dde2ec', color: '#0a0f1e', borderRadius: 99,
            padding: '12px 32px', fontSize: 13.5, fontWeight: 700, textDecoration: 'none',
            transition: 'all .2s'
          }}>
            Xem toàn bộ sản phẩm →
          </Link>
        </div>
      </section>

      {/* ─── PROMO BANNER ─── */}
      <section style={{ ...center1280, paddingBottom: 56 }}>
        <div style={{
          position: 'relative', overflow: 'hidden',
          borderRadius: 24, padding: '48px 40px',
          background: 'linear-gradient(135deg,#0a0f1e 0%,#1a3272 100%)',
          display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 32, alignItems: 'center'
        }}
          className="promo-grid"
        >
          <div style={{ position: 'absolute', right: -60, top: -60, width: 280, height: 280, borderRadius: '50%', pointerEvents: 'none', background: 'radial-gradient(circle,rgba(80,120,230,.45),transparent 70%)' }} />
          <div style={{ position: 'relative' }}>
            <div style={{ display: 'inline-block', padding: '6px 14px', borderRadius: 99, background: 'rgba(255,255,255,.12)', fontSize: 11, fontWeight: 700, letterSpacing: '0.14em', color: '#b0c4e8', textTransform: 'uppercase' }}>Thu cũ đổi mới</div>
            <h2 style={{ ...serif, marginTop: 16, fontSize: 'clamp(1.8rem,2.5vw,2.6rem)', fontWeight: 600, color: '#ffffff', lineHeight: 1.2 }}>
              Thu cũ đổi mới<br />trừ giá đến 5 triệu
            </h2>
            <p style={{ marginTop: 16, color: '#8fb0e0', fontSize: 14, lineHeight: 1.7, maxWidth: 340 }}>
              Mang iPhone cũ đến Du Tú Số To và nâng cấp lên iPhone 15 Series với mức trừ giá hấp dẫn nhất thị trường.
            </p>
            <Link href="/khuyen-mai" style={{
              display: 'inline-block', marginTop: 24,
              background: '#ffffff', color: '#0a0f1e', borderRadius: 99,
              padding: '12px 28px', fontSize: 13.5, fontWeight: 700, textDecoration: 'none'
            }}>
              Tìm hiểu ưu đãi
            </Link>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, position: 'relative' }}>
            {[['–15%','iPhone 15 Series'],['0%','Trả góp 6-12 tháng'],['5tr','Trừ giá thu cũ'],['Free','Giao hàng 2h']].map(([n,l]) => (
              <div key={l} style={{ background: 'rgba(255,255,255,.1)', border: '1px solid rgba(255,255,255,.15)', borderRadius: 16, padding: '20px 16px' }}>
                <div style={{ ...serif, fontSize: 26, fontWeight: 700, color: '#ffffff', lineHeight: 1 }}>{n}</div>
                <div style={{ color: '#8fb0e0', fontSize: 12, marginTop: 8, lineHeight: 1.4 }}>{l}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── SOCIAL PROOF ─── */}
      <section style={{ background: '#f7f9fc', borderTop: '1px solid #eef1f7', borderBottom: '1px solid #eef1f7' }}>
        <div style={{ ...center1280, paddingTop: 56, paddingBottom: 56 }}>
          <div style={{ textAlign: 'center', marginBottom: 40 }}>
            <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.18em', color: '#1e3a8a', textTransform: 'uppercase' }}>Khách hàng nói gì</div>
            <h2 style={{ ...serif, marginTop: 12, fontSize: 'clamp(1.8rem,3vw,2.6rem)', fontWeight: 600, color: '#0a0f1e' }}>
              100.000+ khách hàng tin tưởng
            </h2>
          </div>
          {/* Stats */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(160px,1fr))', gap: 24, marginBottom: 48, textAlign: 'center' }}>
            {stats.map((s) => (
              <div key={s.label}>
                <div style={{ ...serif, fontSize: 'clamp(2rem,3vw,2.8rem)', fontWeight: 700, color: '#1a3272' }}>{s.num}</div>
                <div style={{ fontSize: 13, color: '#7c89a3', marginTop: 6 }}>{s.label}</div>
              </div>
            ))}
          </div>
          {/* Reviews */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(280px,1fr))', gap: 20 }}>
            {reviews.map((r) => (
              <div key={r.name} style={{ background: '#ffffff', border: '1px solid #eef1f7', borderRadius: 20, padding: 24 }}>
                <div style={{ color: '#1a3272', letterSpacing: '0.1em', fontSize: 15 }}>{r.stars}</div>
                <p style={{ marginTop: 12, fontSize: 13.5, color: '#33405c', lineHeight: 1.7 }}>{r.text}</p>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginTop: 20 }}>
                  <div style={{ ...serif, width: 38, height: 38, borderRadius: '50%', background: 'linear-gradient(135deg,#1e3a8a,#0a0f1e)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#ffffff', fontWeight: 700, fontSize: 15, flexShrink: 0 }}>
                    {r.initial}
                  </div>
                  <div>
                    <div style={{ fontWeight: 700, fontSize: 13, color: '#0a0f1e' }}>{r.name}</div>
                    <div style={{ fontSize: 11, color: '#9aa6bf', marginTop: 2 }}>Đã mua · {r.date}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── WHY US ─── */}
      <section style={{ ...center1280, paddingTop: 56, paddingBottom: 64 }}>
        <div style={{ textAlign: 'center', marginBottom: 40 }}>
          <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.18em', color: '#1e3a8a', textTransform: 'uppercase' }}>Tại sao chọn chúng tôi</div>
          <h2 style={{ ...serif, marginTop: 12, fontSize: 'clamp(1.8rem,3vw,2.6rem)', fontWeight: 600, color: '#0a0f1e' }}>
            Cam kết từ Du Tú Số To
          </h2>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(240px,1fr))', gap: 20 }}>
          {benefits.map((b) => (
            <div key={b.title} style={{ padding: 24, border: '1px solid #eef1f7', borderRadius: 20, background: '#ffffff' }}>
              <div style={{ width: 44, height: 44, borderRadius: 14, background: '#eef2fb', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#1e3a8a', fontWeight: 700, fontSize: 18 }}>✓</div>
              <div style={{ ...serif, fontWeight: 600, color: '#0a0f1e', marginTop: 16, fontSize: 17, lineHeight: 1.3 }}>{b.title}</div>
              <div style={{ fontSize: 13, color: '#7c89a3', marginTop: 8, lineHeight: 1.7 }}>{b.desc}</div>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
