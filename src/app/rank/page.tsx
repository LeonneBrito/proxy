import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { System } from "@/components/system";
import { RankTable } from "@/components/rank-table";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export const revalidate = 60;

async function getRank() {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL ?? ""}/api/spendings/list`,
    {
      next: { revalidate: 604800 },
    }
  );

  if (!res.ok) {
    return { ok: false, data: [] as any[] };
  }

  const json = await res.json();
  return json as {
    ok: boolean;
    data: Array<{
      _id: string;
      gangLogin?: string;
      gangName: string;
      totalSpent: number;
      history?: Array<{ amount: number; at: string; source?: string }>;
    }>;
  };
}

export default async function Page() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  const rank = await getRank();

  if (!session?.user) {
    redirect("/");
  }

  return (
    <div className="min-h-screen bg-gray-950 text-green-400 font-mono">
      <main className="max-w-6xl mx-auto p-4 flex flex-col gap-8">
        <Header />

        <section className="space-y-4">
          <h1 className="text-xl font-bold tracking-tight">RANK_DE_GASTOS</h1>
          <p className="text-xs text-green-500/80">
            Fonte: base CodeDB (&nbsp;
            <span className="underline decoration-dotted">
              {btoa("/api/spendings/list")}
            </span>
            &nbsp;). Atualizado a cada semana.
          </p>

          <RankTable items={rank?.data ?? []} />
        </section>
        <System />
      </main>
    </div>
  );
}
