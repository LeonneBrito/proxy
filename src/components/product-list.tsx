/* eslint-disable @next/next/no-img-element */
"use client";

import { useState } from "react";
import { toast } from "sonner";

import { allyGangs } from "@/constants/gangs";
import { useCartStore } from "@/store/use-cart-store";
import type { Product } from "@/types";

import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { useSession } from "@/lib/auth-client";

interface ProductList {
  products: Product[];
}

export function ProductList({ products }: ProductList) {
  const { addToCart } = useCartStore();
  const { data: session } = useSession();
  const [quantities, setQuantities] = useState<Record<string, number>>({});
  const gang = session?.user.username || "";
  const isAlly = session?.user.username ? allyGangs.includes(gang.toLowerCase()) : false;
  const isCyber = gang?.toLowerCase() === "cyberdystopia";

  const cyberLimits: Record<string, number> = {
    PENDRIVE_SUMMERELETROHITS_2025: 2,
    NOTEBOOK_GAMER_ATM_EDITION: 1,
    LAPTOP_CARRO_FORTE_EDITION: 1,
  };

  const handleQuantityChange = (id: string, value: number) => {
    const product = products.find((p) => p.id === id);
    if (!product) return;

    const limit = isCyber ? cyberLimits[product.name] : null;

    if (limit && value > limit) {
      toast.error(
        `Limite de ${limit} unidade(s) para ${product.name} (Cyber Dystopia)`
      );
      return;
    }

    setQuantities((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const handleAddToCart = (product: (typeof products)[0]) => {
    const quantity = quantities[product.id] || 1;
    const price = isAlly ? product.price.ally : product.price.notAlly;

    const limit = isCyber ? cyberLimits[product.name] : null;
    if (limit && quantity > limit) {
      alert(
        `Limite de ${limit} unidade(s) para ${product.name} (Cyber Dystopia)`
      );
      return;
    }

    addToCart(
      {
        id: product.id,
        name: product.name,
        price,
      },
      quantity
    );

    setQuantities((prev) => ({ ...prev, [product.id]: 1 }));
  };

  if (!products || products.length === 0) {
    return (
      <div className="text-center text-gray-500">
        Nenhum produto disponível no momento.
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
      {products.map((product) => {
        const price = isAlly ? product.price?.ally : product.price?.notAlly;

        return (
          <div
            key={product.id}
            className={
              "relative border border-green-800 bg-gray-950 overflow-hidden shadow-lg flex flex-col" +
              (product.disabled ? " opacity-50" : "")
            }
          >
            <div className="h-64 bg-gray-800 flex items-center justify-center">
              <img
                src={product.image}
                alt={product.name}
                className="object-cover h-full w-full max-w-full object-center"
              />
            </div>

            <div className="flex-1 flex flex-col p-4">
              <div className="mb-2">
                <span className="text-xs text-green-400">
                  ID_ITEM: {product.id}
                </span>
              </div>

              <h2 className="font-semibold mb-2 text-white break-words">
                {product.name}
              </h2>

              <div className="mb-2">
                <p className="text-green-300 text-xs">
                  {product.description[0]}
                </p>
              </div>

              <div className="mb-2">
                <div className="text-xs text-green-400">ESPECIFICAÇÕES:</div>
                <ul className="text-xs text-green-300 list-disc list-inside">
                  {product.specs.slice(0, 2).map((spec, index) => (
                    <li key={index}>{spec}</li>
                  ))}
                </ul>
              </div>

              {!product.disabled && (
                <div className="flex flex-col gap-1 mt-auto">
                  <div>
                    <span className="text-xs text-green-400">PREÇO:</span>
                    <span className="text-white ml-2 text-xs">${price}</span>
                  </div>
                  <div>
                    <span className="text-xs text-green-400">
                      CADA AÇÃO RENDE EM MÉDIA:
                    </span>
                    <span className="text-white ml-2 text-xs">
                      ${product.avgPerAction || "???"} sujos
                    </span>
                  </div>
                  <div>
                    <span className="text-xs text-green-400">
                      USOS POR ITEM:
                    </span>
                    <span className="text-white ml-2 text-xs">
                      {product.uses}x
                    </span>
                  </div>
                </div>
              )}

              <div className="mt-4 flex items-center gap-2">
                <Input
                  type="number"
                  min={1}
                  className="w-16 px-2 py-1 text-sm text-white bg-gray-950 border border-green-600 rounded-none"
                  value={quantities[product.id] ?? 1}
                  onChange={(e) =>
                    handleQuantityChange(product.id, parseInt(e.target.value))
                  }
                  disabled={product.disabled}
                />
                <Button
                  variant="outline"
                  className="text-white text-xs px-4 py-2 bg-gray-950 border border-green-600 hover:bg-green-600 hover:text-white rounded-none"
                  onClick={() => handleAddToCart(product)}
                  disabled={product.disabled}
                >
                  [ADICIONAR_AO_CARRINHO]
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
  );
}
