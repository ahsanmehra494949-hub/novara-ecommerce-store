export default function PriceTag({ price, discountPrice, size = 'md' }) {
  const sizes = {
    sm: 'text-sm',
    md: 'text-lg',
    lg: 'text-2xl',
  };
  if (discountPrice) {
    return (
      <div className="flex items-baseline gap-2 flex-wrap">
        <span className={`price-tag font-semibold ${sizes[size]}`} style={{ color: 'var(--brand)' }}>
          ${discountPrice.toFixed(2)}
        </span>
        <span className="font-mono text-xs line-through" style={{ color: 'var(--text-muted)' }}>
          ${price.toFixed(2)}
        </span>
      </div>
    );
  }
  return (
    <span className={`price-tag font-semibold ${sizes[size]}`} style={{ color: 'var(--text)' }}>
      ${price.toFixed(2)}
    </span>
  );
}
