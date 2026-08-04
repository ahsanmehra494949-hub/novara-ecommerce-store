import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import toast from 'react-hot-toast';
import Modal from '../common/Modal';
import Rating from '../common/Rating';
import PriceTag from '../common/PriceTag';
import Button from '../common/Button';
import { addToCart } from '../../redux/slices/cartSlice';

export default function QuickViewModal({ open, onClose, product }) {
  const dispatch = useDispatch();

  const handleAdd = () => {
    dispatch(addToCart({ id: product.id, name: product.name, image: product.images[0], price: product.discountPrice || product.price }));
    toast.success('Added to cart');
    onClose();
  };

  return (
    <Modal open={open} onClose={onClose} title="Quick view" maxWidth="max-w-2xl">
      <div className="grid sm:grid-cols-2 gap-6">
        <img src={product.images[0]} alt={product.name} className="w-full aspect-square object-cover rounded-xl" />
        <div>
          <p className="text-xs uppercase tracking-wide mb-1" style={{ color: 'var(--text-muted)' }}>{product.categoryName}</p>
          <h3 className="font-display text-xl font-semibold mb-2">{product.name}</h3>
          <Rating value={product.rating} count={product.reviewCount} />
          <div className="my-3"><PriceTag price={product.price} discountPrice={product.discountPrice} size="lg" /></div>
          <p className="text-sm mb-5 line-clamp-3" style={{ color: 'var(--text-muted)' }}>{product.description}</p>
          <div className="flex gap-3">
            <Button onClick={handleAdd} disabled={product.stock === 0}>{product.stock === 0 ? 'Out of stock' : 'Add to cart'}</Button>
            <Link to={`/product/${product.id}`} onClick={onClose}>
              <Button variant="outline">View details</Button>
            </Link>
          </div>
        </div>
      </div>
    </Modal>
  );
}
