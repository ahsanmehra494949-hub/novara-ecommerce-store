import { useState } from 'react';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import AuthShell from './AuthShell';
import TextField from '../../components/common/TextField';
import Button from '../../components/common/Button';
import { FiMail } from 'react-icons/fi';

export default function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const submit = (e) => {
    e.preventDefault();
    if (!email) { toast.error('Enter your email'); return; }
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSent(true);
      toast.success('Reset link sent');
    }, 700);
  };

  return (
    <AuthShell
      title="Reset your password"
      subtitle="We'll email you a link to reset it"
      footer={<>Remembered it? <Link to="/login" className="font-medium" style={{ color: 'var(--brand)' }}>Back to login</Link></>}
    >
      {sent ? (
        <div className="text-center py-6">
          <div className="w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-4" style={{ background: 'var(--surface-2)', color: 'var(--brand)' }}>
            <FiMail size={22} />
          </div>
          <p className="text-sm" style={{ color: 'var(--text-muted)' }}>If an account exists for <b>{email}</b>, a reset link is on its way.</p>
        </div>
      ) : (
        <form onSubmit={submit}>
          <TextField label="Email address" type="email" placeholder="you@email.com" value={email} onChange={(e) => setEmail(e.target.value)} />
          <Button type="submit" loading={loading} className="w-full">Send reset link</Button>
        </form>
      )}
    </AuthShell>
  );
}
