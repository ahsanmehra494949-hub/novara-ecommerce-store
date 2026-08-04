import { Link } from 'react-router-dom';
import { FiArrowRight } from 'react-icons/fi';
import ProductCard from '../product/ProductCard';
import { ProductCardSkeleton } from '../common/Skeleton';

export default function ProductSection({ title, subtitle, products, viewAllLink, loading }) {
  return (
    <section className="max-w-7xl mx-auto px-4 md:px-6 py-10">
      <div className="flex items-end justify-between mb-5">
        <div>
          <h2 className="font-display text-2xl md:text-3xl font-semibold">{title}</h2>
          {subtitle && <p className="text-sm mt-1" style={{ color: 'var(--text-muted)' }}>{subtitle}</p>}
        </div>
        {viewAllLink && (
          <Link to={viewAllLink} className="hidden sm:flex items-center gap-1 text-sm font-medium hover:opacity-70">
            View all <FiArrowRight size={14} />
          </Link>
        )}
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        {loading
          ? Array.from({ length: 5 }).map((_, i) => <ProductCardSkeleton key={i} />)
          : products.slice(0, 10).map((p) => <ProductCard key={p.id} product={p} />)}
      </div>
    </section>
  );
}
