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
        <h1 className="title-cute text-4xl sm:text-5xl mb-2 select-none">
          🪜 사다리타기 🎉
        </h1>
        <p className="text-sm text-slate-500 mb-8">
          이름을 톡 누르면 사다리를 타고 내려가 결과를 알려줘요!
        </p>

        {phase === "setup" && (
          <div className="w-full rounded-3xl bg-white/80 backdrop-blur-sm border-2 border-pink-100 shadow-lg shadow-pink-100/50 p-5 sm:p-7">
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
          </div>
        )}

        {phase === "play" && ladder && (
          <div className="w-full flex flex-col items-center gap-6">
            <div className="w-full rounded-3xl bg-white/80 backdrop-blur-sm border-2 border-violet-100 shadow-lg shadow-violet-100/50 p-4 sm:p-6">
              <LadderBoard
                ladder={ladder}
                names={names}
                prizes={prizes}
                revealed={revealed}
                animatingCols={animatingCols}
                onSelectStart={revealPath}
              />
            </div>

            <div className="flex flex-wrap justify-center gap-3">
              <button
                type="button"
                onClick={revealAll}
                disabled={allRevealed}
                className="rounded-full bg-gradient-to-r from-pink-500 to-violet-500 text-white font-bold px-6 py-2.5 text-sm shadow-md shadow-pink-200 hover:scale-105 hover:-translate-y-0.5 disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:scale-100 disabled:hover:translate-y-0 active:scale-95 transition"
              >
                ✨ 전체 결과 보기
              </button>
              <button
                type="button"
                onClick={reshuffle}
                className="rounded-full border-2 border-sky-200 bg-sky-50 text-sky-700 font-bold px-6 py-2.5 text-sm hover:scale-105 hover:-translate-y-0.5 active:scale-95 transition"
              >
                🔀 다시 섞기
              </button>
              <button
                type="button"
                onClick={backToSetup}
                className="rounded-full border-2 border-amber-200 bg-amber-50 text-amber-700 font-bold px-6 py-2.5 text-sm hover:scale-105 hover:-translate-y-0.5 active:scale-95 transition"
              >
                ✏️ 참가자 다시 입력
              </button>
            </div>

            {allRevealed && (
              <div className="w-full max-w-md rounded-3xl border-2 border-emerald-100 bg-white/90 p-5 shadow-lg shadow-emerald-100/50">
                <h2 className="text-base font-bold text-emerald-600 mb-3" style={{ fontFamily: "var(--font-jua)" }}>
                  🏆 최종 결과
                </h2>
                <ul className="flex flex-col gap-1.5">
                  {names.map((name, col) => {
                    const endCol = revealed[col]?.endCol;
                    const prizeLabel =
                      endCol !== undefined ? prizes[endCol]?.value || `결과 ${endCol + 1}` : "-";
                    return (
                      <li
                        key={name.id}
                        className="flex items-center justify-between text-sm bg-slate-50 rounded-xl px-3 py-2"
                      >
                        <span className="text-slate-600">{name.value || `참가자 ${col + 1}`}</span>
                        <span className="font-bold text-slate-900">{prizeLabel}</span>
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
