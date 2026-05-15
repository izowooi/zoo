'use client';

import RouletteWheel from '@/components/roulette/RouletteWheel';
import RoulettePointer from '@/components/roulette/RoulettePointer';
import SpinButton from '@/components/roulette/SpinButton';
import ResultDisplay from '@/components/roulette/ResultDisplay';
import SectionSettings from '@/components/settings/SectionSettings';
import { useSections } from '@/hooks/useSections';
import { useRoulette } from '@/hooks/useRoulette';

export default function Home() {
  const { sections, updateCount, updateLabel } = useSections();
  const { isSpinning, rotation, result, spin, clearResult } = useRoulette(sections);

  return (
    <main
      className="min-h-screen flex flex-col items-center justify-center gap-8 p-6 lg:p-10"
      style={{
        background: `
          radial-gradient(ellipse at 50% 40%, #1a0a00 0%, #0a0005 50%, #000000 100%)
        `,
      }}
    >
      {/* 헤더 */}
      <div className="text-center">
        <h1
          className="text-4xl lg:text-5xl font-bold tracking-[0.3em] uppercase"
          style={{
            color: '#FFD700',
            fontFamily: "'Georgia', serif",
            textShadow: '0 0 20px rgba(255,215,0,0.5), 0 0 40px rgba(255,100,0,0.2)',
          }}
        >
          Casino Roulette
        </h1>
        <div className="flex items-center justify-center gap-3 mt-2">
          <div className="h-px w-16" style={{ background: 'linear-gradient(to right, transparent, #FFD700)' }} />
          <span className="text-yellow-600 text-sm tracking-widest">★ SPIN TO WIN ★</span>
          <div className="h-px w-16" style={{ background: 'linear-gradient(to left, transparent, #FFD700)' }} />
        </div>
      </div>

      {/* 메인 콘텐츠 */}
      <div className="flex flex-col lg:flex-row items-center justify-center gap-10 lg:gap-16 w-full max-w-5xl">

        {/* 룰렛 영역 */}
        <div
          className="relative wheel-glow rounded-full flex-shrink-0"
          style={{ width: 'min(500px, 90vw)', height: 'min(500px, 90vw)' }}
        >
          {/* 외부 장식 테두리 */}
          <div
            className="absolute inset-0 rounded-full"
            style={{
              background: 'conic-gradient(from 0deg, #3a2800, #FFD700 10%, #3a2800 20%, #FFD700 30%, #3a2800 40%, #FFD700 50%, #3a2800 60%, #FFD700 70%, #3a2800 80%, #FFD700 90%, #3a2800)',
              padding: '4px',
            }}
          >
            <div className="w-full h-full rounded-full" style={{ background: '#0a0005' }} />
          </div>

          {/* 포인터 */}
          <RoulettePointer />

          {/* 룰렛 휠 */}
          <div className="absolute inset-[4px]">
            <RouletteWheel
              sections={sections}
              rotation={rotation}
              isSpinning={isSpinning}
            />
          </div>
        </div>

        {/* 우측 패널 */}
        <div className="flex flex-col items-center gap-6">
          <SpinButton onSpin={spin} isSpinning={isSpinning} />

          <SectionSettings
            sections={sections}
            onCountChange={updateCount}
            onLabelChange={updateLabel}
            isSpinning={isSpinning}
          />
        </div>
      </div>

      {/* 결과 모달 */}
      <ResultDisplay result={result} onClose={clearResult} />
    </main>
  );
}
