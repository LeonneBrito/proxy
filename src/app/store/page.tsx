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

  if (!session?.user) {
    redirect("/");
  }

  return (
    <div className="min-h-screen bg-gray-950 text-green-400 font-mono">
      <main className="max-w-6xl mx-auto p-4 flex flex-col gap-8">
        <Header />
        <ProductList />
        <Footer chaos={session?.user?.username?.toLowerCase() === "blackrose"} />
        <System chaos={session?.user?.username?.toLowerCase() === "blackrose"} />
      </main>
    </div>
  );
}
