"use client";
import { useState } from "react";

export const ModalFirstStep = ({
  title,
  dispatch,
  onNext,
}: {
  title: string;
  dispatch: (action: "changeTitle", payload: string) => void;
  onNext: () => void;
}) => {
  return (
    <div className="flex flex-col items-center justify-center gap-10">
      <label
        htmlFor="title"
        className="flex flex-col items-center justify-center"
      >
        Wpisz tytuł rankingu
        <input
          id="title"
          name="title"
          className="rounded-xl border-2 bg-transparent bg-none px-4 py-2 outline-none"
          type="text"
          value={title}
          onChange={(e) => dispatch("changeTitle", e.target.value)}
          autoFocus
        />
      </label>
      <button
        className="rounded-xl border-2 bg-transparent bg-none px-4 py-2 outline-none"
        onClick={() => {
          if (!title || title === "") return;
          onNext();
        }}
      >
        DALEJ {"->"}
      </button>
    </div>
  );
};
