'use client'
import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Trash2, ShoppingBag, Shield, CheckCircle } from 'lucide-react'
import { useCartStore } from '@/lib/store'
import { formatPrice, generateOrderCode } from '@/lib/utils'

type Step = 'cart' | 'checkout' | 'success'

export default function CartPage() {
  const items = useCartStore((s) => s.items)
  const removeFromCart = useCartStore((s) => s.removeFromCart)
  const updateQty = useCartStore((s) => s.updateQty)
  const clearCart = useCartStore((s) => s.clearCart)
  const cartTotal = useCartStore((s) => s.cartTotal())

  const [step, setStep] = useState<Step>('cart')
  const [orderCode, setOrderCode] = useState('')
  const [form, setForm] = useState({
    name: '', email: '', phone: '', address: '', payment: 'cod', note: ''
  })

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault()
    const code = generateOrderCode()
    setOrderCode(code)
    clearCart()
    setStep('success')
  }

  if (step === 'success') {
    return (
      <div className="max-w-screen-xl mx-auto px-4 py-12 pb-20">
        <div className="max-w-2xl mx-auto">
          <div className="text-center bg-white border border-[#eef1f7] rounded-3xl p-10 shadow-sm">
            <div className="w-20 h-20 rounded-full bg-[#e8f5ee] flex items-center justify-center mx-auto">
              <CheckCircle size={38} className="text-[#1f8a5b]" />
            </div>
            <h2 className="font-serif mt-6 text-3xl sm:text-4xl font-semibold text-[#0f1729]">Đặt hàng thành công!</h2>
            <p className="mt-3 text-sm text-[#7c89a3] leading-relaxed max-w-md mx-auto">
              Cảm ơn bạn đã mua sắm tại Du Tú Số To. Chúng tôi đã gửi xác nhận qua email và sẽ liên hệ giao hàng trong ít phút.
            </p>
            <div className="inline-flex items-center gap-2 mt-5 bg-[#f4f6fb] rounded-xl px-5 py-3 font-semibold text-sm text-[#1e3a8a]">
              Mã đơn hàng: {orderCode}
            </div>

            {/* Order tracking steps */}
            <div className="grid grid-cols-4 gap-2 mt-8 text-left">
              {[
                { idx: '1', title: 'Xác nhận', text: 'Đã nhận đơn' },
                { idx: '2', title: 'Xử lý', text: '5-10 phút' },
                { idx: '3', title: 'Giao hàng', text: '1-2 giờ' },
                { idx: '4', title: 'Hoàn tất', text: 'Nhận hàng' },
              ].map((s, i) => (
                <div key={s.idx} className="relative">
                  <div className={`h-1 rounded-full ${i === 0 ? 'bg-[#1e3a8a]' : 'bg-[#eef1f7]'}`} />
                  <div className={`w-7 h-7 rounded-full border-2 flex items-center justify-center text-xs font-bold mt-[-14px] ml-0 ${
                    i === 0 ? 'bg-[#1e3a8a] border-[#1e3a8a] text-white' : 'bg-white border-[#e6eaf2] text-[#8593ad]'
                  }`}>
                    {s.idx}
                  </div>
                  <div className="mt-3">
                    <div className="text-xs font-semibold text-[#0f1729]">{s.title}</div>
                    <div className="text-[10px] text-[#9aa6bf] mt-0.5">{s.text}</div>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex gap-3 justify-center mt-8 flex-wrap">
              <Link href="/san-pham" className="bg-[#1e3a8a] text-white rounded-full px-7 py-3 text-sm font-semibold">
                Tiếp tục mua sắm
              </Link>
              <Link href="/" className="bg-white text-[#0f1729] border border-[#dde2ec] rounded-full px-6 py-3 text-sm font-semibold">
                Về trang chủ
              </Link>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (step === 'checkout') {
    return (
      <div className="max-w-screen-xl mx-auto px-4 py-8 pb-16">
        <h1 className="font-serif text-3xl sm:text-4xl font-semibold text-[#0f1729]">Thanh toán</h1>
        <p className="mt-2 text-sm text-[#7c89a3]">Hoàn tất đơn hàng của bạn một cách an toàn.</p>

        <form onSubmit={handlePlaceOrder}>
          <div className="grid grid-cols-1 lg:grid-cols-[1.6fr_1fr] gap-8 mt-8 items-start">
            {/* Left: form */}
            <div className="space-y-6">
              <div className="bg-white border border-[#eef1f7] rounded-2xl p-6">
                <h2 className="font-semibold text-[#0f1729] font-serif text-xl mb-5">Thông tin giao hàng</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-semibold text-[#8593ad]">Họ và tên *</label>
                    <input required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })}
                      className="border border-[#dde2ec] rounded-xl px-4 py-3 text-sm outline-none focus:border-[#1e3a8a] transition-colors"
                      placeholder="Nguyễn Văn A" />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-semibold text-[#8593ad]">Số điện thoại *</label>
                    <input required value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })}
                      className="border border-[#dde2ec] rounded-xl px-4 py-3 text-sm outline-none focus:border-[#1e3a8a] transition-colors"
                      placeholder="0912 345 678" />
                  </div>
                  <div className="flex flex-col gap-1.5 sm:col-span-2">
                    <label className="text-xs font-semibold text-[#8593ad]">Email</label>
                    <input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })}
                      className="border border-[#dde2ec] rounded-xl px-4 py-3 text-sm outline-none focus:border-[#1e3a8a] transition-colors"
                      placeholder="example@gmail.com" />
                  </div>
                  <div className="flex flex-col gap-1.5 sm:col-span-2">
                    <label className="text-xs font-semibold text-[#8593ad]">Địa chỉ giao hàng *</label>
                    <input required value={form.address} onChange={(e) => setForm({ ...form, address: e.target.value })}
                      className="border border-[#dde2ec] rounded-xl px-4 py-3 text-sm outline-none focus:border-[#1e3a8a] transition-colors"
                      placeholder="Số nhà, đường, phường/xã, quận/huyện, tỉnh/TP" />
                  </div>
                  <div className="flex flex-col gap-1.5 sm:col-span-2">
                    <label className="text-xs font-semibold text-[#8593ad]">Ghi chú</label>
                    <textarea value={form.note} onChange={(e) => setForm({ ...form, note: e.target.value })} rows={2}
                      className="border border-[#dde2ec] rounded-xl px-4 py-3 text-sm outline-none focus:border-[#1e3a8a] transition-colors resize-none"
                      placeholder="Ghi chú cho đơn hàng..." />
                  </div>
                </div>
              </div>

              {/* Payment method */}
              <div className="bg-white border border-[#eef1f7] rounded-2xl p-6">
                <h2 className="font-semibold text-[#0f1729] font-serif text-xl mb-4">Phương thức thanh toán</h2>
                <div className="space-y-3">
                  {[
                    { value: 'cod', label: 'Thanh toán khi nhận hàng (COD)', desc: 'Trả tiền mặt khi nhận hàng' },
                    { value: 'bank', label: 'Chuyển khoản ngân hàng', desc: 'VCB, TCB, MB Bank, ...' },
                    { value: 'momo', label: 'Ví MoMo', desc: 'Thanh toán qua ví điện tử MoMo' },
                  ].map((m) => (
                    <label key={m.value} className={`flex items-center gap-4 p-4 rounded-xl border-2 cursor-pointer transition-colors ${
                      form.payment === m.value ? 'border-[#1e3a8a] bg-[#eef2fb]' : 'border-[#e6eaf2]'
                    }`}>
                      <input type="radio" name="payment" value={m.value} checked={form.payment === m.value}
                        onChange={(e) => setForm({ ...form, payment: e.target.value })} className="accent-[#1e3a8a]" />
                      <div>
                        <div className="font-semibold text-sm text-[#0f1729]">{m.label}</div>
                        <div className="text-xs text-[#8593ad] mt-0.5">{m.desc}</div>
                      </div>
                    </label>
                  ))}
                </div>
              </div>
            </div>

            {/* Right: summary */}
            <aside className="bg-white border border-[#eef1f7] rounded-2xl p-6 sticky top-24">
              <h2 className="font-semibold text-[#0f1729] font-serif text-xl mb-4">Đơn hàng ({items.length} sản phẩm)</h2>
              <div className="space-y-4 max-h-60 overflow-y-auto pr-1">
                {items.map((item, i) => (
                  <div key={i} className="flex gap-3 items-center">
                    <div className="w-14 h-16 bg-[#f7f9fc] rounded-xl flex items-center justify-center flex-none">
                      <Image src={item.product.colors[item.colorIndex]?.image || item.product.images[0]} alt={item.product.name} width={50} height={50} className="object-contain h-12 w-auto" unoptimized />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-semibold text-[#0f1729] truncate">{item.product.name}</div>
                      <div className="text-xs text-[#8593ad] mt-0.5">{item.product.colors[item.colorIndex]?.name} · {item.product.storages[item.storageIndex]?.label} × {item.quantity}</div>
                    </div>
                    <div className="text-sm font-bold text-[#1e3a8a] flex-none">
                      {formatPrice((item.product.storages[item.storageIndex]?.price ?? item.product.price) * item.quantity)}
                    </div>
                  </div>
                ))}
              </div>
              <div className="h-px bg-[#eef1f7] my-4" />
              <div className="space-y-2 text-sm">
                <div className="flex justify-between text-[#7c89a3]"><span>Tạm tính</span><span>{formatPrice(cartTotal)}</span></div>
                <div className="flex justify-between text-[#7c89a3]"><span>Phí vận chuyển</span><span className="text-[#1f8a5b] font-semibold">Miễn phí</span></div>
              </div>
              <div className="h-px bg-[#eef1f7] my-4" />
              <div className="flex justify-between items-baseline">
                <span className="font-semibold text-[#0f1729]">Tổng cộng</span>
                <span className="font-bold text-2xl text-[#1e3a8a]">{formatPrice(cartTotal)}</span>
              </div>
              <button type="submit" className="w-full mt-5 bg-[#1e3a8a] text-white rounded-full py-4 font-semibold text-sm hover:bg-[#16306b] transition-colors shadow-lg shadow-[#1e3a8a]/30">
                Đặt hàng
              </button>
              <div className="flex items-center justify-center gap-2 mt-3 text-xs text-[#9aa6bf]">
                <Shield size={12} />
                Thanh toán an toàn & bảo mật
              </div>
            </aside>
          </div>
        </form>
      </div>
    )
  }

  // Cart view
  return (
    <div className="max-w-screen-xl mx-auto px-4 py-8 pb-16">
      <h1 className="font-serif text-3xl sm:text-4xl font-semibold text-[#0f1729]">Giỏ hàng</h1>

      {items.length === 0 ? (
        <div className="text-center py-20 bg-[#f7f9fc] border border-[#eef1f7] rounded-2xl mt-8">
          <ShoppingBag size={48} className="text-[#dde2ec] mx-auto" />
          <div className="font-serif text-2xl font-semibold text-[#0f1729] mt-4">Giỏ hàng đang trống</div>
          <div className="text-sm text-[#8593ad] mt-2">Khám phá bộ sưu tập iPhone cao cấp của chúng tôi.</div>
          <Link href="/san-pham" className="inline-block mt-5 bg-[#1e3a8a] text-white rounded-full px-7 py-3 text-sm font-semibold">
            Mua sắm ngay
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-[1.6fr_1fr] gap-8 mt-8 items-start">
          {/* Items */}
          <div className="bg-white border border-[#eef1f7] rounded-2xl p-6">
            <h2 className="font-semibold text-[#0f1729] font-serif text-xl mb-4">Sản phẩm ({items.length})</h2>
            <div className="divide-y divide-[#f1f4f9]">
              {items.map((item, i) => (
                <div key={i} className="flex gap-4 items-center py-4">
                  <div className="w-16 h-20 bg-gradient-to-br from-white to-[#eef2fb] rounded-xl flex items-center justify-center flex-none">
                    <Image
                      src={item.product.colors[item.colorIndex]?.image || item.product.images[0]}
                      alt={item.product.name}
                      width={60}
                      height={60}
                      className="object-contain h-16 w-auto"
                      unoptimized
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="font-semibold text-[#0f1729] text-sm sm:text-base font-serif truncate">{item.product.name}</div>
                    <div className="text-xs text-[#8593ad] mt-1">
                      {item.product.colors[item.colorIndex]?.name} · {item.product.storages[item.storageIndex]?.label}
                    </div>
                    <div className="font-bold text-[#1e3a8a] text-sm mt-2">
                      {formatPrice((item.product.storages[item.storageIndex]?.price ?? item.product.price) * item.quantity)}
                    </div>
                  </div>
                  <div className="flex flex-col items-end gap-3">
                    <button onClick={() => removeFromCart(item.product.id, item.colorIndex, item.storageIndex)} className="text-[#aab2c2] hover:text-red-500 transition-colors">
                      <Trash2 size={16} />
                    </button>
                    <div className="flex items-center border border-[#e6eaf2] rounded-full overflow-hidden">
                      <button onClick={() => updateQty(item.product.id, item.colorIndex, item.storageIndex, -1)} className="w-8 h-8 text-lg text-[#0f1729] hover:bg-gray-50">−</button>
                      <span className="w-8 text-center text-sm font-semibold">{item.quantity}</span>
                      <button onClick={() => updateQty(item.product.id, item.colorIndex, item.storageIndex, 1)} className="w-8 h-8 text-lg text-[#0f1729] hover:bg-gray-50">+</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Summary */}
          <aside className="bg-white border border-[#eef1f7] rounded-2xl p-6 sticky top-24">
            <h2 className="font-semibold text-[#0f1729] font-serif text-xl mb-4">Tóm tắt đơn hàng</h2>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between text-[#7c89a3]"><span>Tạm tính</span><span>{formatPrice(cartTotal)}</span></div>
              <div className="flex justify-between text-[#7c89a3]"><span>Phí vận chuyển</span><span className="text-[#1f8a5b] font-semibold">Miễn phí</span></div>
              <div className="flex justify-between text-[#7c89a3]"><span>Giảm giá</span><span>–</span></div>
            </div>
            <div className="h-px bg-[#eef1f7] my-4" />
            <div className="flex justify-between items-baseline">
              <span className="font-semibold text-[#0f1729]">Tổng cộng</span>
              <span className="font-bold text-2xl text-[#1e3a8a]">{formatPrice(cartTotal)}</span>
            </div>
            <button onClick={() => setStep('checkout')} className="w-full mt-5 bg-[#1e3a8a] text-white rounded-full py-4 font-semibold text-sm hover:bg-[#16306b] transition-colors shadow-lg shadow-[#1e3a8a]/30">
              Tiến hành thanh toán →
            </button>
            <Link href="/san-pham" className="block text-center text-sm text-[#8593ad] mt-3 hover:text-[#1e3a8a]">
              Tiếp tục mua sắm
            </Link>
            <div className="flex items-center justify-center gap-2 mt-4 text-xs text-[#9aa6bf]">
              <Shield size={12} />
              Thanh toán an toàn & bảo mật
            </div>
          </aside>
        </div>
      )}
    </div>
  )
}
