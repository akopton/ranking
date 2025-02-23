"use client";
import { useCallback, useEffect, useRef, useState } from "react";
import { ModalFirstStep } from "./step/modal-first-step";
import { ModalSecondStep } from "./step/modal-second-step";
import { ModalThirdStep } from "./step/modal-third-step";
import {
  TImg,
  type TArea,
  type TDispatchAction,
  type TPosition,
} from "./create-ranking";
import { useRouter } from "next/navigation";

export const CreateRankingModal = ({
  data,
  dispatch,
  onClose,
}: {
  data: {
    title: string;
    positions: TPosition[];
    areas: TArea[];
  };
  dispatch: (
    action: TDispatchAction,
    payload: TPosition | string | TArea | TImg,
  ) => void;
  onClose: () => void;
}) => {
  const [step, setStep] = useState(1);
  const ref = useRef<HTMLDivElement>(null);
  const router = useRouter();

  const createRanking = useCallback(async () => {
    const dataToStore = {
      ...data,
      id: `ranking-${new Date().getTime().toString()}`,
    };

    const previousDataJson = localStorage.getItem("data");

    if (!previousDataJson) {
      localStorage.setItem("data", JSON.stringify([dataToStore]));
      return router.push(`/ranking/${dataToStore.id}`);
    }

    const previousData = JSON.parse(previousDataJson);
    const newData = [...previousData, dataToStore];
    localStorage.setItem("data", JSON.stringify(newData));
    return router.push(`/ranking/${dataToStore.id}`);
  }, [data, router]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        onClose();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [onClose]);

  return (
    <>
      <div
        ref={ref}
        className="fixed left-1/2 top-1/2 z-50 flex h-1/2 w-1/2 -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center rounded-3xl shadow-2xl"
        style={{
          backgroundColor: "rgba(36, 36, 36, .9)",
          backdropFilter: "blur(12px)",
        }}
      >
        {step === 1 && (
          <ModalFirstStep
            onNext={() => setStep((prev) => prev + 1)}
            title={data.title}
            dispatch={dispatch}
          />
        )}
        {step === 2 && (
          <ModalSecondStep
            onPrev={() => setStep((prev) => prev - 1)}
            onNext={() => setStep((prev) => prev + 1)}
            areas={data.areas}
            dispatch={dispatch}
          />
        )}
        {step === 3 && (
          <ModalThirdStep
            onPrev={() => setStep((prev) => prev - 1)}
            onNext={createRanking}
            positions={data.positions}
            dispatch={dispatch}
          />
        )}
      </div>
      <div
        className="fixed bottom-0 left-0 right-0 top-0"
        style={{
          backgroundColor: "rgba(150, 150, 150, .1)",
          backdropFilter: "blur(4px)",
        }}
      />
    </>
  );
};
