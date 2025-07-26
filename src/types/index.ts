export interface Product {
  id: string
  name: string
  image: string
  disabled: boolean
  description: string[]
  specs: string[]
  price: {
    ally: number
    notAlly: number
  }
}
