import Link from "next/link";

import { api, HydrateClient } from "@/trpc/server";
import { CreateRanking } from "./_components/create-ranking/create-ranking";
import { OpenRanking } from "./_components/open-ranking/open-ranking";

export default async function Home() {
  return (
    <HydrateClient>
      <main
        className="flex h-screen w-screen flex-col items-center justify-center gap-10 text-white"
        style={{
          background: "#3b3a3a",
        }}
      >
        <div className="text-4xl">
          <p className="text-center">SIEMANO WITAM SERDECZNIE!</p>
          <p className="text-center">
            W TYM MIEJSCU MOŻESZ STWORZYĆ SWÓJ WŁASNY RANKING
          </p>
        </div>
        <div className="flex items-center gap-10 text-3xl">
          <CreateRanking />
          <OpenRanking />
        </div>
      </main>
    </HydrateClient>
  );
}
