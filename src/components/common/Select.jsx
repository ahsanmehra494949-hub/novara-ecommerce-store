import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { FiChevronDown, FiCheck } from 'react-icons/fi';

// Custom themed dropdown — replaces native <select>/<option>, which can't be
// reliably styled cross-browser (native option lists ignore our dark/light
// theme and can render with invisible text, or pop up detached from the
// trigger). This renders its own panel via a portal, positioned next to the
// trigger and flipped above it automatically when there isn't room below, so
// it always looks intentional in both themes.
export default function Select({
  value,
  onChange,
  options,
  placeholder = 'Select…',
  className = '',
}) {
  const [open, setOpen] = useState(false);
  const [coords, setCoords] = useState({ top: 0, bottom: 0, left: 0, width: 0, openUp: false, maxHeight: 260 });
  const triggerRef = useRef(null);
  const panelRef = useRef(null);

  const selected = options.find((o) => String(o.value) === String(value));

  const computePosition = () => {
    const el = triggerRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const gap = 6;
    const spaceBelow = window.innerHeight - rect.bottom - gap;
    const spaceAbove = rect.top - gap;
    const openUp = spaceBelow < 160 && spaceAbove > spaceBelow;
    const maxHeight = Math.max(120, Math.min(260, openUp ? spaceAbove : spaceBelow));
    setCoords({
      openUp,
      top: rect.bottom + gap,
      bottom: window.innerHeight - rect.top + gap,
      left: rect.left,
      width: rect.width,
      maxHeight,
    });
  };

  useLayoutEffect(() => {
    if (open) computePosition();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const handleOutside = (e) => {
      if (triggerRef.current?.contains(e.target)) return;
      if (panelRef.current?.contains(e.target)) return;
      setOpen(false);
    };
    const handleKey = (e) => { if (e.key === 'Escape') setOpen(false); };
    const handleReposition = () => computePosition();
    document.addEventListener('mousedown', handleOutside);
    document.addEventListener('keydown', handleKey);
    window.addEventListener('scroll', handleReposition, true);
    window.addEventListener('resize', handleReposition);
    return () => {
      document.removeEventListener('mousedown', handleOutside);
      document.removeEventListener('keydown', handleKey);
      window.removeEventListener('scroll', handleReposition, true);
      window.removeEventListener('resize', handleReposition);
    };
  }, [open]);

  return (
    <>
      <button
        type="button"
        ref={triggerRef}
        onClick={() => setOpen((o) => !o)}
        className={`flex items-center justify-between gap-2 border bg-transparent font-medium outline-none ${className}`}
        style={{ borderColor: 'var(--border)', color: 'var(--text)' }}
      >
        <span className="truncate">{selected ? selected.label : placeholder}</span>
        <FiChevronDown
          size={13}
          className="shrink-0"
          style={{ color: 'var(--text-muted)', transform: open ? 'rotate(180deg)' : 'none', transition: 'transform .15s' }}
        />
      </button>

      {open && createPortal(
        <div
          ref={panelRef}
          className="fixed z-[999] rounded-xl border overflow-y-auto py-1 animate-fadeUp"
          style={{
            top: coords.openUp ? 'auto' : coords.top,
            bottom: coords.openUp ? coords.bottom : 'auto',
            left: coords.left,
            minWidth: coords.width,
            maxHeight: coords.maxHeight,
            background: 'var(--surface)',
            borderColor: 'var(--border)',
            boxShadow: 'var(--shadow)',
          }}
        >
          {options.length === 0 && (
            <div className="px-3 py-2 text-sm" style={{ color: 'var(--text-muted)' }}>No options</div>
          )}
          {options.map((o) => {
            const isSelected = String(o.value) === String(value);
            return (
              <button
                type="button"
                key={o.value}
                onClick={() => { onChange(o.value); setOpen(false); }}
                className="w-full flex items-center justify-between gap-2 px-3 py-2 text-sm text-left hover:opacity-80"
                style={{
                  background: isSelected ? 'color-mix(in srgb, var(--brand) 14%, var(--surface))' : 'transparent',
                  color: isSelected ? 'var(--brand)' : 'var(--text)',
                }}
              >
                <span className="truncate">{o.label}</span>
                {isSelected && <FiCheck size={13} className="shrink-0" />}
              </button>
            );
          })}
        </div>,
        document.body
      )}
    </>
  );
}
