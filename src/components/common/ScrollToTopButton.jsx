import { useEffect, useState } from 'react';
import { FiArrowUp } from 'react-icons/fi';

export default function ScrollToTopButton() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 400);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  if (!visible) return null;

  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      className="fixed bottom-40 md:bottom-24 right-5 z-40 w-11 h-11 rounded-full flex items-center justify-center shadow-lg animate-fadeUp"
      style={{ background: 'var(--brand)', color: 'var(--brand-ink)' }}
      aria-label="Scroll to top"
    >
      <FiArrowUp />
    </button>
  );
}
