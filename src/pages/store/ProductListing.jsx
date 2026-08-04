import { useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import ProductCard from '../../components/product/ProductCard';
import ProductFilters from '../../components/product/ProductFilters';
import Pagination from '../../components/common/Pagination';

const PAGE_SIZE = 12;

export default function ProductListing() {
  const products = useSelector((s) => s.catalog.products);
  const categories = useSelector((s) => s.catalog.categories);
  const [category, setCategory] = useState('');
  const [price, setPrice] = useState(300);
  const [sort, setSort] = useState('featured');
  const [page, setPage] = useState(1);

  const filtered = useMemo(() => {
    let list = products.filter((p) => (!category || p.category === category) && (p.discountPrice || p.price) <= price);
    if (sort === 'price-asc') list = [...list].sort((a, b) => (a.discountPrice || a.price) - (b.discountPrice || b.price));
    if (sort === 'price-desc') list = [...list].sort((a, b) => (b.discountPrice || b.price) - (a.discountPrice || a.price));
    if (sort === 'rating') list = [...list].sort((a, b) => b.rating - a.rating);
    return list;
  }, [products, category, price, sort]);

  const totalPages = Math.ceil(filtered.length / PAGE_SIZE) || 1;
  const paged = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-6 py-10">
      <div className="flex items-end justify-between mb-6 flex-wrap gap-3">
        <div>
          <h1 className="font-display text-3xl font-semibold">All Products</h1>
          <p className="text-sm mt-1" style={{ color: 'var(--text-muted)' }}>{filtered.length} products found</p>
        </div>
        <select value={sort} onChange={(e) => setSort(e.target.value)} className="px-4 py-2 rounded-full border text-sm bg-transparent" style={{ borderColor: 'var(--border)' }}>
          <option value="featured">Featured</option>
          <option value="price-asc">Price: Low to High</option>
          <option value="price-desc">Price: High to Low</option>
          <option value="rating">Top Rated</option>
        </select>
      </div>
      <div className="flex flex-col lg:flex-row gap-8">
        <ProductFilters categories={categories} selectedCategory={category} onCategoryChange={(c) => { setCategory(c); setPage(1); }} priceRange={price} onPriceChange={(p) => { setPrice(p); setPage(1); }} maxPrice={300} />
        <div className="flex-1">
          <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 gap-4">
            {paged.length ? paged.map((p) => <ProductCard key={p.id} product={p} />) : (
              <p className="col-span-full text-center py-16 text-sm" style={{ color: 'var(--text-muted)' }}>No products match your filters.</p>
            )}
          </div>
          <Pagination page={page} totalPages={totalPages} onChange={setPage} />
        </div>
      </div>
    </div>
  );
}
