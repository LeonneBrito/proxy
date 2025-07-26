import { Footer } from '@/components/footer'
import { Header } from '@/components/header'
import { ProductList } from '@/components/product-list'
import { System } from '@/components/system'

export default async function Page() {
  const products = await fetch(
    'https://gist.github.com/LeonneBrito/fb5cc37dd8a24d5151bc4d2bc2fb2127/raw/products.json',
    { next: { revalidate: 12 * 60 * 60 } },
  ).then((res) => res.json())

  return (
    <div className="min-h-screen bg-gray-950 text-green-400 font-mono">
      <main className="max-w-6xl mx-auto p-4 flex flex-col gap-8">
        <Header />
        <ProductList products={products} />
        <Footer />
        <System />
      </main>
    </div>
  )
}
