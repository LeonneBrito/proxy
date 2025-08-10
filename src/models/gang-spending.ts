import { Schema, models, model } from 'mongoose'

export interface GangSpending {
  gangLogin?: string
  gangName: string
  totalSpent: number
  history: {
    amount: number
    source?: 'seed' | 'checkout' | string
    at: Date
    transactionId?: string
  }[]
  updatedAt: Date
  createdAt: Date
}

const GangSpendingSchema = new Schema<GangSpending>(
  {
    gangLogin: { type: String, index: true, unique: false, sparse: true },
    gangName: { type: String, required: true, index: true },
    totalSpent: { type: Number, required: true, default: 0 },
    history: [
      {
        amount: { type: Number, required: true },
        source: { type: String },
        at: { type: Date, default: Date.now },
        transactionId: { type: String },
      },
    ],
  },
  { timestamps: true }
)

GangSpendingSchema.index({ gangLogin: 1 }, { unique: true, sparse: true })
GangSpendingSchema.index({ gangName: 1 })

export const GangSpendingModel =
  models.GangSpending || model<GangSpending>('GangSpending', GangSpendingSchema)
