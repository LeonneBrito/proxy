/* eslint-disable react/no-unescaped-entities */
import Link from 'next/link'

export function ProductList() {
  return (
    <div className="space-y-12">
      {/* Produto 1 */}
      <div className="border border-green-800 p-6 bg-gray-950">
        <div className="mb-4">
          <span className="text-xs text-green-400">ID_ITEM: #7F3A9B2C</span>
        </div>

        <h2 className="text-2xl mb-4 text-white">
          PENDRIVE_SUMMERELETROHITS_2025
        </h2>

        <div className="mb-6">
          <p className="text-green-300 leading-relaxed">
            Pendrive exclusivo com os maiores hits do verão 2025.
            <br />
            Criptografia AES 256-bit. Segurança em nível de hardware.
            <br />
            Capacidade: 128GB. Carcaça resistente à violação.
            <br />
            Sem registros. Sem rastros. Anonimato completo.
          </p>
        </div>

        <div className="mb-6">
          <div className="text-sm text-green-400 mb-2">ESPECIFICAÇÕES:</div>
          <ul className="text-sm text-green-300 space-y-1">
            <li>• Interface USB 3.0</li>
            <li>• 500+ faixas exclusivas</li>
            <li>• Qualidade lossless FLAC</li>
            <li>• Carcaça à prova d&apos;água</li>
          </ul>
        </div>

        <div className="flex items-center justify-between">
          <div>
            <span className="text-sm text-green-400">PREÇO:</span>
            <span className="text-2xl text-white ml-2">
              U2FsdGVkX1+q3J8n5k9vQw==
            </span>
          </div>

          <Link
            href="/checkout"
            className="bg-green-800 hover:bg-green-700 text-black px-6 py-2 border border-green-400 transition-colors"
          >
            [ADICIONAR_AO_CARRINHO]
          </Link>
        </div>
      </div>

      {/* Produto 2 - Indisponível */}
      <div className="border border-green-800 p-6 bg-gray-950 opacity-50 relative">
        <div className="mb-4">
          <span className="text-xs text-green-400">ID_ITEM: #ATMDOOM42</span>
        </div>

        <h2 className="text-2xl mb-4 text-white">NOTEBOOK_GAMER_ATM_EDITION</h2>

        <div className="mb-6">
          <p className="text-green-300 leading-relaxed">
            Notebook projetado para rodar *DOOM* até em um caixa eletrônico.
            <br />
            Overclock automático, BIOS customizada. Inicialização em 3 segundos.
            <br />
            Ideal para operações discretas ou nostalgia com agressividade.
            <br />
            Construído para aguentar o inferno. Literalmente.
          </p>
        </div>

        <div className="mb-6">
          <div className="text-sm text-green-400 mb-2">ESPECIFICAÇÕES:</div>
          <ul className="text-sm text-green-300 space-y-1">
            <li>• CPU: AMD Ryzen 9 9900HX (16 núcleos)</li>
            <li>• GPU: RTX 5090M - Edição Militar</li>
            <li>• RAM: 64GB DDR6</li>
            <li>• Armazenamento: 2TB NVMe Encriptado</li>
            <li>• Tela: OLED 17" Anti-vigilância</li>
            <li>
              • Compatível com terminais bancários e caixas de supermercado
            </li>
          </ul>
        </div>

        <div className="flex items-center justify-between">
          <div>
            <span className="text-sm text-green-400">PREÇO:</span>
            <span className="text-2xl text-white ml-2">
              U2FsdGVkX1+d00mH4ck3dV4lu3==
            </span>
          </div>

          <button
            disabled
            className="bg-gray-700 text-gray-400 px-6 py-2 border border-gray-500 cursor-not-allowed"
          >
            [INDISPONÍVEL]
          </button>
        </div>

        <div className="absolute top-0 right-0 bg-red-800 text-white text-xs px-2 py-1">
          EM BREVE
        </div>
      </div>
    </div>
  )
}
