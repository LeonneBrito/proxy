export function Footer({ chaos = false }: { chaos?: boolean }) {
  return (
    <div
      className={
        "text-xs space-y-1 " +
        (chaos
          ? "text-red-400 chaos-flicker chaos-shake"
          : "text-green-400")
      }
    >
      {chaos ? (
        <>
          <p>• TRANSAÇÕES INTERCEPTADAS POR TERCEIROS</p>
          <p>• ENTREGA? TALVEZ… 72h SE TIVER SORTE</p>
          <p>• REEMBOLSO? HAHAHA. NÃO.</p>
          <p className="chaos-hue">• [MENSAGEM_SUSPEITA] SISTEMA_CORROMPIDO</p>
        </>
      ) : (
        <>
          <p>• Todas as transações processadas através de canais seguros</p>
          <p>• Entrega em 48 horas via rede de correios criptografados</p>
          <p>• Sem reembolsos. Sem trocas. Venda final.</p>
        </>
      )}
    </div>
  );
}