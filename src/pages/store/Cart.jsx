import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { FiTrash2, FiShoppingCart } from 'react-icons/fi';
import Button from '../../components/common/Button';
import ProductImage from '../../components/common/ProductImage';
import { removeFromCart, updateQty } from '../../redux/slices/cartSlice';

export default function Cart() {
  const items = useSelector((s) => s.cart.items);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const subtotal = items.reduce((a, i) => a + i.price * i.qty, 0);
  const shipping = subtotal > 50 || subtotal === 0 ? 0 : 6.99;
  const total = subtotal + shipping;

  if (items.length === 0) {
    return (
      <div className="max-w-xl mx-auto px-4 py-24 text-center">
        <FiShoppingCart size={40} className="mx-auto mb-4" style={{ color: 'var(--text-muted)' }} />
        <h1 className="font-display text-2xl font-semibold mb-2">Your cart is empty</h1>
        <p className="text-sm mb-6" style={{ color: 'var(--text-muted)' }}>Add items to get started.</p>
        <Link to="/"><Button>Continue shopping</Button></Link>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 md:px-6 py-10">
      <h1 className="font-display text-3xl font-semibold mb-8">Shopping Cart ({items.length})</h1>
      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-3">
          {items.map((item) => (
            <div key={item.id} className="flex items-center gap-4 p-4 rounded-2xl border" style={{ borderColor: 'var(--border)', background: 'var(--surface)' }}>
              <ProductImage src={item.image} alt={item.name} className="w-20 h-20 rounded-xl object-cover shrink-0" iconSize={26} />
              <div className="flex-1 min-w-0">
                <h3 className="text-sm font-medium line-clamp-1">{item.name}</h3>
                <p className="font-mono text-sm mt-1" style={{ color: 'var(--brand)' }}>${item.price.toFixed(2)}</p>
                <div className="flex items-center border rounded-full w-fit mt-2" style={{ borderColor: 'var(--border)' }}>
                  <button onClick={() => dispatch(updateQty({ id: item.id, qty: item.qty - 1 }))} className="w-7 h-7 text-sm">−</button>
                  <span className="w-7 text-center text-xs">{item.qty}</span>
                  <button onClick={() => dispatch(updateQty({ id: item.id, qty: item.qty + 1 }))} className="w-7 h-7 text-sm">+</button>
                </div>
              </div>
              <div className="text-right shrink-0">
                <p className="font-mono text-sm font-semibold mb-2">${(item.price * item.qty).toFixed(2)}</p>
                <button onClick={() => dispatch(removeFromCart(item.id))} style={{ color: 'var(--text-muted)' }}><FiTrash2 size={15} /></button>
              </div>
            </div>
          ))}
        </div>

        <div className="rounded-2xl border p-6 h-fit sticky top-24" style={{ borderColor: 'var(--border)', background: 'var(--surface)' }}>
          <h2 className="font-display text-lg font-semibold mb-4">Price Summary</h2>
          <div className="space-y-2 text-sm mb-4">
            <div className="flex justify-between"><span style={{ color: 'var(--text-muted)' }}>Subtotal</span><span className="font-mono">${subtotal.toFixed(2)}</span></div>
            <div className="flex justify-between"><span style={{ color: 'var(--text-muted)' }}>Shipping</span><span className="font-mono">{shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`}</span></div>
          </div>
          <div className="flex justify-between font-semibold text-base border-t pt-3 mb-5" style={{ borderColor: 'var(--border)' }}>
            <span>Total</span><span className="font-mono">${total.toFixed(2)}</span>
          </div>
          <Button className="w-full" onClick={() => navigate('/checkout')}>Proceed to checkout</Button>
        </div>
      </div>
    </div>
  );
}
