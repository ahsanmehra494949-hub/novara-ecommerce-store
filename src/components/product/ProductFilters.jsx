export default function ProductFilters({ categories, selectedCategory, onCategoryChange, priceRange, onPriceChange, maxPrice }) {
  return (
    <aside className="w-full lg:w-56 shrink-0 space-y-6">
      <div>
        <h3 className="text-sm font-semibold mb-3">Category</h3>
        <div className="space-y-1.5">
          <label className="flex items-center gap-2 text-sm cursor-pointer">
            <input type="radio" checked={!selectedCategory} onChange={() => onCategoryChange('')} />
            All categories
          </label>
          {categories.map((c) => (
            <label key={c.slug} className="flex items-center gap-2 text-sm cursor-pointer">
              <input type="radio" checked={selectedCategory === c.slug} onChange={() => onCategoryChange(c.slug)} />
              {c.name}
            </label>
          ))}
        </div>
      </div>
      <div>
        <h3 className="text-sm font-semibold mb-3">Price</h3>
        <input
          type="range"
          min={0}
          max={maxPrice}
          value={priceRange}
          onChange={(e) => onPriceChange(Number(e.target.value))}
          className="w-full accent-current"
          style={{ color: 'var(--brand)' }}
        />
        <p className="text-xs mt-1 font-mono" style={{ color: 'var(--text-muted)' }}>Up to ${priceRange}</p>
      </div>
    </aside>
  );
}
