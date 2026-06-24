import Link from 'next/link'
import Image from 'next/image'
import ProductCard from '@/components/product/ProductCard'
import { mockProducts } from '@/lib/mockData'
import { formatPrice } from '@/lib/utils'

export default function DealsPage() {
  const deals = mockProducts.filter((p) => p.deal)

  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden" style={{ background: 'linear-gradient(160deg,#0f1729 0%,#1a2c5e 58%,#1e3a8a 100%)' }}>
        <div className="absolute right-[-120px] top-[-120px] w-[520px] h-[520px] rounded-full" style={{ background: 'radial-gradient(circle,rgba(91,141,239,.42),transparent 65%)' }} />
        <div className="relative max-w-screen-xl mx-auto px-4 py-14">
          <nav className="text-xs text-[#9bb0e0] mb-6 flex gap-2">
            <Link href="/" className="hover:text-white">Trang chủ</Link>
            <span>/</span>
            <span className="text-white">Khuyến mãi</span>
          </nav>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/20 bg-white/10 text-xs font-semibold tracking-widest text-[#cdd9f5] uppercase mb-5">
                Ưu đãi hè 2026
              </div>
              <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-semibold text-white leading-tight">
                Ưu đãi lớn nhất<br />trong năm.
              </h1>
              <p className="mt-4 text-[#b9c6e6] text-sm leading-relaxed max-w-md">
                Trừ giá thu cũ đến 5 triệu, trả góp 0%, giảm thêm đến 15% toàn bộ iPhone 15 Series. Số lượng có hạn – nhanh tay sở hữu.
              </p>
              <div className="flex items-center gap-4 mt-8 flex-wrap">
                <Link href="/san-pham" className="bg-white text-[#0f1729] rounded-full px-7 py-3.5 font-semibold text-sm hover:-translate-y-0.5 transition-transform">
                  Mua ngay
                </Link>
                <div className="flex items-center gap-3 text-[#cdd9f5] text-sm font-semibold">
                  <span>Kết thúc sau</span>
                  <div className="flex gap-1.5">
                    {[['02', 'NGÀY'], ['14', 'GIỜ'], ['37', 'PHÚT']].map(([n, l]) => (
                      <div key={l} className="bg-white/10 rounded-lg px-2.5 py-2 text-center">
                        <div className="text-white font-bold">{n}</div>
                        <div className="text-[#9bb0e0] text-[9px] mt-0.5">{l}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            <div className="relative flex justify-center">
              <div className="absolute w-72 h-72 rounded-full" style={{ background: 'radial-gradient(circle,rgba(91,141,239,.35),transparent 70%)' }} />
              <Image
                src="https://store.storeimages.cdn-apple.com/4668/as-images.apple.com/is/iphone-15-pro-finish-select-202309-6-7inch-naturaltitanium?wid=800&hei=800&fmt=png-alpha&.v=1692845702708"
                alt="iPhone 15 Pro Max"
                width={240}
                height={240}
                className="relative object-contain animate-floaty"
                style={{ filter: 'drop-shadow(0 30px 60px rgba(91,141,239,.5))' }}
                unoptimized
              />
              <div className="absolute top-6 right-4 bg-white rounded-2xl p-4 shadow-2xl rotate-3">
                <div className="font-serif text-2xl font-bold text-[#1e3a8a]">-15%</div>
                <div className="text-xs text-[#8593ad] mt-1">iPhone 15 Series</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Deal highlights */}
      <section className="bg-[#f7f9fc] border-b border-[#eef1f7]">
        <div className="max-w-screen-xl mx-auto px-4 py-8 grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { n: '–15%', l: 'iPhone 15 Series' },
            { n: '0%', l: 'Trả góp 6-12 tháng' },
            { n: '5tr', l: 'Trừ giá thu cũ' },
            { n: 'Free', l: 'Giao hàng 2h' },
          ].map((d) => (
            <div key={d.l} className="text-center p-5 bg-white border border-[#eef1f7] rounded-2xl">
              <div className="font-serif text-3xl font-bold text-[#1e3a8a]">{d.n}</div>
              <div className="text-sm text-[#7c89a3] mt-2">{d.l}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Deal products */}
      <section className="max-w-screen-xl mx-auto px-4 py-12">
        <div className="text-xs font-semibold tracking-widest text-[#1e3a8a] uppercase mb-2">Chương trình đang diễn ra</div>
        <h2 className="font-serif text-3xl sm:text-4xl font-semibold text-[#0f1729] mb-8">Sản phẩm đang khuyến mãi</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {deals.map((p) => <ProductCard key={p.id} product={p} />)}
        </div>
      </section>

      {/* Trade-in banner */}
      <section className="max-w-screen-xl mx-auto px-4 pb-14">
        <div className="bg-white border border-[#eef1f7] rounded-3xl overflow-hidden grid grid-cols-1 md:grid-cols-2 gap-0">
          <div className="p-8 sm:p-12">
            <div className="inline-block px-3 py-1.5 rounded-full bg-[#eef2fb] text-xs font-semibold tracking-widest text-[#1e3a8a] uppercase mb-5">
              Thu cũ đổi mới
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl font-semibold text-[#0f1729] leading-tight">
              Đổi iPhone cũ<br />nhận ưu đãi khủng
            </h2>
            <ul className="mt-5 space-y-3 text-sm text-[#33405c]">
              {['Định giá cao nhất thị trường', 'Xử lý trong 15 phút', 'Bảo mật dữ liệu 100%', 'Nhận thêm ưu đãi khi mua mới'].map((item) => (
                <li key={item} className="flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-[#eef2fb] flex items-center justify-center text-[#1e3a8a] text-xs font-bold flex-none">✓</span>
                  {item}
                </li>
              ))}
            </ul>
            <Link href="/ve-chung-toi" className="inline-block mt-6 bg-[#0f1729] text-white rounded-full px-7 py-3 text-sm font-semibold hover:bg-[#1e3a8a] transition-colors">
              Liên hệ tư vấn →
            </Link>
          </div>
          <div className="bg-gradient-to-br from-[#eef2fb] to-[#dce6f7] flex items-center justify-center p-8 min-h-[220px]">
            <div className="text-center">
              <div className="font-serif text-6xl sm:text-7xl font-bold text-[#1e3a8a]">5tr</div>
              <div className="text-[#8593ad] text-sm mt-2">Trừ tối đa từ giá iPhone mới</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
