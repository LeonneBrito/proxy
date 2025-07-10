import { NextResponse } from 'next/server'

export async function GET(
  req: Request,
  { params }: { params: { id: string } },
) {
  const id = params.id
  const content = `
# RECIBO DIGITAL

**ID de Confirmação:** \`${id}\`

---

**Status:** ✅ Confirmado  
**Data:** ${new Date().toLocaleDateString()}  
**Transação:** Segura e criptografada  
**Método de Entrega:** Correio Seguro  
**Prazo Estimado:** 24-48 horas  

---

Este recibo confirma que a transação foi processada com sucesso e está em conformidade com os protocolos de segurança estabelecidos.

> Armazene este comprovante em local seguro.  
> Para rastreamento, use o ID de confirmação informado acima.
`

  return new NextResponse(content, {
    headers: {
      'Content-Type': 'text/markdown',
      'Content-Disposition': `attachment; filename="RECIBO_DIGITAL.md"`,
    },
  })
}
