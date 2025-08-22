import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { ProductList } from "@/components/product-list";
import { System } from "@/components/system";
import { redirect } from "next/navigation";

export default async function Page() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  const products = await fetch(
    "https://gist.github.com/LeonneBrito/fb5cc37dd8a24d5151bc4d2bc2fb2127/raw/products.json",
    {
      next: { revalidate: 60 },
    }
  ).then((res) => res.json());

  if (!session?.user) {
    redirect("/");
  }

  return (
    <div className="min-h-screen bg-gray-950 text-green-400 font-mono">
      <main className="max-w-6xl mx-auto p-4 flex flex-col gap-8">
        <Header />
        <ProductList products={products} />
        <Footer />
        <System />
      </main>
    </div>
  );
}
