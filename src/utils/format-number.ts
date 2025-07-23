export function formatPhoneNumber(value: string) {
  return value
    .replace(/\D/g, '') // Remove tudo que não for número
    .slice(0, 10) // Limita a 10 dígitos
    .replace(/^(\d{3})(\d{3})(\d{0,4})$/, '($1) $2-$3') // Formata
}
