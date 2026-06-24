'use client'
export default function PromoBar() {
  return (
    <div className="bg-[#0f1729] text-white">
      <div className="max-w-screen-xl mx-auto px-4 py-2.5 flex items-center justify-center gap-4 flex-wrap text-xs font-medium tracking-wide">
        <span className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-[#5b8def] animate-pulse inline-block" />
          ƯU ĐÃI HÈ 2026 – Giảm 15% toàn bộ iPhone 15 Series
        </span>
        <span className="opacity-30">|</span>
        <span className="text-[#cdd9f5]">Trả góp 0% · Miễn phí vận chuyển toàn quốc</span>
      </div>
    </div>
  )
}
