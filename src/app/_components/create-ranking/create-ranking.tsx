"use client";

import { act, useState } from "react";
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
export type TPosition = { id: string; name: string; img: TImg | undefined };
export type TArea = { id: string; name: string; color: string };

export const CreateRanking = () => {
  const [isOpen, setIsOpen] = useState(false);
  const onOpen = () => setIsOpen(true);
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

  const dispatch = (action: TDispatchAction, payload: any) => {
    switch (action) {
      case "addPosition":
        return addPosition(payload);
      case "removePosition":
        return removePosition(payload);
      case "changePosition":
        return changePosition(payload);
      case "addArea":
        return addArea(payload);
      case "changeArea":
        return changeArea(payload);
      case "removeArea":
        return removeArea(payload);
      case "changeTitle":
        return changeTitle(payload);
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
