import { useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { FiSearch } from 'react-icons/fi';
import ProductCard from '../../components/product/ProductCard';

export default function Search() {
  const [params, setParams] = useSearchParams();
  const products = useSelector((s) => s.catalog.products);
  const [query, setQuery] = useState(params.get('q') || '');

  useEffect(() => {
    setQuery(params.get('q') || '');
  }, [params]);

  const results = useMemo(() => {
    const filterFlag = params.get('filter');
    let list = products;
    if (filterFlag === 'trending') list = list.filter((p) => p.isTrending);
    if (filterFlag === 'bestseller') list = list.filter((p) => p.isBestSeller);
    if (filterFlag === 'new') list = [...list].sort((a, b) => b.createdAt - a.createdAt);
    if (query.trim()) {
      const q = query.toLowerCase();
      list = list.filter((p) => p.name.toLowerCase().includes(q) || p.categoryName.toLowerCase().includes(q) || p.brand.toLowerCase().includes(q));
    }
    return list;
  }, [products, query, params]);

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-6 py-8">
      <div className="flex items-center gap-2 px-4 py-3 rounded-full border mb-8 max-w-xl" style={{ borderColor: 'var(--border)', background: 'var(--surface)' }}>
        <FiSearch style={{ color: 'var(--text-muted)' }} />
        <input
          autoFocus
          value={query}
          onChange={(e) => { setQuery(e.target.value); setParams(e.target.value ? { q: e.target.value } : {}); }}
          placeholder="Search for products, brands, categories..."
          className="bg-transparent outline-none text-sm w-full"
        />
      </div>

      <p className="text-sm mb-5" style={{ color: 'var(--text-muted)' }}>{results.length} results {query && <>for "<b>{query}</b>"</>}</p>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
        {results.map((p) => <ProductCard key={p.id} product={p} />)}
      </div>
      {results.length === 0 && (
        <div className="text-center py-20" style={{ color: 'var(--text-muted)' }}>
          <p className="text-sm">No products found. Try a different search.</p>
        </div>
      )}
    </div>
  );
}
