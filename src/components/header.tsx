"use client";

import { LogOut, ShoppingCart, Trash2, Trophy, Store } from "lucide-react";
import { useRouter } from "next/navigation";
import { useSession } from "@/lib/auth-client";
import { signOut } from "@/lib/auth-client";

import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Separator } from "@/components/ui/separator";
import { useCartStore } from "@/store/use-cart-store";

import { DiscountAlertDialog } from "./discount-alert-dialog";
import { ChaosLayer } from "./chaos";
import { toastChaos } from "@/utils/chaos";

export function Header() {
  const router = useRouter();
  const { cart } = useCartStore();
  const { data: session } = useSession();
  const gang = session?.user?.username?.toLowerCase() || "";
  const isBlackrose = gang === "blackrose";

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const handleLogout = async () => {
    await signOut();
    localStorage.removeItem("cart-storage");
    useCartStore.getState().clearCart();
    router.push("/");
  };

  return (
    <>
      <ChaosLayer active={isBlackrose} />
      <header
        className={
          "p-3 border bg-gray-950 flex items-center justify-between text-white " +
          (isBlackrose
            ? "border-red-800 chaos-hue chaos-shake"
            : "border-green-800")
        }
      >
        <h1
          className={
            "font-bold text-lg " +
            (isBlackrose ? "text-red-400 chaos-flicker" : "text-green-400")
          }
        >
          {isBlackrose
            ? "⚠️ INTRUSO_DETECTADO: BLACKROSE"
            : `Bem vindos, ${session?.user.name || session?.user.email}!`}
        </h1>

        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            className="hover:bg-gray-800"
            onClick={() => router.push("/store")}
            title="Ir para Loja"
          >
            <Store className="h-5 w-5 text-green-400" />
          </Button>

          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="ghost"
                size="default"
                className={
                  "hover:bg-gray-800 " + (isBlackrose ? "chaos-shake" : "")
                }
                title="Ver Carrinho"
                onMouseEnter={() =>
                  isBlackrose &&
                  toastChaos("ABRINDO_CARRINHO", {
                    description: "monitoramento ativo",
                  })
                }
              >
                <ShoppingCart
                  className={
                    "h-5 w-5 " +
                    (isBlackrose ? "text-red-400" : "text-green-400")
                  }
                />
                {totalItems > 0 && (
                  <span className="ml-1 text-xs font-bold text-white">
                    {totalItems}
                  </span>
                )}
              </Button>
            </PopoverTrigger>

            <PopoverContent
              className={
                "w-96 text-white rounded-none " +
                (isBlackrose
                  ? "bg-gray-950 border-red-700 chaos-flicker chaos-shake"
                  : "bg-gray-950 border-green-800")
              }
              onMouseEnter={() =>
                isBlackrose &&
                toastChaos("ITENS_VIGIADOS", {
                  description: "atividade suspeita",
                })
              }
            >
              <h2
                className={
                  "text-lg font-semibold mb-2 " +
                  (isBlackrose ? "text-red-300" : "")
                }
              >
                CARRINHO
              </h2>
              <Separator
                className={
                  isBlackrose ? "bg-red-800 mb-2" : "bg-green-800 mb-2"
                }
              />

              {cart.length === 0 ? (
                <p
                  className={
                    isBlackrose
                      ? "text-red-300 text-sm"
                      : "text-green-300 text-sm"
                  }
                >
                  CARRINHO_VAZIO
                </p>
              ) : (
                <>
                  <div
                    className={
                      "max-h-60 overflow-y-auto space-y-2 text-sm " +
                      (isBlackrose
                        ? "text-red-200 chaos-hue"
                        : "text-green-200")
                    }
                  >
                    {cart.map((item) => (
                      <div
                        key={item.id}
                        className="flex justify-between items-center"
                      >
                        <div className="flex flex-col">
                          <span>{item.name}</span>
                          <span>
                            {item.quantity === 1
                              ? `$ ${item.price.toFixed(2)}`
                              : `${item.quantity} x $ ${item.price.toFixed(2)} = $ ${(item.quantity * item.price).toFixed(2)}`}
                          </span>
                        </div>
                        <button
                          onClick={() => {
                            if (isBlackrose && Math.random() < 0.25) {
                              toastChaos("REMOÇÃO_NEGADA", {
                                description: "tente novamente",
                              });
                              return;
                            }
                            useCartStore.getState().removeFromCart(item.id);
                            isBlackrose && toastChaos("ITEM_REMOVIDO*");
                          }}
                          className="text-red-400 text-xs hover:underline ml-2"
                        >
                          <Trash2 className="h-4 w-4 inline" />
                        </button>
                      </div>
                    ))}
                  </div>

                  <Separator
                    className={
                      isBlackrose ? "bg-red-800 my-2" : "bg-green-800 my-2"
                    }
                  />

                  <div className="flex justify-between text-sm mb-3">
                    <span>Total:</span>
                    <span className="font-semibold">
                      $ {totalPrice.toFixed(2)}
                    </span>
                  </div>

                  <Button
                    variant="outline"
                    className={
                      "text-white text-xs px-4 py-2 bg-gray-950 rounded-none w-full " +
                      (isBlackrose
                        ? "border border-red-600 hover:bg-red-700 hover:text-white chaos-avoid"
                        : "border border-green-600 hover:bg-green-600 hover:text-white")
                    }
                    onClick={() => {
                      if (isBlackrose && Math.random() < 0.22) {
                        toastChaos("CHECKOUT_BLOQUEADO", {
                          description: "mutex em uso",
                        });
                        return;
                      }
                      router.push("/store/checkout");
                    }}
                  >
                    [FINALIZAR_COMPRA]
                  </Button>
                </>
              )}
            </PopoverContent>
          </Popover>

          <Button
            variant="ghost"
            size="icon"
            className="hover:bg-gray-800"
            onClick={handleLogout}
            title="Sair"
          >
            <LogOut className="h-5 w-5 text-red-400" />
          </Button>
        </div>
      </header>
      <DiscountAlertDialog />
    </>
  );
}
