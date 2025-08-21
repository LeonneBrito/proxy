/* eslint-disable @next/next/no-img-element */
"use client";

import { useEffect, useMemo, useRef } from "react";
import { toast } from "sonner";

type ChaosLayerProps = {
  active: boolean;
};

const randomChaosStyle = () => {
  const colors = [
    "#ff2d55",
    "#00ff95",
    "#00c3ff",
    "#ffd500",
    "#ff00d4",
    "#ffffff",
  ];
  const bg = "#0a0a0a";
  const border = colors[Math.floor(Math.random() * colors.length)];
  const text = colors[Math.floor(Math.random() * colors.length)];
  const hue = Math.floor(Math.random() * 360);

  return {
    backgroundColor: bg,
    border: `1px solid ${border}`,
    color: text,
    fontFamily: "monospace",
    fontSize: "0.9rem",
    boxShadow: `0 0 12px 2px ${border}55`,
    filter: `hue-rotate(${hue}deg)`,
    textShadow: `0 0 6px ${text}aa, 0 0 2px ${border}aa`,
  } as React.CSSProperties;
};

export function useChaos(active: boolean) {
  // efeitos que não precisam de jsx (intervalos, mutações, etc.)
  useEffect(() => {
    if (!active) return;

    // liga classe global no <html>
    document.documentElement.classList.add("chaos");

    // toasts aleatórios e irritantes
    const msgs = [
      "ERRO_418: EU SOU UM BULE",
      "LATÊNCIA_DETECTADA: 9999ms",
      "PACOTE_DROPADO: 13%",
      "CAPTCHA: CONTE OS POMBOS 🕊️🕊️🕊️🕊️🕊️",
      "RECURSO_NÃO_ENCONTRADO: procure melhor.",
      "DICA: o botão foge de quem é Blackrose ;)",
    ];
    const t = setInterval(
      () => {
        const i = Math.floor(Math.random() * msgs.length);
        toast(msgs[i], {
          duration: 1600 + Math.random() * 1200,
          style: randomChaosStyle(),
        });
      },
      4000 + Math.random() * 2500
    );

    // vira e mexe inverte algumas imagens
    const imgFlip = setInterval(() => {
      document.querySelectorAll<HTMLImageElement>("img").forEach((img, idx) => {
        if (idx % 3 === 0) img.classList.toggle("chaos-img-flip");
        if (img.classList.contains("chaos-img-flip")) {
          img.style.transform = "scaleX(-1)";
        } else {
          img.style.transform = "";
        }
      });
    }, 3000);

    // sacode popovers/modais
    const jiggle = setInterval(() => {
      document
        .querySelectorAll<HTMLElement>(
          "[role=dialog], [data-radix-popper-content-wrapper], [data-state=open]"
        )
        .forEach((el) => {
          el.classList.add("chaos-jitter");
          setTimeout(() => el.classList.remove("chaos-jitter"), 400);
        });
    }, 2500);

    return () => {
      clearInterval(t);
      clearInterval(imgFlip);
      clearInterval(jiggle);
      document.documentElement.classList.remove("chaos");
    };
  }, [active]);
}

export function ChaosLayer({ active }: ChaosLayerProps) {
  useChaos(active);

  const mounted = useRef(false);
  useEffect(() => {
    if (!active || mounted.current) return;
    mounted.current = true;

    // botões “fogem” do cursor
    const makeRun = (btn: HTMLElement) => btn.classList.add("chaos-avoid");
    document
      .querySelectorAll<HTMLElement>("button, a[role=button]")
      .forEach(makeRun);

    // inputs que “teimam” (ligeiro rollback no valor digitado)
    const sabotage = (e: Event) => {
      const el = e.target as HTMLInputElement;
      if (!el || el.type !== "number") return;
      if (Math.random() < 0.33) {
        const v = parseInt(el.value || "0", 10);
        el.value = String(Math.max(1, v - 1));
      }
    };
    document.addEventListener("input", sabotage, true);

    return () => {
      document
        .querySelectorAll<HTMLElement>("button, a[role=button]")
        .forEach((b) => b.classList.remove("chaos-avoid"));
      document.removeEventListener("input", sabotage, true);
    };
  }, [active]);

  if (!active) return null;
  return (
    <>
      {/* overlay com scanline/glitch e flicker leve */}
      <div className="chaos-overlay chaos-hue" />
    </>
  );
}
