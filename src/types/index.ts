export interface Product {
  id: string
  name: string
  image: string
  disabled: boolean
  description: string[]
  specs: string[]
  avgPerAction: number
  uses: number
  price: {
    ally: number
    notAlly: number
  }
}
