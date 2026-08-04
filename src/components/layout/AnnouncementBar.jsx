import { useSelector } from 'react-redux';

export default function AnnouncementBar() {
  const events = useSelector((s) => s.events.list);
  const active = events.filter((e) => e.enabled);

  if (active.length === 0) return null;

  const line = active.map((e) => e.text).join('   •   ');

  return (
    <div
      className="marquee-track overflow-hidden py-2"
      style={{ background: 'var(--brand)', color: 'var(--brand-ink)' }}
    >
      <div className="flex w-max whitespace-nowrap animate-marquee">
        <span className="text-[11px] font-semibold tracking-wide uppercase px-4">{line}</span>
        <span className="text-[11px] font-semibold tracking-wide uppercase px-4" aria-hidden="true">{line}</span>
      </div>
    </div>
  );
}
