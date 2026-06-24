import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="bg-[#0f1729] text-white mt-auto">
      <div className="max-w-screen-xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#5b8def] to-[#1e3a8a] flex items-center justify-center text-white font-bold text-lg" style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}>
                D
              </div>
              <span className="font-bold text-lg" style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}>Du Tú Số To</span>
            </div>
            <p className="text-[#8593ad] text-sm leading-relaxed">
              Cửa hàng Apple ủy quyền chính hãng. Cam kết chất lượng, giá tốt nhất thị trường.
            </p>
            <div className="flex gap-3 mt-4">
              {['FB', 'IG', 'YT', 'TK'].map((s) => (
                <div key={s} className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-xs font-bold text-[#8593ad] hover:bg-[#1e3a8a] hover:text-white cursor-pointer transition-colors">
                  {s}
                </div>
              ))}
            </div>
          </div>

          {/* Products */}
          <div>
            <h3 className="font-semibold text-sm tracking-widest uppercase text-[#8593ad] mb-4">Sản phẩm</h3>
            <ul className="space-y-2.5 text-sm text-[#b9c6e6]">
              {['iPhone 15 Series', 'iPhone 14 Series', 'iPhone 13 Series', 'iPhone SE', 'Phụ kiện'].map((item) => (
                <li key={item}>
                  <Link href="/san-pham" className="hover:text-white transition-colors">{item}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="font-semibold text-sm tracking-widest uppercase text-[#8593ad] mb-4">Hỗ trợ</h3>
            <ul className="space-y-2.5 text-sm text-[#b9c6e6]">
              {['Chính sách bảo hành', 'Chính sách đổi trả', 'Hướng dẫn mua hàng', 'Tra cứu đơn hàng', 'Liên hệ'].map((item) => (
                <li key={item}>
                  <span className="hover:text-white transition-colors cursor-pointer">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-semibold text-sm tracking-widest uppercase text-[#8593ad] mb-4">Liên hệ</h3>
            <ul className="space-y-3 text-sm text-[#b9c6e6]">
              <li className="flex items-start gap-2">
                <span>📍</span>
                <span>123 Nguyễn Huệ, Quận 1, TP.HCM</span>
              </li>
              <li className="flex items-center gap-2">
                <span>📞</span>
                <a href="tel:1800xxxx" className="hover:text-white transition-colors">1800 xxxx (miễn phí)</a>
              </li>
              <li className="flex items-center gap-2">
                <span>✉️</span>
                <a href="mailto:hello@dutu.vn" className="hover:text-white transition-colors">hello@dutu.vn</a>
              </li>
              <li className="flex items-center gap-2">
                <span>🕐</span>
                <span>8:00 – 22:00 hàng ngày</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 mt-10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-[#8593ad]">
          <p>© 2025 Du Tú Số To. Tất cả quyền được bảo lưu.</p>
          <p>Apple, iPhone là thương hiệu của Apple Inc.</p>
        </div>
      </div>
    </footer>
  )
}
