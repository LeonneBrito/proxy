import { CheckCircle, Clock, MapPin, Package, Shield } from 'lucide-react'
import Link from 'next/link'

export default async function FinishOrderPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params

  return (
    <div className="min-h-screen bg-gray-950 text-green-400 font-mono">
      <div className="max-w-4xl mx-auto flex items-center justify-between p-4">
        <Link
          href="/"
          className="text-sm hover:text-green-300 transition-colors"
        >
          [VOLTAR_À_LOJA]
        </Link>
      </div>
      <main className="max-w-4xl mx-auto p-4 mt-8">
        <div className="mb-8 p-6 border border-green-800 bg-gray-950 text-center">
          <div className="flex justify-center mb-4">
            <CheckCircle size={64} className="text-green-400" />
          </div>
          <h2 className="text-2xl text-white mb-2">PEDIDO_CONFIRMADO</h2>
          <p className="text-green-300">
            Sua transação foi processada com segurança
          </p>

          <div className="mt-4 p-3 bg-gray-950 border border-green-800 inline-block">
            <span className="text-xs text-green-600">ID_CONFIRMAÇÃO:</span>
            <span className="text-white ml-2 font-bold">{id}</span>
          </div>
        </div>

        <div className="border border-green-800 p-6 bg-gray-950 mb-8">
          <h3 className="text-lg mb-4 text-white flex items-center gap-2">
            <MapPin size={20} />
            INFORMAÇÕES_ENTREGA
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <div className="space-y-3 text-sm">
                <div className="flex items-center gap-2">
                  <Clock size={16} className="text-green-400" />
                  <span className="text-green-600">TEMPO_ESTIMADO:</span>
                  <span className="text-white">24-48 HORAS</span>
                </div>
                <div className="flex items-center gap-2">
                  <Package size={16} className="text-green-400" />
                  <span className="text-green-600">MÉTODO_ENTREGA:</span>
                  <span className="text-white">CORREIO_SEGURO</span>
                </div>
                <div className="flex items-center gap-2">
                  <Shield size={16} className="text-green-400" />
                  <span className="text-green-600">CÓDIGO_RASTREAMENTO:</span>
                  <span className="text-white">{id}</span>
                </div>
              </div>
            </div>

            <div className="bg-gray-950 border border-green-800 p-4">
              <div className="text-xs text-green-600 space-y-1">
                <p>• Entrega será feita nas coordenadas fornecidas</p>
                <p>• Confirmação via canal criptografado</p>
                <p>• Agente de entrega: ANÔNIMO</p>
                <p>• Código de verificação será enviado</p>
              </div>
            </div>
          </div>
        </div>

        <div className="border border-green-800 p-4 bg-gray-950">
          <div className="flex items-center gap-2 mb-3">
            <Shield size={20} className="text-green-400" />
            <span className="text-lg text-white">AVISO_SEGURANÇA_FINAL</span>
          </div>

          <div className="text-xs text-green-300 space-y-2">
            <p>
              ✓ Sua transação foi processada com criptografia de nível militar
            </p>
            <p>
              ✓ Todos os dados pessoais serão automaticamente eliminados em 72
              horas
            </p>
            <p>
              ✓ O produto será entregue conforme especificações de segurança
            </p>
            <p>✓ Mantenha os códigos de verificação em local seguro</p>
            <p className="text-yellow-400 font-semibold">
              ⚠ Esta página será inacessível após 24 horas por motivos de
              segurança
            </p>
          </div>
        </div>

        <div className="mt-6 p-4 border border-yellow-500 bg-gray-950 text-center">
          <div className="text-yellow-400 font-bold text-lg">
            AUTO_DESTRUIÇÃO_ATIVA
          </div>
          <div className="text-yellow-300 text-sm mt-1">
            Esta página será eliminada em:{' '}
            <span className="font-mono">23:42:15</span>
          </div>
          <div className="text-xs text-yellow-600 mt-2">
            Faça o download de todos os arquivos necessários antes do prazo
          </div>
        </div>
      </main>
    </div>
  )
}
