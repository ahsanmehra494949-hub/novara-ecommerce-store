import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import toast from 'react-hot-toast';
import Button from '../../components/common/Button';
import TextField from '../../components/common/TextField';
import { clearCart } from '../../redux/slices/cartSlice';
import { placeOrder } from '../../redux/slices/ordersSlice';
import useAuth from '../../hooks/useAuth';

export default function Checkout() {
  const items = useSelector((s) => s.cart.items);
  const { user } = useAuth();
  const [form, setForm] = useState({ name: user?.name || '', address: '', city: '', zip: '', payment: 'card' });
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const subtotal = items.reduce((a, i) => a + i.price * i.qty, 0);
  const shipping = subtotal > 50 || subtotal === 0 ? 0 : 6.99;
  const total = subtotal + shipping;

  const placeOrderHandler = (e) => {
    e.preventDefault();
    if (!form.name || !form.address || !form.city || !form.zip) {
      toast.error('Please fill in all shipping details');
      return;
    }
    setLoading(true);
    setTimeout(() => {
      const orderId = `ORD-${Math.floor(2500 + Math.random() * 500)}`;
      dispatch(placeOrder({
        id: orderId,
        customer: form.name,
        date: new Date().toLocaleDateString(),
        total,
        status: 'Pending',
        items: items.length,
        products: items,
        address: `${form.address}, ${form.city} ${form.zip}`,
      }));
      dispatch(clearCart());
      setLoading(false);
      navigate('/order-success', { state: { orderId, total } });
    }, 1000);
  };

  if (items.length === 0) {
    return (
      <div className="max-w-xl mx-auto px-4 py-24 text-center">
        <p className="text-sm" style={{ color: 'var(--text-muted)' }}>Your cart is empty.</p>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 md:px-6 py-10">
      <h1 className="font-display text-3xl font-semibold mb-8">Checkout</h1>
      <form onSubmit={placeOrderHandler} className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <div className="rounded-2xl border p-6" style={{ borderColor: 'var(--border)', background: 'var(--surface)' }}>
            <h2 className="font-display text-lg font-semibold mb-4">Shipping Details</h2>
            <TextField label="Full name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
            <TextField label="Address" value={form.address} onChange={(e) => setForm({ ...form, address: e.target.value })} />
            <div className="grid grid-cols-2 gap-4">
              <TextField label="City" value={form.city} onChange={(e) => setForm({ ...form, city: e.target.value })} />
              <TextField label="ZIP code" value={form.zip} onChange={(e) => setForm({ ...form, zip: e.target.value })} />
            </div>
          </div>
          <div className="rounded-2xl border p-6" style={{ borderColor: 'var(--border)', background: 'var(--surface)' }}>
            <h2 className="font-display text-lg font-semibold mb-4">Payment Method</h2>
            <div className="space-y-2">
              {[{ v: 'card', l: 'Credit / Debit Card' }, { v: 'cod', l: 'Cash on Delivery' }].map((opt) => (
                <label key={opt.v} className="flex items-center gap-2 text-sm p-3 rounded-xl border cursor-pointer" style={{ borderColor: form.payment === opt.v ? 'var(--brand)' : 'var(--border)' }}>
                  <input type="radio" checked={form.payment === opt.v} onChange={() => setForm({ ...form, payment: opt.v })} />
                  {opt.l}
                </label>
              ))}
            </div>
          </div>
        </div>

        <div className="rounded-2xl border p-6 h-fit sticky top-24" style={{ borderColor: 'var(--border)', background: 'var(--surface)' }}>
          <h2 className="font-display text-lg font-semibold mb-4">Order Summary</h2>
          <div className="space-y-2 mb-4 max-h-48 overflow-y-auto">
            {items.map((i) => (
              <div key={i.id} className="flex justify-between text-sm">
                <span className="line-clamp-1">{i.name} × {i.qty}</span>
                <span className="font-mono">${(i.price * i.qty).toFixed(2)}</span>
              </div>
            ))}
          </div>
          <div className="space-y-2 text-sm border-t pt-3" style={{ borderColor: 'var(--border)' }}>
            <div className="flex justify-between"><span style={{ color: 'var(--text-muted)' }}>Subtotal</span><span className="font-mono">${subtotal.toFixed(2)}</span></div>
            <div className="flex justify-between"><span style={{ color: 'var(--text-muted)' }}>Shipping</span><span className="font-mono">{shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`}</span></div>
          </div>
          <div className="flex justify-between font-semibold text-base border-t pt-3 my-4" style={{ borderColor: 'var(--border)' }}>
            <span>Total</span><span className="font-mono">${total.toFixed(2)}</span>
          </div>
          <Button type="submit" loading={loading} className="w-full">Place order</Button>
        </div>
      </form>
    </div>
  );
}
