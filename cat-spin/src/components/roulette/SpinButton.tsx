interface Props {
  onSpin: () => void;
  isSpinning: boolean;
}

export default function SpinButton({ onSpin, isSpinning }: Props) {
  return (
    <button
      onClick={onSpin}
      disabled={isSpinning}
      className="relative px-14 py-4 text-2xl font-bold tracking-[0.25em] uppercase rounded-full
        disabled:opacity-60 disabled:cursor-not-allowed disabled:scale-100 disabled:shadow-none
        transition-all duration-200 hover:scale-105 active:scale-95 select-none"
      style={{
        background: 'linear-gradient(180deg, #7B0D1E 0%, #4A0010 50%, #2A0008 100%)',
        border: '3px solid #FFD700',
        color: '#FFD700',
        fontFamily: "'Georgia', serif",
        boxShadow: isSpinning
          ? 'none'
          : '0 0 25px rgba(255,215,0,0.35), 0 0 60px rgba(255,0,50,0.2), inset 0 1px 0 rgba(255,215,0,0.2)',
        textShadow: '0 0 10px rgba(255,215,0,0.6)',
      }}
    >
      <span className={isSpinning ? 'animate-pulse' : ''}>
        {isSpinning ? 'SPINNING...' : 'SPIN'}
      </span>
      {/* 광택 오버레이 */}
      <span
        className="absolute inset-0 rounded-full pointer-events-none"
        style={{
          background: 'linear-gradient(180deg, rgba(255,255,255,0.12) 0%, transparent 60%)',
        }}
      />
    </button>
  );
}
