import { useState } from 'react';
import { Link } from 'react-router-dom';
import { FiInstagram, FiTwitter, FiFacebook, FiSend } from 'react-icons/fi';
import toast from 'react-hot-toast';

export default function Footer() {
  const [email, setEmail] = useState('');

  const subscribe = (e) => {
    e.preventDefault();
    if (!email) return;
    toast.success('Subscribed! Watch your inbox.');
    setEmail('');
  };

  return (
    <footer className="border-t mt-16 pb-20 md:pb-0" style={{ borderColor: 'var(--border)', background: 'var(--surface)' }}>
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-12">
        <div className="rounded-2xl p-8 mb-12 flex flex-col md:flex-row items-center justify-between gap-6" style={{ background: 'var(--surface-2)' }}>
          <div>
            <h3 className="font-display text-xl font-semibold mb-1">Join the Novara list</h3>
            <p className="text-sm" style={{ color: 'var(--text-muted)' }}>New arrivals, private sales, no spam.</p>
          </div>
          <form onSubmit={subscribe} className="flex w-full md:w-auto gap-2">
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@email.com"
              className="flex-1 md:w-64 px-4 py-2.5 rounded-lg border bg-transparent outline-none text-sm"
              style={{ borderColor: 'var(--border)' }}
            />
            <button type="submit" className="w-11 h-11 shrink-0 rounded-lg flex items-center justify-center" style={{ background: 'var(--brand)', color: 'var(--brand-ink)' }}>
              <FiSend size={16} />
            </button>
          </form>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
          <div className="col-span-2 md:col-span-1">
            <div className="font-display text-xl font-bold mb-3">NOVARA</div>
            <p className="text-sm" style={{ color: 'var(--text-muted)' }}>Considered goods for everyday living.</p>
            <div className="flex gap-3 mt-4">
              <FiInstagram /><FiTwitter /><FiFacebook />
            </div>
          </div>
          <FooterCol title="Shop" links={[
            { to: '/categories', label: 'Categories' },
            { to: '/search', label: 'Search' },
            { to: '/wishlist', label: 'Wishlist' },
            { to: '/cart', label: 'Cart' },
          ]} />
          <FooterCol title="Account" links={[
            { to: '/profile', label: 'Profile' },
            { to: '/orders', label: 'My Orders' },
            { to: '/settings', label: 'Settings' },
            { to: '/login', label: 'Login' },
          ]} />
          <FooterCol title="Company" links={[
            { to: '/about', label: 'About Us' },
            { to: '/contact', label: 'Contact Us' },
          ]} />
          <FooterCol title="Legal" links={[
            { to: '/privacy-policy', label: 'Privacy Policy' },
            { to: '/terms', label: 'Terms & Conditions' },
          ]} />
        </div>

        <div className="mt-10 pt-6 border-t text-xs flex flex-col md:flex-row justify-between gap-2" style={{ borderColor: 'var(--border)', color: 'var(--text-muted)' }}>
          <span>© {new Date().getFullYear()} Novara. All rights reserved.</span>
          <span>Built for the Frontend Developer Internship Task.</span>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({ title, links }) {
  return (
    <div>
      <h4 className="text-sm font-semibold mb-3">{title}</h4>
      <ul className="space-y-2">
        {links.map((l) => (
          <li key={l.to}>
            <Link to={l.to} className="text-sm hover:opacity-70" style={{ color: 'var(--text-muted)' }}>{l.label}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
