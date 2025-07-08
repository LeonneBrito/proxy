'use client'

import { gangs } from '@/constants/gangs'
import { usePaymentFormStore } from '@/store/use-payment-form-state'

export function Resume() {
  const { publicKey, pendriveQty, notebookQty } = usePaymentFormStore()

  const prices = Object.values(gangs).find(
    (gang) => gang.hash === publicKey,
  )?.prices

  return (
    <div className="border border-green-800 p-4 bg-gray-950 mb-8">
      <h2 className="text-lg mb-4 text-white">RESUMO_PEDIDO</h2>
      <div className="space-y-2 text-sm">
        {prices ? (
          <>
            <div className="flex justify-between">
              <span>PENDRIVE_SUMMERELETROHITS_2025</span>
              <span className="text-green-400">
                {pendriveQty} x $ {prices.pendrive.toFixed(2)} = ${' '}
                {(prices.pendrive * pendriveQty).toFixed(2)}
              </span>
            </div>
            <div className="flex justify-between">
              <span>NOTEBOOK_GAMER_ATM_EDITION</span>
              <span className="text-green-400">
                {notebookQty} x $ {prices.notebook.toFixed(2)} = ${' '}
                {(prices.notebook * notebookQty).toFixed(2)}
              </span>
            </div>
            <div className="flex justify-between border-t border-green-800 pt-2 font-bold">
              <span>TOTAL</span>
              <span className="text-green-300">
                ${' '}
                {(
                  prices.pendrive * pendriveQty +
                  prices.notebook * notebookQty
                ).toFixed(2)}
              </span>
            </div>
          </>
        ) : (
          <span className="text-red-500">CHAVE INVÁLIDA</span>
        )}
      </div>
    </div>
  )
}
