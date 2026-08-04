import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import CategoryIcon from '../../components/common/CategoryIcon';

function CategoryThumb({ c }) {
  const [imgError, setImgError] = useState(false);
  useEffect(() => { setImgError(false); }, [c.image]);
  const showImage = !!c.image && !imgError;
  return (
    <div className="w-16 h-16 rounded-full overflow-hidden shrink-0 flex items-center justify-center" style={{ background: 'var(--surface-2)' }}>
      {showImage ? (
        <img src={c.image} alt={c.name} className="w-full h-full object-cover" onError={() => setImgError(true)} />
      ) : (
        <CategoryIcon slug={c.slug} fallback={c.icon || '🏷️'} size={24} style={{ color: 'var(--brand)' }} />
      )}
    </div>
  );
}

export default function Categories() {
  const categories = useSelector((s) => s.catalog.categories);
  const products = useSelector((s) => s.catalog.products);

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-6 py-10">
      <h1 className="font-display text-3xl font-semibold mb-2">All Categories</h1>
      <p className="text-sm mb-8" style={{ color: 'var(--text-muted)' }}>Browse everything Novara has to offer</p>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {categories.map((c) => {
          const count = products.filter((p) => p.category === c.slug).length;
          return (
            <Link key={c.id} to={`/category/${c.slug}`} className="group flex items-center gap-4 p-4 rounded-2xl border hover:-translate-y-0.5 transition-transform" style={{ borderColor: 'var(--border)', background: 'var(--surface)' }}>
              <CategoryThumb c={c} />
              <div>
                <h3 className="font-medium flex items-center gap-1.5">
                  <CategoryIcon slug={c.slug} fallback={c.icon} size={15} style={{ color: 'var(--brand)' }} />
                  {c.name}
                </h3>
                <p className="text-xs mt-0.5" style={{ color: 'var(--text-muted)' }}>{count} products</p>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
