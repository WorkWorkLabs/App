import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const address = searchParams.get('address')
  // 这里可接数据库或链上逻辑。临时返回固定积分或按地址简单映射。
  const base = 200
  const points = address ? base + (address.length % 50) * 10 : base
  return NextResponse.json({ points })
}