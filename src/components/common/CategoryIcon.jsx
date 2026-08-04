import { FaHeadphones, FaTshirt, FaCouch, FaSprayCan, FaDumbbell, FaChild } from 'react-icons/fa';

const iconMap = {
  electronics: FaHeadphones,
  fashion: FaTshirt,
  home: FaCouch,
  beauty: FaSprayCan,
  sports: FaDumbbell,
  kids: FaChild,
};

export default function CategoryIcon({ slug, fallback, size = 16, className = '', style }) {
  const Icon = iconMap[slug];
  if (Icon) return <Icon size={size} className={className} style={style} />;
  return <span className={className} style={style}>{fallback}</span>;
}
