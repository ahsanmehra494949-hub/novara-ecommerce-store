import { Link, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { FiPackage, FiChevronRight } from 'react-icons/fi';
import ProductImage from '../../components/common/ProductImage';

const statusColor = (s) => ({
  Pending: 'var(--brand)',
  Processing: '#4C8DFF',
  Completed: 'var(--accent)',
  Cancelled: 'var(--danger)',
}[s] || 'var(--text-muted)');

export function MyOrders() {
  const orders = useSelector((s) => s.orders.list);

  if (orders.length === 0) {
    return (
      <div className="max-w-xl mx-auto px-4 py-24 text-center">
        <FiPackage size={40} className="mx-auto mb-4" style={{ color: 'var(--text-muted)' }} />
        <h1 className="font-display text-2xl font-semibold mb-2">No orders yet</h1>
        <Link to="/" className="text-sm font-medium" style={{ color: 'var(--brand)' }}>Start shopping →</Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 md:px-6 py-10">
      <h1 className="font-display text-3xl font-semibold mb-8">My Orders</h1>
      <div className="space-y-3">
        {orders.map((o) => (
          <Link key={o.id} to={`/orders/${o.id}`} className="flex items-center justify-between p-4 rounded-2xl border hover:-translate-y-0.5 transition-transform" style={{ borderColor: 'var(--border)', background: 'var(--surface)' }}>
            <div>
              <p className="font-mono text-sm font-semibold">{o.id}</p>
              <p className="text-xs mt-1" style={{ color: 'var(--text-muted)' }}>{o.date} · {o.items} items</p>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-xs font-medium px-2.5 py-1 rounded-full" style={{ background: 'var(--surface-2)', color: statusColor(o.status) }}>{o.status}</span>
              <span className="font-mono text-sm font-semibold">${o.total.toFixed(2)}</span>
              <FiChevronRight style={{ color: 'var(--text-muted)' }} />
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export function OrderDetails() {
  const { id } = useParams();
  const order = useSelector((s) => s.orders.list.find((o) => o.id === id));

  if (!order) {
    return (
      <div className="max-w-xl mx-auto px-4 py-24 text-center">
        <p className="text-sm mb-4" style={{ color: 'var(--text-muted)' }}>Order not found.</p>
        <Link to="/orders" className="text-sm font-medium" style={{ color: 'var(--brand)' }}>← Back to orders</Link>
      </div>
    );
  }

  const steps = ['Pending', 'Processing', 'Completed'];
  const currentStep = steps.indexOf(order.status);

  return (
    <div className="max-w-3xl mx-auto px-4 md:px-6 py-10">
      <Link to="/orders" className="text-xs" style={{ color: 'var(--text-muted)' }}>← Back to orders</Link>
      <div className="flex items-center justify-between mt-3 mb-8">
        <h1 className="font-display text-3xl font-semibold">{order.id}</h1>
        <span className="text-xs font-medium px-3 py-1.5 rounded-full" style={{ background: 'var(--surface-2)', color: statusColor(order.status) }}>{order.status}</span>
      </div>

      {order.status !== 'Cancelled' && (
        <div className="flex items-center mb-10">
          {steps.map((s, i) => (
            <div key={s} className="flex-1 flex items-center">
              <div className="flex flex-col items-center flex-1">
                <div className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold" style={{ background: i <= currentStep ? 'var(--brand)' : 'var(--surface-2)', color: i <= currentStep ? 'var(--brand-ink)' : 'var(--text-muted)' }}>{i + 1}</div>
                <span className="text-xs mt-2">{s}</span>
              </div>
              {i < steps.length - 1 && <div className="h-0.5 flex-1 -mt-5" style={{ background: i < currentStep ? 'var(--brand)' : 'var(--border)' }} />}
            </div>
          ))}
        </div>
      )}

      <div className="rounded-2xl border p-6 mb-6" style={{ borderColor: 'var(--border)', background: 'var(--surface)' }}>
        <h2 className="font-semibold mb-3 text-sm">Shipping Address</h2>
        <p className="text-sm" style={{ color: 'var(--text-muted)' }}>{order.customer}<br />{order.address || 'N/A'}</p>
      </div>

      <div className="rounded-2xl border p-6" style={{ borderColor: 'var(--border)', background: 'var(--surface)' }}>
        <h2 className="font-semibold mb-3 text-sm">Order Items</h2>
        <div className="space-y-3">
          {(order.products || []).map((p) => (
            <div key={p.id} className="flex items-center justify-between text-sm">
              <div className="flex items-center gap-3">
                <ProductImage src={p.image} alt={p.name} className="w-10 h-10 rounded-lg object-cover" iconSize={16} />
                <span>{p.name} × {p.qty}</span>
              </div>
              <span className="font-mono">${(p.price * p.qty).toFixed(2)}</span>
            </div>
          ))}
          {(!order.products || order.products.length === 0) && (
            <p className="text-sm" style={{ color: 'var(--text-muted)' }}>{order.items} item(s)</p>
          )}
        </div>
        <div className="flex justify-between font-semibold text-base border-t pt-3 mt-4" style={{ borderColor: 'var(--border)' }}>
          <span>Total</span><span className="font-mono">${order.total.toFixed(2)}</span>
        </div>
      </div>
    </div>
  );
}
