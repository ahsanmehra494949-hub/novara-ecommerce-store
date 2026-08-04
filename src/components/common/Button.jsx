export default function Button({
  children, variant = 'primary', size = 'md', className = '', icon, loading, ...props
}) {
  const base = 'inline-flex items-center justify-center gap-2 font-semibold uppercase tracking-wide rounded-md transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2';
  const sizes = {
    sm: 'px-4 py-2 text-[11px]',
    md: 'px-6 py-3 text-xs',
    lg: 'px-8 py-4 text-sm',
  };
  const variants = {
    primary: 'hover:opacity-90 active:scale-[0.98]',
    outline: 'border hover:opacity-80 active:scale-[0.98]',
    ghost: 'hover:opacity-70 normal-case tracking-normal font-medium',
    danger: 'hover:opacity-90 active:scale-[0.98]',
  };
  const styleByVariant = {
    primary: { background: 'var(--brand)', color: 'var(--brand-ink)', outlineColor: 'var(--brand)' },
    outline: { borderColor: 'var(--border)', color: 'var(--text)', outlineColor: 'var(--brand)' },
    ghost: { color: 'var(--text)' },
    danger: { background: 'var(--danger)', color: '#fff' },
  };
  return (
    <button
      className={`${base} ${sizes[size]} ${variants[variant]} ${className}`}
      style={styleByVariant[variant]}
      disabled={loading || props.disabled}
      {...props}
    >
      {loading ? (
        <span className="w-4 h-4 border-2 rounded-full animate-spin" style={{ borderColor: 'currentColor', borderTopColor: 'transparent' }} />
      ) : icon}
      {children}
    </button>
  );
}
