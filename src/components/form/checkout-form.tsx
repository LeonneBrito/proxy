'use client'

import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { toast } from 'sonner'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { gangs } from '@/constants/gangs'
import { useCartStore } from '@/store/use-cart-store'
import { formatPhoneNumber } from '@/utils/format-number'

import { Resume } from '../resume'

export function CheckoutForm() {
  const router = useRouter()
  const { cart, secureContact, setSecureContact, clearCart } = useCartStore()

  const [contact2, setContact2] = useState({ name: '', number: '' })
  const [contact3, setContact3] = useState({ name: '', number: '' })
  const [transactionId, setTransactionId] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const webhookUrl = process.env.NEXT_PUBLIC_DISCORD_WEBHOOK_PAYMENT || ''
  const gang =
    typeof window !== 'undefined'
      ? Object.values(gangs).find(
          (g) => g.login === localStorage.getItem('gang'),
        )
      : undefined
  const isValidGang = !!gang

  useEffect(() => {
    const id = Math.random().toString(36).substring(2, 12)
    setTransactionId(id)
  }, [])

  const totalPrice = cart.reduce((sum, i) => sum + i.price * i.quantity, 0)

  const generateDiscordMessage = () => {
    const gangName = gang?.name || '[NÃO IDENTIFICADA]'

    return [
      '```yaml',
      '💸 NOVO PAGAMENTO RECEBIDO',
      '',
      `🚩 GANGUE: ${gangName}`,
      `🔐 CONTATO_1: ${secureContact.name || '[SEM_NOME]'} (${secureContact.number || '[SEM_NUMERO]'})`,
      `📞 CONTATO_2: ${contact2.name || '[OPCIONAL]'} (${contact2.number || '-'})`,
      `📞 CONTATO_3: ${contact3.name || '[OPCIONAL]'} (${contact3.number || '-'})`,
      `🧾 ID_TRANSAÇÃO: ${transactionId}`,
      '',
      ...cart.map(
        (item) =>
          `🛒 ${item.name} x${item.quantity} — $ ${(item.price * item.quantity).toFixed(2)}`,
      ),
      '',
      `💰 VALOR_TOTAL: $ ${totalPrice.toFixed(2)}`,
      '```',
    ].join('\n')
  }

  const handleConfirm = async () => {
    if (!isValidGang) {
      toast.error('Chave pública inválida.')
      return
    }

    if (!webhookUrl) {
      toast.error('Webhook do Discord não configurado.')
      return
    }

    setIsSubmitting(true)

    try {
      const message = generateDiscordMessage()

      const res = await fetch(webhookUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ content: message }),
      })

      if (!res.ok) throw new Error('Erro no envio')

      toast.success('Pagamento registrado com sucesso!')
      localStorage.removeItem('cart-storage')
      router.push(`checkout/${transactionId}/finish`)
      clearCart()
    } catch (err) {
      console.error('Erro ao enviar dados:', err)
      toast.error('Erro ao enviar dados. Tente novamente.')
    } finally {
      setIsSubmitting(false)
    }
  }

  if (cart.length === 0) {
    return (
      <div className="max-w-2xl mx-auto text-green-300 text-center py-12">
        CARRINHO_VAZIO
      </div>
    )
  }

  return (
    <div className="grid md:grid-cols-2 gap-8 mx-auto text-white mt-8">
      <div className="space-y-6">
        <h1 className="text-xl font-bold text-white">
          INFORMAÇÕES_DE_PAGAMENTO
        </h1>

        <div className="grid grid-cols-2 gap-4">
          <Input
            placeholder="Nome do contato principal (obrigatório)"
            value={secureContact.name}
            onChange={(e) =>
              setSecureContact({ ...secureContact, name: e.target.value })
            }
            className="bg-gray-950 border-green-600 text-white rounded-none"
          />
          <Input
            placeholder="(99) 99999-9999 (obrigatório)"
            value={secureContact.number}
            onChange={(e) =>
              setSecureContact({
                ...secureContact,
                number: formatPhoneNumber(e.target.value),
              })
            }
            className="bg-gray-950 border-green-600 text-white rounded-none"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <Input
            placeholder="Nome do segundo contato (opcional)"
            value={contact2.name}
            onChange={(e) =>
              setContact2((prev) => ({ ...prev, name: e.target.value }))
            }
            className="bg-gray-950 border-green-600 text-white rounded-none"
          />
          <Input
            placeholder="(99) 99999-9999 (opcional)"
            value={contact2.number}
            onChange={(e) =>
              setContact2((prev) => ({
                ...prev,
                number: formatPhoneNumber(e.target.value),
              }))
            }
            className="bg-gray-950 border-green-600 text-white rounded-none"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <Input
            placeholder="Nome do terceiro contato (opcional)"
            value={contact3.name}
            onChange={(e) =>
              setContact3((prev) => ({ ...prev, name: e.target.value }))
            }
            className="bg-gray-950 border-green-600 text-white rounded-none"
          />
          <Input
            placeholder="(99) 99999-9999 (opcional)"
            value={contact3.number}
            onChange={(e) =>
              setContact3((prev) => ({
                ...prev,
                number: formatPhoneNumber(e.target.value),
              }))
            }
            className="bg-gray-950 border-green-600 text-white rounded-none"
          />
        </div>

        <div className="text-xs text-green-400 space-y-1 border border-green-800 p-4 bg-gray-950">
          <p>• Pagamento deve ser confirmado em até 24 horas.</p>
          <p>• Todos os contatos devem ser verificáveis.</p>
          <p>• A entrega será confirmada por canal seguro.</p>
          <p>• Dados serão descartados após transação.</p>
        </div>

        <Button
          onClick={handleConfirm}
          disabled={
            isSubmitting ||
            !secureContact?.name?.trim() ||
            !secureContact.number?.trim() ||
            !isValidGang
          }
          className=" text-white text-xs px-4 py-2 bg-gray-950 border border-green-600 hover:bg-green-600 hover:text-white rounded-none w-full"
        >
          {isSubmitting ? '[ENVIANDO...]' : '[CONFIRMAR_COMPRA]'}
        </Button>
      </div>
      <Resume />
    </div>
  )
}
