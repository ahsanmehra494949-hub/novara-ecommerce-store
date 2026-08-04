import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import toast from 'react-hot-toast';
import { FiBell, FiX } from 'react-icons/fi';
import { getUpcomingOccasion } from '../../utils/occasions';
import { updateProduct } from '../../redux/slices/catalogSlice';
import { addBanner } from '../../redux/slices/bannersSlice';
import { loadState, saveState } from '../../utils/storage';
import Button from '../common/Button';
import Select from '../common/Select';

export default function OccasionNotice() {
  const occasion = getUpcomingOccasion(21);
  const dismissed = loadState('novara_dismissed_occasions', []);
  const dispatch = useDispatch();
  const categories = useSelector((s) => s.catalog.categories);
  const products = useSelector((s) => s.catalog.products);

  const [open, setOpen] = useState(!!occasion && !dismissed.includes(occasion.id));
  const [pct, setPct] = useState(20);
  const [scope, setScope] = useState('all');

  if (!occasion || !open) return null;

  const dismiss = () => {
    saveState('novara_dismissed_occasions', [...dismissed, occasion.id]);
    setOpen(false);
  };

  const applySale = () => {
    const target = products.filter((p) => scope === 'all' || p.category === scope);
    target.forEach((p) => {
      dispatch(updateProduct({ id: p.id, discountPrice: Math.round(p.price * (1 - pct / 100) * 100) / 100 }));
    });
    const cat = categories.find((c) => c.slug === scope);
    dispatch(addBanner({
      title: `${occasion.name} Sale`,
      subtitle: `Up to ${pct}% off${cat ? ` on ${cat.name}` : ' storewide'}`,
      cta: 'Shop Now',
      image: cat?.image || target[0]?.images?.[0] || '',
    }));
    toast.success(`${occasion.name} sale is live — banner added`);
    dismiss();
  };

  return (
    <div
      className="rounded-2xl border p-5 mb-6 flex flex-col sm:flex-row sm:items-center gap-4"
      style={{ borderColor: 'var(--brand)', background: 'color-mix(in srgb, var(--brand) 10%, var(--surface))' }}
    >
      <div className="flex items-start gap-3 flex-1">
        <div className="w-9 h-9 rounded-full flex items-center justify-center shrink-0" style={{ background: 'var(--brand)', color: 'var(--brand-ink)' }}>
          <FiBell size={16} />
        </div>
        <div>
          <p className="text-sm font-semibold">
            {occasion.emoji} {occasion.name} is coming up in {occasion.daysAway} day{occasion.daysAway === 1 ? '' : 's'}!
          </p>
          <p className="text-xs mt-0.5" style={{ color: 'var(--text-muted)' }}>Want to run a sale for it? Pick a discount and scope, we'll set the prices and add a homepage banner.</p>
        </div>
      </div>

      <div className="flex items-center gap-2 flex-wrap shrink-0">
        <Select
          value={scope}
          onChange={(v) => setScope(v)}
          className="px-3 py-2 rounded-lg text-sm"
          options={[{ value: 'all', label: 'All products' }, ...categories.map((c) => ({ value: c.slug, label: c.name }))]}
        />
        <Select
          value={pct}
          onChange={(v) => setPct(Number(v))}
          className="px-3 py-2 rounded-lg text-sm"
          options={[10, 15, 20, 25, 30, 40, 50].map((v) => ({ value: v, label: `${v}% off` }))}
        />
        <Button onClick={applySale} className="whitespace-nowrap">Launch Sale</Button>
        <button onClick={dismiss} aria-label="Dismiss" className="p-2 rounded-lg hover:opacity-70" style={{ color: 'var(--text-muted)' }}>
          <FiX size={16} />
        </button>
      </div>
    </div>
  );
}
