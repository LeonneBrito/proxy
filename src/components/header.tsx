'use client'

import { LogOut, ShoppingCart, Trash2 } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

import { Button } from '@/components/ui/button'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { Separator } from '@/components/ui/separator'
import { gangs } from '@/constants/gangs'
import { useCartStore } from '@/store/use-cart-store'

import { DiscountAlertDialog } from './discount-alert-dialog'

export function Header() {
  const router = useRouter()
  const { cart } = useCartStore()
  const [gangName, setGangName] = useState('')

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0)
  const totalPrice = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  )

  useEffect(() => {
    const gangFromStorage = localStorage.getItem('gang')
    const gangKey = Object.keys(gangs).find(
      (key) => gangs[key].login === gangFromStorage,
    )
    setGangName(gangKey ? gangs[gangKey].name : '')
  }, [])

  const handleLogout = () => {
    localStorage.removeItem('gang')
    router.push('/')
  }

  return (
    <>
      <header className="p-3 border border-green-800 bg-gray-950 flex items-center justify-between text-white">
        <h1 className="text-green-400 font-bold text-lg">
          Bem vindos, {gangName}!
        </h1>

        <div className="flex items-center gap-2">
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="ghost"
                size="default"
                className="hover:bg-gray-800"
              >
                <ShoppingCart className="h-5 w-5 text-green-400" />
                {totalItems > 0 && (
                  <span className="ml-1 text-xs font-bold text-white">
                    {totalItems}
                  </span>
                )}
              </Button>
            </PopoverTrigger>

            <PopoverContent className="w-96 bg-gray-950 border-green-800 text-white rounded-none">
              <h2 className="text-lg font-semibold mb-2">CARRINHO</h2>
              <Separator className="bg-green-800 mb-2" />

              {cart.length === 0 ? (
                <p className="text-green-300 text-sm">CARRINHO_VAZIO</p>
              ) : (
                <>
                  <div className="max-h-60 overflow-y-auto space-y-2 text-sm text-green-200">
                    {cart.map((item) => (
                      <div
                        key={item.id}
                        className="flex justify-between items-center"
                      >
                        <div className="flex flex-col">
                          <span>{item.name}</span>
                          <span>
                            {item.quantity === 1
                              ? `$ ${item.price.toFixed(2)}`
                              : `${item.quantity} x $ ${item.price.toFixed(2)} = $ ${(item.quantity * item.price).toFixed(2)}`}
                          </span>
                        </div>
                        <button
                          onClick={() =>
                            useCartStore.getState().removeFromCart(item.id)
                          }
                          className="text-red-400 text-xs hover:underline ml-2"
                        >
                          <Trash2 className="h-4 w-4 inline" />
                        </button>
                      </div>
                    ))}
                  </div>

                  <Separator className="bg-green-800 my-2" />

                  <div className="flex justify-between text-sm mb-3">
                    <span>Total:</span>
                    <span className="font-semibold">
                      $ {totalPrice.toFixed(2)}
                    </span>
                  </div>

                  <Button
                    variant="outline"
                    className=" text-white text-xs px-4 py-2 bg-gray-950 border border-green-600 hover:bg-green-600 hover:text-white rounded-none w-full"
                    onClick={() => router.push('/store/checkout')}
                  >
                    [FINALIZAR_COMPRA]
                  </Button>
                </>
              )}
            </PopoverContent>
          </Popover>

          <Button
            variant="ghost"
            size="icon"
            className="hover:bg-gray-800"
            onClick={handleLogout}
          >
            <LogOut className="h-5 w-5 text-red-400" />
          </Button>
        </div>
      </header>
      <DiscountAlertDialog />
    </>
  )
}
