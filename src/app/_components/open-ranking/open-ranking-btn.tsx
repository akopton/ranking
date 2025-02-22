"use client";

export const OpenRankingBtn = ({ onClick }: { onClick: () => void }) => {
  return (
    <button
      onClick={onClick}
      className="flex h-56 w-56 flex-col items-center justify-center border-4 border-dashed"
      style={{
        borderRadius: "4rem",
      }}
    >
      <p className="block text-center">OTWÓRZ RANKING</p>
    </button>
  );
};
