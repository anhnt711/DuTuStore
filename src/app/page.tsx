import Link from 'next/link'
import Image from 'next/image'
import ProductCard from '@/components/product/ProductCard'
import { mockProducts, trustBadges, reviews, stats, benefits } from '@/lib/mockData'

export default function HomePage() {
  const featured = mockProducts.filter((p) => p.featured)

  return (
    <div className="flex flex-col">
      {/* HERO */}
      <section className="relative overflow-hidden" style={{ background: 'linear-gradient(165deg,#0f1729 0%,#1a2c5e 60%,#1e3a8a 100%)' }}>
        {/* Glow */}
        <div className="absolute top-[-120px] left-1/2 -translate-x-1/2 w-[680px] h-[680px] rounded-full" style={{ background: 'radial-gradient(circle,rgba(91,141,239,.4),transparent 65%)' }} />

        <div className="relative max-w-screen-lg mx-auto px-4 pt-16 pb-0 text-center animate-fadeup">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/20 bg-white/10 text-xs font-semibold tracking-widest text-[#cdd9f5] uppercase">
            Ra mắt · iPhone 15 Pro Max
          </div>

          <h1 className="font-serif mt-6 text-4xl sm:text-6xl md:text-7xl font-semibold text-white leading-tight tracking-tight">
            Sang trọng được<br />tái định nghĩa.
          </h1>

          <p className="mt-5 max-w-lg mx-auto text-base sm:text-lg text-[#b9c6e6] leading-relaxed">
            Khung Titanium. Chip A17 Pro. Camera 48MP. Tinh hoa Apple, phục vụ bởi Du Tú Số To với trải nghiệm đẳng cấp.
          </p>

          <div className="flex items-center justify-center gap-3 mt-8 flex-wrap">
            <Link href="/san-pham/iphone-15-pro-max" className="bg-white text-[#0f1729] rounded-full px-8 py-4 font-semibold text-sm hover:-translate-y-0.5 transition-transform">
              Đặt mua ngay
            </Link>
            <Link href="/san-pham" className="bg-white/10 text-white border border-white/25 rounded-full px-8 py-4 font-semibold text-sm hover:bg-white/20 transition-colors">
              Xem tất cả
            </Link>
          </div>

          {/* Phone image */}
          <div className="flex justify-center mt-8">
            <Image
              src="https://store.storeimages.cdn-apple.com/4668/as-images.apple.com/is/iphone-15-pro-finish-select-202309-6-7inch-naturaltitanium?wid=800&hei=800&fmt=png-alpha&.v=1692845702708"
              alt="iPhone 15 Pro Max"
              width={260}
              height={260}
              className="object-contain animate-floaty"
              style={{ filter: 'drop-shadow(0 30px 70px rgba(91,141,239,.5))' }}
              unoptimized
            />
          </div>
        </div>

        {/* Countdown band */}
        <div className="bg-white/5 border-t border-white/10 mt-0">
          <div className="max-w-screen-lg mx-auto px-4 py-4 flex items-center justify-center gap-6 flex-wrap text-[#cdd9f5] text-sm font-semibold">
            <span>Ưu đãi kết thúc sau</span>
            <div className="flex gap-2">
              {[['02', 'NGÀY'], ['14', 'GIỜ'], ['37', 'PHÚT']].map(([n, l]) => (
                <div key={l} className="bg-white/10 rounded-lg px-3 py-2 text-center">
                  <div className="text-white font-bold">{n}</div>
                  <div className="text-[#9bb0e0] text-[9px] mt-0.5">{l}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* TRUST BADGES */}
      <section className="border-b border-[#eef1f7]">
        <div className="max-w-screen-xl mx-auto px-4 py-5 grid grid-cols-2 md:grid-cols-4 gap-4">
          {trustBadges.map((b) => (
            <div key={b.title} className="flex items-center gap-3 py-1">
              <span className="text-2xl flex-none">{b.icon}</span>
              <div>
                <div className="font-semibold text-[#0f1729] text-sm">{b.title}</div>
                <div className="text-xs text-[#8593ad] mt-0.5">{b.desc}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* FEATURED PRODUCTS */}
      <section className="max-w-screen-xl mx-auto px-4 py-14">
        <div className="text-center mb-10">
          <div className="text-xs font-semibold tracking-widest text-[#1e3a8a] uppercase">Bộ sưu tập nổi bật</div>
          <h2 className="font-serif mt-3 text-3xl sm:text-4xl font-semibold text-[#0f1729]">iPhone được yêu thích nhất</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {featured.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
        <div className="text-center mt-8">
          <Link href="/san-pham" className="inline-flex items-center gap-2 border border-[#dde2ec] text-[#0f1729] rounded-full px-7 py-3 text-sm font-semibold hover:bg-[#0f1729] hover:text-white transition-colors">
            Xem toàn bộ sản phẩm →
          </Link>
        </div>
      </section>

      {/* PROMO BANNER */}
      <section className="max-w-screen-xl mx-auto px-4 pb-14">
        <div className="relative overflow-hidden rounded-2xl sm:rounded-3xl p-8 sm:p-12 grid grid-cols-1 md:grid-cols-2 gap-8 items-center" style={{ background: 'linear-gradient(135deg,#0f1729,#1e3a8a)' }}>
          <div className="absolute right-[-60px] top-[-60px] w-72 h-72 rounded-full" style={{ background: 'radial-gradient(circle,rgba(91,141,239,.45),transparent 70%)' }} />
          <div className="relative">
            <div className="inline-block px-3 py-1.5 rounded-full bg-white/15 text-xs font-semibold tracking-widest text-[#cdd9f5] uppercase">
              Thu cũ đổi mới
            </div>
            <h2 className="font-serif mt-4 text-3xl sm:text-4xl font-semibold text-white leading-tight">
              Thu cũ đổi mới<br />trừ giá đến 5 triệu
            </h2>
            <p className="mt-4 text-[#b9c6e6] text-sm leading-relaxed max-w-sm">
              Mang iPhone cũ đến Du Tú Số To và nâng cấp lên iPhone 15 Series với mức trừ giá hấp dẫn nhất thị trường.
            </p>
            <Link href="/khuyen-mai" className="inline-block mt-6 bg-white text-[#0f1729] rounded-full px-7 py-3 text-sm font-semibold hover:-translate-y-0.5 transition-transform">
              Tìm hiểu ưu đãi
            </Link>
          </div>
          <div className="relative grid grid-cols-2 gap-3">
            {[['–15%', 'iPhone 15 Series'], ['0%', 'Trả góp 6-12 tháng'], ['5tr', 'Trừ giá thu cũ'], ['Free', 'Giao hàng 2h']].map(([n, l]) => (
              <div key={l} className="bg-white/10 border border-white/15 rounded-2xl p-5">
                <div className="font-serif text-2xl font-bold text-white">{n}</div>
                <div className="text-[#b9c6e6] text-xs mt-2">{l}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SOCIAL PROOF */}
      <section className="bg-[#f7f9fc] border-y border-[#eef1f7]">
        <div className="max-w-screen-xl mx-auto px-4 py-14">
          <div className="text-center mb-10">
            <div className="text-xs font-semibold tracking-widest text-[#1e3a8a] uppercase">Khách hàng nói gì</div>
            <h2 className="font-serif mt-3 text-3xl sm:text-4xl font-semibold text-[#0f1729]">100.000+ khách hàng tin tưởng</h2>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-10">
            {stats.map((s) => (
              <div key={s.label} className="text-center">
                <div className="font-serif text-3xl sm:text-4xl font-bold text-[#1e3a8a]">{s.num}</div>
                <div className="text-sm text-[#7c89a3] mt-2">{s.label}</div>
              </div>
            ))}
          </div>

          {/* Reviews */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {reviews.map((r) => (
              <div key={r.name} className="bg-white border border-[#eef1f7] rounded-2xl p-6 shadow-sm">
                <div className="text-[#1e3a8a] tracking-widest text-sm">{r.stars}</div>
                <p className="mt-3 text-sm text-[#33405c] leading-relaxed">{r.text}</p>
                <div className="flex items-center gap-3 mt-5">
                  <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[#1e3a8a] to-[#0f1729] flex items-center justify-center text-white font-bold text-sm font-serif flex-none">
                    {r.initial}
                  </div>
                  <div>
                    <div className="font-semibold text-sm text-[#0f1729]">{r.name}</div>
                    <div className="text-xs text-[#9aa6bf] mt-0.5">Đã mua hàng · {r.date}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WHY US */}
      <section className="max-w-screen-xl mx-auto px-4 py-14">
        <div className="text-center mb-10">
          <div className="text-xs font-semibold tracking-widest text-[#1e3a8a] uppercase">Tại sao chọn chúng tôi</div>
          <h2 className="font-serif mt-3 text-3xl sm:text-4xl font-semibold text-[#0f1729]">Cam kết từ Du Tú Số To</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {benefits.map((b) => (
            <div key={b.title} className="p-6 border border-[#eef1f7] rounded-2xl bg-white hover:shadow-md transition-shadow">
              <div className="w-11 h-11 rounded-xl bg-[#eef2fb] flex items-center justify-center text-[#1e3a8a] font-bold font-serif text-lg">
                {b.key}
              </div>
              <div className="font-semibold text-[#0f1729] mt-4 text-base font-serif">{b.title}</div>
              <div className="text-sm text-[#7c89a3] mt-2 leading-relaxed">{b.desc}</div>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
