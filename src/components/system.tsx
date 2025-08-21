export function System({ chaos = false }: { chaos?: boolean }) {
  const color = chaos ? "red" : "green";
  return (
    <div className={`mb-8 p-3 border bg-gray-950 ${chaos ? "border-red-800 chaos-hue" : "border-green-800"}`}>
      <div className="flex items-center gap-2 text-sm">
        <span className={`w-2 h-2 rounded-full animate-pulse shadow-[0_0_8px_2px_rgba(34,197,94,0.7)] bg-${color}-400`} />
        <span className={`animate-pulse text-${color}-400 drop-shadow-[0_0_6px_rgba(34,197,94,0.8)]`}>
          {chaos ? "STATUS_SISTEMA: ALERTA" : "STATUS_SISTEMA: ONLINE"}
        </span>
      </div>
      <div className="flex items-center gap-2 text-sm mt-1">
        <span className={`w-2 h-2 rounded-full animate-pulse shadow-[0_0_8px_2px_rgba(34,197,94,0.7)] bg-${color}-400`} />
        <span className={`animate-pulse text-${color}-400 drop-shadow-[0_0_6px_rgba(34,197,94,0.8)]`}>
          {chaos ? "INTRUSO_DETECTADO: BLACKROSE" : "CONEXÃO_SEGURA: ATIVA"}
        </span>
      </div>
    </div>
  );
}