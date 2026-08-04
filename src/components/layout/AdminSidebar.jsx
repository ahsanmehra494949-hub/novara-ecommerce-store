import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import {
  FiGrid, FiBox, FiTag, FiImage, FiUsers, FiShoppingBag, FiSettings, FiX, FiPercent, FiAward, FiStar,
} from 'react-icons/fi';

const links = [
  { to: '/admin', label: 'Dashboard', icon: FiGrid, end: true },
  { to: '/admin/products', label: 'Products', icon: FiBox },
  { to: '/admin/categories', label: 'Categories', icon: FiTag },
  { to: '/admin/banners', label: 'Banners', icon: FiImage },
  { to: '/admin/brands', label: 'Brands', icon: FiAward },
  { to: '/admin/reviews', label: 'Reviews', icon: FiStar, badgeKey: 'reviews' },
  { to: '/admin/promotions', label: 'Promotions', icon: FiPercent },
  { to: '/admin/users', label: 'Users', icon: FiUsers },
  { to: '/admin/orders', label: 'Orders', icon: FiShoppingBag },
  { to: '/admin/settings', label: 'Settings', icon: FiSettings },
];

export default function AdminSidebar({ open, onClose }) {
  const unreadReviews = useSelector((s) => s.reviews.list.filter((r) => !r.read).length);

  return (
    <>
      {open && <div className="fixed inset-0 bg-black/50 z-40 lg:hidden" onClick={onClose} />}
      <aside
        className={`fixed lg:sticky top-0 left-0 h-screen w-64 shrink-0 border-r z-50 transition-transform duration-300 ${open ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0`}
        style={{ borderColor: 'var(--border)', background: 'var(--surface)' }}
      >
        <div className="flex items-center justify-between px-6 h-16 border-b" style={{ borderColor: 'var(--border)' }}>
          <span className="font-display text-xl font-bold">NOVARA <span className="text-xs font-mono font-normal align-top" style={{ color: 'var(--brand)' }}>admin</span></span>
          <button className="lg:hidden p-1" onClick={onClose}><FiX /></button>
        </div>
        <nav className="p-3 space-y-1">
          {links.map((l) => {
            const badgeCount = l.badgeKey === 'reviews' ? unreadReviews : 0;
            return (
              <NavLink
                key={l.to}
                to={l.to}
                end={l.end}
                onClick={onClose}
                className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition"
                style={({ isActive }) => isActive
                  ? { background: 'var(--brand)', color: 'var(--brand-ink)' }
                  : { color: 'var(--text)' }}
              >
                <l.icon size={17} />
                <span className="flex-1">{l.label}</span>
                {badgeCount > 0 && (
                  <span
                    className="min-w-[18px] h-[18px] px-1 rounded-full flex items-center justify-center text-[10px] font-bold"
                    style={{ background: 'var(--danger)', color: '#fff' }}
                  >
                    {badgeCount}
                  </span>
                )}
              </NavLink>
            );
          })}
        </nav>
      </aside>
    </>
  );
}
