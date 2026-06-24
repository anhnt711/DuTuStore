'use client'
import { useState } from 'react'
import Link from 'next/link'
import { Trash2, ShoppingBag, Shield, CheckCircle } from 'lucide-react'
import { useCartStore } from '@/lib/store'
import { formatPrice, generateOrderCode } from '@/lib/utils'

const serif = { fontFamily: "'Cormorant Garamond',Georgia,serif" }
const W = { maxWidth: 1280, margin: '0 auto', padding: '0 20px', width: '100%' }

type Step = 'cart' | 'checkout' | 'success'

export default function CartPage() {
  const items = useCartStore((s) => s.items)
  const removeFromCart = useCartStore((s) => s.removeFromCart)
  const updateQty = useCartStore((s) => s.updateQty)
  const clearCart = useCartStore((s) => s.clearCart)
  const cartTotal = useCartStore((s) => s.cartTotal())

  const [step, setStep] = useState<Step>('cart')
  const [orderCode, setOrderCode] = useState('')
  const [form, setForm] = useState({ name: '', email: '', phone: '', address: '', payment: 'cod', note: '' })

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault()
    setOrderCode(generateOrderCode())
    clearCart()
    setStep('success')
  }

  const inputStyle = { border: '1px solid #dde2ec', borderRadius: 12, padding: '12px 16px', fontSize: 14, outline: 'none', width: '100%', color: '#0a0f1e', background: '#fff', transition: 'border-color .15s' }

  /* ── Success ── */
  if (step === 'success') return (
    <div style={{ ...W, paddingTop: 48, paddingBottom: 80 }}>
      <div style={{ maxWidth: 580, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', background: '#fff', border: '1px solid #eef1f7', borderRadius: 24, padding: '48px 40px' }}>
          <div style={{ width: 76, height: 76, borderRadius: '50%', background: '#e8f5ee', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto' }}>
            <CheckCircle size={36} color="#1f8a5b" />
          </div>
          <h2 style={{ ...serif, marginTop: 24, fontSize: 'clamp(1.8rem,3vw,2.4rem)', fontWeight: 600, color: '#0a0f1e' }}>Đặt hàng thành công!</h2>
          <p style={{ marginTop: 12, fontSize: 14, color: '#7c89a3', lineHeight: 1.7, maxWidth: 380, margin: '12px auto 0' }}>
            Cảm ơn bạn đã mua sắm tại Du Tú Số To. Chúng tôi sẽ liên hệ xác nhận và giao hàng trong ít phút.
          </p>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, marginTop: 20, background: '#f4f6fb', borderRadius: 12, padding: '12px 20px', fontWeight: 700, fontSize: 14, color: '#1a3272' }}>
            Mã đơn hàng: {orderCode}
          </div>
          {/* Tracking steps */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 8, marginTop: 32, textAlign: 'left' }}>
            {[['1','Xác nhận','Đã nhận đơn'],['2','Xử lý','5-10 phút'],['3','Giao hàng','1-2 giờ'],['4','Hoàn tất','Nhận hàng']].map(([idx,title,text],i) => (
              <div key={idx}>
                <div style={{ height: 4, borderRadius: 99, background: i === 0 ? '#1a3272' : '#eef1f7' }} />
                <div style={{ width: 28, height: 28, borderRadius: '50%', border: `2px solid ${i===0?'#1a3272':'#e6eaf2'}`, background: i===0?'#1a3272':'#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, fontWeight: 700, color: i===0?'#fff':'#8593ad', marginTop: -14 }}>{idx}</div>
                <div style={{ marginTop: 10 }}>
                  <div style={{ fontSize: 12, fontWeight: 700, color: '#0a0f1e' }}>{title}</div>
                  <div style={{ fontSize: 10, color: '#9aa6bf', marginTop: 2 }}>{text}</div>
                </div>
              </div>
            ))}
          </div>
          <div style={{ display: 'flex', gap: 12, justifyContent: 'center', marginTop: 32, flexWrap: 'wrap' }}>
            <Link href="/san-pham" style={{ background: '#1a3272', color: '#fff', borderRadius: 99, padding: '12px 28px', fontSize: 13.5, fontWeight: 700, textDecoration: 'none' }}>Tiếp tục mua sắm</Link>
            <Link href="/" style={{ background: '#fff', color: '#0a0f1e', border: '1px solid #dde2ec', borderRadius: 99, padding: '12px 24px', fontSize: 13.5, fontWeight: 700, textDecoration: 'none' }}>Về trang chủ</Link>
          </div>
        </div>
      </div>
    </div>
  )

  /* ── Checkout ── */
  if (step === 'checkout') return (
    <div style={{ ...W, paddingTop: 32, paddingBottom: 64 }}>
      <h1 style={{ ...serif, fontSize: 'clamp(1.8rem,3vw,2.6rem)', fontWeight: 600, color: '#0a0f1e' }}>Thanh toán</h1>
      <p style={{ marginTop: 6, fontSize: 14, color: '#7c89a3' }}>Hoàn tất đơn hàng của bạn một cách an toàn.</p>
      <form onSubmit={handlePlaceOrder}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(320px,1fr))', gap: 28, marginTop: 32, alignItems: 'flex-start' }}>
          {/* Form */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            <div style={{ background: '#fff', border: '1px solid #eef1f7', borderRadius: 20, padding: '24px 24px' }}>
              <h2 style={{ ...serif, fontWeight: 600, color: '#0a0f1e', fontSize: 20, marginBottom: 20 }}>Thông tin giao hàng</h2>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
                {[['Họ và tên *','name','text','Nguyễn Văn A'],['Số điện thoại *','phone','tel','0912 345 678']].map(([lbl,key,type,ph]) => (
                  <div key={key} style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                    <label style={{ fontSize: 11, fontWeight: 700, color: '#8593ad', textTransform: 'uppercase', letterSpacing: '0.1em' }}>{lbl}</label>
                    <input required={lbl.includes('*')} type={type} value={form[key as keyof typeof form]} onChange={(e) => setForm({...form,[key]:e.target.value})} placeholder={ph} style={inputStyle} />
                  </div>
                ))}
                <div style={{ display: 'flex', flexDirection: 'column', gap: 6, gridColumn: '1/-1' }}>
                  <label style={{ fontSize: 11, fontWeight: 700, color: '#8593ad', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Email</label>
                  <input type="email" value={form.email} onChange={(e) => setForm({...form,email:e.target.value})} placeholder="example@gmail.com" style={inputStyle} />
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 6, gridColumn: '1/-1' }}>
                  <label style={{ fontSize: 11, fontWeight: 700, color: '#8593ad', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Địa chỉ giao hàng *</label>
                  <input required value={form.address} onChange={(e) => setForm({...form,address:e.target.value})} placeholder="Số nhà, đường, phường, quận, tỉnh/TP" style={inputStyle} />
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 6, gridColumn: '1/-1' }}>
                  <label style={{ fontSize: 11, fontWeight: 700, color: '#8593ad', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Ghi chú</label>
                  <textarea value={form.note} onChange={(e) => setForm({...form,note:e.target.value})} rows={2} placeholder="Ghi chú cho đơn hàng..." style={{ ...inputStyle, resize: 'none' }} />
                </div>
              </div>
            </div>
            <div style={{ background: '#fff', border: '1px solid #eef1f7', borderRadius: 20, padding: '24px 24px' }}>
              <h2 style={{ ...serif, fontWeight: 600, color: '#0a0f1e', fontSize: 20, marginBottom: 16 }}>Phương thức thanh toán</h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                {[['cod','Thanh toán khi nhận hàng (COD)','Trả tiền mặt khi nhận hàng'],['bank','Chuyển khoản ngân hàng','VCB, TCB, MB Bank, ...'],['momo','Ví MoMo','Thanh toán qua ví điện tử MoMo']].map(([val,lbl,desc]) => (
                  <label key={val} style={{ display: 'flex', alignItems: 'center', gap: 14, padding: '14px 16px', borderRadius: 14, border: `2px solid ${form.payment===val?'#1a3272':'#e6eaf2'}`, background: form.payment===val?'#eef2fb':'#fff', cursor: 'pointer' }}>
                    <input type="radio" name="payment" value={val} checked={form.payment===val} onChange={(e) => setForm({...form,payment:e.target.value})} style={{ accentColor: '#1a3272' }} />
                    <div>
                      <div style={{ fontWeight: 700, fontSize: 13.5, color: '#0a0f1e' }}>{lbl}</div>
                      <div style={{ fontSize: 12, color: '#8593ad', marginTop: 2 }}>{desc}</div>
                    </div>
                  </label>
                ))}
              </div>
            </div>
          </div>
          {/* Summary */}
          <aside style={{ background: '#fff', border: '1px solid #eef1f7', borderRadius: 20, padding: '24px 24px', position: 'sticky', top: 88 }}>
            <h2 style={{ ...serif, fontWeight: 600, color: '#0a0f1e', fontSize: 20, marginBottom: 16 }}>Đơn hàng ({items.length} sản phẩm)</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 14, maxHeight: 240, overflowY: 'auto' }}>
              {items.map((item, i) => (
                <div key={i} style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
                  <div style={{ width: 56, height: 64, background: '#f4f6fb', borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={item.product.colors[item.colorIndex]?.image||item.product.images[0]} alt={item.product.name} style={{ height: 48, width: 'auto', objectFit: 'contain' }} />
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontSize: 13, fontWeight: 700, color: '#0a0f1e', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{item.product.name}</div>
                    <div style={{ fontSize: 11, color: '#8593ad', marginTop: 2 }}>{item.product.colors[item.colorIndex]?.name} · {item.product.storages[item.storageIndex]?.label} × {item.quantity}</div>
                  </div>
                  <div style={{ fontSize: 13, fontWeight: 800, color: '#1a3272', flexShrink: 0 }}>
                    {formatPrice((item.product.storages[item.storageIndex]?.price ?? item.product.price) * item.quantity)}
                  </div>
                </div>
              ))}
            </div>
            <div style={{ height: 1, background: '#eef1f7', margin: '16px 0' }} />
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8, fontSize: 13, color: '#7c89a3' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}><span>Tạm tính</span><span>{formatPrice(cartTotal)}</span></div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}><span>Vận chuyển</span><span style={{ color: '#1f8a5b', fontWeight: 700 }}>Miễn phí</span></div>
            </div>
            <div style={{ height: 1, background: '#eef1f7', margin: '16px 0' }} />
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
              <span style={{ fontWeight: 700, color: '#0a0f1e' }}>Tổng cộng</span>
              <span style={{ fontWeight: 800, fontSize: 22, color: '#1a3272' }}>{formatPrice(cartTotal)}</span>
            </div>
            <button type="submit" style={{ width: '100%', marginTop: 20, background: '#1a3272', color: '#fff', border: 'none', borderRadius: 99, padding: '15px 0', fontWeight: 700, fontSize: 14, cursor: 'pointer', boxShadow: '0 6px 20px rgba(26,50,114,.35)' }}>
              Đặt hàng
            </button>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6, marginTop: 12, fontSize: 11, color: '#9aa6bf' }}>
              <Shield size={11} /> Thanh toán an toàn &amp; bảo mật
            </div>
          </aside>
        </div>
      </form>
    </div>
  )

  /* ── Cart ── */
  return (
    <div style={{ ...W, paddingTop: 32, paddingBottom: 64 }}>
      <h1 style={{ ...serif, fontSize: 'clamp(1.8rem,3vw,2.6rem)', fontWeight: 600, color: '#0a0f1e' }}>Giỏ hàng</h1>

      {items.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '80px 20px', background: '#f7f9fc', border: '1px solid #eef1f7', borderRadius: 20, marginTop: 32 }}>
          <ShoppingBag size={48} color="#dde2ec" style={{ margin: '0 auto' }} />
          <div style={{ ...serif, fontSize: 24, fontWeight: 600, color: '#0a0f1e', marginTop: 16 }}>Giỏ hàng đang trống</div>
          <div style={{ fontSize: 14, color: '#8593ad', marginTop: 8 }}>Khám phá bộ sưu tập iPhone cao cấp của chúng tôi.</div>
          <Link href="/san-pham" style={{ display: 'inline-block', marginTop: 20, background: '#1a3272', color: '#fff', borderRadius: 99, padding: '12px 28px', fontSize: 14, fontWeight: 700, textDecoration: 'none' }}>
            Mua sắm ngay
          </Link>
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(320px,1fr))', gap: 28, marginTop: 32, alignItems: 'flex-start' }}>
          {/* Items */}
          <div style={{ background: '#fff', border: '1px solid #eef1f7', borderRadius: 20, padding: '24px 24px' }}>
            <h2 style={{ ...serif, fontWeight: 600, color: '#0a0f1e', fontSize: 20, marginBottom: 16 }}>Sản phẩm ({items.length})</h2>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              {items.map((item, i) => (
                <div key={i} style={{ display: 'flex', gap: 16, alignItems: 'center', padding: '16px 0', borderBottom: '1px solid #f1f4f9' }}>
                  <div style={{ width: 64, height: 80, background: 'linear-gradient(135deg,#fff,#eef2fb)', borderRadius: 14, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={item.product.colors[item.colorIndex]?.image||item.product.images[0]} alt={item.product.name} style={{ height: 60, width: 'auto', objectFit: 'contain' }} />
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ ...serif, fontWeight: 700, color: '#0a0f1e', fontSize: 16, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{item.product.name}</div>
                    <div style={{ fontSize: 12, color: '#8593ad', marginTop: 4 }}>{item.product.colors[item.colorIndex]?.name} · {item.product.storages[item.storageIndex]?.label}</div>
                    <div style={{ fontWeight: 800, color: '#1a3272', fontSize: 15, marginTop: 6 }}>
                      {formatPrice((item.product.storages[item.storageIndex]?.price ?? item.product.price) * item.quantity)}
                    </div>
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 12 }}>
                    <button onClick={() => removeFromCart(item.product.id, item.colorIndex, item.storageIndex)} style={{ border: 'none', background: 'none', cursor: 'pointer', color: '#aab2c2', padding: 0 }}>
                      <Trash2 size={16} />
                    </button>
                    <div style={{ display: 'flex', alignItems: 'center', border: '1px solid #e6eaf2', borderRadius: 99, overflow: 'hidden' }}>
                      <button onClick={() => updateQty(item.product.id, item.colorIndex, item.storageIndex, -1)} style={{ width: 32, height: 32, border: 'none', background: '#fff', cursor: 'pointer', fontSize: 18, color: '#0a0f1e', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>−</button>
                      <span style={{ width: 32, textAlign: 'center', fontSize: 13, fontWeight: 700 }}>{item.quantity}</span>
                      <button onClick={() => updateQty(item.product.id, item.colorIndex, item.storageIndex, 1)} style={{ width: 32, height: 32, border: 'none', background: '#fff', cursor: 'pointer', fontSize: 18, color: '#0a0f1e', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>+</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          {/* Summary */}
          <aside style={{ background: '#fff', border: '1px solid #eef1f7', borderRadius: 20, padding: '24px 24px', position: 'sticky', top: 88 }}>
            <h2 style={{ ...serif, fontWeight: 600, color: '#0a0f1e', fontSize: 20, marginBottom: 16 }}>Tóm tắt đơn hàng</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10, fontSize: 13, color: '#7c89a3' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}><span>Tạm tính</span><span>{formatPrice(cartTotal)}</span></div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}><span>Vận chuyển</span><span style={{ color: '#1f8a5b', fontWeight: 700 }}>Miễn phí</span></div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}><span>Giảm giá</span><span>–</span></div>
            </div>
            <div style={{ height: 1, background: '#eef1f7', margin: '16px 0' }} />
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
              <span style={{ fontWeight: 700, color: '#0a0f1e' }}>Tổng cộng</span>
              <span style={{ fontWeight: 800, fontSize: 22, color: '#1a3272' }}>{formatPrice(cartTotal)}</span>
            </div>
            <button onClick={() => setStep('checkout')} style={{ width: '100%', marginTop: 20, background: '#1a3272', color: '#fff', border: 'none', borderRadius: 99, padding: '15px 0', fontWeight: 700, fontSize: 14, cursor: 'pointer', boxShadow: '0 6px 20px rgba(26,50,114,.35)' }}>
              Tiến hành thanh toán →
            </button>
            <Link href="/san-pham" style={{ display: 'block', textAlign: 'center', fontSize: 13, color: '#8593ad', marginTop: 12, textDecoration: 'none' }}>
              Tiếp tục mua sắm
            </Link>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6, marginTop: 14, fontSize: 11, color: '#9aa6bf' }}>
              <Shield size={11} /> Thanh toán an toàn &amp; bảo mật
            </div>
          </aside>
        </div>
      )}
    </div>
  )
}
