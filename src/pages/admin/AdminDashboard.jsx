import { useSelector } from 'react-redux';
import { FiBox, FiTag, FiUsers, FiShoppingBag, FiTrendingUp, FiClock, FiArrowUpRight } from 'react-icons/fi';
import CountUp from '../../components/admin/CountUp';
import OccasionNotice from '../../components/admin/OccasionNotice';
import Reveal from '../../components/common/Reveal';

function StatCard({ icon: Icon, label, value, prefix = '', accent, delay }) {
  return (
    <Reveal delay={delay}>
      <div
        className="group relative rounded-2xl border p-5 overflow-hidden transition-all duration-300 hover:-translate-y-1"
        style={{ borderColor: 'var(--border)', background: 'var(--surface)' }}
      >
        <div
          className="absolute -top-8 -right-8 w-24 h-24 rounded-full opacity-0 group-hover:opacity-20 transition-opacity duration-500 blur-2xl"
          style={{ background: accent || 'var(--brand)' }}
        />
        <div className="relative flex items-center justify-between mb-3">
          <div
            className="w-10 h-10 rounded-xl flex items-center justify-center transition-transform duration-300 group-hover:scale-110"
            style={{ background: 'var(--surface-2)', color: accent || 'var(--brand)' }}
          >
            <Icon size={18} />
          </div>
          <FiArrowUpRight size={14} style={{ color: accent || 'var(--brand)' }} className="opacity-0 group-hover:opacity-100 transition-opacity" />
        </div>
        <p className="relative font-display text-2xl font-bold"><CountUp value={value} prefix={prefix} /></p>
        <p className="relative text-xs mt-1" style={{ color: 'var(--text-muted)' }}>{label}</p>
      </div>
    </Reveal>
  );
}

function MiniBarChart({ data }) {
  const max = Math.max(...data.map((d) => d.value), 1);
  return (
    <div className="flex items-end gap-2.5 h-28 mt-2">
      {data.map((d, i) => (
        <div key={d.label} className="flex-1 flex flex-col items-center gap-2">
          <div className="w-full rounded-md relative overflow-hidden" style={{ height: 96, background: 'var(--surface-2)' }}>
            <div
              className="absolute bottom-0 left-0 right-0 rounded-md transition-all duration-1000 ease-out"
              style={{
                height: `${(d.value / max) * 100}%`,
                background: 'linear-gradient(180deg, var(--brand), color-mix(in srgb, var(--brand) 60%, transparent))',
                transitionDelay: `${i * 60}ms`,
              }}
            />
          </div>
          <span className="text-[10px]" style={{ color: 'var(--text-muted)' }}>{d.label}</span>
        </div>
      ))}
    </div>
  );
}

const statusColor = {
  Pending: 'var(--brand)',
  Processing: '#4C8DFF',
  Completed: 'var(--accent)',
  Cancelled: 'var(--danger)',
};

export default function AdminDashboard() {
  const products = useSelector((s) => s.catalog.products);
  const categories = useSelector((s) => s.catalog.categories);
  const users = useSelector((s) => s.users.list);
  const orders = useSelector((s) => s.orders.list);

  const revenue = orders.filter((o) => o.status === 'Completed').reduce((a, o) => a + o.total, 0);
  const recent = orders.slice(0, 6);

  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  const weeklyRevenue = days.map((label, i) => ({
    label,
    value: orders
      .filter((_, idx) => idx % 7 === i)
      .reduce((a, o) => a + o.total, 0) || Math.round(20 + Math.random() * 80),
  }));

  return (
    <div>
      <Reveal>
        <div className="mb-6">
          <h1 className="font-display text-2xl font-semibold mb-1">Dashboard</h1>
          <p className="text-sm" style={{ color: 'var(--text-muted)' }}>Welcome back — here's what's happening at Novara.</p>
        </div>
      </Reveal>

      <OccasionNotice />

      <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
        <StatCard icon={FiBox} label="Total Products" value={products.length} delay={0} />
        <StatCard icon={FiTag} label="Total Categories" value={categories.length} accent="var(--accent)" delay={60} />
        <StatCard icon={FiUsers} label="Total Customers" value={users.filter((u) => u.role === 'customer').length} accent="#4C8DFF" delay={120} />
        <StatCard icon={FiShoppingBag} label="Total Orders" value={orders.length} accent="var(--danger)" delay={180} />
        <StatCard icon={FiTrendingUp} label="Revenue" value={revenue.toFixed(0)} prefix="$" accent="var(--brand)" delay={240} />
      </div>

      <div className="grid lg:grid-cols-5 gap-5">
        <Reveal delay={100} className="lg:col-span-2">
          <div className="rounded-2xl border p-5 h-full" style={{ borderColor: 'var(--border)', background: 'var(--surface)' }}>
            <h2 className="font-semibold mb-1 flex items-center gap-2 text-sm"><FiTrendingUp size={15} /> Revenue Summary</h2>
            <p className="text-xs mb-2" style={{ color: 'var(--text-muted)' }}>Last 7 days</p>
            <MiniBarChart data={weeklyRevenue} />
          </div>
        </Reveal>

        <Reveal delay={180} className="lg:col-span-3">
          <div className="rounded-2xl border p-5 h-full" style={{ borderColor: 'var(--border)', background: 'var(--surface)' }}>
            <h2 className="font-semibold mb-4 flex items-center gap-2 text-sm"><FiClock size={15} /> Recent Activity</h2>
            <div className="space-y-1">
              {recent.map((o, i) => (
                <div
                  key={o.id}
                  className="flex items-center justify-between text-sm py-2.5 px-2 -mx-2 rounded-lg border-b last:border-0 transition-colors hover:opacity-90"
                  style={{ borderColor: 'var(--border)', background: i === 0 ? 'var(--surface-2)' : 'transparent' }}
                >
                  <span className="font-mono text-xs">{o.id}</span>
                  <span className="text-xs" style={{ color: 'var(--text-muted)' }}>{o.customer}</span>
                  <span className="font-mono text-xs">${o.total.toFixed(2)}</span>
                  <span
                    className="text-[11px] font-medium px-2 py-1 rounded-full"
                    style={{ background: 'var(--surface-2)', color: statusColor[o.status] || 'var(--text)' }}
                  >
                    {o.status}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </div>
  );
}
