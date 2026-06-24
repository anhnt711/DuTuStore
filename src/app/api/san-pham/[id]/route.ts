import { mockProducts } from '@/lib/mockData'

export async function GET(_request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const product = mockProducts.find((p) => p.id === id || p.slug === id)
  if (!product) return Response.json({ error: 'Not found' }, { status: 404 })
  return Response.json({ data: product })
}
