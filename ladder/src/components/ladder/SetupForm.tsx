"use client";

import type { Entry } from "@/types/ladder";

interface SetupFormProps {
  names: Entry[];
  prizes: Entry[];
  canAdd: boolean;
  canRemove: boolean;
  onAdd: () => void;
  onRemove: () => void;
  onUpdateName: (id: string, value: string) => void;
  onUpdatePrize: (id: string, value: string) => void;
  onStart: () => void;
}

export default function SetupForm({
  names,
  prizes,
  canAdd,
  canRemove,
  onAdd,
  onRemove,
  onUpdateName,
  onUpdatePrize,
  onStart,
}: SetupFormProps) {
  return (
    <div className="w-full max-w-xl mx-auto">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-slate-800">참가자 & 결과 입력</h2>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={onRemove}
            disabled={!canRemove}
            className="h-9 w-9 rounded-full border border-slate-300 text-slate-600 text-lg leading-none disabled:opacity-30 disabled:cursor-not-allowed hover:bg-slate-100 active:scale-95 transition"
            aria-label="참가자 줄이기"
          >
            −
          </button>
          <button
            type="button"
            onClick={onAdd}
            disabled={!canAdd}
            className="h-9 w-9 rounded-full border border-slate-300 text-slate-600 text-lg leading-none disabled:opacity-30 disabled:cursor-not-allowed hover:bg-slate-100 active:scale-95 transition"
            aria-label="참가자 늘리기"
          >
            +
          </button>
        </div>
      </div>

      <div className="flex flex-col gap-2">
        {names.map((name, index) => (
          <div key={name.id} className="flex items-center gap-2">
            <input
              type="text"
              value={name.value}
              onChange={(e) => onUpdateName(name.id, e.target.value)}
              placeholder={`참가자 ${index + 1}`}
              className="flex-1 min-w-0 rounded-lg border border-slate-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
            />
            <span className="text-slate-400 text-sm shrink-0">→</span>
            <input
              type="text"
              value={prizes[index]?.value ?? ""}
              onChange={(e) => onUpdatePrize(prizes[index].id, e.target.value)}
              placeholder={`결과 ${index + 1}`}
              className="flex-1 min-w-0 rounded-lg border border-slate-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
            />
          </div>
        ))}
      </div>

      <button
        type="button"
        onClick={onStart}
        className="mt-6 w-full rounded-xl bg-indigo-600 text-white font-semibold py-3 hover:bg-indigo-700 active:scale-[0.99] transition"
      >
        사다리 만들기
      </button>
    </div>
  );
}
