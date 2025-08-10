import { NextResponse } from 'next/server'
import { z } from 'zod'
import { dbConnect } from '@/lib/mongodb'
import { GangSpendingModel } from '@/models/gang-spending'
import { gangs } from '@/constants/gangs'

const bodySchema = z.object({
  gangLogin: z.string().optional(),
  gangName: z.string().optional(),
  amount: z.number().positive(),
  transactionId: z.string().optional(),
  source: z.string().optional().default('checkout'),
})

export async function POST(req: Request) {
  try {
    const json = await req.json()
    const { gangLogin, gangName, amount, transactionId, source } = bodySchema.parse(json)

    await dbConnect()

    let resolvedName = gangName
    if (!resolvedName && gangLogin) {
      const found = Object.values(gangs).find(g => g.login === gangLogin)
      resolvedName = found?.name
    }

    if (!resolvedName) {
      return NextResponse.json(
        { error: 'gangName ou gangLogin válido é obrigatório' },
        { status: 400 }
      )
    }

    const query = gangLogin ? { gangLogin } : { gangName: resolvedName }
    const update = {
      $inc: { totalSpent: amount },
      $setOnInsert: { gangLogin, gangName: resolvedName },
      $push: { history: { amount, source, transactionId, at: new Date() } },
    }

    const doc = await GangSpendingModel.findOneAndUpdate(query, update, {
      upsert: true,
      new: true,
    })

    return NextResponse.json({ ok: true, data: doc })
  } catch (err: any) {
    console.error(err)
    return NextResponse.json({ error: err.message ?? 'Internal error' }, { status: 500 })
  }
}
