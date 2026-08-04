export function ProductCardSkeleton() {
  return (
    <div className="rounded-2xl overflow-hidden border" style={{ borderColor: 'var(--border)', background: 'var(--surface)' }}>
      <div className="skeleton aspect-square" />
      <div className="p-3 space-y-2">
        <div className="skeleton h-3 w-3/4 rounded" />
        <div className="skeleton h-3 w-1/2 rounded" />
        <div className="skeleton h-4 w-1/3 rounded" />
      </div>
    </div>
  );
}

export function CategoryCardSkeleton() {
  return (
    <div className="flex flex-col items-center gap-2">
      <div className="skeleton w-16 h-16 rounded-full" />
      <div className="skeleton h-2 w-12 rounded" />
    </div>
  );
}

export function LineSkeleton({ className = '' }) {
  return <div className={`skeleton rounded ${className}`} />;
}
