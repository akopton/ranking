"use client";

import { useCallback, useState } from "react";
import { FiUpload } from "react-icons/fi";
import { AreaList } from "../area/area-list";
import { TArea } from "../create-ranking";

export const ModalSecondStep = ({
  areas,
  dispatch,
  onPrev,
  onNext,
}: {
  areas: TArea[];
  dispatch: (
    action: "addArea" | "removeArea" | "changeArea",
    payload: TArea | string,
  ) => void;
  onPrev: () => void;
  onNext: () => void;
}) => {
  const [name, setName] = useState("");
  const [color, setColor] = useState("#000000");
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setName(e.target.value);

  const addArea = useCallback(() => {
    if (!name || name === "") return;
    const id = `area-${new Date().getTime().toString()}`;
    dispatch("addArea", { id, name, color });
    setName("");
    setColor("#000000");
  }, [name, color]);

  const changeArea = (area: TArea) => {
    dispatch("changeArea", area);
  };

  const deleteArea = (id: string) => {
    dispatch("removeArea", id);
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
          DALEJ {"->"}
        </button>
        <p className="block">Dodaj sekcje</p>
      </div>
      <div className="flex w-full items-end gap-2">
        <label
          htmlFor="title"
          className="flex flex-col items-start justify-center"
        >
          Nazwa sekcji
          <input
            id="title"
            name="title"
            className="w-full rounded-xl border-2 bg-transparent bg-none px-4 py-2 outline-none"
            type="text"
            value={name}
            onChange={handleChange}
          />
        </label>
        <input
          className="mb-2 cursor-pointer"
          type="color"
          value={color}
          onChange={(e) => setColor(e.target.value)}
        />
        <button
          className="rounded-xl border-2 bg-transparent bg-none px-4 py-2 text-lg outline-none"
          onClick={addArea}
        >
          DODAJ
        </button>
      </div>
      <div className="h-full w-full overflow-hidden">
        <AreaList
          areas={areas}
          changeArea={changeArea}
          deleteArea={deleteArea}
        />
      </div>
    </div>
  );
};
