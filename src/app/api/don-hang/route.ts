import { NextRequest } from 'next/server'
import { generateOrderCode } from '@/lib/utils'

export async function POST(request: NextRequest) {
  const body = await request.json()
  const { customer_name, customer_email, customer_phone, customer_address, payment_method, items, total, note } = body

  if (!customer_name || !customer_phone || !customer_address || !items?.length) {
    return Response.json({ error: 'Thiếu thông tin đơn hàng' }, { status: 400 })
  }

  const order = {
    id: crypto.randomUUID(),
    code: generateOrderCode(),
    created_at: new Date().toISOString(),
    customer_name,
    customer_email,
    customer_phone,
    customer_address,
    payment_method: payment_method ?? 'cod',
    status: 'pending',
    total,
    note: note ?? null,
  }

  // TODO: save to Supabase
  // const { data, error } = await supabase.from('orders').insert(order).select().single()

  return Response.json({ data: order }, { status: 201 })
}
