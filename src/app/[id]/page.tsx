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
      <main className="max-w-4xl mx-auto p-4">
        <MapInterface mapId={id} />
        <div className="mt-8 p-4 border border-green-800 bg-gray-950">
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
