import { Link, useLocation } from 'react-router-dom';
import { FiCheckCircle } from 'react-icons/fi';
import Button from '../../components/common/Button';

export default function OrderSuccess() {
  const { state } = useLocation();
  const orderId = state?.orderId || 'ORD-0000';
  const total = state?.total || 0;

  return (
    <div className="max-w-md mx-auto px-4 py-24 text-center animate-fadeUp">
      <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6" style={{ background: 'var(--surface-2)', color: 'var(--accent)' }}>
        <FiCheckCircle size={32} />
      </div>
      <h1 className="font-display text-3xl font-semibold mb-2">Order placed!</h1>
      <p className="text-sm mb-1" style={{ color: 'var(--text-muted)' }}>Thanks for shopping with Novara.</p>
      <div className="my-6 p-4 rounded-2xl border inline-block" style={{ borderColor: 'var(--border)', background: 'var(--surface)' }}>
        <p className="text-xs" style={{ color: 'var(--text-muted)' }}>Order ID</p>
        <p className="font-mono font-semibold">{orderId}</p>
        <p className="text-xs mt-2" style={{ color: 'var(--text-muted)' }}>Total paid</p>
        <p className="font-mono font-semibold">${total.toFixed(2)}</p>
      </div>
      <div className="flex flex-col gap-3">
        <Link to="/orders"><Button className="w-full">Track my order</Button></Link>
        <Link to="/"><Button variant="outline" className="w-full">Continue shopping</Button></Link>
      </div>
    </div>
  );
}
