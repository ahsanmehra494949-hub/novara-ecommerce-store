import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { FiArrowUpRight, FiMessageSquare } from 'react-icons/fi';
import { FaQuoteLeft } from 'react-icons/fa';
import { promoBanners } from '../../data/misc';
import Rating from '../common/Rating';

export function PromoBanners() {
  return (
    <section className="max-w-7xl mx-auto px-4 md:px-6 py-6 grid sm:grid-cols-3 gap-4">
      {promoBanners.map((p) => (
        <Link key={p.id} to={p.link} className="group relative rounded-xl overflow-hidden h-44 flex flex-col justify-end p-5" style={{ background: 'var(--surface-2)' }}>
          <img src={p.image} alt="" className="absolute inset-0 w-full h-full object-cover opacity-55 group-hover:scale-105 transition-transform duration-500" />
          <div className="absolute inset-0" style={{ background: 'linear-gradient(0deg, rgba(0,0,0,0.75), transparent 65%)' }} />
          <span className="relative font-mono text-[10px] font-bold uppercase tracking-widest mb-1.5" style={{ color: 'var(--brand)' }}>{p.tag}</span>
          <p className="relative font-display text-lg font-bold text-white leading-tight mb-2">{p.title}</p>
          <span className="relative inline-flex items-center gap-1 text-xs font-semibold text-white">
            {p.cta} <FiArrowUpRight size={13} />
          </span>
        </Link>
      ))}
    </section>
  );
}

export function FeaturedBrands() {
  const brands = useSelector((s) => s.brands.list).filter((b) => b.enabled !== false);
  if (!brands.length) return null;

  return (
    <section className="max-w-7xl mx-auto px-4 md:px-6 py-10">
      <h2 className="font-display text-2xl md:text-3xl font-semibold mb-6">Featured Brands</h2>
      <div className="flex flex-wrap items-center gap-4 md:gap-6">
        {brands.map((b) => (
          <div
            key={b.id}
            className="flex items-center justify-center px-6 h-20 min-w-[140px] rounded-2xl border grayscale hover:grayscale-0 hover:border-[var(--brand)] transition-all duration-300"
            style={{ borderColor: 'var(--border)', background: 'var(--surface)' }}
          >
            {b.logo ? (
              <img src={b.logo} alt={b.name} className="max-h-10 max-w-[120px] object-contain" />
            ) : (
              <span className="font-display font-semibold text-lg">{b.name}</span>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}

export function CustomerReviews() {
  const reviews = useSelector((s) => s.reviews.list).slice(0, 4);

  return (
    <section className="max-w-7xl mx-auto px-4 md:px-6 py-10">
      <h2 className="font-display text-2xl md:text-3xl font-semibold mb-6">What customers say</h2>

      {reviews.length === 0 ? (
        <div
          className="rounded-2xl border border-dashed p-10 text-center"
          style={{ borderColor: 'var(--border)', background: 'var(--surface)' }}
        >
          <FiMessageSquare size={26} className="mx-auto mb-3" style={{ color: 'var(--brand)' }} />
          <p className="text-sm font-medium mb-1">No reviews yet</p>
          <p className="text-xs" style={{ color: 'var(--text-muted)' }}>Be the first to review a product — real feedback shows up here.</p>
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {reviews.map((r) => (
            <div
              key={r.id}
              className="relative p-5 rounded-2xl border overflow-hidden"
              style={{ borderColor: 'var(--border)', background: 'var(--surface)' }}
            >
              <FaQuoteLeft className="absolute -top-1 -right-1 opacity-[0.06]" size={56} style={{ color: 'var(--brand)' }} />
              <Rating value={r.rating} />
              {r.image && (
                <img src={r.image} alt="" className="w-full h-28 object-cover rounded-xl my-3" />
              )}
              <p className="relative text-sm my-3 leading-relaxed" style={{ color: 'var(--text-muted)' }}>"{r.text}"</p>
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold shrink-0" style={{ background: 'var(--brand)', color: 'var(--brand-ink)' }}>
                  {r.userName?.[0]?.toUpperCase() || 'U'}
                </div>
                <div className="min-w-0">
                  <span className="text-sm font-medium block truncate">{r.userName}</span>
                  {r.productName && (
                    <Link to={`/product/${r.productId}`} className="text-[11px] hover:underline block truncate" style={{ color: 'var(--brand)' }}>{r.productName}</Link>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
