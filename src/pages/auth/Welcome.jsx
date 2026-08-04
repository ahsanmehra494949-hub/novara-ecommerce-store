import { Link } from 'react-router-dom';

export default function Welcome() {
  return (
    <div className="min-h-screen flex flex-col" style={{ background: 'var(--bg)' }}>
      <div className="flex-1 relative overflow-hidden">
        <img src="https://picsum.photos/seed/welcome-hero/1200/1400" alt="" className="w-full h-full object-cover" />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(180deg, rgba(0,0,0,0.1) 0%, var(--bg) 92%)' }} />
      </div>
      <div className="px-6 pb-10 pt-4 -mt-24 relative animate-fadeUp">
        <h1 className="font-display text-4xl font-bold mb-2">Considered goods,<br />delivered well.</h1>
        <p className="text-sm mb-8" style={{ color: 'var(--text-muted)' }}>
          Curated electronics, fashion, home and more — all in one clean, fast store.
        </p>
        <div className="flex flex-col gap-3">
          <Link to="/register" className="text-center px-6 py-3.5 rounded-full font-medium text-sm" style={{ background: 'var(--brand)', color: 'var(--brand-ink)' }}>
            Create an account
          </Link>
          <Link to="/login" className="text-center px-6 py-3.5 rounded-full font-medium text-sm border" style={{ borderColor: 'var(--border)' }}>
            I already have an account
          </Link>
        </div>
        <Link to="/" className="block text-center text-xs mt-6" style={{ color: 'var(--text-muted)' }}>Continue browsing as guest →</Link>
      </div>
    </div>
  );
}
