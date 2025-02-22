"use client";

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
  positions: {
    id: string;
    name: string;
    img: { name: string; base64: string; mimeType: string };
  }[];
  onMouseOver: (id: string) => void;
  onPositionDrop: (id: string) => void;
}) => {
  const getContrastingTextColor = (backgroundColor: string): string => {
    // Usuwamy znak "#" jeśli jest obecny
    const hex = backgroundColor.replace("#", "");

    // Parsujemy wartości R, G, B
    const r = parseInt(hex.substring(0, 2), 16);
    const g = parseInt(hex.substring(2, 4), 16);
    const b = parseInt(hex.substring(4, 6), 16);

    // Obliczamy luminancję — stosowany wzór według WCAG
    const luminance = 0.2126 * r + 0.7152 * g + 0.0722 * b;

    // Jeśli jasność jest większa niż 128, wybierz czarną czcionkę, w przeciwnym razie białą
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
