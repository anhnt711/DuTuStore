import Link from 'next/link'

export default function AboutPage() {
  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden" style={{ background: 'linear-gradient(165deg,#0f1729 0%,#1a2c5e 60%,#1e3a8a 100%)' }}>
        <div className="absolute top-[-80px] left-1/2 -translate-x-1/2 w-[500px] h-[500px] rounded-full" style={{ background: 'radial-gradient(circle,rgba(91,141,239,.35),transparent 65%)' }} />
        <div className="relative max-w-screen-xl mx-auto px-4 py-16 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/20 bg-white/10 text-xs font-semibold tracking-widest text-[#cdd9f5] uppercase mb-5">
            Về chúng tôi
          </div>
          <h1 className="font-serif text-4xl sm:text-6xl font-semibold text-white leading-tight">
            Đơn giản hóa việc<br />sở hữu iPhone.
          </h1>
          <p className="mt-5 max-w-xl mx-auto text-[#b9c6e6] text-sm sm:text-base leading-relaxed">
            Du Tú Số To được thành lập với sứ mệnh mang iPhone chính hãng đến tay mọi người với giá tốt nhất, dịch vụ chuyên nghiệp nhất.
          </p>
        </div>
      </section>

      {/* Story */}
      <section className="max-w-screen-xl mx-auto px-4 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <div className="text-xs font-semibold tracking-widest text-[#1e3a8a] uppercase mb-3">Câu chuyện của chúng tôi</div>
            <h2 className="font-serif text-3xl sm:text-4xl font-semibold text-[#0f1729] leading-tight mb-5">
              5 năm phục vụ<br />hàng trăm nghìn khách hàng
            </h2>
            <p className="text-[#7c89a3] text-sm leading-relaxed mb-4">
              Được thành lập năm 2019, Du Tú Số To bắt đầu với một cửa hàng nhỏ tại TP.HCM với tâm nguyện đơn giản: mang đến trải nghiệm mua iPhone thật sự đáng tin cậy.
            </p>
            <p className="text-[#7c89a3] text-sm leading-relaxed mb-4">
              Sau 5 năm, chúng tôi đã phục vụ hơn 100.000 khách hàng trên toàn quốc, với đội ngũ 50+ chuyên gia và 3 cửa hàng tại các thành phố lớn.
            </p>
            <p className="text-[#7c89a3] text-sm leading-relaxed">
              Mỗi chiếc iPhone đến tay khách hàng là một cam kết về chất lượng và sự tin tưởng mà chúng tôi không ngừng vun đắp.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {[
              { n: '100K+', l: 'Khách hàng', sub: 'Trên toàn quốc' },
              { n: '5 năm', l: 'Kinh nghiệm', sub: 'Từ năm 2019' },
              { n: '50+', l: 'Chuyên gia', sub: 'Đội ngũ tư vấn' },
              { n: '4.9★', l: 'Đánh giá', sub: 'Trung bình Google' },
            ].map((s) => (
              <div key={s.l} className="p-6 border border-[#eef1f7] rounded-2xl text-center">
                <div className="font-serif text-3xl font-bold text-[#1e3a8a]">{s.n}</div>
                <div className="font-semibold text-[#0f1729] text-sm mt-2">{s.l}</div>
                <div className="text-xs text-[#9aa6bf] mt-1">{s.sub}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="bg-[#f7f9fc] border-y border-[#eef1f7]">
        <div className="max-w-screen-xl mx-auto px-4 py-14">
          <div className="text-center mb-10">
            <div className="text-xs font-semibold tracking-widest text-[#1e3a8a] uppercase mb-2">Giá trị cốt lõi</div>
            <h2 className="font-serif text-3xl sm:text-4xl font-semibold text-[#0f1729]">Những điều chúng tôi cam kết</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {[
              { icon: '🔒', title: 'Chính hãng 100%', desc: 'Tất cả sản phẩm đều có tem Apple VN/A và đầy đủ giấy tờ bảo hành chính hãng.' },
              { icon: '💰', title: 'Giá cạnh tranh', desc: 'Cam kết hoàn tiền 100% nếu bạn tìm thấy nơi bán rẻ hơn trong vòng 7 ngày.' },
              { icon: '⚡', title: 'Giao hàng nhanh', desc: 'Giao hàng trong 2 giờ nội thành TP.HCM, Hà Nội, Đà Nẵng. Toàn quốc 1-2 ngày.' },
              { icon: '🤝', title: 'Tư vấn tận tâm', desc: 'Đội ngũ 50+ chuyên gia sẵn sàng hỗ trợ 24/7 qua điện thoại, chat và tại cửa hàng.' },
              { icon: '🔄', title: 'Đổi trả dễ dàng', desc: 'Đổi trả trong 30 ngày không cần lý do. Hoàn tiền 100% nếu không hài lòng.' },
              { icon: '🛡️', title: 'Bảo mật tuyệt đối', desc: 'Xóa sạch dữ liệu thiết bị cũ trước khi xử lý, bảo vệ quyền riêng tư của bạn.' },
            ].map((v) => (
              <div key={v.title} className="p-6 bg-white border border-[#eef1f7] rounded-2xl">
                <div className="text-3xl mb-4">{v.icon}</div>
                <h3 className="font-semibold text-[#0f1729] font-serif text-lg">{v.title}</h3>
                <p className="text-sm text-[#7c89a3] mt-2 leading-relaxed">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact */}
      <section className="max-w-screen-xl mx-auto px-4 py-14">
        <div className="text-center mb-10">
          <div className="text-xs font-semibold tracking-widest text-[#1e3a8a] uppercase mb-2">Liên hệ</div>
          <h2 className="font-serif text-3xl sm:text-4xl font-semibold text-[#0f1729]">Chúng tôi ở đây để giúp bạn</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-10">
          {[
            { icon: '📞', title: 'Hotline', info: '1800 xxxx', sub: 'Miễn phí · 8:00-22:00' },
            { icon: '✉️', title: 'Email', info: 'hello@dutu.vn', sub: 'Trả lời trong 2 giờ' },
            { icon: '💬', title: 'Live Chat', info: 'Chat ngay', sub: 'Sẵn sàng 24/7' },
          ].map((c) => (
            <div key={c.title} className="text-center p-8 border border-[#eef1f7] rounded-2xl hover:shadow-md transition-shadow">
              <div className="text-4xl mb-4">{c.icon}</div>
              <div className="font-semibold text-[#0f1729] font-serif text-lg">{c.title}</div>
              <div className="text-[#1e3a8a] font-semibold text-sm mt-2">{c.info}</div>
              <div className="text-xs text-[#9aa6bf] mt-1">{c.sub}</div>
            </div>
          ))}
        </div>

        {/* Stores */}
        <div className="bg-[#f7f9fc] border border-[#eef1f7] rounded-2xl p-6 sm:p-8">
          <h3 className="font-serif text-2xl font-semibold text-[#0f1729] mb-5">Hệ thống cửa hàng</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {[
              { city: 'TP. Hồ Chí Minh', addr: '123 Nguyễn Huệ, Quận 1', time: '8:00 – 22:00' },
              { city: 'Hà Nội', addr: '45 Hàng Bài, Hoàn Kiếm', time: '8:00 – 22:00' },
              { city: 'Đà Nẵng', addr: '89 Trần Phú, Hải Châu', time: '8:00 – 21:00' },
            ].map((s) => (
              <div key={s.city} className="bg-white border border-[#eef1f7] rounded-xl p-5">
                <div className="font-semibold text-[#0f1729] font-serif">{s.city}</div>
                <div className="text-sm text-[#7c89a3] mt-2">📍 {s.addr}</div>
                <div className="text-sm text-[#7c89a3] mt-1">🕐 {s.time}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-screen-xl mx-auto px-4 pb-14">
        <div className="relative overflow-hidden rounded-3xl p-10 sm:p-14 text-center" style={{ background: 'linear-gradient(135deg,#0f1729,#1e3a8a)' }}>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full" style={{ background: 'radial-gradient(circle,rgba(91,141,239,.25),transparent 70%)' }} />
          <div className="relative">
            <h2 className="font-serif text-3xl sm:text-4xl font-semibold text-white">Sẵn sàng nâng cấp iPhone?</h2>
            <p className="mt-3 text-[#b9c6e6] text-sm max-w-md mx-auto">Khám phá bộ sưu tập iPhone chính hãng với ưu đãi độc quyền chỉ có tại Du Tú Số To.</p>
            <Link href="/san-pham" className="inline-block mt-6 bg-white text-[#0f1729] rounded-full px-8 py-3.5 font-semibold text-sm hover:-translate-y-0.5 transition-transform">
              Khám phá ngay →
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
