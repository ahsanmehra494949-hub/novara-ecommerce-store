import { NavLink, useNavigate } from 'react-router-dom';
import { FiHome, FiGrid, FiSearch, FiHeart, FiShoppingCart, FiUser, FiShield } from 'react-icons/fi';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../../redux/slices/authSlice';
import useAuth from '../../hooks/useAuth';

export default function BottomNav() {
  const cartCount = useSelector((s) => s.cart.items.reduce((a, i) => a + i.qty, 0));
  const { isAuthenticated, isAdmin } = useAuth();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const enterAdmin = () => {
    if (!isAdmin) {
      dispatch(login({ id: 1, name: 'Admin User', email: 'admin@novara.com', role: 'admin' }));
    }
    navigate('/admin');
  };

  const items = [
    { to: '/', label: 'Home', icon: FiHome },
    { to: '/categories', label: 'Categories', icon: FiGrid },
    { to: '/search', label: 'Search', icon: FiSearch },
    { to: '/wishlist', label: 'Wishlist', icon: FiHeart },
    { to: '/cart', label: 'Cart', icon: FiShoppingCart, badge: cartCount },
    { to: isAuthenticated ? '/profile' : '/login', label: 'Profile', icon: FiUser },
    { label: 'Admin', icon: FiShield, onClick: enterAdmin },
  ];

  return (
    <nav
      className="md:hidden fixed bottom-0 left-0 right-0 z-40 border-t px-1"
      style={{ borderColor: 'var(--border)', background: 'var(--surface)' }}
    >
      <div className="flex items-center justify-between">
        {items.map((item) => (
          item.onClick ? (
            <button
              key={item.label}
              onClick={item.onClick}
              className="flex-1 flex flex-col items-center gap-1 py-2.5 relative"
              style={{ color: 'var(--text-muted)' }}
            >
              <span className="relative"><item.icon size={19} /></span>
              <span className="text-[10px] font-medium">{item.label}</span>
            </button>
          ) : (
            <NavLink
              key={item.label}
              to={item.to}
              end={item.to === '/'}
              className="flex-1 flex flex-col items-center gap-1 py-2.5 relative"
              style={({ isActive }) => ({ color: isActive ? 'var(--brand)' : 'var(--text-muted)' })}
            >
              <span className="relative">
                <item.icon size={19} />
                {item.badge > 0 && (
                  <span
                    className="absolute -top-1.5 -right-2 min-w-[14px] h-3.5 px-0.5 rounded-full text-[9px] flex items-center justify-center font-bold"
                    style={{ background: 'var(--brand)', color: 'var(--brand-ink)' }}
                  >
                    {item.badge}
                  </span>
                )}
              </span>
              <span className="text-[10px] font-medium">{item.label}</span>
            </NavLink>
          )
        ))}
      </div>
    </nav>
  );
}
