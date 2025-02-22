"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { FiUpload } from "react-icons/fi";
import { PositionList } from "../position/position-list";
import { FaCheck } from "react-icons/fa";
import { TImg, TPosition } from "../create-ranking";
import { fileToBase64 } from "@/utils/file-to-base64";

export const ModalThirdStep = ({
  positions,
  dispatch,
  onPrev,
  onNext,
}: {
  positions: TPosition[];
  dispatch: (
    action: "addPosition" | "removePosition" | "changePosition",
    payload: TPosition | string,
  ) => void;
  onPrev: () => void;
  onNext: () => void;
}) => {
  const [name, setName] = useState("");
  const [img, setImg] = useState<File | undefined>();
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setName(e.target.value);

  const addPosition = useCallback(async () => {
    if ((!name || name === "") && !img) return;
    const id = `position-${new Date().getTime().toString()}`;
    const base64File = img ? await fileToBase64(img) : undefined;
    dispatch("addPosition", { id, name, img: base64File });
    setName("");
    setImg(undefined);
  }, [name, img]);

  const changePosition = (position: TPosition) => {
    dispatch("changePosition", position);
  };

  const deletePosition = (id: string) => {
    dispatch("removePosition", id);
  };

  return (
    <div
      className="flex h-full w-full flex-col items-center justify-center overflow-hidden px-20 py-10"
      style={{
        gridTemplateColumns: "100%",
        gridTemplateRows: "15% 20% 50%",
        rowGap: ".5rem",
      }}
    >
      <div className="flex w-full items-center justify-center">
        <button
          className="absolute left-2 top-2 w-fit rounded-2xl border-2 bg-transparent bg-none px-4 py-2 text-lg outline-none"
          onClick={onPrev}
        >
          {"<-"} WRÓĆ
        </button>
        <button
          className="absolute right-2 top-2 w-fit rounded-2xl border-2 bg-transparent bg-none px-4 py-2 text-lg outline-none"
          onClick={onNext}
        >
          STWÓRZ
        </button>
        <p className="block">Dodaj pozycje</p>
      </div>
      <div className="flex w-full items-end gap-2">
        <label
          htmlFor="title"
          className="flex flex-col items-start justify-center"
        >
          Nazwa pozycji
          <input
            id="title"
            name="title"
            className="w-full rounded-xl border-2 bg-transparent bg-none px-4 py-2 outline-none"
            type="text"
            value={name}
            onChange={handleChange}
          />
        </label>
        <label
          htmlFor="upload"
          className="flex cursor-pointer items-center justify-center rounded-xl border-2 px-2 py-2"
        >
          {!img ? <FiUpload /> : <FaCheck color="green" />}
          <input
            type="file"
            id="upload"
            hidden
            onChange={(e) => {
              const file = e.target?.files?.[0];

              e.target.value = "";
              setImg(file);
            }}
          />
        </label>
        <button
          className="rounded-xl border-2 bg-transparent bg-none px-4 py-2 text-lg outline-none"
          onClick={addPosition}
        >
          DODAJ
        </button>
      </div>
      <div className="h-full w-full overflow-hidden">
        <PositionList
          positions={positions}
          changePosition={changePosition}
          deletePosition={deletePosition}
        />
      </div>
    </div>
  );
};
