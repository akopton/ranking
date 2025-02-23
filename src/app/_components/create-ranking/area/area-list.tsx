"use client";

import { useRef } from "react";
import { Area } from "./area";
import { type TArea } from "../create-ranking";

export const AreaList = ({
  areas,
  changeArea,
  deleteArea,
}: {
  areas: TArea[];
  changeArea: (area: TArea) => void;
  deleteArea: (id: string) => void;
}) => {
  const ref = useRef<HTMLUListElement>(null);

  return (
    <ul
      ref={ref}
      className="flex h-full w-full flex-col gap-2 overflow-y-auto overflow-x-hidden pr-2"
    >
      {areas.map((a) => (
        <Area {...a} onChange={changeArea} onDelete={deleteArea} key={a.id} />
      ))}
    </ul>
  );
};
