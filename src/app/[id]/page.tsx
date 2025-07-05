import { Navigation } from 'lucide-react'
import Link from 'next/link'

import { MapInterface } from '@/components/map-interface'

export default async function Page({
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

      <main className="max-w-4xl mx-auto p-4 flex flex-col gap-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="bg-gray-950 p-4 border border-green-800 shadow-lg">
            <h2 className="text-lg mb-4 text-white flex items-center gap-2">
              <Navigation size={20} />
              ROTA_ATUAL
            </h2>
            <div className="text-sm text-green-400 space-y-2">
              <p className="flex items-center gap-2">
                <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse shadow-[0_0_8px_2px_rgba(34,197,94,0.7)]" />
                ID da rota: <span className="text-green-300">{id}</span>
              </p>
              <p className="flex items-center gap-2">
                <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse shadow-[0_0_8px_2px_rgba(34,197,94,0.7)]" />
                Status: <span className="text-green-300">ATIVA</span>
              </p>
              <p className="flex items-center gap-2">
                <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse shadow-[0_0_8px_2px_rgba(34,197,94,0.7)]" />
                Última atualização:{' '}
                <span className="text-green-300">
                  {new Date().toLocaleTimeString()}
                </span>
              </p>
              <p className="flex items-center gap-2">
                <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse shadow-[0_0_8px_2px_rgba(34,197,94,0.7)]" />
                Duração estimada:{' '}
                <span className="text-green-300">5 MINUTOS</span>
              </p>
            </div>
          </div>
          <div className="bg-gray-950 p-4 border border-green-800 shadow-lg">
            <h2 className="text-lg mb-4 text-white flex items-center gap-2">
              <Navigation size={20} />
              INSTRUÇÕES_ESPECIAIS
            </h2>
            <div className="text-sm text-green-400 space-y-2">
              <p>• Entrega apenas em coordenadas seguras</p>
              <p>• Apenas dinheiro ou criptomoedas</p>
              <p>• Sem identificação pessoal necessária</p>
              <p>• Código de verificação: #UHJveHk=</p>
            </div>
          </div>
        </div>
        <MapInterface mapId={id} />
        <div className="p-4 border border-green-800 bg-gray-950">
          <div className="flex items-center gap-2 mb-2">
            <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse shadow-[0_0_8px_2px_rgba(34,197,94,0.7)]" />
            <span className="animate-pulse text-green-400 drop-shadow-[0_0_6px_rgba(34,197,94,0.8)]">
              AVISO_SEGURANÇA
            </span>
          </div>
          <p className="text-xs text-green-300">
            Você acessou uma zona de observação restrita. Todas as rotas estão
            sendo mascaradas em tempo real através de túneis criptográficos. Em
            caso de comprometimento, o sistema entrará em modo de
            autoeliminação. Não fale. Não pergunte. Apenas observe.
          </p>
        </div>
      </main>
    </div>
  )
}
