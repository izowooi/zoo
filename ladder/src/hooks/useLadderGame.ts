"use client";

import { useCallback, useMemo, useState } from "react";
import { generateLadder, tracePath, type LadderGrid } from "@/lib/ladder";
import { getColorForIndex } from "@/lib/colorPalette";
import type { Entry, GamePhase, RevealedResult } from "@/types/ladder";

const MIN_PARTICIPANTS = 2;
const MAX_PARTICIPANTS = 10;

function createEntry(value: string): Entry {
  return { id: crypto.randomUUID(), value };
}

function defaultEntries(prefix: string, count: number): Entry[] {
  return Array.from({ length: count }, (_, i) => createEntry(`${prefix} ${i + 1}`));
}

export function useLadderGame() {
  const [names, setNames] = useState<Entry[]>(() => defaultEntries("참가자", 4));
  const [prizes, setPrizes] = useState<Entry[]>(() => defaultEntries("결과", 4));
  const [phase, setPhase] = useState<GamePhase>("setup");
  const [ladder, setLadder] = useState<LadderGrid | null>(null);
  const [revealed, setRevealed] = useState<Record<number, RevealedResult>>({});
  const [animatingCols, setAnimatingCols] = useState<Set<number>>(new Set());

  const canAdd = names.length < MAX_PARTICIPANTS;
  const canRemove = names.length > MIN_PARTICIPANTS;

  const addParticipant = useCallback(() => {
    if (!canAdd) return;
    setNames((prev) => [...prev, createEntry(`참가자 ${prev.length + 1}`)]);
    setPrizes((prev) => [...prev, createEntry(`결과 ${prev.length + 1}`)]);
  }, [canAdd]);

  const removeParticipant = useCallback(() => {
    if (!canRemove) return;
    setNames((prev) => prev.slice(0, -1));
    setPrizes((prev) => prev.slice(0, -1));
  }, [canRemove]);

  const updateName = useCallback((id: string, value: string) => {
    setNames((prev) => prev.map((e) => (e.id === id ? { ...e, value } : e)));
  }, []);

  const updatePrize = useCallback((id: string, value: string) => {
    setPrizes((prev) => prev.map((e) => (e.id === id ? { ...e, value } : e)));
  }, []);

  const startGame = useCallback(() => {
    const count = names.length;
    const rowCount = Math.max(8, count * 3);
    setLadder(generateLadder(count, rowCount));
    setRevealed({});
    setAnimatingCols(new Set());
    setPhase("play");
  }, [names.length]);

  const reshuffle = useCallback(() => {
    const count = names.length;
    const rowCount = Math.max(8, count * 3);
    setLadder(generateLadder(count, rowCount));
    setRevealed({});
    setAnimatingCols(new Set());
  }, [names.length]);

  const backToSetup = useCallback(() => {
    setPhase("setup");
    setLadder(null);
    setRevealed({});
    setAnimatingCols(new Set());
  }, []);

  const revealPath = useCallback(
    (startCol: number, delayMs = 0) => {
      if (!ladder) return;
      if (revealed[startCol] || animatingCols.has(startCol)) return;

      const path = tracePath(ladder, startCol);
      const endCol = path[path.length - 1].col;

      window.setTimeout(() => {
        setAnimatingCols((prev) => {
          const next = new Set(prev);
          next.add(startCol);
          return next;
        });

        window.setTimeout(() => {
          setRevealed((prev) => {
            if (prev[startCol]) return prev;
            const color = getColorForIndex(Object.keys(prev).length);
            return { ...prev, [startCol]: { endCol, color } };
          });
          setAnimatingCols((prev) => {
            const next = new Set(prev);
            next.delete(startCol);
            return next;
          });
        }, 900);
      }, delayMs);
    },
    [ladder, revealed, animatingCols]
  );

  const revealAll = useCallback(() => {
    if (!ladder) return;
    let staggerIndex = 0;
    for (let col = 0; col < ladder.participantCount; col++) {
      if (!revealed[col] && !animatingCols.has(col)) {
        revealPath(col, staggerIndex * 150);
        staggerIndex += 1;
      }
    }
  }, [ladder, revealed, animatingCols, revealPath]);

  const allRevealed = useMemo(
    () => ladder !== null && Object.keys(revealed).length === ladder.participantCount,
    [ladder, revealed]
  );

  return {
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
  };
}
