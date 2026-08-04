import { FaStar, FaStarHalfAlt, FaRegStar } from 'react-icons/fa';

export default function Rating({ value = 0, count, size = 13 }) {
  const full = Math.floor(value);
  const half = value - full >= 0.5;
  const empty = 5 - full - (half ? 1 : 0);
  return (
    <div className="flex items-center gap-1" style={{ color: 'var(--brand)' }}>
      <div className="flex" style={{ fontSize: size }}>
        {Array.from({ length: full }).map((_, i) => <FaStar key={'f' + i} />)}
        {half && <FaStarHalfAlt />}
        {Array.from({ length: empty }).map((_, i) => <FaRegStar key={'e' + i} />)}
      </div>
      {count !== undefined && (
        <span className="text-xs" style={{ color: 'var(--text-muted)' }}>({count})</span>
      )}
    </div>
  );
}
