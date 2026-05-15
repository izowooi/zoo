'use client';

import { useMemo } from 'react';
import { RouletteSection } from '@/types/roulette';
import { describeSector, getLabelPosition } from '@/lib/rouletteUtils';
import { SPIN_DURATION } from '@/hooks/useRoulette';

interface Props {
  sections: RouletteSection[];
  rotation: number;
  isSpinning: boolean;
}

const CX = 250, CY = 250, R = 228;

export default function RouletteWheel({ sections, rotation, isSpinning }: Props) {
  const sectorAngle = 360 / sections.length;

  const slices = useMemo(() =>
    sections.map((section, i) => {
      const startAngle = i * sectorAngle - 90;
      const endAngle = startAngle + sectorAngle;
      const path = describeSector(CX, CY, R, startAngle, endAngle);
      const label = getLabelPosition(CX, CY, R, startAngle, endAngle, 0.67);
      return { section, path, label, startAngle };
    }),
  [sections, sectorAngle]);

  const fontSize = sections.length > 14 ? 11 : sections.length > 10 ? 14 : sections.length > 7 ? 16 : 20;

  return (
    <div className="relative w-full h-full flex items-center justify-center">
      {/* 외부 장식 링 */}
      <div
        className="absolute inset-0 rounded-full"
        style={{
          background: 'conic-gradient(from 0deg, #7A5C00, #FFD700, #B8960C, #FFD700, #7A5C00, #FFD700, #B8960C, #FFD700, #7A5C00)',
          boxShadow: '0 0 40px rgba(255,215,0,0.3), 0 0 80px rgba(255,215,0,0.1)',
        }}
      />
      <div className="absolute inset-[6px] rounded-full bg-[#0a0005]" />

      <svg
        viewBox="0 0 500 500"
        className="relative z-10 w-[calc(100%-16px)] h-[calc(100%-16px)]"
        style={{
          transform: `rotate(${rotation}deg)`,
          transition: isSpinning
            ? `transform ${SPIN_DURATION}ms cubic-bezier(0.17, 0.67, 0.12, 0.99)`
            : 'none',
          filter: 'drop-shadow(0 4px 24px rgba(0,0,0,0.8))',
        }}
      >
        {/* 베이스 원 */}
        <circle cx={CX} cy={CY} r={R + 4} fill="#111" />

        {/* 섹션 슬라이스 */}
        {slices.map(({ section, path, label }) => (
          <g key={section.id}>
            <path d={path} fill={section.color} stroke="#1a1a1a" strokeWidth="1.5" />
            <text
              x={label.x}
              y={label.y}
              fill={section.textColor}
              fontSize={fontSize}
              fontWeight="bold"
              textAnchor="middle"
              dominantBaseline="middle"
              transform={`rotate(${label.angle + 90}, ${label.x}, ${label.y})`}
              style={{ fontFamily: "'Georgia', serif", userSelect: 'none', pointerEvents: 'none' }}
            >
              {section.label}
            </text>
          </g>
        ))}

        {/* 골드 경계선 */}
        {slices.map(({ startAngle, section }) => {
          const rad = (startAngle * Math.PI) / 180;
          return (
            <line
              key={`line-${section.id}`}
              x1={CX} y1={CY}
              x2={(CX + R * Math.cos(rad)).toFixed(4)}
              y2={(CY + R * Math.sin(rad)).toFixed(4)}
              stroke="#FFD700"
              strokeWidth="1.5"
              opacity="0.5"
            />
          );
        })}

        {/* 외곽 골드 링 */}
        <circle cx={CX} cy={CY} r={R} fill="none" stroke="#FFD700" strokeWidth="2" opacity="0.7" />

        {/* 중앙 허브 */}
        <circle cx={CX} cy={CY} r={36} fill="url(#hubGrad)" stroke="#FFD700" strokeWidth="3" />
        <circle cx={CX} cy={CY} r={20} fill="url(#innerHub)" />
        <circle cx={CX} cy={CY} r={8} fill="#FFD700" opacity="0.9" />

        <defs>
          <radialGradient id="hubGrad" cx="40%" cy="35%" r="60%">
            <stop offset="0%" stopColor="#3a2a00" />
            <stop offset="100%" stopColor="#0d0d0d" />
          </radialGradient>
          <radialGradient id="innerHub" cx="40%" cy="35%" r="60%">
            <stop offset="0%" stopColor="#C8A84B" />
            <stop offset="100%" stopColor="#7A5C00" />
          </radialGradient>
        </defs>
      </svg>
    </div>
  );
}
