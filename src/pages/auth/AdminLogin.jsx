import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import toast from 'react-hot-toast';
import { FiShield, FiArrowLeft } from 'react-icons/fi';
import Button from '../../components/common/Button';
import { login } from '../../redux/slices/authSlice';

export default function AdminLogin() {
  const [form, setForm] = useState({ email: 'admin@novara.com', password: '' });
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const submit = (e) => {
    e.preventDefault();
    if (!form.email || !form.password) {
      toast.error('Please fill in all fields');
      return;
    }
    setLoading(true);
    setTimeout(() => {
      dispatch(login({
        id: 1,
        name: 'Admin User',
        email: form.email,
        role: 'admin',
      }));
      toast.success('Welcome back, Admin');
      setLoading(false);
      navigate('/admin');
    }, 700);
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-6" style={{ background: '#050506' }}>
      <div className="w-full max-w-sm animate-fadeUp">
        <Link to="/" className="inline-flex items-center gap-1.5 text-xs font-medium mb-10" style={{ color: '#7A7A82' }}>
          <FiArrowLeft size={13} /> Back to store
        </Link>

        <div className="flex items-center gap-3 mb-8">
          <div className="w-11 h-11 rounded-lg flex items-center justify-center shrink-0" style={{ background: 'var(--brand)' }}>
            <FiShield size={20} color="#0A0A0B" />
          </div>
          <div>
            <h1 className="font-display text-xl font-bold text-white leading-none">NOVARA</h1>
            <p className="text-[11px] font-mono uppercase tracking-widest mt-1" style={{ color: 'var(--brand)' }}>Admin Console</p>
          </div>
        </div>

        <div className="rounded-xl border p-7" style={{ borderColor: '#232326', background: '#0E0E10' }}>
          <h2 className="text-white text-lg font-semibold mb-1">Sign in to manage your store</h2>
          <p className="text-sm mb-6" style={{ color: '#8B8B92' }}>Authorized personnel only.</p>

          <form onSubmit={submit}>
            <div className="mb-4">
              <label className="block text-xs font-medium mb-1.5" style={{ color: '#8B8B92' }}>Admin email</label>
              <input
                type="email"
                required
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="w-full px-4 py-2.5 rounded-lg border bg-transparent outline-none text-sm text-white"
                style={{ borderColor: '#232326' }}
              />
            </div>
            <div className="mb-6">
              <label className="block text-xs font-medium mb-1.5" style={{ color: '#8B8B92' }}>Password</label>
              <input
                type="password"
                required
                placeholder="••••••••"
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
                className="w-full px-4 py-2.5 rounded-lg border bg-transparent outline-none text-sm text-white"
                style={{ borderColor: '#232326' }}
              />
            </div>
            <Button type="submit" loading={loading} className="w-full">Enter Dashboard</Button>
          </form>
        </div>

        <div className="mt-5 rounded-lg border px-4 py-3" style={{ borderColor: '#232326', background: '#0E0E10' }}>
          <p className="text-[11px] font-mono" style={{ color: '#7A7A82' }}>
            Demo access &mdash; email <span style={{ color: 'var(--brand)' }}>admin@novara.com</span>, any password.
          </p>
        </div>
      </div>
    </div>
  );
}
