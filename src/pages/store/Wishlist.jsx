import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import toast from 'react-hot-toast';
import { FiHeart, FiTrash2, FiShoppingCart } from 'react-icons/fi';
import PriceTag from '../../components/common/PriceTag';
import Button from '../../components/common/Button';
import ProductImage from '../../components/common/ProductImage';
import { removeFromWishlist } from '../../redux/slices/wishlistSlice';
import { addToCart } from '../../redux/slices/cartSlice';

export default function Wishlist() {
  const items = useSelector((s) => s.wishlist.items);
  const dispatch = useDispatch();

  if (items.length === 0) {
    return (
      <div className="max-w-xl mx-auto px-4 py-24 text-center">
        <FiHeart size={40} className="mx-auto mb-4" style={{ color: 'var(--text-muted)' }} />
        <h1 className="font-display text-2xl font-semibold mb-2">Your wishlist is empty</h1>
        <p className="text-sm mb-6" style={{ color: 'var(--text-muted)' }}>Save items you love and find them here anytime.</p>
        <Link to="/"><Button>Continue shopping</Button></Link>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-4 md:px-6 py-10">
      <h1 className="font-display text-3xl font-semibold mb-8">My Wishlist ({items.length})</h1>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {items.map((item) => (
          <div key={item.id} className="rounded-2xl border overflow-hidden" style={{ borderColor: 'var(--border)', background: 'var(--surface)' }}>
            <Link to={`/product/${item.id}`}><ProductImage src={item.image} alt={item.name} className="w-full aspect-square object-cover" iconSize={30} /></Link>
            <div className="p-4">
              <h3 className="text-sm font-medium mb-1 line-clamp-1">{item.name}</h3>
              <PriceTag price={item.price} size="sm" />
              <div className="flex gap-2 mt-3">
                <Button size="sm" className="flex-1" icon={<FiShoppingCart size={13} />} onClick={() => { dispatch(addToCart({ id: item.id, name: item.name, image: item.image, price: item.price })); toast.success('Added to cart'); }}>
                  Add to cart
                </Button>
                <button onClick={() => dispatch(removeFromWishlist(item.id))} className="w-9 h-9 rounded-full border flex items-center justify-center shrink-0" style={{ borderColor: 'var(--border)' }}>
                  <FiTrash2 size={14} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
