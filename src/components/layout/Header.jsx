import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { FiSearch, FiHeart, FiShoppingCart, FiUser, FiMoon, FiSun, FiMenu, FiX, FiShield } from 'react-icons/fi';
import { toggleTheme } from '../../redux/slices/themeSlice';
import { login } from '../../redux/slices/authSlice';
import useAuth from '../../hooks/useAuth';

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [query, setQuery] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const mode = useSelector((s) => s.theme.mode);
  const cartCount = useSelector((s) => s.cart.items.reduce((a, i) => a + i.qty, 0));
  const wishlistCount = useSelector((s) => s.wishlist.items.length);
  const { isAuthenticated, isAdmin } = useAuth();

  const submitSearch = (e) => {
    e.preventDefault();
    navigate(`/search?q=${encodeURIComponent(query)}`);
  };

  const enterAdmin = () => {
    if (!isAdmin) {
      dispatch(login({ id: 1, name: 'Admin User', email: 'admin@novara.com', role: 'admin' }));
    }
    navigate('/admin');
  };

  const navLinks = [
    { to: '/', label: 'Home' },
    { to: '/categories', label: 'Categories' },
    { to: '/about', label: 'About' },
    { to: '/contact', label: 'Contact' },
  ];

  return (
    <header
      className="sticky top-0 z-40 border-b backdrop-blur-md relative"
      style={{ borderColor: 'var(--border)', background: 'color-mix(in srgb, var(--bg) 88%, transparent)' }}
    >
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between h-16 gap-4">
          <button className="md:hidden p-2 -ml-2" onClick={() => setMenuOpen(!menuOpen)} aria-label="Menu">
            {menuOpen ? <FiX size={20} /> : <FiMenu size={20} />}
          </button>

          <Link
            to="/"
            onClick={() => setMenuOpen(false)}
            className="font-display text-2xl font-bold tracking-tight shrink-0"
          >
            NOVARA
          </Link>

          <nav className="hidden md:flex items-center gap-7 ml-4">
            {navLinks.map((l) => (
              <Link key={l.to} to={l.to} className="text-sm font-medium hover:opacity-70 transition" style={{ color: 'var(--text)' }}>
                {l.label}
              </Link>
            ))}
          </nav>

          <form onSubmit={submitSearch} className="hidden md:flex flex-1 max-w-sm mx-auto items-center gap-2 px-4 py-2 rounded-lg border" style={{ borderColor: 'var(--border)', background: 'var(--surface)' }}>
            <FiSearch style={{ color: 'var(--text-muted)' }} />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search products..."
              className="bg-transparent outline-none text-sm w-full"
            />
          </form>

          <div className="flex items-center gap-1 md:gap-2">
            <button
              onClick={enterAdmin}
              className="hidden md:inline-flex items-center gap-1.5 px-3 py-1.5 mr-1 rounded-md border text-xs font-medium hover:opacity-80 transition"
              style={{ borderColor: 'var(--border)', color: 'var(--text-muted)' }}
              aria-label="Admin dashboard"
            >
              <FiShield size={13} /> Admin
            </button>
            <button onClick={() => dispatch(toggleTheme())} className="p-2 rounded-full hover:opacity-70" aria-label="Toggle theme">
              {mode === 'dark' ? <FiSun size={18} /> : <FiMoon size={18} />}
            </button>
            <Link to="/search" className="md:hidden p-2 rounded-full hover:opacity-70" aria-label="Search">
              <FiSearch size={18} />
            </Link>
            <Link to="/wishlist" className="relative p-2 rounded-full hover:opacity-70 hidden sm:inline-flex" aria-label="Wishlist">
              <FiHeart size={18} />
              {wishlistCount > 0 && <Badge count={wishlistCount} />}
            </Link>
            <Link to="/cart" className="relative p-2 rounded-full hover:opacity-70" aria-label="Cart">
              <FiShoppingCart size={18} />
              {cartCount > 0 && <Badge count={cartCount} />}
            </Link>
            <Link to={isAuthenticated ? '/profile' : '/login'} className="p-2 rounded-full hover:opacity-70 hidden sm:inline-flex" aria-label="Account">
              <FiUser size={18} />
            </Link>
          </div>
        </div>

        {menuOpen && (
          <nav className="md:hidden flex flex-col gap-1 pb-4 animate-fadeUp">
            {navLinks.map((l) => (
              <Link key={l.to} to={l.to} onClick={() => setMenuOpen(false)} className="px-2 py-2.5 text-sm font-medium rounded-lg" style={{ color: 'var(--text)' }}>
                {l.label}
              </Link>
            ))}
            <Link to={isAuthenticated ? '/profile' : '/login'} onClick={() => setMenuOpen(false)} className="px-2 py-2.5 text-sm font-medium rounded-lg">
              Account
            </Link>
            <button onClick={() => { setMenuOpen(false); enterAdmin(); }} className="flex items-center gap-1.5 px-2 py-2.5 text-sm font-medium rounded-lg text-left" style={{ color: 'var(--text-muted)' }}>
              <FiShield size={13} /> Admin
            </button>
          </nav>
        )}
      </div>
    </header>
  );
}

function Badge({ count }) {
  return (
    <span
      className="absolute -top-0.5 -right-0.5 min-w-[16px] h-4 px-1 rounded-full text-[10px] flex items-center justify-center font-bold"
      style={{ background: 'var(--brand)', color: 'var(--brand-ink)' }}
    >
      {count}
    </span>
  );
}
