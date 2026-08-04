import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Splash() {
  const navigate = useNavigate();

  useEffect(() => {
    const seen = sessionStorage.getItem('novara_splash_seen');
    const t = setTimeout(() => {
      sessionStorage.setItem('novara_splash_seen', '1');
      navigate(seen ? '/' : '/welcome', { replace: true });
    }, 1600);
    return () => clearTimeout(t);
  }, [navigate]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center" style={{ background: 'var(--bg)' }}>
      <div className="animate-fadeUp text-center">
        <h1 className="font-display text-5xl font-bold tracking-tight mb-3">NOVARA</h1>
        <p className="font-mono text-xs tracking-[0.3em] uppercase" style={{ color: 'var(--brand)' }}>Considered Goods</p>
      </div>
      <div className="mt-10 w-8 h-8 border-2 rounded-full animate-spin" style={{ borderColor: 'var(--border)', borderTopColor: 'var(--brand)' }} />
    </div>
  );
}
