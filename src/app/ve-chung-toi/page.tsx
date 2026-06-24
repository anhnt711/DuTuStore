import Link from 'next/link'

const serif = { fontFamily: "'Cormorant Garamond',Georgia,serif" }
const W = { maxWidth: 1280, margin: '0 auto', padding: '0 20px', width: '100%' }

export default function AboutPage() {
  return (
    <div style={{ background: '#fff' }}>

      {/* Hero */}
      <section style={{ position: 'relative', overflow: 'hidden', background: 'linear-gradient(165deg,#0a0f1e 0%,#12214a 55%,#1a3272 100%)' }}>
        <div style={{ position: 'absolute', top: -80, left: '50%', transform: 'translateX(-50%)', width: 500, height: 500, borderRadius: '50%', pointerEvents: 'none', background: 'radial-gradient(circle,rgba(80,120,230,.35),transparent 65%)' }} />
        <div style={{ ...W, paddingTop: 64, paddingBottom: 64, textAlign: 'center', position: 'relative' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '6px 18px', borderRadius: 99, border: '1px solid rgba(255,255,255,.22)', background: 'rgba(255,255,255,.1)', fontSize: 11, fontWeight: 700, letterSpacing: '0.18em', color: '#c5d5f0', textTransform: 'uppercase', marginBottom: 20 }}>
            Về chúng tôi
          </div>
          <h1 style={{ ...serif, fontSize: 'clamp(2.4rem,5.5vw,4.5rem)', fontWeight: 600, color: '#fff', lineHeight: 1.1, margin: 0 }}>
            Đơn giản hóa việc<br />sở hữu iPhone.
          </h1>
          <p style={{ marginTop: 20, maxWidth: 520, marginLeft: 'auto', marginRight: 'auto', color: '#b0c4e8', fontSize: 16, lineHeight: 1.75 }}>
            Du Tú Số To được thành lập với sứ mệnh mang iPhone chính hãng đến tay mọi người với giá tốt nhất, dịch vụ chuyên nghiệp nhất.
          </p>
        </div>
      </section>

      {/* Story + Stats */}
      <section style={{ ...W, paddingTop: 64, paddingBottom: 64 }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(300px,1fr))', gap: 48, alignItems: 'center' }}>
          <div>
            <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.18em', color: '#1a3272', textTransform: 'uppercase', marginBottom: 12 }}>Câu chuyện của chúng tôi</div>
            <h2 style={{ ...serif, fontSize: 'clamp(1.8rem,3vw,2.6rem)', fontWeight: 600, color: '#0a0f1e', lineHeight: 1.2, marginBottom: 20 }}>
              5 năm phục vụ<br />hàng trăm nghìn khách hàng
            </h2>
            {['Được thành lập năm 2019, Du Tú Số To bắt đầu với một cửa hàng nhỏ tại TP.HCM với tâm nguyện đơn giản: mang đến trải nghiệm mua iPhone thật sự đáng tin cậy.',
              'Sau 5 năm, chúng tôi đã phục vụ hơn 100.000 khách hàng trên toàn quốc, với đội ngũ 50+ chuyên gia và 3 cửa hàng tại các thành phố lớn.',
              'Mỗi chiếc iPhone đến tay khách hàng là một cam kết về chất lượng và sự tin tưởng mà chúng tôi không ngừng vun đắp.'
            ].map((text, i) => (
              <p key={i} style={{ fontSize: 14, color: '#7c89a3', lineHeight: 1.8, marginBottom: 14 }}>{text}</p>
            ))}
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
            {[
              { n: '100K+', l: 'Khách hàng', sub: 'Trên toàn quốc' },
              { n: '5 năm', l: 'Kinh nghiệm', sub: 'Từ năm 2019' },
              { n: '50+', l: 'Chuyên gia', sub: 'Đội ngũ tư vấn' },
              { n: '4.9★', l: 'Đánh giá', sub: 'Trung bình Google' },
            ].map((s) => (
              <div key={s.l} style={{ padding: '24px 20px', border: '1px solid #eef1f7', borderRadius: 18, textAlign: 'center', background: '#fff' }}>
                <div style={{ ...serif, fontSize: 30, fontWeight: 700, color: '#1a3272' }}>{s.n}</div>
                <div style={{ fontWeight: 700, color: '#0a0f1e', fontSize: 14, marginTop: 8 }}>{s.l}</div>
                <div style={{ fontSize: 12, color: '#9aa6bf', marginTop: 4 }}>{s.sub}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section style={{ background: '#f7f9fc', borderTop: '1px solid #eef1f7', borderBottom: '1px solid #eef1f7' }}>
        <div style={{ ...W, paddingTop: 56, paddingBottom: 56 }}>
          <div style={{ textAlign: 'center', marginBottom: 40 }}>
            <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.18em', color: '#1a3272', textTransform: 'uppercase', marginBottom: 8 }}>Giá trị cốt lõi</div>
            <h2 style={{ ...serif, fontSize: 'clamp(1.8rem,3vw,2.6rem)', fontWeight: 600, color: '#0a0f1e' }}>Những điều chúng tôi cam kết</h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(280px,1fr))', gap: 20 }}>
            {[
              { icon: '🔒', title: 'Chính hãng 100%', desc: 'Tất cả sản phẩm đều có tem Apple VN/A và đầy đủ giấy tờ bảo hành chính hãng.' },
              { icon: '💰', title: 'Giá cạnh tranh', desc: 'Cam kết hoàn tiền 100% nếu bạn tìm thấy nơi bán rẻ hơn trong vòng 7 ngày.' },
              { icon: '⚡', title: 'Giao hàng nhanh', desc: 'Giao hàng trong 2 giờ nội thành TP.HCM, Hà Nội, Đà Nẵng. Toàn quốc 1-2 ngày.' },
              { icon: '🤝', title: 'Tư vấn tận tâm', desc: 'Đội ngũ 50+ chuyên gia sẵn sàng hỗ trợ 24/7 qua điện thoại, chat và tại cửa hàng.' },
              { icon: '🔄', title: 'Đổi trả dễ dàng', desc: 'Đổi trả trong 30 ngày không cần lý do. Hoàn tiền 100% nếu không hài lòng.' },
              { icon: '🛡️', title: 'Bảo mật tuyệt đối', desc: 'Xóa sạch dữ liệu thiết bị cũ trước khi xử lý, bảo vệ quyền riêng tư của bạn.' },
            ].map((v) => (
              <div key={v.title} style={{ padding: 24, background: '#fff', border: '1px solid #eef1f7', borderRadius: 18 }}>
                <div style={{ fontSize: 32, marginBottom: 16 }}>{v.icon}</div>
                <h3 style={{ ...serif, fontWeight: 600, color: '#0a0f1e', fontSize: 18, marginBottom: 8 }}>{v.title}</h3>
                <p style={{ fontSize: 13.5, color: '#7c89a3', lineHeight: 1.7 }}>{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact */}
      <section style={{ ...W, paddingTop: 56, paddingBottom: 40 }}>
        <div style={{ textAlign: 'center', marginBottom: 40 }}>
          <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.18em', color: '#1a3272', textTransform: 'uppercase', marginBottom: 8 }}>Liên hệ</div>
          <h2 style={{ ...serif, fontSize: 'clamp(1.8rem,3vw,2.6rem)', fontWeight: 600, color: '#0a0f1e' }}>Chúng tôi ở đây để giúp bạn</h2>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(240px,1fr))', gap: 20, marginBottom: 32 }}>
          {[
            { icon: '📞', title: 'Hotline', info: '1800 xxxx', sub: 'Miễn phí · 8:00–22:00' },
            { icon: '✉️', title: 'Email', info: 'hello@dutu.vn', sub: 'Trả lời trong 2 giờ' },
            { icon: '💬', title: 'Live Chat', info: 'Chat ngay', sub: 'Sẵn sàng 24/7' },
          ].map((c) => (
            <div key={c.title} style={{ textAlign: 'center', padding: '32px 20px', border: '1px solid #eef1f7', borderRadius: 18, background: '#fff' }}>
              <div style={{ fontSize: 40, marginBottom: 16 }}>{c.icon}</div>
              <div style={{ ...serif, fontWeight: 600, color: '#0a0f1e', fontSize: 18 }}>{c.title}</div>
              <div style={{ color: '#1a3272', fontWeight: 700, fontSize: 14, marginTop: 8 }}>{c.info}</div>
              <div style={{ fontSize: 12, color: '#9aa6bf', marginTop: 4 }}>{c.sub}</div>
            </div>
          ))}
        </div>
        {/* Stores */}
        <div style={{ background: '#f7f9fc', border: '1px solid #eef1f7', borderRadius: 20, padding: '28px 32px' }}>
          <h3 style={{ ...serif, fontSize: 22, fontWeight: 600, color: '#0a0f1e', marginBottom: 20 }}>Hệ thống cửa hàng</h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(220px,1fr))', gap: 16 }}>
            {[
              { city: 'TP. Hồ Chí Minh', addr: '123 Nguyễn Huệ, Quận 1', time: '8:00 – 22:00' },
              { city: 'Hà Nội', addr: '45 Hàng Bài, Hoàn Kiếm', time: '8:00 – 22:00' },
              { city: 'Đà Nẵng', addr: '89 Trần Phú, Hải Châu', time: '8:00 – 21:00' },
            ].map((s) => (
              <div key={s.city} style={{ background: '#fff', border: '1px solid #eef1f7', borderRadius: 14, padding: '18px 20px' }}>
                <div style={{ ...serif, fontWeight: 700, color: '#0a0f1e', fontSize: 16 }}>{s.city}</div>
                <div style={{ fontSize: 13, color: '#7c89a3', marginTop: 8 }}>📍 {s.addr}</div>
                <div style={{ fontSize: 13, color: '#7c89a3', marginTop: 4 }}>🕐 {s.time}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ ...W, paddingBottom: 64 }}>
        <div style={{ position: 'relative', overflow: 'hidden', borderRadius: 24, padding: '56px 40px', textAlign: 'center', background: 'linear-gradient(135deg,#0a0f1e,#1a3272)' }}>
          <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', width: 500, height: 500, borderRadius: '50%', pointerEvents: 'none', background: 'radial-gradient(circle,rgba(80,120,230,.25),transparent 70%)' }} />
          <div style={{ position: 'relative' }}>
            <h2 style={{ ...serif, fontSize: 'clamp(1.8rem,3vw,2.6rem)', fontWeight: 600, color: '#fff' }}>Sẵn sàng nâng cấp iPhone?</h2>
            <p style={{ marginTop: 12, color: '#b0c4e8', fontSize: 14, maxWidth: 400, marginLeft: 'auto', marginRight: 'auto', lineHeight: 1.7 }}>
              Khám phá bộ sưu tập iPhone chính hãng với ưu đãi độc quyền chỉ có tại Du Tú Số To.
            </p>
            <Link href="/san-pham" style={{ display: 'inline-block', marginTop: 28, background: '#fff', color: '#0a0f1e', borderRadius: 99, padding: '13px 34px', fontWeight: 700, fontSize: 14, textDecoration: 'none' }}>
              Khám phá ngay →
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
