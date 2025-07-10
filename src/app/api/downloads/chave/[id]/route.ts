import { NextRequest, NextResponse } from 'next/server'

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } },
) {
  const id = params.id

  const content = `
# CHAVE DE VERIFICAÇÃO

**Produto:** Produto Anônimo  
**ID do Pedido:** \`${id}\`  

---

**CHAVE:**  
\`verif-${id.slice(0, 4)}-${id.slice(4, 8)}-${id.slice(-4)}\`

---

Esta chave é exclusiva e foi gerada especificamente para a sua transação.  
Ela será usada para validar a autenticidade do seu produto no momento da entrega ou ativação.

> ⚠ **Importante:** Nunca compartilhe esta chave com terceiros.  
> Perda ou exposição da chave invalida a garantia de segurança.
`

  return new NextResponse(content, {
    headers: {
      'Content-Type': 'text/markdown',
      'Content-Disposition': `attachment; filename="CHAVE_VERIFICACAO.md"`,
    },
  })
}
