"use client";

import { base64ToFile } from "@/utils/base64-to-file";
import Image from "next/image";
import { useEffect, useState } from "react";
import type { TImg } from "../create-ranking/create-ranking";

export const Position = ({
  id,
  name,
  img,
  onDrop,
}: {
  id: string;
  name: string;
  img: TImg | undefined;
  onDrop: (id: string) => void;
}) => {
  const [preview, setPreview] = useState<string | null>(null);

  useEffect(() => {
    if (img) {
      const file = base64ToFile(img.base64, img.name, img.base64);
      const objectUrl = URL.createObjectURL(file);
      if (objectUrl) setPreview(objectUrl);

      return () => URL.revokeObjectURL(objectUrl);
    }
  }, [img]);

  return (
    <li
      draggable
      onDrag={(e) => {
        e.preventDefault();
        e.stopPropagation();
      }}
      onDragEnd={() => {
        onDrop(id);
      }}
      className="h-fit cursor-move rounded-xl px-4 py-2"
      style={{
        backgroundColor: "#2b2b2b",
      }}
    >
      {name && name}
      {preview && (
        <Image
          src={preview}
          alt="Podgląd"
          style={{ maxWidth: "100px", height: "auto", zIndex: "0" }}
        />
      )}
    </li>
  );
};
