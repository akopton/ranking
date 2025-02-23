"use client";

import { useState } from "react";
import { CreateRankingModal } from "./create-ranking-modal";
import { CreateRankingBtn } from "./create-ranking-btn";

export type TDispatchAction =
  | "addPosition"
  | "removePosition"
  | "changePosition"
  | "addArea"
  | "changeArea"
  | "removeArea"
  | "changeTitle";

export type TImg = { name: string; mimeType: string; base64: string };
export type TPosition = {
  id: string;
  name: string;
  img: TImg | undefined;
  area?: string;
};
export type TArea = { id: string; name: string; color: string };

export const CreateRanking = () => {
  const [isOpen, setIsOpen] = useState(false);
  const onClose = () => setIsOpen(false);
  const onToggle = () => setIsOpen((prev) => !prev);

  const [data, setData] = useState<{
    title: string;
    positions: TPosition[];
    areas: TArea[];
  }>({ title: "", positions: [], areas: [] });

  const addPosition = (position: TPosition) => {
    setData((prev) => ({ ...prev, positions: [...prev.positions, position] }));
  };

  const removePosition = (id: string) => {
    setData((prev) => ({
      ...prev,
      positions: [...prev.positions.filter((p) => p.id !== id)],
    }));
  };

  const changePosition = (position: TPosition) => {
    setData((prev) => ({
      ...prev,
      positions: [
        ...prev.positions.map((p) => (p.id === position.id ? position : p)),
      ],
    }));
  };

  const addArea = (area: TArea) => {
    setData((prev) => ({ ...prev, areas: [...prev.areas, area] }));
  };

  const removeArea = (id: string) => {
    setData((prev) => ({
      ...prev,
      areas: [...prev.areas.filter((a) => a.id !== id)],
    }));
  };

  const changeArea = (area: TArea) => {
    setData((prev) => ({
      ...prev,
      areas: [...prev.areas.map((a) => (a.id === area.id ? area : a))],
    }));
  };

  const changeTitle = (value: string) => {
    setData((prev) => ({ ...prev, title: value }));
  };

  const dispatch = (
    action: TDispatchAction,
    payload: string | TImg | TPosition | TArea,
  ) => {
    switch (action) {
      case "addPosition":
        addPosition(payload as TPosition);
        break;
      case "removePosition":
        return removePosition(payload as string);
      case "changePosition":
        return changePosition(payload as TPosition);
      case "addArea":
        return addArea(payload as TArea);
      case "changeArea":
        return changeArea(payload as TArea);
      case "removeArea":
        return removeArea(payload as string);
      case "changeTitle":
        return changeTitle(payload as string);
    }
  };

  return (
    <>
      <CreateRankingBtn onClick={onToggle} />
      {isOpen && (
        <CreateRankingModal onClose={onClose} data={data} dispatch={dispatch} />
      )}
    </>
  );
};
