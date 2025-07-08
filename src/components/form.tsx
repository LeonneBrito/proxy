'use client'

import { useEffect, useState } from 'react'
import { toast } from 'sonner'

import { gangs } from '@/constants/gangs'
import { usePaymentFormStore } from '@/store/use-payment-form-state'

export function Form() {
  const {
    publicKey,
    secureContact,
    pendriveQty,
    notebookQty,
    setPublicKey,
    setSecureContact,
    setPendriveQty,
    setNotebookQty,
  } = usePaymentFormStore()

  const [transactionId, setTransactionId] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const webhookUrl = process.env.NEXT_PUBLIC_DISCORD_WEBHOOK_PAYMENT || ''
  const isValidGang = Object.values(gangs).some((g) => g.hash === publicKey)

  useEffect(() => {
    const id = Math.random().toString(36).substring(2, 15)
    setTransactionId(id)
  }, [])

  const generateDiscordMessage = () => {
    const gang = Object.values(gangs).find((g) => g.hash === publicKey)
    const gangName = gang?.name || 'NÃO SELECIONADA'
    const prices = gang?.prices || { pendrive: 0, notebook: 0 }
    const pendriveTotal = prices.pendrive * pendriveQty
    const notebookTotal = prices.notebook * notebookQty
    const total = pendriveTotal + notebookTotal

    return [
      '```yaml',
      '💸 NOVO PAGAMENTO RECEBIDO',
      '',
      `🚩 GANGUE: ${gangName}`,
      `🔑 CHAVE_PÚBLICA: ${publicKey || '[NÃO INFORMADA]'}`,
      `🔐 CONTATO_SEGURO: ${secureContact || '[NÃO INFORMADO]'}`,
      `🧾 ID_TRANSAÇÃO: ${transactionId}`,
      `📦 QTD. PENDRIVES: ${pendriveQty}`,
      `💻 QTD. NOTEBOOKS: ${notebookQty}`,
      `💰 VALOR_TOTAL: ${total.toLocaleString('en-US', {
        style: 'currency',
        currency: 'USD',
      })}`,
      '',
      '```',
    ].join('\n')
  }

  const handleConfirmPurchase = async () => {
    if (!publicKey.trim() || !secureContact.trim() || !transactionId.trim()) {
      toast.error(
        'Todos os campos devem ser preenchidos antes de confirmar a compra.',
      )
      return
    }

    const gang = Object.values(gangs).find((g) => g.hash === publicKey)
    if (!gang) {
      toast.error('Tem certeza que deveria estar aqui?')
      return
    }

    if (!webhookUrl) {
      toast.error(
        'Webhook do Discord não configurado. Verifique o arquivo .env.',
      )
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

      if (!res.ok) throw new Error('Tem certeza que deveria estar aqui?')

      toast.success('A UHJveHk= agradece pelo seu bom gosto!')
    } catch (err) {
      console.error(err)
      toast.error('Tem certeza que deveria estar aqui?')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="border border-green-800 p-6 bg-gray-950">
      <h2 className="text-lg mb-6 text-white">DETALHES_PAGAMENTO</h2>

      <form className="space-y-6">
        <div>
          <label className="block text-sm text-green-600 mb-2">
            CHAVE_PÚBLICA:
          </label>
          <input
            type="text"
            className="w-full bg-gray-950 border border-green-800 p-3 text-green-400 font-mono text-sm focus:border-green-400 focus:outline-none"
            placeholder="1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa"
            value={publicKey}
            onChange={(e) => setPublicKey(e.target.value)}
          />
        </div>

        <div>
          <label className="block text-sm text-green-600 mb-2">
            QUANTIDADE_PENDRIVES:
          </label>
          <input
            type="number"
            min="0"
            className="w-full bg-gray-950 border border-green-800 p-3 text-green-400 font-mono text-sm focus:border-green-400 focus:outline-none"
            value={pendriveQty}
            onChange={(e) => setPendriveQty(Number(e.target.value))}
          />
        </div>

        <div>
          <label className="block text-sm text-green-600 mb-2">
            QUANTIDADE_NOTEBOOKS:
          </label>
          <input
            type="number"
            min="0"
            className="w-full bg-gray-950 border border-green-800 p-3 text-green-400 font-mono text-sm focus:border-green-400 focus:outline-none"
            value={notebookQty}
            onChange={(e) => setNotebookQty(Number(e.target.value))}
          />
        </div>

        <div>
          <label className="block text-sm text-green-600 mb-2">
            ID_TRANSAÇÃO:
          </label>
          <input
            type="text"
            className="w-full bg-gray-950 border border-green-800 p-3 text-green-400 font-mono text-sm focus:border-green-400 focus:outline-none"
            value={transactionId}
            readOnly
          />
        </div>

        <div>
          <label className="block text-sm text-green-600 mb-2">
            CONTATO_SEGURO:
          </label>
          <input
            type="text"
            className="w-full bg-gray-950 border border-green-800 p-3 text-green-400 font-mono text-sm focus:border-green-400 focus:outline-none"
            placeholder="(205) 709-7437"
            value={secureContact}
            onChange={(e) => setSecureContact(e.target.value)}
          />
        </div>

        <div className="border border-green-800 p-4 bg-gray-950">
          <div className="text-xs text-green-400 space-y-1">
            <p>• Pagamento deve ser confirmado em 24 horas</p>
            <p>• Todas as comunicações serão criptografadas</p>
            <p>• Confirmação de entrega necessária via canal seguro</p>
            <p>• Nenhuma informação pessoal será armazenada</p>
          </div>
        </div>

        <button
          type="button"
          onClick={handleConfirmPurchase}
          disabled={
            isSubmitting ||
            !publicKey.trim() ||
            !secureContact.trim() ||
            !transactionId.trim() ||
            !isValidGang
          }
          className="w-full bg-green-800 hover:bg-green-700 text-black py-4 border border-green-400 transition-colors text-lg font-bold disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting ? '[ENVIANDO...]' : '[CONFIRMAR_COMPRA]'}
        </button>
      </form>
    </div>
  )
}
