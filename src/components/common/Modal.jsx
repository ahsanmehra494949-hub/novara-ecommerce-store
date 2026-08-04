import { useEffect } from 'react';
import { FiX } from 'react-icons/fi';

export default function Modal({ open, onClose, title, children, maxWidth = 'max-w-lg' }) {
  useEffect(() => {
    if (open) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = '';
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm animate-fadeUp"
        onClick={onClose}
      />
      <div
        className={`relative w-full ${maxWidth} rounded-xl border animate-fadeUp max-h-[90vh] overflow-y-auto`}
        style={{ background: 'var(--surface)', borderColor: 'var(--border)', boxShadow: 'var(--shadow)' }}
      >
        <div className="flex items-center justify-between px-6 py-4 border-b sticky top-0" style={{ borderColor: 'var(--border)', background: 'var(--surface)' }}>
          <h3 className="font-display text-lg font-semibold">{title}</h3>
          <button onClick={onClose} className="p-1.5 rounded-full hover:opacity-70" style={{ background: 'var(--surface-2)' }}>
            <FiX />
          </button>
        </div>
        <div className="p-6">{children}</div>
      </div>
    </div>
  );
}
