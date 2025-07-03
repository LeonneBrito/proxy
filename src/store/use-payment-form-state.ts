import { create } from 'zustand'

interface PaymentFormState {
  publicKey: string
  secureContact: string
  pendriveQty: number
  setPublicKey: (value: string) => void
  setPendriveQty: (value: number) => void
  setSecureContact: (value: string) => void
}

export const usePaymentFormStore = create<PaymentFormState>((set) => ({
  publicKey: '',
  secureContact: '',
  pendriveQty: 1,
  setPublicKey: (value) => set({ publicKey: value }),
  setPendriveQty: (value) => set({ pendriveQty: value }),
  setSecureContact: (value) => set({ secureContact: value }),
}))
