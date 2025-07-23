import { Footer } from '@/components/footer'
import { Header } from '@/components/header'
import { ProductList } from '@/components/product-list'
import { System } from '@/components/system'

export default function Page() {
  return (
    <div className="min-h-screen bg-gray-950 text-green-400 font-mono">
      <main className="max-w-6xl mx-auto p-4 flex flex-col gap-8">
        <Header />
        <ProductList />
        <Footer />
        <System />
      </main>
    </div>
  )
}
