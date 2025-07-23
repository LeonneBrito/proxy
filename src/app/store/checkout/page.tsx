import type { Metadata } from 'next'
import Link from 'next/link'

import { CheckoutForm } from '@/components/form/checkout-form'

export const metadata: Metadata = {
  title: 'Checkout',
  description: 'Finalize sua compra de forma segura e anônima',
}

export default function CheckoutPage() {
  return (
    <div className="min-h-screen bg-gray-950 text-green-400 font-mono">
      <div className="max-w-6xl not-only:mx-auto flex items-center justify-between p-4">
        <Link
          href="/store"
          className="text-sm hover:text-green-300 transition-colors"
        >
          [RETORNAR_À_LOJA]
        </Link>
      </div>
      <main className="max-w-6xl mx-auto p-4">
        <CheckoutForm />
        <div className="mt-8 p-4 border border-green-800 bg-gray-950">
          <div className="flex items-center gap-2 mb-2">
            <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse shadow-[0_0_8px_2px_rgba(34,197,94,0.7)]" />
            <span className="animate-pulse text-green-400 drop-shadow-[0_0_6px_rgba(34,197,94,0.8)]">
              AVISO_SEGURANÇA
            </span>
          </div>
          <p className="text-xs text-green-300">
            Esta transação será processada através de múltiplas camadas de
            proxy. Sua identidade e localização permanecem completamente
            anônimas. Todos os dados são criptografados e automaticamente
            eliminados após 72 horas.
          </p>
        </div>
      </main>
    </div>
  )
}
