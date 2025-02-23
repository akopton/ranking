"use client";

import { useRef } from "react";
import { Position } from "./position";
import { type TPosition } from "../create-ranking";

export const PositionList = ({
  positions,
  changePosition,
  deletePosition,
}: {
  positions: TPosition[];
  changePosition: (position: TPosition) => void;
  deletePosition: (id: string) => void;
}) => {
  const ref = useRef<HTMLUListElement>(null);

  return (
    <ul
      ref={ref}
      className="flex h-full w-full flex-col gap-2 overflow-y-auto overflow-x-hidden pr-2"
    >
      {positions.map((p) => (
        <Position
          {...p}
          onChange={changePosition}
          onDelete={deletePosition}
          key={p.id}
        />
      ))}
    </ul>
  );
};
