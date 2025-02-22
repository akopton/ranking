"use client";

import { useState } from "react";
import { OpenRankingBtn } from "./open-ranking-btn";
import { OpenRankingModal } from "./open-ranking-modal";

export const OpenRanking = () => {
  const [isOpened, setIsOpened] = useState(false);

  return (
    <>
      <OpenRankingBtn onClick={() => setIsOpened(true)} />
      {isOpened && <OpenRankingModal onClose={() => setIsOpened(false)} />}
    </>
  );
};
