import { useState } from 'react';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import { FiMapPin, FiMail, FiPhone } from 'react-icons/fi';
import Button from '../../components/common/Button';
import TextField from '../../components/common/TextField';

export function ContactUs() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });

  const submit = (e) => {
    e.preventDefault();
    toast.success("Message sent — we'll get back to you soon.");
    setForm({ name: '', email: '', message: '' });
  };

  return (
    <div className="max-w-5xl mx-auto px-4 md:px-6 py-14">
      <h1 className="font-display text-3xl font-semibold mb-2">Contact Us</h1>
      <p className="text-sm mb-10" style={{ color: 'var(--text-muted)' }}>We'd love to hear from you.</p>
      <div className="grid md:grid-cols-2 gap-10">
        <div className="space-y-5">
          <InfoRow icon={FiMapPin} label="Address" value="42 Market Lane, Lahore, Pakistan" />
          <InfoRow icon={FiMail} label="Email" value="support@novara.com" />
          <InfoRow icon={FiPhone} label="Phone" value="+92 300 1234567" />
        </div>
        <form onSubmit={submit} className="rounded-2xl border p-6" style={{ borderColor: 'var(--border)', background: 'var(--surface)' }}>
          <TextField label="Your name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required />
          <TextField label="Email address" type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} required />
          <label className="block text-xs font-medium mb-1.5" style={{ color: 'var(--text-muted)' }}>Message</label>
          <textarea required rows={4} value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} className="w-full px-4 py-2.5 rounded-xl border bg-transparent outline-none text-sm mb-4" style={{ borderColor: 'var(--border)' }} />
          <Button type="submit" className="w-full">Send message</Button>
        </form>
      </div>
    </div>
  );
}

function InfoRow({ icon: Icon, label, value }) {
  return (
    <div className="flex items-start gap-3">
      <div className="w-10 h-10 rounded-full flex items-center justify-center shrink-0" style={{ background: 'var(--surface-2)', color: 'var(--brand)' }}><Icon size={16} /></div>
      <div><p className="text-xs" style={{ color: 'var(--text-muted)' }}>{label}</p><p className="text-sm font-medium">{value}</p></div>
    </div>
  );
}

export function AboutUs() {
  return (
    <div className="max-w-3xl mx-auto px-4 md:px-6 py-14">
      <h1 className="font-display text-3xl font-semibold mb-4">About Novara</h1>
      <p className="text-sm leading-relaxed mb-4" style={{ color: 'var(--text-muted)' }}>
        Novara started as a small idea: shopping online shouldn't feel cluttered or rushed. We curate goods across electronics, fashion, home, beauty, sports and kids categories, choosing quality over quantity so every product on our shelves earns its place.
      </p>
      <p className="text-sm leading-relaxed" style={{ color: 'var(--text-muted)' }}>
        This storefront was built as a Frontend Developer Internship project, showcasing a complete customer experience alongside a full admin dashboard for managing products, categories, orders, banners and users.
      </p>
    </div>
  );
}

export function PrivacyPolicy() {
  return (
    <div className="max-w-3xl mx-auto px-4 md:px-6 py-14">
      <h1 className="font-display text-3xl font-semibold mb-6">Privacy Policy</h1>
      <div className="space-y-5 text-sm leading-relaxed" style={{ color: 'var(--text-muted)' }}>
        <p>We collect only the information needed to process your orders and improve your shopping experience: name, email, shipping address and order history.</p>
        <p>Your data is stored locally in this demo and is never sold or shared with third parties for marketing purposes.</p>
        <p>You may request access to, or deletion of, your data at any time by contacting our support team.</p>
      </div>
    </div>
  );
}

export function Terms() {
  return (
    <div className="max-w-3xl mx-auto px-4 md:px-6 py-14">
      <h1 className="font-display text-3xl font-semibold mb-6">Terms & Conditions</h1>
      <div className="space-y-5 text-sm leading-relaxed" style={{ color: 'var(--text-muted)' }}>
        <p>By using Novara, you agree to shop in good faith and provide accurate information at checkout.</p>
        <p>Prices and availability are subject to change without notice. Orders may be cancelled if stock runs out after purchase.</p>
        <p>This is a demo storefront built for an internship task; no real transactions are processed.</p>
      </div>
    </div>
  );
}

export function NotFound() {
  return (
    <div className="max-w-md mx-auto px-4 py-28 text-center">
      <p className="font-display text-7xl font-bold mb-2" style={{ color: 'var(--brand)' }}>404</p>
      <h1 className="font-display text-2xl font-semibold mb-2">Page not found</h1>
      <p className="text-sm mb-6" style={{ color: 'var(--text-muted)' }}>The page you're looking for doesn't exist or has moved.</p>
      <Link to="/"><Button>Back to home</Button></Link>
    </div>
  );
}
