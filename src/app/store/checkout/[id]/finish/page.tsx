import { CheckCircle, Shield } from "lucide-react";
import Link from "next/link";

import { Countdown } from "@/components/countdown";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export default async function FinishOrderPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user) {
    redirect("/");
  }

  const { id } = await params;

  return (
    <div className="min-h-screen bg-gray-950 text-green-400 font-mono">
      <div className="max-w-4xl mx-auto flex items-center justify-between p-4">
        <Link
          href="/store"
          className="text-sm hover:text-green-300 transition-colors"
        >
          [RETORNAR_À_LOJA]
        </Link>
      </div>
      <main className="max-w-4xl mx-auto p-4 mt-8">
        <div className="mb-8 p-6 border border-green-800 bg-gray-950 text-center">
          <div className="flex justify-center mb-4">
            <CheckCircle size={64} className="text-green-400" />
          </div>
          <h2 className="text-2xl text-white mb-2">TRANSAÇÃO_CONFIRMADA</h2>
          <p className="text-green-300">
            Sua operação foi concluída com sucesso e segurança.
          </p>

          <div className="w-full mt-4 p-3 bg-gray-950 border border-green-800 inline-block">
            <span className="text-xs text-green-600">ID_DE_CONFIRMAÇÃO:</span>
            <span className="text-white ml-2 font-bold">{id}</span>
          </div>
        </div>

        <div className="border border-green-800 p-4 bg-gray-950">
          <div className="flex items-center gap-2 mb-3">
            <Shield size={20} className="text-green-400" />
            <span className="text-lg text-white">PROTOCOLO_DE_SEGURANÇA</span>
          </div>

          <div className="text-xs text-green-300 space-y-2">
            <p>✓ Transação protegida com criptografia de nível militar.</p>
            <p>
              ✓ Todos os dados sensíveis serão apagados automaticamente em 72
              horas.
            </p>
            <p>✓ A entrega seguirá os padrões avançados de segurança.</p>
            <p className="text-yellow-400 font-semibold">
              ⚠ Esta página será desativada permanentemente após 24 horas por
              motivos de segurança.
            </p>
          </div>
        </div>

        <Countdown />
      </main>
    </div>
  );
}
