"use client";

import type { TPosition } from "../create-ranking/create-ranking";
import { Position } from "./position";

export const Area = ({
  id,
  name,
  color,
  positions,
  onMouseOver,
  onPositionDrop,
}: {
  id: string;
  name: string;
  color: string;
  positions: TPosition[];
  onMouseOver: (id: string) => void;
  onPositionDrop: (id: string) => void;
}) => {
  const getContrastingTextColor = (backgroundColor: string): string => {
    const hex = backgroundColor.replace("#", "");
    const r = parseInt(hex.substring(0, 2), 16);
    const g = parseInt(hex.substring(2, 4), 16);
    const b = parseInt(hex.substring(4, 6), 16);

    const luminance = 0.2126 * r + 0.7152 * g + 0.0722 * b;
    return luminance > 128 ? "black" : "white";
  };
  return (
    <div
      className="h- full grid w-full overflow-hidden border-2"
      style={{
        gridTemplateColumns: "20% 80%",
      }}
      onDragOver={(e) => {
        e.stopPropagation();
        onMouseOver(id);
      }}
    >
      <div
        className="flex items-center justify-center border-r-2 text-xl"
        style={{
          backgroundColor: color,
          color: getContrastingTextColor(color),
        }}
      >
        {name}
      </div>
      <div className="overflow-hidden p-2">
        <ul className="flex h-full flex-wrap gap-2 overflow-y-auto">
          {positions.map((p) => (
            <Position {...p} onDrop={onPositionDrop} key={p.id} />
          ))}
        </ul>
      </div>
    </div>
  );
};
