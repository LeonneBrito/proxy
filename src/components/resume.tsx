'use client'

import { gangs } from '@/constants/gangs'
import { usePaymentFormStore } from '@/store/use-payment-form-state'

export function Resume() {
  const { publicKey, pendriveQty } = usePaymentFormStore()

  const gangPrice = Object.values(gangs).find(
    (gang) => gang.hash === publicKey,
  )?.price

  return (
    <div className="border border-green-800 p-4 bg-gray-950 mb-8">
      <h2 className="text-lg mb-4 text-white">RESUMO_PEDIDO</h2>
      <div className="space-y-2 text-sm">
        <div className="flex justify-between">
          <span>PENDRIVE_SUMMERELETROHITS_2025</span>
          {gangPrice ? (
            <span className="text-green-400">
              {pendriveQty} x $ {gangPrice.toFixed(2)} = ${' '}
              {(gangPrice * pendriveQty).toFixed(2)}
            </span>
          ) : (
            <span className="text-red-500">CHAVE INVÁLIDA</span>
          )}
        </div>
      </div>
    </div>
  )
}
