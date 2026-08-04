export default function TextField({ label, error, className = '', ...props }) {
  return (
    <div className={`mb-4 ${className}`}>
      {label && <label className="block text-xs font-medium mb-1.5" style={{ color: 'var(--text-muted)' }}>{label}</label>}
      <input
        className="w-full px-4 py-2.5 rounded-xl border bg-transparent outline-none text-sm focus:ring-2"
        style={{ borderColor: error ? 'var(--danger)' : 'var(--border)', color: 'var(--text)' }}
        {...props}
      />
      {error && <p className="text-xs mt-1" style={{ color: 'var(--danger)' }}>{error}</p>}
    </div>
  );
}
