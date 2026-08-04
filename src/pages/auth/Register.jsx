import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import toast from 'react-hot-toast';
import AuthShell from './AuthShell';
import TextField from '../../components/common/TextField';
import Button from '../../components/common/Button';
import { register } from '../../redux/slices/authSlice';

export default function Register() {
  const [form, setForm] = useState({ name: '', email: '', password: '', confirm: '' });
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const submit = (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.password) {
      toast.error('Please fill in all fields');
      return;
    }
    if (form.password !== form.confirm) {
      toast.error('Passwords do not match');
      return;
    }
    setLoading(true);
    setTimeout(() => {
      dispatch(register({ id: Date.now(), name: form.name, email: form.email, role: 'customer' }));
      toast.success('Account created!');
      setLoading(false);
      navigate('/');
    }, 700);
  };

  return (
    <AuthShell
      title="Create your account"
      subtitle="Join Novara for a faster checkout"
      footer={<>Already have an account? <Link to="/login" className="font-medium" style={{ color: 'var(--brand)' }}>Log in</Link></>}
    >
      <form onSubmit={submit}>
        <TextField label="Full name" placeholder="Jane Doe" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
        <TextField label="Email address" type="email" placeholder="you@email.com" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
        <TextField label="Password" type="password" placeholder="••••••••" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} />
        <TextField label="Confirm password" type="password" placeholder="••••••••" value={form.confirm} onChange={(e) => setForm({ ...form, confirm: e.target.value })} />
        <Button type="submit" loading={loading} className="w-full mt-1">Create account</Button>
      </form>
    </AuthShell>
  );
}
