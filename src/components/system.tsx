export function System() {
  return (
    <div className="mb-8 p-3 border border-green-800 bg-gray-950">
      <div className="flex items-center gap-2 text-sm">
        <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse shadow-[0_0_8px_2px_rgba(34,197,94,0.7)]" />
        <span className="animate-pulse text-green-400 drop-shadow-[0_0_6px_rgba(34,197,94,0.8)]">
          STATUS_SISTEMA: ONLINE
        </span>
      </div>
      <div className="flex items-center gap-2 text-sm mt-1">
        <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse shadow-[0_0_8px_2px_rgba(34,197,94,0.7)]" />
        <span className="animate-pulse text-green-400 drop-shadow-[0_0_6px_rgba(34,197,94,0.8)]">
          CONEXÃO_SEGURA: ATIVA
        </span>
      </div>
    </div>
  )
}
