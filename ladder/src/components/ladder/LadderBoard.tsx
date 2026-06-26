"use client";

import { useMemo } from "react";
import type { LadderGrid } from "@/lib/ladder";
import { tracePath } from "@/lib/ladder";
import { COL_WIDTH, createLayout, pathToSvgD } from "@/lib/ladderGeometry";
import type { Entry, RevealedResult } from "@/types/ladder";
import AnimatedMarker from "./AnimatedMarker";

interface LadderBoardProps {
  ladder: LadderGrid;
  names: Entry[];
  prizes: Entry[];
  revealed: Record<number, RevealedResult>;
  animatingCols: Set<number>;
  onSelectStart: (col: number) => void;
}

const TRACK_COLOR = "#DDD6FE";
const ANIMATING_COLOR = "#F472B6";
const DEFAULT_BORDER = "#DDD6FE";
const DEFAULT_TEXT = "#7C3AED";

export default function LadderBoard({
  ladder,
  names,
  prizes,
  revealed,
  animatingCols,
  onSelectStart,
}: LadderBoardProps) {
  const layout = useMemo(() => createLayout(ladder), [ladder]);

  const revealedPaths = useMemo(() => {
    return Object.entries(revealed).map(([startColStr, result]) => {
      const startCol = Number(startColStr);
      const points = tracePath(ladder, startCol);
      return { startCol, d: pathToSvgD(points, layout), color: result.color, endCol: result.endCol };
    });
  }, [ladder, revealed, layout]);

  const animatingPaths = useMemo(() => {
    return Array.from(animatingCols).map((startCol) => {
      const points = tracePath(ladder, startCol);
      return { startCol, d: pathToSvgD(points, layout) };
    });
  }, [ladder, animatingCols, layout]);

  const winnerColByEndCol = useMemo(() => {
    const map = new Map<number, string>();
    for (const path of revealedPaths) {
      map.set(path.endCol, path.color);
    }
    return map;
  }, [revealedPaths]);

  return (
    <div className="overflow-x-auto pb-2">
      <div
        className="relative mx-auto"
        style={{ width: layout.width, height: layout.height + 64 }}
      >
        <div className="flex" style={{ width: layout.width }}>
          {names.map((name, col) => {
            const isRevealed = revealed[col] !== undefined;
            const isAnimating = animatingCols.has(col);
            const color = revealed[col]?.color;
            return (
              <button
                key={name.id}
                type="button"
                onClick={() => onSelectStart(col)}
                disabled={isRevealed || isAnimating}
                className="shrink-0 flex items-center justify-center text-center px-1"
                style={{ width: COL_WIDTH, height: 36 }}
              >
                <span
                  className="text-xs sm:text-sm font-medium px-2 py-1 rounded-full border truncate transition-colors max-w-full"
                  style={{
                    borderColor: color ?? DEFAULT_BORDER,
                    backgroundColor: color ? `${color}1A` : "transparent",
                    color: color ?? DEFAULT_TEXT,
                  }}
                  title={name.value}
                >
                  {name.value || `참가자 ${col + 1}`}
                </span>
              </button>
            );
          })}
        </div>

        <div className="absolute left-0" style={{ top: 36, width: layout.width, height: layout.height }}>
          <svg
            width={layout.width}
            height={layout.height}
            viewBox={`0 0 ${layout.width} ${layout.height}`}
            className="block"
          >
            {Array.from({ length: ladder.participantCount }, (_, col) => (
              <line
                key={`v-${col}`}
                x1={layout.columnX(col)}
                y1={layout.rowY(0)}
                x2={layout.columnX(col)}
                y2={layout.rowY(ladder.rowCount)}
                stroke={TRACK_COLOR}
                strokeWidth={3}
                strokeLinecap="round"
              />
            ))}

            {ladder.rungs.map((rowRungs, row) =>
              rowRungs.map((hasRung, col) =>
                hasRung ? (
                  <line
                    key={`r-${row}-${col}`}
                    x1={layout.columnX(col)}
                    y1={layout.rowY(row + 1)}
                    x2={layout.columnX(col + 1)}
                    y2={layout.rowY(row + 1)}
                    stroke={TRACK_COLOR}
                    strokeWidth={3}
                    strokeLinecap="round"
                  />
                ) : null
              )
            )}

            {revealedPaths.map((path) => (
              <path
                key={`path-${path.startCol}`}
                d={path.d}
                fill="none"
                stroke={path.color}
                strokeWidth={3}
                strokeLinecap="round"
              />
            ))}

            {animatingPaths.map((path) => (
              <path
                key={`anim-${path.startCol}`}
                d={path.d}
                fill="none"
                stroke={ANIMATING_COLOR}
                strokeWidth={3}
                strokeLinecap="round"
                opacity={0.5}
              />
            ))}
          </svg>

          {animatingPaths.map((path) => (
            <AnimatedMarker key={`marker-${path.startCol}`} d={path.d} color={ANIMATING_COLOR} durationMs={850} />
          ))}
        </div>

        <div
          className="flex absolute left-0"
          style={{ top: 36 + layout.height, width: layout.width }}
        >
          {prizes.map((prize, col) => {
            const color = winnerColByEndCol.get(col);
            return (
              <div
                key={prize.id}
                className="shrink-0 flex items-center justify-center text-center px-1"
                style={{ width: COL_WIDTH, height: 28 }}
              >
                <span
                  className="text-xs sm:text-sm font-medium px-2 py-1 rounded-full border truncate transition-colors max-w-full"
                  style={{
                    borderColor: color ?? DEFAULT_BORDER,
                    backgroundColor: color ? `${color}1A` : "transparent",
                    color: color ?? DEFAULT_TEXT,
                  }}
                  title={prize.value}
                >
                  {prize.value || `결과 ${col + 1}`}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
