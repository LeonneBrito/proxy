import { toast } from "sonner";

export const chaosToastStyle = () => {
  const palette = ["#ff2d55", "#00ff95", "#00c3ff", "#ffd500", "#ff00d4", "#ffffff"];
  const pick = () => palette[Math.floor(Math.random() * palette.length)];
  const border = pick();
  const text = pick();
  const hue = Math.floor(Math.random() * 360);
  return {
    style: {
      backgroundColor: "#0a0a0a",
      border: `1px solid ${border}`,
      color: text,
      fontFamily: "var(--font-mono, monospace)",
      fontSize: "0.9rem",
      boxShadow: `0 0 12px 2px ${border}55`,
      filter: `hue-rotate(${hue}deg)`,
      textShadow: `0 0 6px ${text}aa, 0 0 2px ${border}aa`,
    },
  } as const;
};

export const toastChaos = (title: string, opts?: { description?: string; duration?: number }) =>
  toast(title, {
    duration: 1400 + Math.random() * 1200,
    description: opts?.description,
    ...chaosToastStyle(),
  });

export const scramble = (s: string) => {
  if (!s) return s;
  const chars = s.split("");
  for (let i = chars.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [chars[i], chars[j]] = [chars[j], chars[i]];
  }
  return chars.join("");
};