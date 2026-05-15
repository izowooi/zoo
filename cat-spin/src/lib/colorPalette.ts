const CASINO_COLORS = [
  { bg: '#C0392B', text: '#FFD700' },
  { bg: '#1A1A2E', text: '#E8E8E8' },
  { bg: '#7B0D1E', text: '#FFD700' },
  { bg: '#0D0D0D', text: '#C8A84B' },
  { bg: '#6D1A1A', text: '#FFD700' },
  { bg: '#16213E', text: '#E0E0E0' },
  { bg: '#8B0000', text: '#FFFACD' },
  { bg: '#2C2C54', text: '#FFD700' },
  { bg: '#7B241C', text: '#FAD7A0' },
  { bg: '#212F3C', text: '#AED6F1' },
  { bg: '#4A1942', text: '#FFD700' },
  { bg: '#1B2631', text: '#F0E68C' },
  { bg: '#922B21', text: '#FDEBD0' },
  { bg: '#1F3A5F', text: '#FFD700' },
  { bg: '#5B0000', text: '#FFD700' },
  { bg: '#0B3D0B', text: '#FFD700' },
  { bg: '#4A235A', text: '#F8C471' },
  { bg: '#1A3C40', text: '#FFD700' },
  { bg: '#3D0000', text: '#FFB347' },
  { bg: '#003153', text: '#FFD700' },
];

export function getColorForIndex(index: number) {
  return CASINO_COLORS[index % CASINO_COLORS.length];
}
