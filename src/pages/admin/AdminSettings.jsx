import { useState } from 'react';
import toast from 'react-hot-toast';
import Button from '../../components/common/Button';
import TextField from '../../components/common/TextField';
import { loadState, saveState } from '../../utils/storage';

const defaults = {
  storeName: 'Novara',
  logo: '',
  email: 'support@novara.com',
  phone: '+92 300 1234567',
  address: '42 Market Lane, Lahore, Pakistan',
  instagram: 'novara.store',
  twitter: 'novara',
  facebook: 'novara.store',
};

export default function AdminSettings() {
  const [form, setForm] = useState(loadState('novara_store_settings', defaults));

  const update = (key) => (e) => setForm({ ...form, [key]: e.target.value });

  const save = (e) => {
    e.preventDefault();
    saveState('novara_store_settings', form);
    toast.success('Store settings saved');
  };

  return (
    <div className="max-w-2xl">
      <h1 className="font-display text-2xl font-semibold mb-1">Store Settings</h1>
      <p className="text-sm mb-6" style={{ color: 'var(--text-muted)' }}>Manage your store identity and contact details.</p>

      <form onSubmit={save} className="space-y-8">
        <section className="rounded-2xl border p-6" style={{ borderColor: 'var(--border)', background: 'var(--surface)' }}>
          <h2 className="text-sm font-semibold mb-4">Branding</h2>
          <div className="flex items-center gap-4 mb-5">
            <div className="w-16 h-16 rounded-2xl flex items-center justify-center text-xl font-bold shrink-0" style={{ background: 'var(--surface-2)' }}>
              {form.logo ? <img src={form.logo} alt="Logo" className="w-full h-full object-cover rounded-2xl" /> : form.storeName?.[0]}
            </div>
            <TextField label="Logo URL" value={form.logo} onChange={update('logo')} placeholder="https://..." className="flex-1" />
          </div>
          <TextField label="Store name" value={form.storeName} onChange={update('storeName')} />
        </section>

        <section className="rounded-2xl border p-6" style={{ borderColor: 'var(--border)', background: 'var(--surface)' }}>
          <h2 className="text-sm font-semibold mb-4">Contact Details</h2>
          <TextField label="Support email" type="email" value={form.email} onChange={update('email')} />
          <TextField label="Phone number" value={form.phone} onChange={update('phone')} />
          <TextField label="Store address" value={form.address} onChange={update('address')} />
        </section>

        <section className="rounded-2xl border p-6" style={{ borderColor: 'var(--border)', background: 'var(--surface)' }}>
          <h2 className="text-sm font-semibold mb-4">Social Media Links</h2>
          <TextField label="Instagram" value={form.instagram} onChange={update('instagram')} />
          <TextField label="Twitter / X" value={form.twitter} onChange={update('twitter')} />
          <TextField label="Facebook" value={form.facebook} onChange={update('facebook')} />
        </section>

        <Button type="submit" className="w-full">Save Settings</Button>
      </form>
    </div>
  );
}
