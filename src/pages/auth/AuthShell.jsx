import { Link } from 'react-router-dom';

export default function AuthShell({ title, subtitle, children, footer }) {
  return (
    <div className="min-h-screen flex" style={{ background: 'var(--bg)' }}>
      <div className="hidden lg:block lg:w-1/2 relative">
        <img src="https://picsum.photos/seed/auth-side/1000/1400" alt="" className="w-full h-full object-cover" />
        <div className="absolute inset-0 flex flex-col justify-end p-12" style={{ background: 'linear-gradient(0deg, rgba(0,0,0,0.6), transparent 50%)' }}>
          <h2 className="font-display text-3xl font-bold text-white mb-2">NOVARA</h2>
          <p className="text-white/80 text-sm max-w-sm">Everyday essentials, chosen with care.</p>
        </div>
      </div>
      <div className="flex-1 flex items-center justify-center px-6 py-12">
        <div className="w-full max-w-sm animate-fadeUp">
          <Link to="/" className="font-display text-2xl font-bold lg:hidden block mb-8 text-center">NOVARA</Link>
          <h1 className="font-display text-2xl md:text-3xl font-semibold mb-1.5">{title}</h1>
          {subtitle && <p className="text-sm mb-7" style={{ color: 'var(--text-muted)' }}>{subtitle}</p>}
          {children}
          {footer && <div className="mt-6 text-sm text-center" style={{ color: 'var(--text-muted)' }}>{footer}</div>}
        </div>
      </div>
    </div>
  );
}
