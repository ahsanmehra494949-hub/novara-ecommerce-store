import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';

export default function Pagination({ page, totalPages, onChange }) {
  if (totalPages <= 1) return null;
  const pages = Array.from({ length: totalPages }).map((_, i) => i + 1);

  return (
    <div className="flex items-center justify-center gap-2 mt-8">
      <button
        onClick={() => onChange(Math.max(1, page - 1))}
        disabled={page === 1}
        className="w-9 h-9 rounded-full border flex items-center justify-center disabled:opacity-40"
        style={{ borderColor: 'var(--border)' }}
      >
        <FiChevronLeft />
      </button>
      {pages.map((p) => (
        <button
          key={p}
          onClick={() => onChange(p)}
          className="w-9 h-9 rounded-full text-sm font-medium border"
          style={p === page
            ? { background: 'var(--brand)', color: 'var(--brand-ink)', borderColor: 'var(--brand)' }
            : { borderColor: 'var(--border)', color: 'var(--text)' }}
        >
          {p}
        </button>
      ))}
      <button
        onClick={() => onChange(Math.min(totalPages, page + 1))}
        disabled={page === totalPages}
        className="w-9 h-9 rounded-full border flex items-center justify-center disabled:opacity-40"
        style={{ borderColor: 'var(--border)' }}
      >
        <FiChevronRight />
      </button>
    </div>
  );
}
