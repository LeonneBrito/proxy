"use client";
import { useState } from "react";
import { toast } from "sonner";
import { allyGangs } from "@/constants/gangs";
import { useCartStore } from "@/store/use-cart-store";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { useSession } from "@/lib/auth-client";
import { products } from "@/constants/products";
import { ChaosLayer } from "./chaos";

export function ProductList() {
  const { addToCart } = useCartStore();
  const { data: session } = useSession();
  const [quantities, setQuantities] = useState<Record<string, number>>({});
  const gang = session?.user.username || "";
  const isAlly = session?.user.username ? allyGangs.includes(gang.toLowerCase()) : false;
  const isCyber = gang?.toLowerCase() === "cyberdystopia";
  const isBlackrose = gang?.toLowerCase() === "blackrose"; // << adiciona

  // limites Cyber (mantidos)
  const cyberLimits: Record<string, number> = {
    PENDRIVE_SUMMERELETROHITS_2025: 2,
    NOTEBOOK_GAMER_ATM_EDITION: 1,
    LAPTOP_CARRO_FORTE_EDITION: 1,
  };

  const handleQuantityChange = (id: string, value: number) => {
    const product = products.find((p) => p.id === id);
    if (!product) return;

    const limit = isCyber ? cyberLimits[product.name] : null;

    // modo chato: às vezes reduz a qtd (irritante porém inofensivo)
    const maybeAnnoyedValue = isBlackrose && Math.random() < 0.25 ? Math.max(1, value - 1) : value;

    if (limit && maybeAnnoyedValue > limit) {
      toast.error(`Limite de ${limit} unidade(s) para ${product.name} (Cyber Dystopia)`);
      return;
    }

    setQuantities((prev) => ({
      ...prev,
      [id]: maybeAnnoyedValue,
    }));
  };

  const handleAddToCart = (product: (typeof products)[0]) => {
    const quantity = quantities[product.id] || 1;
    const basePrice = isAlly ? product.price.ally : product.price.notAlly;

    // “taxa” de irritação visual (não precisa persistir em backend)
    const price = isBlackrose ? Math.round(basePrice * 1.07) : basePrice;

    const limit = isCyber ? cyberLimits[product.name] : null;
    if (limit && quantity > limit) {
      alert(`Limite de ${limit} unidade(s) para ${product.name} (Cyber Dystopia)`);
      return;
    }

    // às vezes mostra erro falso antes de adicionar
    if (isBlackrose && Math.random() < 0.28) {
      toast("ERRO_403: PERMISSÃO_NEGADA", { description: "Tente novamente ☠️", duration: 1500 });
      return;
    }

    addToCart({ id: product.id, name: product.name, price }, quantity);
    setQuantities((prev) => ({ ...prev, [product.id]: 1 }));

    if (isBlackrose) toast.success("ITEM_ADICIONADO* (acho)", { duration: 900 });
  };

  if (!products || products.length === 0) {
    return <div className="text-center text-gray-500">Nenhum produto disponível no momento.</div>;
  }

  return (
    <>
      {/* LIGA CHAOS QUANDO BLACKROSE */}
      <ChaosLayer active={isBlackrose} /> {/* << adiciona */}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {products.map((product) => {
          const displayPrice = isAlly ? product.price?.ally : product.price?.notAlly;
          const price = isBlackrose ? Math.round(displayPrice * 1.07) : displayPrice; // leve “taxa” visual

          return (
            <div
              key={product.id}
              className={
                "relative border bg-gray-950 overflow-hidden shadow-lg flex flex-col " +
                (product.disabled ? " opacity-50 " : "") +
                (isBlackrose ? " border-red-700 chaos-card chaos-flicker " : " border-green-800 ")
              }
            >
              <div className="h-64 bg-gray-800 flex items-center justify-center">
                <img
                  src={product.image}
                  alt={product.name}
                  className={"object-cover h-full w-full max-w-full object-center " + (isBlackrose ? "chaos-img-flip" : "")}
                />
              </div>

              <div className="flex-1 flex flex-col p-4">
                <div className="mb-2">
                  <span className={"text-xs " + (isBlackrose ? "text-red-400" : "text-green-400")}>
                    ID_ITEM: {product.id}
                  </span>
                </div>

                <h2 className="font-semibold mb-2 text-white break-words">
                  {product.name}
                </h2>

                <div className="mb-2">
                  <p className={"text-xs " + (isBlackrose ? "text-red-300" : "text-green-300")}>
                    {product.description[0]}
                  </p>
                </div>

                <div className="mb-2">
                  <div className={"text-xs " + (isBlackrose ? "text-red-400" : "text-green-400")}>ESPECIFICAÇÕES:</div>
                  <ul className={"text-xs list-disc list-inside " + (isBlackrose ? "text-red-300" : "text-green-300")}>
                    {product.specs.slice(0, 2).map((spec, index) => (
                      <li key={index}>{spec}</li>
                    ))}
                  </ul>
                </div>

                {!product.disabled && (
                  <div className="flex flex-col gap-1 mt-auto">
                    <div>
                      <span className={"text-xs " + (isBlackrose ? "text-red-400" : "text-green-400")}>PREÇO:</span>
                      <span className="text-white ml-2 text-xs">${price}</span>
                    </div>
                    <div>
                      <span className={"text-xs " + (isBlackrose ? "text-red-400" : "text-green-400")}>
                        CADA AÇÃO RENDE EM MÉDIA:
                      </span>
                      <span className="text-white ml-2 text-xs">
                        ${product.avgPerAction || "???"} sujos
                      </span>
                    </div>
                    <div>
                      <span className={"text-xs " + (isBlackrose ? "text-red-400" : "text-green-400")}>USOS POR ITEM:</span>
                      <span className="text-white ml-2 text-xs">{product.uses}x</span>
                    </div>
                  </div>
                )}

                <div className="mt-4 flex items-center gap-2">
                  <Input
                    type="number"
                    min={1}
                    className={
                      "w-16 px-2 py-1 text-sm text-white bg-gray-950 rounded-none " +
                      (isBlackrose ? "border border-red-600 chaos-shake" : "border border-green-600")
                    }
                    value={quantities[product.id] ?? 1}
                    onChange={(e) => handleQuantityChange(product.id, parseInt(e.target.value))}
                    disabled={product.disabled}
                  />
                  <Button
                    variant="outline"
                    className={
                      "text-white text-xs px-4 py-2 bg-gray-950 rounded-none " +
                      (isBlackrose
                        ? "border border-red-600 hover:bg-red-700 hover:text-white chaos-avoid"
                        : "border border-green-600 hover:bg-green-600 hover:text-white")
                    }
                    onClick={() => handleAddToCart(product)}
                    disabled={product.disabled}
                  >
                    {isBlackrose ? "[TENTA_ADICIONAR]" : "[ADICIONAR_AO_CARRINHO]"}
                  </Button>
                </div>
              </div>

              {product.disabled && (
                <div className="absolute top-2 right-2 bg-red-800 text-white text-xs px-2 py-1 rounded">
                  EM BREVE
                </div>
              )}
            </div>
          );
        })}
      </div>
    </>
  );
}
