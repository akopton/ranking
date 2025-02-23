"use client";

import { useCallback, useEffect, useState } from "react";
import { Area } from "./ranking/area";
import { useRouter } from "next/navigation";
import { OpenRankingModal } from "./open-ranking/open-ranking-modal";
import type { TArea, TPosition } from "./create-ranking/create-ranking";

export const Ranking = ({ id }: { id: string }) => {
  const router = useRouter();
  const [data, setData] = useState<{
    id: string;
    title: string;
    positions: TPosition[];
    areas: TArea[];
  }>({ id: "", title: "", positions: [], areas: [] });

  const getData = () => {
    const data = localStorage.getItem("data");

    if (!data) return [{ id: "", title: "", positions: [], areas: [] }];
    return JSON.parse(data) as {
      id: string;
      title: string;
      positions: TPosition[];
      areas: TArea[];
    }[];
  };

  useEffect(() => {
    const data = getData();
    const f = data.find((el) => el.id === id);
    if (f) setData(f);
  }, [id]);

  const [positions, setPositions] = useState<TPosition[]>([]);

  const [hoveredArea, setHoveredArea] = useState<string | null>(null);

  const onAreaOver = (id: string) => {
    setHoveredArea(id);
  };

  const onPositionDrop = useCallback(
    (id: string) => {
      if (!hoveredArea) return;
      setPositions((prev) => [
        ...prev.map((p) => (p.id === id ? { ...p, area: hoveredArea } : p)),
      ]);
    },
    [hoveredArea],
  );

  const reset = () =>
    setPositions([...data.positions.map((p) => ({ ...p, area: "available" }))]);

  useEffect(() => {
    const init = () =>
      setPositions([
        ...data.positions.map((p) => ({
          ...p,
          area: p.area ?? "available",
        })),
      ]);

    init();
  }, [data]);

  const saveRanking = useCallback(() => {
    const currentRankingsJson = localStorage.getItem("data");

    if (!currentRankingsJson) return;

    const currentRankings = JSON.parse(currentRankingsJson) as {
      id: string;
      title: string;
      positions: TPosition[];
      areas: TArea[];
    }[];

    const f = currentRankings.find((r) => r.id === id);
    if (!f) return;

    const ranking = { ...data, positions };
    const newData = [...currentRankings.filter((r) => r.id !== id), ranking];
    localStorage.setItem("data", JSON.stringify(newData));
  }, [data, positions, id]);

  const deleteRanking = useCallback(() => {
    const currentRankingsJson = localStorage.getItem("data");

    if (!currentRankingsJson) return;

    const currentRankings = JSON.parse(currentRankingsJson) as {
      id: string;
      title: string;
      positions: TPosition[];
      areas: TArea[];
    }[];

    const f = currentRankings.find((r) => r.id === id);
    if (!f) return;

    const newData = [...currentRankings.filter((r) => r.id !== id)];
    localStorage.setItem("data", JSON.stringify(newData));
    router.push("/");
  }, [id, router]);

  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="flex h-full w-full flex-col items-center gap-4 overflow-hidden">
      <div className="flex w-full items-center justify-between">
        <div className="text-5xl">{data.title}</div>
        <div className="flex items-center gap-2">
          <button
            className="w-fit rounded-2xl border-2 bg-green-500 bg-transparent bg-none px-4 py-2 text-lg outline-none"
            onClick={saveRanking}
          >
            Zapisz
          </button>
          <button
            onClick={reset}
            className="w-fit rounded-2xl border-2 bg-red-500 bg-transparent bg-none px-4 py-2 text-lg outline-none"
          >
            Reset
          </button>
          <button
            onClick={deleteRanking}
            className="w-fit rounded-2xl border-2 bg-red-500 bg-transparent bg-none px-4 py-2 text-lg outline-none"
          >
            Usuń ranking
          </button>
          <button
            className="w-fit rounded-2xl border-2 bg-transparent bg-none px-4 py-2 text-lg outline-none"
            onClick={() => router.push("/")}
          >
            Strona główna
          </button>
          <>
            <button
              className="w-fit rounded-2xl border-2 bg-transparent bg-none px-4 py-2 text-lg outline-none"
              onClick={() => setIsOpen(true)}
            >
              Wybierz ranking
            </button>
            {isOpen && <OpenRankingModal onClose={() => setIsOpen(false)} />}
          </>
        </div>
      </div>
      <div
        className="grid h-full w-full overflow-hidden"
        style={{
          gridTemplateRows: `repeat(${data.areas.length + 1}, 1fr)`,
        }}
      >
        {data.areas.map((a) => (
          <Area
            {...a}
            positions={positions.filter((p) => p.area === a.id)}
            onMouseOver={onAreaOver}
            onPositionDrop={onPositionDrop}
            key={a.id}
          />
        ))}
        <Area
          id="available"
          name="Dostępne pozycje"
          color={""}
          onMouseOver={onAreaOver}
          onPositionDrop={onPositionDrop}
          positions={positions.filter((p) => p.area === "available")}
        />
      </div>
    </div>
  );
};
