import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import { useSelector } from 'react-redux';

export default function HeroSlider() {
  const banners = useSelector((s) => s.banners.list.filter((b) => b.enabled));
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (banners.length < 2) return;
    const t = setInterval(() => setIndex((i) => (i + 1) % banners.length), 5000);
    return () => clearInterval(t);
  }, [banners.length]);

  if (!banners.length) return null;

  return (
    <div className="relative rounded-2xl overflow-hidden h-[380px] md:h-[460px]" style={{ background: 'var(--surface-2)' }}>
      {banners.map((b, i) => (
        <div key={b.id} className="absolute inset-0 transition-opacity duration-700" style={{ opacity: i === index ? 1 : 0 }}>
          <img src={b.image} alt={b.title} className="w-full h-full object-cover" />
          <div className="absolute inset-0" style={{ background: 'linear-gradient(90deg, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0.1) 60%, transparent 100%)' }} />
          <div className="absolute inset-0 flex flex-col justify-center px-8 md:px-14 max-w-lg">
            <span className="font-mono text-xs tracking-widest uppercase mb-3" style={{ color: 'var(--brand)' }}>Novara Edit</span>
            <h2 className="font-display text-3xl md:text-5xl font-bold text-white mb-3 leading-tight">{b.title}</h2>
            <p className="text-white/80 mb-6">{b.subtitle}</p>
            <Link to="/categories" className="inline-flex w-fit px-7 py-3.5 rounded-md font-semibold uppercase tracking-wide text-xs" style={{ background: 'var(--brand)', color: 'var(--brand-ink)' }}>
              {b.cta}
            </Link>
          </div>
        </div>
      ))}

      <button onClick={() => setIndex((i) => (i - 1 + banners.length) % banners.length)} className="absolute left-4 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-black/30 text-white flex items-center justify-center hover:bg-black/50">
        <FiChevronLeft />
      </button>
      <button onClick={() => setIndex((i) => (i + 1) % banners.length)} className="absolute right-4 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-black/30 text-white flex items-center justify-center hover:bg-black/50">
        <FiChevronRight />
      </button>

      <div className="absolute bottom-5 left-1/2 -translate-x-1/2 flex gap-2">
        {banners.map((b, i) => (
          <button key={b.id} onClick={() => setIndex(i)} className="h-1.5 rounded-full transition-all" style={{ width: i === index ? 24 : 8, background: i === index ? 'var(--brand)' : 'rgba(255,255,255,0.5)' }} />
        ))}
      </div>
    </div>
  );
}
