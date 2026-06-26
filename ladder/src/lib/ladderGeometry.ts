import type { LadderGrid, PathPoint } from "./ladder";

export const COL_WIDTH = 88;
export const ROW_HEIGHT = 30;
export const TOP_PADDING = 8;
export const BOTTOM_PADDING = 8;

export interface LadderLayout {
  width: number;
  height: number;
  columnX: (col: number) => number;
  rowY: (row: number) => number;
}

export function createLayout(ladder: LadderGrid): LadderLayout {
  const width = COL_WIDTH * ladder.participantCount;
  const height = TOP_PADDING + ROW_HEIGHT * ladder.rowCount + BOTTOM_PADDING;
  const columnX = (col: number) => COL_WIDTH / 2 + col * COL_WIDTH;
  const rowY = (row: number) => TOP_PADDING + row * ROW_HEIGHT;
  return { width, height, columnX, rowY };
}

export function pathToSvgD(points: PathPoint[], layout: LadderLayout): string {
  return points
    .map((point, index) => {
      const x = layout.columnX(point.col);
      const y = layout.rowY(point.row);
      return `${index === 0 ? "M" : "L"} ${x} ${y}`;
    })
    .join(" ");
}
