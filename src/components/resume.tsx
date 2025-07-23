'use client'

import { gangs } from '@/constants/gangs'
import { useCartStore } from '@/store/use-cart-store'

export function Resume() {
  const { cart } = useCartStore()

  const gang = Object.values(gangs).find(
    (g) => g.login === localStorage.getItem('gang'),
  )

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0)

  return (
    <div className="border border-green-800 p-4 bg-gray-950">
      <h2 className="text-lg mb-4 text-white font-bold">RESUMO_PEDIDO</h2>

      {gang ? (
        <div className="space-y-2 text-sm text-green-200">
          {cart.map((item) => (
            <div key={item.id} className="flex justify-between">
              <span>{item.name}</span>
              <span>
                {item.quantity} x $ {item.price.toFixed(2)} ={' '}
                <span className="text-green-400">
                  $ {(item.quantity * item.price).toFixed(2)}
                </span>
              </span>
            </div>
          ))}

          <div className="flex justify-between border-t border-green-800 pt-2 font-bold text-green-300 mt-2">
            <span>TOTAL</span>
            <span>$ {total.toFixed(2)}</span>
          </div>
        </div>
      ) : (
        <div className="text-red-500 text-sm">CHAVE INVÁLIDA</div>
      )}
    </div>
  )
}
