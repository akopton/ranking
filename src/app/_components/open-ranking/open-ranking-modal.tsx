"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";

export const OpenRankingModal = ({ onClose }: { onClose: () => void }) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        onClose();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [onClose]);

  const [rankingList, setRankingList] = useState<
    { id: string; title: string }[]
  >([]);

  const getData = () => {
    const dataJson = localStorage.getItem("data");

    if (!dataJson) return;

    const data = JSON.parse(dataJson) as { id: string; title: string }[];
    setRankingList(data);
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      <div
        ref={ref}
        className="fixed left-1/2 top-1/2 z-50 flex h-1/2 w-1/2 -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center rounded-3xl p-10 text-2xl shadow-2xl"
        style={{
          backgroundColor: "rgba(36, 36, 36, .9)",
          backdropFilter: "blur(12px)",
        }}
      >
        <p>Wybierz ranking</p>
        <ul className="flex h-full w-full flex-col flex-wrap items-start justify-start">
          {rankingList.map((r, idx) => (
            <li key={r.id}>
              <Link href={`/ranking/${r.id}`} className="hover:text-blue-400">
                {idx + 1}. {r.title}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      <div
        className="fixed bottom-0 left-0 right-0 top-0"
        style={{
          backgroundColor: "rgba(150, 150, 150, .1)",
          backdropFilter: "blur(4px)",
        }}
      />
    </>
  );
};
