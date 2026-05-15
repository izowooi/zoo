const toRad = (deg: number) => (deg * Math.PI) / 180;

export function describeSector(
  cx: number,
  cy: number,
  r: number,
  startAngle: number,
  endAngle: number
): string {
  const x1 = cx + r * Math.cos(toRad(startAngle));
  const y1 = cy + r * Math.sin(toRad(startAngle));
  const x2 = cx + r * Math.cos(toRad(endAngle));
  const y2 = cy + r * Math.sin(toRad(endAngle));
  const largeArc = endAngle - startAngle > 180 ? 1 : 0;
  return [
    `M ${cx} ${cy}`,
    `L ${x1.toFixed(4)} ${y1.toFixed(4)}`,
    `A ${r} ${r} 0 ${largeArc} 1 ${x2.toFixed(4)} ${y2.toFixed(4)}`,
    'Z',
  ].join(' ');
}

export function getLabelPosition(
  cx: number,
  cy: number,
  r: number,
  startAngle: number,
  endAngle: number,
  radiusRatio = 0.65
): { x: number; y: number; angle: number } {
  const midAngle = (startAngle + endAngle) / 2;
  const labelR = r * radiusRatio;
  return {
    x: cx + labelR * Math.cos(toRad(midAngle)),
    y: cy + labelR * Math.sin(toRad(midAngle)),
    angle: midAngle,
  };
}

export function calcWinnerIndex(totalRotation: number, sectionCount: number): number {
  const sectorAngle = 360 / sectionCount;
  // 포인터는 12시(270도) 방향에 고정, 휠은 시계 방향 회전
  const normalizedAngle = ((360 - (totalRotation % 360)) + 270) % 360;
  return Math.floor(normalizedAngle / sectorAngle) % sectionCount;
}
