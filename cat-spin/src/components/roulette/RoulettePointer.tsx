export default function RoulettePointer() {
  return (
    <div className="absolute top-0 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center"
      style={{ marginTop: '-2px' }}>
      {/* 삼각형 화살표 */}
      <div
        style={{
          width: 0,
          height: 0,
          borderLeft: '14px solid transparent',
          borderRight: '14px solid transparent',
          borderTop: '44px solid #FFD700',
          filter: 'drop-shadow(0 3px 6px rgba(0,0,0,0.9))',
        }}
      />
      {/* 핀 몸통 */}
      <div
        className="w-[10px] h-[18px] -mt-[2px]"
        style={{
          background: 'linear-gradient(to bottom, #FFD700, #B8860B)',
          borderRadius: '0 0 4px 4px',
          boxShadow: '0 2px 6px rgba(0,0,0,0.6)',
        }}
      />
    </div>
  );
}
