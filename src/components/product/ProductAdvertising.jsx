import { FiTruck, FiShield, FiRefreshCw, FiDollarSign } from 'react-icons/fi';
import ProductImage from '../common/ProductImage';

const trustBadges = [
  { icon: FiTruck, label: 'Free Delivery Nationwide' },
  { icon: FiDollarSign, label: 'Cash on Delivery' },
  { icon: FiShield, label: '12-Month Warranty' },
  { icon: FiRefreshCw, label: 'Easy 7-Day Return' },
];

export default function ProductAdvertising({ product }) {
  if (!product) return null;

  const discountPct = product.discountPrice
    ? Math.round(100 - (product.discountPrice / product.price) * 100)
    : null;

  const promoCards = [
    {
      image: product.images?.[0],
      tag: discountPct ? `${discountPct}% OFF` : 'Best Seller',
      title: product.name,
      subtitle: `${product.reviewCount}+ happy customers · ${product.rating}★ rated`,
    },
    {
      image: product.images?.[1] || product.images?.[0],
      tag: product.stock > 0 && product.stock < 15 ? 'Limited Stock' : 'In Stock',
      title: `Only from ${product.brand}`,
      subtitle: `Genuine ${product.categoryName} · Quality checked before dispatch`,
    },
    {
      image: product.images?.[2] || product.images?.[0],
      tag: 'Trending',
      title: 'Loved by our customers',
      subtitle: `${product.reviewCount}+ orders delivered across Pakistan`,
    },
  ];

  return (
    <div className="mt-14">
      <h2 className="font-display text-2xl font-semibold mb-5">Why You'll Love It</h2>

      <div className="grid sm:grid-cols-3 gap-4 mb-8">
        {promoCards.map((c, i) => (
          <div key={i} className="rounded-2xl overflow-hidden border relative group" style={{ borderColor: 'var(--border)', background: 'var(--surface)' }}>
            <div className="aspect-[4/3] overflow-hidden">
              <ProductImage src={c.image} alt={c.title} className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" iconSize={30} />
            </div>
            <span
              className="absolute top-3 left-3 text-[11px] font-bold px-2.5 py-1 rounded-full"
              style={{ background: 'var(--brand)', color: 'var(--brand-ink)' }}
            >
              {c.tag}
            </span>
            <div className="p-4">
              <p className="font-semibold text-sm mb-1">{c.title}</p>
              <p className="text-xs" style={{ color: 'var(--text-muted)' }}>{c.subtitle}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 rounded-2xl border p-5" style={{ borderColor: 'var(--border)', background: 'var(--surface)' }}>
        {trustBadges.map(({ icon: Icon, label }) => (
          <div key={label} className="flex flex-col items-center text-center gap-2">
            <Icon size={20} style={{ color: 'var(--brand)' }} />
            <span className="text-xs font-medium" style={{ color: 'var(--text-muted)' }}>{label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
