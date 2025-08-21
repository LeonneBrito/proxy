import type { Metadata } from "next";
import Link from "next/link";
import { CheckoutForm } from "@/components/form/checkout-form";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { ChaosLayer } from "@/components/chaos";

export const metadata: Metadata = {
  title: "Checkout",
  description: "Finalize sua compra de forma segura e anônima",
};

export default async function CheckoutPage() {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session?.user) redirect("/");

  const gang = session.user.username?.toLowerCase() || "";
  const isBlackrose = gang === "blackrose";

  return (
    <div className={"min-h-screen font-mono " + (isBlackrose ? "bg-gray-950 text-red-400" : "bg-gray-950 text-green-400")}>
      {/* Liga Chaos overlay */}
      <ChaosLayer active={isBlackrose} />

      <div className="max-w-6xl not-only:mx-auto flex items-center justify-between p-4">
        <Link
          href="/store"
          className={"text-sm transition-colors " + (isBlackrose ? "hover:text-red-300" : "hover:text-green-300")}
        >
          [RETORNAR_À_LOJA]
        </Link>
      </div>

      <main className="max-w-6xl mx-auto p-4">
        {/* Passe a flag pro form */}
        <CheckoutForm chaos={isBlackrose} />

        <div className={"mt-8 p-4 border bg-gray-950 " + (isBlackrose ? "border-red-800 chaos-flicker" : "border-green-800")}>
          <div className="flex items-center gap-2 mb-2">
            <span
              className={
                "w-2 h-2 rounded-full animate-pulse shadow-[0_0_8px_2px_rgba(34,197,94,0.7)] " +
                (isBlackrose ? "bg-red-400" : "bg-green-400")
              }
            />
            <span className={"animate-pulse drop-shadow-[0_0_6px_rgba(34,197,94,0.8)] " + (isBlackrose ? "text-red-400" : "text-green-400")}>
              AVISO_SEGURANÇA
            </span>
          </div>
          <p className={"text-xs " + (isBlackrose ? "text-red-300 chaos-hue" : "text-green-300")}>
            Esta transação será processada através de múltiplas camadas de proxy. Sua identidade e localização permanecem
            completamente anônimas. Todos os dados são criptografados e automaticamente eliminados após 72 horas.
          </p>
        </div>
      </main>
    </div>
  );
}