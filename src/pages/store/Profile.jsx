import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import toast from 'react-hot-toast';
import { FiUser, FiPackage, FiHeart, FiSettings, FiLogOut, FiChevronRight } from 'react-icons/fi';
import Button from '../../components/common/Button';
import TextField from '../../components/common/TextField';
import useAuth from '../../hooks/useAuth';
import { logout, updateProfile } from '../../redux/slices/authSlice';

export function Profile() {
  const { user } = useAuth();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    toast.success('Logged out successfully');
    navigate('/');
  };

  const links = [
    { to: '/edit-profile', label: 'Edit Profile', icon: FiUser },
    { to: '/orders', label: 'My Orders', icon: FiPackage },
    { to: '/wishlist', label: 'Wishlist', icon: FiHeart },
    { to: '/settings', label: 'Settings', icon: FiSettings },
  ];

  return (
    <div className="max-w-xl mx-auto px-4 md:px-6 py-10">
      <div className="flex items-center gap-4 mb-8">
        <div className="w-16 h-16 rounded-full flex items-center justify-center text-xl font-bold" style={{ background: 'var(--brand)', color: 'var(--brand-ink)' }}>
          {user?.name?.[0]?.toUpperCase() || 'U'}
        </div>
        <div>
          <h1 className="font-display text-2xl font-semibold">{user?.name}</h1>
          <p className="text-sm" style={{ color: 'var(--text-muted)' }}>{user?.email}</p>
        </div>
      </div>
      <div className="rounded-2xl border divide-y" style={{ borderColor: 'var(--border)', background: 'var(--surface)' }}>
        {links.map((l) => (
          <Link key={l.to} to={l.to} className="flex items-center justify-between px-5 py-4" style={{ borderColor: 'var(--border)' }}>
            <span className="flex items-center gap-3 text-sm font-medium"><l.icon size={16} /> {l.label}</span>
            <FiChevronRight style={{ color: 'var(--text-muted)' }} />
          </Link>
        ))}
        {user?.role === 'admin' && (
          <Link to="/admin" className="flex items-center justify-between px-5 py-4">
            <span className="flex items-center gap-3 text-sm font-medium" style={{ color: 'var(--brand)' }}><FiSettings size={16} /> Admin Dashboard</span>
            <FiChevronRight style={{ color: 'var(--text-muted)' }} />
          </Link>
        )}
      </div>
      <button onClick={handleLogout} className="flex items-center gap-2 text-sm font-medium mt-6" style={{ color: 'var(--danger)' }}>
        <FiLogOut size={15} /> Logout
      </button>
    </div>
  );
}

export function EditProfile() {
  const { user } = useAuth();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: user?.name || '', email: user?.email || '', phone: user?.phone || '' });

  const save = (e) => {
    e.preventDefault();
    dispatch(updateProfile(form));
    toast.success('Profile updated');
    navigate('/profile');
  };

  return (
    <div className="max-w-md mx-auto px-4 md:px-6 py-10">
      <h1 className="font-display text-2xl font-semibold mb-6">Edit Profile</h1>
      <form onSubmit={save} className="rounded-2xl border p-6" style={{ borderColor: 'var(--border)', background: 'var(--surface)' }}>
        <TextField label="Full name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
        <TextField label="Email address" type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
        <TextField label="Phone number" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} placeholder="+1 555 000 0000" />
        <Button type="submit" className="w-full mt-2">Save changes</Button>
      </form>
    </div>
  );
}

export function Settings() {
  const [notifications, setNotifications] = useState(true);
  const [emailUpdates, setEmailUpdates] = useState(true);

  return (
    <div className="max-w-md mx-auto px-4 md:px-6 py-10">
      <h1 className="font-display text-2xl font-semibold mb-6">Settings</h1>
      <div className="rounded-2xl border divide-y p-1" style={{ borderColor: 'var(--border)', background: 'var(--surface)' }}>
        <ToggleRow label="Push notifications" value={notifications} onChange={setNotifications} />
        <ToggleRow label="Email updates" value={emailUpdates} onChange={setEmailUpdates} />
      </div>
      <div className="mt-6 space-y-2">
        <Link to="/privacy-policy" className="block text-sm py-2" style={{ color: 'var(--text-muted)' }}>Privacy Policy</Link>
        <Link to="/terms" className="block text-sm py-2" style={{ color: 'var(--text-muted)' }}>Terms & Conditions</Link>
      </div>
    </div>
  );
}

function ToggleRow({ label, value, onChange }) {
  return (
    <div className="flex items-center justify-between px-4 py-4">
      <span className="text-sm font-medium">{label}</span>
      <button
        onClick={() => onChange(!value)}
        className="w-11 h-6 rounded-full relative transition-colors"
        style={{ background: value ? 'var(--brand)' : 'var(--border)' }}
      >
        <span className="absolute top-0.5 w-5 h-5 rounded-full bg-white transition-transform" style={{ left: value ? 22 : 2 }} />
      </button>
    </div>
  );
}
