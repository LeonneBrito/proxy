export function formatPhoneNumber(value: string) {
  return value
    .replace(/\D/g, '') // remove tudo que não for número
    .replace(/^(\d{3})(\d)/, '($1) $2') // parênteses nos 3 primeiros
    .replace(/(\d{3})(\d{1,4})$/, '$1-$2') // hífen depois dos próximos 3
    .slice(0, 14) // limita ao tamanho máximo
}
