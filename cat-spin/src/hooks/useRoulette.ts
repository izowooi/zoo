'use client';

import { useState, useCallback, useRef } from 'react';
import { RouletteSection } from '@/types/roulette';
import { calcWinnerIndex } from '@/lib/rouletteUtils';

const MIN_SPINS = 5;
const MAX_SPINS = 10;
export const SPIN_DURATION = 4000;

export function useRoulette(sections: RouletteSection[]) {
  const [isSpinning, setIsSpinning] = useState(false);
  const [rotation, setRotation] = useState(0);
  const [result, setResult] = useState<RouletteSection | null>(null);
  const rotationRef = useRef(0);

  const spin = useCallback(() => {
    if (isSpinning) return;
    setResult(null);
    setIsSpinning(true);

    const extraSpins = (MIN_SPINS + Math.random() * (MAX_SPINS - MIN_SPINS)) * 360;
    const sectorAngle = 360 / sections.length;
    const randomSector = Math.floor(Math.random() * sections.length);
    // 해당 섹션 중앙에 포인터가 위치하도록 목표각 계산
    const targetOffset = sectorAngle * randomSector + sectorAngle / 2;

    const newRotation = rotationRef.current + extraSpins + targetOffset;
    rotationRef.current = newRotation;
    setRotation(newRotation);

    setTimeout(() => {
      const winnerIdx = calcWinnerIndex(newRotation, sections.length);
      setResult(sections[winnerIdx]);
      setIsSpinning(false);
    }, SPIN_DURATION + 150);
  }, [isSpinning, sections]);

  const clearResult = useCallback(() => setResult(null), []);

  return { isSpinning, rotation, result, spin, clearResult };
}
