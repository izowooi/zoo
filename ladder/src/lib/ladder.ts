export type Rung = boolean[][];

export interface LadderGrid {
  participantCount: number;
  rowCount: number;
  /** rungs[row][col] === true 면 col번째 세로줄과 col+1번째 세로줄이 그 높이에서 연결됨 */
  rungs: Rung;
}

const MIN_ROWS = 8;

/**
 * 같은 행에서 인접한 가로줄이 동시에 생기지 않도록(겹치는 교차점 방지) 생성한다.
 * 이 제약이 깨지면 경로 추적이 모호해져 1:1 매핑이 보장되지 않는다.
 */
export function generateLadder(participantCount: number, rowCount = MIN_ROWS): LadderGrid {
  const rungs: Rung = Array.from({ length: rowCount }, () =>
    Array.from({ length: Math.max(participantCount - 1, 0) }, () => false)
  );

  for (let row = 0; row < rowCount; row++) {
    let col = 0;
    while (col < participantCount - 1) {
      if (Math.random() < 0.5) {
        rungs[row][col] = true;
        col += 2;
      } else {
        col += 1;
      }
    }
  }

  return { participantCount, rowCount, rungs };
}

export interface PathPoint {
  row: number;
  col: number;
}

/**
 * 시작 컬럼에서 출발해 사다리를 따라 내려갔을 때 지나는 좌표 목록을 반환한다.
 * row는 0..rowCount 사이의 "레벨"이며, 같은 레벨에 두 점이 연속되면 그 레벨에서
 * 가로(rung) 이동이 있었다는 뜻이다. 마지막 요소의 col이 최종 도착 컬럼이다.
 */
export function tracePath(ladder: LadderGrid, startCol: number): PathPoint[] {
  const points: PathPoint[] = [{ row: 0, col: startCol }];
  let col = startCol;

  for (let row = 0; row < ladder.rowCount; row++) {
    points.push({ row: row + 1, col });

    const rungsAtRow = ladder.rungs[row];
    if (rungsAtRow[col]) {
      col += 1;
      points.push({ row: row + 1, col });
    } else if (col > 0 && rungsAtRow[col - 1]) {
      col -= 1;
      points.push({ row: row + 1, col });
    }
  }

  return points;
}

/** 모든 시작 컬럼에 대한 최종 도착 컬럼 배열(순열)을 반환한다. */
export function resolveAll(ladder: LadderGrid): number[] {
  return Array.from({ length: ladder.participantCount }, (_, startCol) => {
    const path = tracePath(ladder, startCol);
    return path[path.length - 1].col;
  });
}

export function isPermutation(values: number[]): boolean {
  const n = values.length;
  const seen = new Set(values);
  if (seen.size !== n) return false;
  for (let i = 0; i < n; i++) {
    if (!seen.has(i)) return false;
  }
  return true;
}
