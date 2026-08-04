import { useEffect, useState } from 'react';
import ProductCard from '../product/ProductCard';

function getTimeLeft() {
  const now = new Date();
  const end = new Date();
  end.setHours(23, 59, 59, 999);
  const diff = Math.max(0, end - now);
  return {
    h: Math.floor(diff / 3600000),
    m: Math.floor((diff % 3600000) / 60000),
    s: Math.floor((diff % 60000) / 1000),
  };
}

export default function FlashSale({ products }) {
  const [time, setTime] = useState(getTimeLeft());

  useEffect(() => {
    const t = setInterval(() => setTime(getTimeLeft()), 1000);
    return () => clearInterval(t);
  }, []);

  const pad = (n) => String(n).padStart(2, '0');

  return (
    <section className="max-w-7xl mx-auto px-4 md:px-6 py-10">
      <div className="rounded-2xl p-6 md:p-8" style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}>
        <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
          <div>
            <h2 className="font-display text-2xl md:text-3xl font-semibold" style={{ color: 'var(--danger)' }}>⚡ Flash Sale</h2>
            <p className="text-sm mt-1" style={{ color: 'var(--text-muted)' }}>Ends tonight — don't miss out</p>
          </div>
          <div className="flex items-center gap-2 font-mono">
            {[time.h, time.m, time.s].map((v, i) => (
              <span key={i} className="px-3 py-2 rounded-lg text-sm font-bold" style={{ background: 'var(--surface-2)' }}>{pad(v)}</span>
            ))}
          </div>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {products.slice(0, 5).map((p) => <ProductCard key={p.id} product={p} />)}
        </div>
      </div>
    </section>
  );
}
