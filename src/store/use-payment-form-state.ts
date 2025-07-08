import { create } from 'zustand'

interface PaymentFormState {
  publicKey: string
  secureContact: string
  pendriveQty: number
  notebookQty: number
  setPublicKey: (value: string) => void
  setPendriveQty: (value: number) => void
  setNotebookQty: (value: number) => void
  setSecureContact: (value: string) => void
}

export const usePaymentFormStore = create<PaymentFormState>((set) => ({
  publicKey: '',
  secureContact: '',
  pendriveQty: 0,
  notebookQty: 0,
  setPublicKey: (value) => set({ publicKey: value }),
  setPendriveQty: (value) => set({ pendriveQty: value }),
  setNotebookQty: (value) => set({ notebookQty: value }),
  setSecureContact: (value) => set({ secureContact: value }),
}))
