import { useMemo, useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProductCard from '../../components/product/ProductCard';
import ProductFilters from '../../components/product/ProductFilters';
import Pagination from '../../components/common/Pagination';
import CategoryIcon from '../../components/common/CategoryIcon';

function CategoryHeaderAvatar({ category }) {
  const [imgError, setImgError] = useState(false);
  useEffect(() => { setImgError(false); }, [category.image]);
  const showImage = !!category.image && !imgError;
  return (
    <div className="w-16 h-16 rounded-full overflow-hidden shrink-0 flex items-center justify-center" style={{ background: 'var(--surface-2)' }}>
      {showImage ? (
        <img src={category.image} alt={category.name} className="w-full h-full object-cover" onError={() => setImgError(true)} />
      ) : (
        <CategoryIcon slug={category.slug} fallback={category.icon || '🏷️'} size={26} style={{ color: 'var(--brand)' }} />
      )}
    </div>
  );
}

const PAGE_SIZE = 12;

export default function CategoryDetails() {
  const { slug } = useParams();
  const products = useSelector((s) => s.catalog.products);
  const categories = useSelector((s) => s.catalog.categories);
  const category = categories.find((c) => c.slug === slug);
  const [price, setPrice] = useState(300);
  const [sort, setSort] = useState('featured');
  const [page, setPage] = useState(1);

  const filtered = useMemo(() => {
    let list = products.filter((p) => p.category === slug && (p.discountPrice || p.price) <= price);
    if (sort === 'price-asc') list = [...list].sort((a, b) => (a.discountPrice || a.price) - (b.discountPrice || b.price));
    if (sort === 'price-desc') list = [...list].sort((a, b) => (b.discountPrice || b.price) - (a.discountPrice || a.price));
    return list;
  }, [products, slug, price, sort]);

  const totalPages = Math.ceil(filtered.length / PAGE_SIZE) || 1;
  const paged = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  if (!category) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center">
        <p>Category not found.</p>
        <Link to="/categories" className="text-sm font-medium" style={{ color: 'var(--brand)' }}>← Back to categories</Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-6 py-10">
      <div className="flex items-center gap-4 mb-6">
        <CategoryHeaderAvatar category={category} />
        <div>
          <h1 className="font-display text-3xl font-semibold">{category.icon} {category.name}</h1>
          <p className="text-sm mt-1" style={{ color: 'var(--text-muted)' }}>{filtered.length} products</p>
        </div>
      </div>
      <div className="flex justify-end mb-4">
        <select value={sort} onChange={(e) => setSort(e.target.value)} className="px-4 py-2 rounded-full border text-sm bg-transparent" style={{ borderColor: 'var(--border)' }}>
          <option value="featured">Featured</option>
          <option value="price-asc">Price: Low to High</option>
          <option value="price-desc">Price: High to Low</option>
        </select>
      </div>
      <div className="flex flex-col lg:flex-row gap-8">
        <ProductFilters categories={[]} selectedCategory="" onCategoryChange={() => {}} priceRange={price} onPriceChange={(p) => { setPrice(p); setPage(1); }} maxPrice={300} />
        <div className="flex-1">
          <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 gap-4">
            {paged.map((p) => <ProductCard key={p.id} product={p} />)}
          </div>
          <Pagination page={page} totalPages={totalPages} onChange={setPage} />
        </div>
      </div>
    </div>
  );
}
