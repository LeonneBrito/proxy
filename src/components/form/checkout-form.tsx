"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useCartStore } from "@/store/use-cart-store";
import { formatPhoneNumber } from "@/utils/format-number";

import { Resume } from "../resume";
import { useSession } from "@/lib/auth-client";
import { useChaos } from "../chaos";
import { scramble } from "@/utils/chaos";
import { SkullRain } from "../skull-rain";

type Props = { chaos?: boolean };

const TITLES = [
  "INFORMAÇÕES_DE_PAGAMENTO",
  "SINCRONIZANDO_GATEWAYS",
  "VALIDANDO_CHECKSUM",
  "CRIPTOGRAFANDO PACOTE...",
  "ENFILEIRANDO SOLICITAÇÃO",
];

const PLACEHOLDERS = [
  "(99) 99999-9999",
  "+55 (**) *****-****",
  "###########",
  "(xx) xxxxx-xxxx",
];

export function CheckoutForm({ chaos = false }: Props) {
  const router = useRouter();
  const { data: session } = useSession();
  const { cart, secureContact, setSecureContact, clearCart } = useCartStore();

  useChaos(chaos);

  const [contact2, setContact2] = useState({ name: "", number: "" });
  const [contact3, setContact3] = useState({ name: "", number: "" });
  const [transactionId, setTransactionId] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [title, setTitle] = useState(TITLES[0]);
  const [ph1, setPh1] = useState(PLACEHOLDERS[0]);
  const [ph2, setPh2] = useState(PLACEHOLDERS[1]);
  const [ph3, setPh3] = useState(PLACEHOLDERS[2]);

  const webhookUrl = process.env.NEXT_PUBLIC_DISCORD_WEBHOOK_PAYMENT || "";
  const gang = session?.user.username || "";
  const isValidGang = !!gang;

  useEffect(() => {
    const id = Math.random().toString(36).substring(2, 12);
    setTransactionId(id);
  }, []);

  useEffect(() => {
    if (!chaos) return;
    const t1 = setInterval(() => {
      setTitle((prev) => {
        const next = TITLES[(TITLES.indexOf(prev) + 1) % TITLES.length];
        return Math.random() < 0.35 ? scramble(next) : next;
      });
    }, 2000);

    const t2 = setInterval(
      () =>
        setPh1(PLACEHOLDERS[Math.floor(Math.random() * PLACEHOLDERS.length)]),
      2500
    );
    const t3 = setInterval(
      () =>
        setPh2(PLACEHOLDERS[Math.floor(Math.random() * PLACEHOLDERS.length)]),
      2600
    );
    const t4 = setInterval(
      () =>
        setPh3(PLACEHOLDERS[Math.floor(Math.random() * PLACEHOLDERS.length)]),
      2700
    );

    return () => {
      clearInterval(t1);
      clearInterval(t2);
      clearInterval(t3);
      clearInterval(t4);
    };
  }, [chaos]);

  useEffect(() => {
    if (!chaos) return;
    const id = setInterval(() => {
      if (Math.random() < 0.2) {
        setContact2((c) => ({ ...c, name: contact3.name }));
        setContact3((c) => ({ ...c, name: contact2.name }));
      }
    }, 3000);
    return () => clearInterval(id);
  }, [chaos, contact2.name, contact3.name]);

  const totalPrice = cart.reduce((sum, i) => sum + i.price * i.quantity, 0);

  const generateDiscordMessage = () => {
    const gangName = session?.user.displayUsername || "[NÃO IDENTIFICADA]";

    return [
      "```yaml",
      "💸 NOVO PAGAMENTO RECEBIDO",
      "",
      `🚩 GANGUE: ${gangName}`,
      `🔐 CONTATO_1: ${secureContact.name || "[SEM_NOME]"} (${secureContact.number || "[SEM_NUMERO]"})`,
      `📞 CONTATO_2: ${contact2.name || "[OPCIONAL]"} (${contact2.number || "-"})`,
      `📞 CONTATO_3: ${contact3.name || "[OPCIONAL]"} (${contact3.number || "-"})`,
      `🧾 ID_TRANSAÇÃO: ${transactionId}`,
      "",
      ...cart.map(
        (item) =>
          `🛒 ${item.name} x${item.quantity} — $ ${(item.price * item.quantity).toFixed(2)}`
      ),
      "",
      `💰 VALOR_TOTAL: $ ${totalPrice.toFixed(2)}`,
      "```",
    ].join("\n");
  };

  const handleConfirm = async () => {
    if (!isValidGang) {
      toast.error("Chave pública inválida.");
      return;
    }

    if (!webhookUrl) {
      toast.error("Webhook do Discord não configurado.");
      return;
    }

    setIsSubmitting(true);

    try {
      const message = generateDiscordMessage();

      const res = await fetch(webhookUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ content: message }),
      });

      if (!res.ok) throw new Error("Erro no envio");

      try {
        await fetch("/api/spendings/record", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            gangLogin: session?.user.username || "",
            gangName: session?.user.displayUsername || "",
            amount: Number(totalPrice.toFixed(2)),
            transactionId,
            source: "checkout",
          }),
        });
      } catch (e) {
        console.error("Falha ao gravar no Mongo (seguindo fluxo):", e);
      }

      toast.success("Pagamento registrado com sucesso!");
      localStorage.removeItem("cart-storage");
      clearCart();
      router.push(`checkout/${transactionId}/finish`);
    } catch (err) {
      console.error("Erro ao enviar dados:", err);
      toast.error("Erro ao enviar dados. Tente novamente.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (cart.length === 0) {
    return (
      <div className="max-w-2xl mx-auto text-green-300 text-center py-12">
        CARRINHO_VAZIO
      </div>
    );
  }

  return (
    <>
      {chaos && <SkullRain active />}

      {/* Glitch banner */}
      {chaos && (
        <div className="mb-4 p-2 border border-red-700 bg-gray-950 glitchy">
          <div className="marquee">
            <span>
              ⚠️ BLACKROSE EM MODO DE OBSERVAÇÃO — TUDO SERÁ AUDITADO — NÃO
              PISCAR — {transactionId} —{" "}
            </span>
            <span>
              ⚠️ BLACKROSE EM MODO DE OBSERVAÇÃO — TUDO SERÁ AUDITADO — NÃO
              PISCAR — {transactionId} —{" "}
            </span>
          </div>
        </div>
      )}

      <div className="grid md:grid-cols-2 gap-8 mx-auto text-white mt-8 checkout-area">
        <div className="space-y-6">
          <h1 className={"text-xl font-bold " + (chaos ? "glitchy" : "")}>
            {title}
          </h1>

          <div className="grid grid-cols-2 gap-4">
            <Input
              placeholder="Nome do contato principal (obrigatório)"
              value={secureContact.name}
              onChange={(e) =>
                setSecureContact({ ...secureContact, name: e.target.value })
              }
              className={
                "bg-gray-950 text-white rounded-none " +
                (chaos ? "border-red-600 chaos-shake" : "border-green-600")
              }
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
              className={
                "bg-gray-950 text-white rounded-none " +
                (chaos ? "border-red-600 chaos-shake" : "border-green-600")
              }
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <Input
              placeholder="Nome do segundo contato (opcional)"
              value={contact2.name}
              onChange={(e) =>
                setContact2((prev) => ({ ...prev, name: e.target.value }))
              }
              className={
                "bg-gray-950 text-white rounded-none " +
                (chaos ? "border-red-600 chaos-shake" : "border-green-600")
              }
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
              className={
                "bg-gray-950 text-white rounded-none " +
                (chaos ? "border-red-600 chaos-shake" : "border-green-600")
              }
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <Input
              placeholder="Nome do terceiro contato (opcional)"
              value={contact3.name}
              onChange={(e) =>
                setContact3((prev) => ({ ...prev, name: e.target.value }))
              }
              className={
                "bg-gray-950 text-white rounded-none " +
                (chaos ? "border-red-600 chaos-shake" : "border-green-600")
              }
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
              className={
                "bg-gray-950 text-white rounded-none " +
                (chaos ? "border-red-600 chaos-shake" : "border-green-600")
              }
            />
          </div>

            <div className={"text-xs space-y-1 p-4 bg-gray-950 border " + (chaos ? "border-red-800 chaos-flicker" : "border-green-800")}>
            {chaos ? (
              <>
                <p>• Sinais vitais do backend estão… <span className="glitchy">oscilando</span>.</p>
                <p>• Falhas intermitentes são um recurso.</p>
                <p>• O tempo é uma ilusão. O prazo também.</p>
                <p>• ID_TRANS: {transactionId}</p>
              </>
            ) : (
              <>
                <p>• Pagamento deve ser confirmado em até 24 horas.</p>
                <p>• Todos os contatos devem ser verificáveis.</p>
                <p>• A entrega será confirmada por canal seguro.</p>
                <p>• Dados serão descartados após transação.</p>
              </>
            )}
          </div>

          <Button
            onClick={handleConfirm}
            disabled={
              isSubmitting ||
              !secureContact?.name?.trim() ||
              !secureContact.number?.trim() ||
              !isValidGang
            }
            className={
              "text-white text-xs px-4 py-2 bg-gray-950 rounded-none w-full transition-transform " +
              (chaos
                ? "border border-red-600 hover:bg-red-700 hover:text-white chaos-avoid"
                : "border border-green-600 hover:bg-green-600 hover:text-white")
            }
          >
            {isSubmitting ? "[ENVIANDO...]" : "[CONFIRMAR_COMPRA]"}
          </Button>
        </div>
        <div className={chaos ? "chaos-hue" : ""}>
          <Resume />
        </div>
      </div>
    </>
  );
}
