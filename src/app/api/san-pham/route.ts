import { NextRequest } from 'next/server'
import { mockProducts } from '@/lib/mockData'

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl
  const q = searchParams.get('q')
  const line = searchParams.get('line')
  const featured = searchParams.get('featured')
  const deal = searchParams.get('deal')

  let products = [...mockProducts]

  if (q) products = products.filter((p) => p.name.toLowerCase().includes(q.toLowerCase()))
  if (line) products = products.filter((p) => p.line === line)
  if (featured === 'true') products = products.filter((p) => p.featured)
  if (deal === 'true') products = products.filter((p) => p.deal)

  return Response.json({ data: products, total: products.length })
}
