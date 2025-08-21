// components/SkullRain.tsx
"use client";
import { useEffect } from "react";

export function SkullRain({ active }: { active: boolean }) {
  useEffect(() => {
    if (!active) return;
    const spawn = () => {
      if (Math.random() > 0.6) return; // não exagera
      const el = document.createElement("div");
      el.className = "skull";
      el.style.left = Math.floor(Math.random() * 100) + "vw";
      el.style.transform = `translateY(-10vh) rotate(${Math.random() * 360}deg)`;
      el.textContent = Math.random() < 0.3 ? "💀" : Math.random() < 0.6 ? "☠️" : "🕷️";
      document.body.appendChild(el);
      setTimeout(() => el.remove(), 4200);
    };
    const id = setInterval(spawn, 220);
    return () => clearInterval(id);
  }, [active]);

  return null;
}