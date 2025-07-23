/* eslint-disable @next/next/no-img-element */
'use client'

import { useEffect, useState } from 'react'

import { allyGangs } from '@/constants/gangs'
import { products } from '@/constants/products'
import { useCartStore } from '@/store/use-cart-store'

import { Button } from './ui/button'
import { Input } from './ui/input'

export function ProductList() {
  const { addToCart } = useCartStore()
  const [quantities, setQuantities] = useState<Record<string, number>>({})
  const [gang, setGang] = useState<string | null>(null)

  useEffect(() => {
    const storedGang = localStorage.getItem('gang')
    setGang(storedGang)
  }, [])

  const isAlly = gang ? allyGangs.includes(gang.toLowerCase()) : false

  const handleQuantityChange = (id: string, value: number) => {
    setQuantities((prev) => ({
      ...prev,
      [id]: value,
    }))
  }

  const handleAddToCart = (product: (typeof products)[0]) => {
    const quantity = quantities[product.id] || 1
    const price = isAlly ? product.price.ally : product.price.notAlly

    addToCart(
      {
        id: product.id,
        name: product.name,
        price,
      },
      quantity,
    )

    setQuantities((prev) => ({ ...prev, [product.id]: 1 }))
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
      {products.map((product) => {
        const price = isAlly ? product.price.ally : product.price.notAlly

        return (
          <div
            key={product.id}
            className={
              'relative border border-green-800 bg-gray-950 overflow-hidden shadow-lg flex flex-col' +
              (product.disabled ? ' opacity-50' : '')
            }
          >
            <div className="h-48 bg-gray-800 flex items-center justify-center">
              <img
                src={product.image}
                alt={product.name}
                className="object-cover h-full w-full"
              />
            </div>

            <div className="flex-1 flex flex-col p-4">
              <div className="mb-2">
                <span className="text-xs text-green-400">
                  ID_ITEM: {product.id}
                </span>
              </div>

              <h2 className="font-semibold mb-2 text-white">{product.name}</h2>

              <div className="mb-2">
                <p className="text-green-300 text-xs">
                  {product.description[0]}
                </p>
              </div>

              <div className="mb-2">
                <div className="text-xs text-green-400">ESPECIFICAÇÕES:</div>
                <ul className="text-xs text-green-300 list-disc list-inside">
                  {product.specs.slice(0, 2).map((spec, index) => (
                    <li key={index}>{spec}</li>
                  ))}
                </ul>
              </div>

              {!product.disabled && (
                <div className="flex items-center justify-between mt-auto">
                  <div>
                    <span className="text-xs text-green-400">PREÇO:</span>
                    <span className="text-white ml-2">${price}</span>
                  </div>
                </div>
              )}

              {!product.disabled && (
                <div className="mt-4 flex items-center gap-2">
                  <Input
                    type="number"
                    min={1}
                    className="w-16 px-2 py-1 text-sm text-white bg-gray-950 border border-green-600 rounded-none"
                    value={quantities[product.id] ?? 1}
                    onChange={(e) =>
                      handleQuantityChange(product.id, parseInt(e.target.value))
                    }
                  />
                  <Button
                    variant="outline"
                    className="text-white text-xs px-4 py-2 bg-gray-950 border border-green-600 hover:bg-green-600 hover:text-white rounded-none"
                    onClick={() => handleAddToCart(product)}
                  >
                    [ADICIONAR_AO_CARRINHO]
                  </Button>
                </div>
              )}
            </div>

            {product.disabled && (
              <div className="absolute top-2 right-2 bg-red-800 text-white text-xs px-2 py-1 rounded">
                EM BREVE
              </div>
            )}
          </div>
        )
      })}
    </div>
  )
}
