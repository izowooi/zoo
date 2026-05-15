'use client';

import { RouletteSection } from '@/types/roulette';

interface Props {
  sections: RouletteSection[];
  onCountChange: (n: number) => void;
  onLabelChange: (id: number, label: string) => void;
  isSpinning: boolean;
}

export default function SectionSettings({ sections, onCountChange, onLabelChange, isSpinning }: Props) {
  return (
    <div
      className="rounded-2xl p-5 w-72"
      style={{
        background: 'linear-gradient(180deg, #2e1200 0%, #1a0808 100%)',
        border: '1px solid rgba(255,215,0,0.45)',
        boxShadow: '0 4px 32px rgba(255,140,0,0.2), 0 0 0 1px rgba(255,215,0,0.1)',
      }}
    >
      <h2
        className="text-xl font-bold mb-4 text-center tracking-[0.2em] uppercase"
        style={{ color: '#FFE55C', fontFamily: "'Georgia', serif", textShadow: '0 0 16px rgba(255,229,92,0.7)' }}
      >
        설정
      </h2>

      {/* 섹션 개수 슬라이더 */}
      <div className="mb-5">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm tracking-wider" style={{ color: '#FFD06A' }}>
            섹션 개수
          </span>
          <span
            className="font-bold text-lg w-8 text-center"
            style={{ color: '#FFD700', fontFamily: "'Georgia', serif" }}
          >
            {sections.length}
          </span>
        </div>
        <input
          type="range"
          min={2}
          max={20}
          value={sections.length}
          disabled={isSpinning}
          onChange={e => onCountChange(Number(e.target.value))}
          className="w-full h-2 rounded-full appearance-none cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
          style={{ accentColor: '#FFD700', background: '#2a1500' }}
        />
        <div className="flex justify-between text-xs mt-1" style={{ color: 'rgba(200,168,75,0.5)' }}>
          <span>2</span>
          <span>20</span>
        </div>
      </div>

      {/* 구분선 */}
      <div className="mb-4" style={{ borderTop: '1px solid rgba(255,215,0,0.15)' }} />

      {/* 라벨 편집 목록 */}
      <p className="text-xs tracking-wider mb-3" style={{ color: 'rgba(200,168,75,0.6)' }}>
        라벨 편집
      </p>
      <div className="space-y-2 max-h-60 overflow-y-auto pr-1"
        style={{ scrollbarWidth: 'thin', scrollbarColor: '#7A5C00 transparent' }}>
        {sections.map(section => (
          <div key={section.id} className="flex items-center gap-2">
            <div
              className="w-5 h-5 rounded-sm flex-shrink-0"
              style={{
                background: section.color,
                border: '1px solid rgba(255,215,0,0.3)',
              }}
            />
            <input
              type="text"
              value={section.label}
              maxLength={8}
              disabled={isSpinning}
              onChange={e => onLabelChange(section.id, e.target.value)}
              className="flex-1 rounded px-2 py-1 text-sm outline-none
                disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              style={{
                background: 'rgba(0,0,0,0.5)',
                border: '1px solid rgba(255,215,0,0.2)',
                color: '#E0E0E0',
              }}
              onFocus={e => {
                e.currentTarget.style.borderColor = 'rgba(255,215,0,0.6)';
              }}
              onBlur={e => {
                e.currentTarget.style.borderColor = 'rgba(255,215,0,0.2)';
              }}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
