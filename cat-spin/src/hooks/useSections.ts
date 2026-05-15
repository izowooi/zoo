'use client';

import { useState, useCallback } from 'react';
import { RouletteSection } from '@/types/roulette';
import { getColorForIndex } from '@/lib/colorPalette';

const DEFAULT_COUNT = 8;

function buildSections(count: number): RouletteSection[] {
  return Array.from({ length: count }, (_, i) => {
    const { bg, text } = getColorForIndex(i);
    return { id: i, label: String(i + 1), color: bg, textColor: text };
  });
}

export function useSections() {
  const [sections, setSections] = useState<RouletteSection[]>(() => buildSections(DEFAULT_COUNT));

  const updateCount = useCallback((count: number) => {
    const clamped = Math.max(2, Math.min(20, count));
    setSections(buildSections(clamped));
  }, []);

  const updateLabel = useCallback((id: number, label: string) => {
    setSections(prev => prev.map(s => (s.id === id ? { ...s, label } : s)));
  }, []);

  return { sections, updateCount, updateLabel };
}
