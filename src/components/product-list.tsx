import Link from 'next/link'

import { products } from '@/constants/products'

export function ProductList() {
  return (
    <div className="space-y-12">
      {products.map((product) => (
        <div
          key={product.id}
          className={
            'border border-green-800 p-6 bg-gray-950 relative' +
            (product.disabled ? ' opacity-50' : '')
          }
        >
          <div className="mb-4">
            <span className="text-xs text-green-400">
              ID_ITEM: {product.id}
            </span>
          </div>

          <h2 className="text-2xl mb-4 text-white">{product.name}</h2>

          <div className="mb-6">
            <p className="text-green-300 leading-relaxed space-y-2">
              {product.description.map((line, index) => (
                <span key={index} className="block">
                  {line}
                </span>
              ))}
            </p>
          </div>

          <div className="mb-6">
            <div className="text-sm text-green-400 mb-2">ESPECIFICAÇÕES:</div>
            <ul className="text-sm text-green-300 space-y-1">
              {product.specs.map((spec, index) => (
                <li key={index}>• {spec}</li>
              ))}
            </ul>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <span className="text-sm text-green-400">PREÇO:</span>
              <span className="text-2xl text-white ml-2">{product.price}</span>
            </div>

            {product?.disabled ? (
              <span className="text-sm text-red-500">EM BREVE</span>
            ) : (
              <Link
                href="/checkout"
                className="bg-green-800 hover:bg-green-700 text-black px-6 py-2 border border-green-400 transition-colors"
              >
                [ADICIONAR_AO_CARRINHO]
              </Link>
            )}
          </div>
          {product.disabled && (
            <div className="absolute top-0 right-0 bg-red-800 text-white text-xs px-2 py-1">
              EM BREVE
            </div>
          )}
        </div>
      ))}
    </div>
  )
}
