'use client';

import { useEffect, useState } from 'react';
import { RouletteSection } from '@/types/roulette';

interface Props {
  result: RouletteSection | null;
  onClose: () => void;
}

export default function ResultDisplay({ result, onClose }: Props) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (result) {
      const t = setTimeout(() => setVisible(true), 150);
      return () => clearTimeout(t);
    } else {
      setVisible(false);
    }
  }, [result]);

  if (!result || !visible) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center cursor-pointer"
      style={{ background: 'rgba(0,0,0,0.75)', backdropFilter: 'blur(4px)' }}
      onClick={onClose}
    >
      <div
        className="relative text-center px-16 py-10 rounded-2xl select-none result-pop"
        style={{
          background: 'linear-gradient(135deg, #1a0a00 0%, #2d1000 50%, #1a0a00 100%)',
          border: '3px solid #FFD700',
          boxShadow: '0 0 60px rgba(255,215,0,0.4), 0 0 120px rgba(255,100,0,0.2)',
        }}
        onClick={e => e.stopPropagation()}
      >
        {/* 코너 장식 */}
        {['top-3 left-3', 'top-3 right-3', 'bottom-3 left-3', 'bottom-3 right-3'].map(pos => (
          <span
            key={pos}
            className={`absolute ${pos} text-yellow-400 text-lg`}
          >
            ✦
          </span>
        ))}

        <div className="text-yellow-400 text-3xl mb-3 tracking-widest">★ ★ ★</div>
        <p
          className="text-lg tracking-[0.3em] uppercase mb-4"
          style={{ color: '#C8A84B', fontFamily: "'Georgia', serif" }}
        >
          Winner!
        </p>

        <div
          className="inline-block px-10 py-5 rounded-xl text-5xl font-bold mb-6"
          style={{
            background: result.color,
            color: result.textColor,
            fontFamily: "'Georgia', serif",
            border: '2px solid rgba(255,215,0,0.5)',
            boxShadow: `0 0 30px ${result.color}88`,
            minWidth: '120px',
          }}
        >
          {result.label}
        </div>

        <p className="text-yellow-600 text-sm tracking-wider opacity-70">
          클릭하여 닫기
        </p>
      </div>
    </div>
  );
}
