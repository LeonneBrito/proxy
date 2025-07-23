'use client'

import { CheckCircle } from 'lucide-react'
import { useEffect, useState } from 'react'

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog'

export function DiscountAlertDialog() {
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const hasSeenDialog = localStorage.getItem('hasSeenDiscountDialog')
    if (!hasSeenDialog) {
      setOpen(true)
      localStorage.setItem('hasSeenDiscountDialog', 'true')
    }
  }, [])

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogContent className="border-green-800 bg-gray-950 text-green-200 font-mono max-w-md mx-auto">
        <AlertDialogHeader className="flex flex-col items-center">
          <CheckCircle className="w-8 h-8 text-green-500 mb-2" />
          <AlertDialogTitle className="text-green-400 text-center text-sm uppercase tracking-wide">
            [TRANSMISSÃO SEGURA - CLASSIFICAÇÃO: CONFIDENCIAL]
          </AlertDialogTitle>
        </AlertDialogHeader>

        <div className="mt-4 space-y-3 text-sm leading-relaxed text-green-300">
          <p>O protocolo de aquisição foi atualizado.</p>
          <p>
            A partir de agora, <strong>descontos progressivos</strong> estão
            ativos.
          </p>
          <p>
            Quanto mais itens você adicionar ao carrinho, menor será o custo por
            unidade. A vantagem aumenta proporcionalmente.
          </p>
          <p>Informação sigilosa. Não compartilhe.</p>
          <p className="text-green-500 font-semibold">
            Apenas os preparados economizam.
          </p>
        </div>

        <AlertDialogFooter className="mt-6">
          <AlertDialogAction
            onClick={() => setOpen(false)}
            className=" text-white text-xs px-4 py-2 bg-gray-950 border border-green-600 hover:bg-green-600 hover:text-white rounded-none w-full"
          >
            [PROSSEGUIR_COM_AQUISIÇÃO]
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
