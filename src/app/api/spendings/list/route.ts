import { NextResponse } from 'next/server'
import { dbConnect } from '@/lib/mongodb'
import { GangSpendingModel } from '@/models/gang-spending'

export async function GET() {
  try {
    await dbConnect()
    const data = await GangSpendingModel.find({}, { history: { $slice: -5 } })
      .sort({ totalSpent: -1 })
      .lean()
    return NextResponse.json({ ok: true, data })
  } catch (err: any) {
    return NextResponse.json({ error: err.message ?? 'Internal error' }, { status: 500 })
  }
}