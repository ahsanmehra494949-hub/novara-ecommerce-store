import { useState } from 'react';
import { Outlet, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { FiMenu, FiMoon, FiSun, FiLogOut } from 'react-icons/fi';
import AdminSidebar from './AdminSidebar';
import { toggleTheme } from '../../redux/slices/themeSlice';
import { logout } from '../../redux/slices/authSlice';
import useAuth from '../../hooks/useAuth';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

export default function AdminLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const mode = useSelector((s) => s.theme.mode);
  const { user } = useAuth();

  const handleLogout = () => {
    dispatch(logout());
    toast.success('Logged out');
    navigate('/');
  };

  return (
    <div className="min-h-screen flex" style={{ background: 'var(--bg)' }}>
      <AdminSidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <div className="flex-1 min-w-0">
        <header className="sticky top-0 z-30 flex items-center justify-between h-16 px-4 md:px-6 border-b" style={{ borderColor: 'var(--border)', background: 'var(--surface)' }}>
          <div className="flex items-center gap-3">
            <button className="lg:hidden p-2" onClick={() => setSidebarOpen(true)}><FiMenu /></button>
            <Link to="/" className="text-xs hover:opacity-70" style={{ color: 'var(--text-muted)' }}>← Back to store</Link>
          </div>
          <div className="flex items-center gap-3">
            <button onClick={() => dispatch(toggleTheme())} className="p-2 rounded-full hover:opacity-70">
              {mode === 'dark' ? <FiSun size={17} /> : <FiMoon size={17} />}
            </button>
            <div className="hidden sm:flex items-center gap-2 pl-3 border-l" style={{ borderColor: 'var(--border)' }}>
              <div className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold" style={{ background: 'var(--brand)', color: 'var(--brand-ink)' }}>
                {user?.name?.[0]?.toUpperCase() || 'A'}
              </div>
              <span className="text-sm font-medium">{user?.name}</span>
            </div>
            <button onClick={handleLogout} className="p-2 rounded-full hover:opacity-70" aria-label="Logout"><FiLogOut size={17} /></button>
          </div>
        </header>
        <main className="p-4 md:p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
