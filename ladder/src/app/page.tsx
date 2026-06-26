"use client";

import { useLadderGame } from "@/hooks/useLadderGame";
import SetupForm from "@/components/ladder/SetupForm";
import LadderBoard from "@/components/ladder/LadderBoard";

export default function Home() {
  const {
    names,
    prizes,
    phase,
    ladder,
    revealed,
    animatingCols,
    canAdd,
    canRemove,
    allRevealed,
    addParticipant,
    removeParticipant,
    updateName,
    updatePrize,
    startGame,
    reshuffle,
    backToSetup,
    revealPath,
    revealAll,
  } = useLadderGame();

  return (
    <main className="flex-1 flex flex-col items-center px-4 py-8 sm:py-12">
      <div className="w-full max-w-2xl flex flex-col items-center">
        <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-1">사다리타기</h1>
        <p className="text-sm text-slate-500 mb-8">
          이름을 누르면 사다리를 타고 내려가 결과를 알려드려요
        </p>

        {phase === "setup" && (
          <SetupForm
            names={names}
            prizes={prizes}
            canAdd={canAdd}
            canRemove={canRemove}
            onAdd={addParticipant}
            onRemove={removeParticipant}
            onUpdateName={updateName}
            onUpdatePrize={updatePrize}
            onStart={startGame}
          />
        )}

        {phase === "play" && ladder && (
          <div className="w-full flex flex-col items-center gap-6">
            <LadderBoard
              ladder={ladder}
              names={names}
              prizes={prizes}
              revealed={revealed}
              animatingCols={animatingCols}
              onSelectStart={revealPath}
            />

            <div className="flex flex-wrap justify-center gap-3">
              <button
                type="button"
                onClick={revealAll}
                disabled={allRevealed}
                className="rounded-xl bg-indigo-600 text-white font-semibold px-5 py-2.5 text-sm hover:bg-indigo-700 disabled:opacity-40 disabled:cursor-not-allowed active:scale-95 transition"
              >
                전체 결과 보기
              </button>
              <button
                type="button"
                onClick={reshuffle}
                className="rounded-xl border border-slate-300 text-slate-700 font-semibold px-5 py-2.5 text-sm hover:bg-slate-100 active:scale-95 transition"
              >
                다시 섞기
              </button>
              <button
                type="button"
                onClick={backToSetup}
                className="rounded-xl border border-slate-300 text-slate-700 font-semibold px-5 py-2.5 text-sm hover:bg-slate-100 active:scale-95 transition"
              >
                참가자 다시 입력
              </button>
            </div>

            {allRevealed && (
              <div className="w-full max-w-md rounded-xl border border-slate-200 bg-white p-4">
                <h2 className="text-sm font-semibold text-slate-700 mb-2">최종 결과</h2>
                <ul className="flex flex-col gap-1">
                  {names.map((name, col) => {
                    const endCol = revealed[col]?.endCol;
                    const prizeLabel =
                      endCol !== undefined ? prizes[endCol]?.value || `결과 ${endCol + 1}` : "-";
                    return (
                      <li key={name.id} className="flex items-center justify-between text-sm">
                        <span className="text-slate-600">{name.value || `참가자 ${col + 1}`}</span>
                        <span className="font-medium text-slate-900">{prizeLabel}</span>
                      </li>
                    );
                  })}
                </ul>
              </div>
            )}
          </div>
        )}
      </div>
    </main>
  );
}
