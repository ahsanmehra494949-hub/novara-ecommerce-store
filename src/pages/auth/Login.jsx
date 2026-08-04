import { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import toast from 'react-hot-toast';
import AuthShell from './AuthShell';
import TextField from '../../components/common/TextField';
import Button from '../../components/common/Button';
import { login } from '../../redux/slices/authSlice';

export default function Login() {
  const [form, setForm] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const submit = (e) => {
    e.preventDefault();
    if (!form.email || !form.password) {
      toast.error('Please fill in all fields');
      return;
    }
    setLoading(true);
    setTimeout(() => {
      dispatch(login({
        id: Date.now(),
        name: form.email.split('@')[0],
        email: form.email,
        role: 'customer',
      }));
      toast.success('Welcome back!');
      setLoading(false);
      navigate(location.state?.from?.pathname || '/');
    }, 700);
  };

  return (
    <AuthShell
      title="Welcome back"
      subtitle="Log in to continue shopping"
      footer={<>New here? <Link to="/register" className="font-medium" style={{ color: 'var(--brand)' }}>Create an account</Link></>}
    >
      <form onSubmit={submit}>
        <TextField label="Email address" type="email" placeholder="you@email.com" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
        <TextField label="Password" type="password" placeholder="••••••••" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} />
        <div className="flex justify-end mb-5">
          <Link to="/forgot-password" className="text-xs font-medium" style={{ color: 'var(--brand)' }}>Forgot password?</Link>
        </div>
        <Button type="submit" loading={loading} className="w-full">Log in</Button>
      </form>
    </AuthShell>
  );
}
