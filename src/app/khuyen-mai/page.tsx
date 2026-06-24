import Link from 'next/link'
import ProductCard from '@/components/product/ProductCard'
import { mockProducts } from '@/lib/mockData'

const serif = { fontFamily: "'Cormorant Garamond',Georgia,serif" }
const W = { maxWidth: 1280, margin: '0 auto', padding: '0 20px', width: '100%' }

export default function DealsPage() {
  const deals = mockProducts.filter((p) => p.deal)

  return (
    <div style={{ background: '#fff' }}>

      {/* Hero */}
      <section style={{ position: 'relative', overflow: 'hidden', background: 'linear-gradient(160deg,#0a0f1e 0%,#12214a 55%,#1a3272 100%)' }}>
        <div style={{ position: 'absolute', right: -100, top: -100, width: 500, height: 500, borderRadius: '50%', pointerEvents: 'none', background: 'radial-gradient(circle,rgba(80,120,230,.42),transparent 65%)' }} />
        <div style={{ ...W, paddingTop: 56, paddingBottom: 64, position: 'relative' }}>
          {/* Breadcrumb */}
          <nav style={{ display: 'flex', gap: 8, fontSize: 12, color: '#8fb0e0', marginBottom: 24, alignItems: 'center' }}>
            <Link href="/" style={{ color: '#8fb0e0', textDecoration: 'none' }}>Trang chủ</Link>
            <span>/</span>
            <span style={{ color: '#fff' }}>Khuyến mãi</span>
          </nav>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(300px,1fr))', gap: 40, alignItems: 'center' }}>
            {/* Left text */}
            <div>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '6px 18px', borderRadius: 99, border: '1px solid rgba(255,255,255,.22)', background: 'rgba(255,255,255,.1)', fontSize: 11, fontWeight: 700, letterSpacing: '0.18em', color: '#c5d5f0', textTransform: 'uppercase', marginBottom: 20 }}>
                Ưu đãi hè 2026
              </div>
              <h1 style={{ ...serif, fontSize: 'clamp(2.4rem,5vw,4.5rem)', fontWeight: 600, color: '#fff', lineHeight: 1.1, margin: '0 0 16px' }}>
                Ưu đãi lớn nhất<br />trong năm.
              </h1>
              <p style={{ fontSize: 15, color: '#b0c4e8', lineHeight: 1.75, maxWidth: 420, marginBottom: 32 }}>
                Trừ giá thu cũ đến 5 triệu, trả góp 0%, giảm thêm đến 15% toàn bộ iPhone 15 Series. Số lượng có hạn.
              </p>
              <div style={{ display: 'flex', alignItems: 'center', gap: 20, flexWrap: 'wrap' }}>
                <Link href="/san-pham" style={{ display: 'inline-block', background: '#fff', color: '#0a0f1e', borderRadius: 99, padding: '13px 34px', fontWeight: 700, fontSize: 14, textDecoration: 'none' }}>
                  Mua ngay
                </Link>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, color: '#c5d5f0', fontSize: 13, fontWeight: 600 }}>
                  <span>Kết thúc sau</span>
                  <div style={{ display: 'flex', gap: 6 }}>
                    {[['02','NGÀY'],['14','GIỜ'],['37','PHÚT']].map(([n,l]) => (
                      <div key={l} style={{ background: 'rgba(255,255,255,.12)', borderRadius: 10, padding: '8px 12px', textAlign: 'center', minWidth: 46 }}>
                        <div style={{ color: '#fff', fontWeight: 800, fontSize: 16, lineHeight: 1 }}>{n}</div>
                        <div style={{ color: '#8fb0e0', fontSize: 9, marginTop: 3, letterSpacing: '0.14em' }}>{l}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Right image */}
            <div style={{ position: 'relative', display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: 320 }}>
              <div style={{ position: 'absolute', width: 280, height: 280, borderRadius: '50%', background: 'radial-gradient(circle,rgba(80,120,230,.35),transparent 70%)' }} />
              {/* -15% floating badge */}
              <div style={{ position: 'absolute', top: 30, right: 20, background: '#fff', borderRadius: 18, padding: '12px 16px', boxShadow: '0 10px 40px rgba(0,0,0,.25)', transform: 'rotate(3deg)', zIndex: 2 }}>
                <div style={{ ...serif, fontSize: 26, fontWeight: 700, color: '#1a3272', lineHeight: 1 }}>-15%</div>
                <div style={{ fontSize: 11, color: '#8593ad', marginTop: 4 }}>iPhone 15 Series</div>
              </div>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="https://store.storeimages.cdn-apple.com/4668/as-images.apple.com/is/iphone-15-pro-finish-select-202309-6-7inch-naturaltitanium?wid=600&hei=600&fmt=png-alpha&.v=1692845702708"
                alt="iPhone 15 Pro Max"
                className="animate-floaty"
                style={{ height: 300, width: 'auto', objectFit: 'contain', position: 'relative', zIndex: 1, filter: 'drop-shadow(0 24px 48px rgba(80,130,240,.5))' }}
                draggable={false}
              />
              {/* Vignette */}
              <div style={{ position: 'absolute', inset: 0, zIndex: 3, pointerEvents: 'none', background: 'radial-gradient(ellipse 60% 70% at 50% 45%, transparent 45%, #12214a 82%)' }} />
            </div>
          </div>
        </div>
      </section>

      {/* Deal highlights */}
      <section style={{ background: '#f7f9fc', borderBottom: '1px solid #eef1f7' }}>
        <div style={{ ...W, paddingTop: 32, paddingBottom: 32 }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(200px,1fr))', gap: 16 }}>
            {[
              { n: '–15%', l: 'iPhone 15 Series' },
              { n: '0%', l: 'Trả góp 6-12 tháng' },
              { n: '5tr', l: 'Trừ giá thu cũ' },
              { n: 'Free', l: 'Giao hàng 2h' },
            ].map((d) => (
              <div key={d.l} style={{ textAlign: 'center', padding: '20px 16px', background: '#fff', border: '1px solid #eef1f7', borderRadius: 18 }}>
                <div style={{ ...serif, fontSize: 32, fontWeight: 700, color: '#1a3272' }}>{d.n}</div>
                <div style={{ fontSize: 13, color: '#7c89a3', marginTop: 8 }}>{d.l}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Deal products */}
      <section style={{ ...W, paddingTop: 56, paddingBottom: 48 }}>
        <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.18em', color: '#1a3272', textTransform: 'uppercase', marginBottom: 8 }}>Chương trình đang diễn ra</div>
        <h2 style={{ ...serif, fontSize: 'clamp(1.8rem,3vw,2.6rem)', fontWeight: 600, color: '#0a0f1e', marginBottom: 32 }}>
          Sản phẩm đang khuyến mãi
        </h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(230px,1fr))', gap: 20 }}>
          {deals.map((p) => <ProductCard key={p.id} product={p} />)}
        </div>
      </section>

      {/* Trade-in banner */}
      <section style={{ ...W, paddingBottom: 64 }}>
        <div style={{ background: '#fff', border: '1px solid #eef1f7', borderRadius: 24, overflow: 'hidden', display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(280px,1fr))' }}>
          <div style={{ padding: '40px 40px' }}>
            <div style={{ display: 'inline-block', padding: '5px 14px', borderRadius: 99, background: '#eef2fb', fontSize: 11, fontWeight: 700, letterSpacing: '0.14em', color: '#1a3272', textTransform: 'uppercase', marginBottom: 20 }}>
              Thu cũ đổi mới
            </div>
            <h2 style={{ ...serif, fontSize: 'clamp(1.8rem,2.5vw,2.4rem)', fontWeight: 600, color: '#0a0f1e', lineHeight: 1.2, marginBottom: 20 }}>
              Đổi iPhone cũ<br />nhận ưu đãi khủng
            </h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 28 }}>
              {['Định giá cao nhất thị trường','Xử lý trong 15 phút','Bảo mật dữ liệu 100%','Nhận thêm ưu đãi khi mua mới'].map((item) => (
                <div key={item} style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: 14, color: '#33405c' }}>
                  <div style={{ width: 22, height: 22, borderRadius: '50%', background: '#eef2fb', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#1a3272', fontSize: 11, fontWeight: 800, flexShrink: 0 }}>✓</div>
                  {item}
                </div>
              ))}
            </div>
            <Link href="/ve-chung-toi" style={{ display: 'inline-block', background: '#0a0f1e', color: '#fff', borderRadius: 99, padding: '12px 28px', fontSize: 14, fontWeight: 700, textDecoration: 'none' }}>
              Liên hệ tư vấn →
            </Link>
          </div>
          <div style={{ background: 'linear-gradient(135deg,#eef2fb,#dce6f7)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 40, minHeight: 220 }}>
            <div style={{ textAlign: 'center' }}>
              <div style={{ ...serif, fontSize: 72, fontWeight: 700, color: '#1a3272', lineHeight: 1 }}>5tr</div>
              <div style={{ color: '#8593ad', fontSize: 14, marginTop: 8 }}>Trừ tối đa từ giá iPhone mới</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
