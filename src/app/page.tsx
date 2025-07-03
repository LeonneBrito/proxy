import { Footer } from '@/components/footer'
import { ProductList } from '@/components/product-list'
import { System } from '@/components/system'

export default function Page() {
  return (
    <div className="min-h-screen bg-gray-950 text-green-400 font-mono">
      <main className="max-w-4xl mx-auto p-4">
        <System />
        <ProductList />
        <Footer />
      </main>
    </div>
  )
}
