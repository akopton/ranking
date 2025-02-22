import Link from "next/link";

import { HydrateClient } from "@/trpc/server";
import { Ranking } from "../../_components/ranking";
import { SearchParams } from "next/dist/server/request/search-params";

export default async function Home({ params }: { params: SearchParams }) {
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
