import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { FiHeart, FiEye, FiShoppingCart } from 'react-icons/fi';
import toast from 'react-hot-toast';
import Rating from '../common/Rating';
import PriceTag from '../common/PriceTag';
import ProductImage from '../common/ProductImage';
import { addToCart } from '../../redux/slices/cartSlice';
import { toggleWishlist } from '../../redux/slices/wishlistSlice';

export default function ProductCard({ product }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const wishlist = useSelector((s) => s.wishlist.items);
  const isWishlisted = wishlist.some((i) => i.id === product.id);
  const outOfStock = product.stock === 0;

  const handleAddToCart = (e) => {
    e.preventDefault();
    if (outOfStock) return;
    dispatch(addToCart({ id: product.id, name: product.name, image: product.images?.[0], price: product.discountPrice || product.price }));
    toast.success('Added to cart');
  };

  const handleWishlist = (e) => {
    e.preventDefault();
    dispatch(toggleWishlist({ id: product.id, name: product.name, image: product.images?.[0], price: product.discountPrice || product.price }));
    toast.success(isWishlisted ? 'Removed from wishlist' : 'Added to wishlist');
  };

  return (
    <>
      <Link
        to={`/product/${product.id}`}
        className="group block rounded-xl overflow-hidden border animate-fadeUp"
        style={{ borderColor: 'var(--border)', background: 'var(--surface)' }}
      >
        <div className="relative aspect-square overflow-hidden" style={{ background: 'var(--surface-2)' }}>
          <ProductImage src={product.images?.[0]} alt={product.name} className="w-full h-full object-cover group-hover:scale-105 group-hover:opacity-0 transition-all duration-500" iconSize={32} />
          {product.images?.[1] && (
            <img src={product.images[1]} alt="" loading="lazy" className="absolute inset-0 w-full h-full object-cover opacity-0 group-hover:opacity-100 group-hover:scale-110 transition-all duration-700" />
          )}
          {product.discountPrice && (
            <span className="absolute top-2.5 left-2.5 font-mono text-[10px] font-bold px-2 py-1 rounded-full" style={{ background: 'var(--danger)', color: '#fff' }}>
              -{Math.round((1 - product.discountPrice / product.price) * 100)}%
            </span>
          )}
          {outOfStock && (
            <span className="absolute top-2.5 right-2.5 font-mono text-[10px] font-bold px-2 py-1 rounded-full" style={{ background: 'var(--surface)', color: 'var(--text-muted)' }}>
              Out of stock
            </span>
          )}
          <div className="absolute bottom-2.5 right-2.5 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
            <button onClick={handleWishlist} className="w-8 h-8 rounded-full flex items-center justify-center shadow" style={{ background: 'var(--surface)', color: isWishlisted ? 'var(--danger)' : 'var(--text)' }} aria-label="Wishlist">
              <FiHeart fill={isWishlisted ? 'currentColor' : 'none'} size={14} />
            </button>
            <button onClick={(e) => { e.preventDefault(); navigate(`/product/${product.id}`); }} className="w-8 h-8 rounded-full flex items-center justify-center shadow" style={{ background: 'var(--surface)', color: 'var(--text)' }} aria-label="View product">
              <FiEye size={14} />
            </button>
            <button onClick={handleAddToCart} disabled={outOfStock} className="w-8 h-8 rounded-full flex items-center justify-center shadow disabled:opacity-40" style={{ background: 'var(--brand)', color: 'var(--brand-ink)' }} aria-label="Add to cart">
              <FiShoppingCart size={14} />
            </button>
          </div>
        </div>
        <div className="p-3">
          <p className="text-[11px] uppercase tracking-wide mb-0.5" style={{ color: 'var(--text-muted)' }}>{product.categoryName}</p>
          <h3 className="text-sm font-medium line-clamp-1 mb-1">{product.name}</h3>
          <Rating value={product.rating} count={product.reviewCount} />
          <div className="mt-1.5">
            <PriceTag price={product.price} discountPrice={product.discountPrice} size="sm" />
          </div>
        </div>
      </Link>
    </>
  );
}
