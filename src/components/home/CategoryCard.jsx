import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import CategoryIcon from '../common/CategoryIcon';

export default function CategoryCard({ category }) {
  const [imgError, setImgError] = useState(false);
  useEffect(() => { setImgError(false); }, [category.image]);
  const showImage = !!category.image && !imgError;

  return (
    <Link to={`/category/${category.slug}`} className="flex flex-col items-center gap-2.5 shrink-0 group">
      <div
        className="w-16 h-16 md:w-24 md:h-24 lg:w-28 lg:h-28 rounded-full overflow-hidden border-2 flex items-center justify-center relative transition-transform duration-300 group-hover:-translate-y-1"
        style={{ borderColor: 'var(--border)', background: 'var(--surface-2)' }}
      >
        {showImage ? (
          <>
            <img src={category.image} alt={category.name} className="w-full h-full object-cover" loading="lazy" onError={() => setImgError(true)} />
            <span className="absolute -bottom-1 -right-1 w-6 h-6 lg:w-7 lg:h-7 rounded-full flex items-center justify-center text-xs" style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}>
              <CategoryIcon slug={category.slug} fallback={category.icon} size={12} />
            </span>
          </>
        ) : (
          <CategoryIcon slug={category.slug} fallback={category.icon || '🏷️'} size={28} style={{ color: 'var(--brand)' }} />
        )}
      </div>
      <span className="text-xs md:text-sm font-medium text-center max-w-[80px] md:max-w-[110px]" style={{ color: 'var(--text)' }}>{category.name}</span>
    </Link>
  );
}
