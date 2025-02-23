import { HydrateClient } from "@/trpc/server";
import { Ranking } from "../../_components/ranking";

export default async function RankingPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return (
    <HydrateClient>
      <main
        className="flex h-screen w-screen flex-col items-center justify-center gap-10 overflow-hidden p-2 text-white"
        style={{
          background: "#3b3a3a",
        }}
      >
        <Ranking id={id as string} />
      </main>
    </HydrateClient>
  );
}
