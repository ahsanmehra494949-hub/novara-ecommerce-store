import { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import toast from 'react-hot-toast';
import { FiHeart, FiShoppingCart, FiCheck, FiX, FiStar, FiCamera } from 'react-icons/fi';
import Rating from '../../components/common/Rating';
import PriceTag from '../../components/common/PriceTag';
import Button from '../../components/common/Button';
import ProductCard from '../../components/product/ProductCard';
import ProductAdvertising from '../../components/product/ProductAdvertising';
import ProductImage from '../../components/common/ProductImage';
import { addToCart } from '../../redux/slices/cartSlice';
import { toggleWishlist } from '../../redux/slices/wishlistSlice';
import { addReview } from '../../redux/slices/reviewsSlice';
import { updateProduct } from '../../redux/slices/catalogSlice';
import { fileToCompressedDataUrl } from '../../utils/imageUpload';
import useAuth from '../../hooks/useAuth';

export default function ProductDetails() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuth();
  const products = useSelector((s) => s.catalog.products);
  const product = products.find((p) => String(p.id) === String(id));
  const allReviews = useSelector((s) => s.reviews.list);
  const productReviews = allReviews.filter((r) => String(r.productId) === String(id));
  const wishlist = useSelector((s) => s.wishlist.items);
  const [activeImg, setActiveImg] = useState(0);
  const [qty, setQty] = useState(1);
  const [tab, setTab] = useState('description');
  const [zoom, setZoom] = useState(false);
  const [reviewForm, setReviewForm] = useState({ rating: 5, text: '', image: '' });
  const [uploadingReviewImg, setUploadingReviewImg] = useState(false);

  if (!product) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center">
        <p>Product not found.</p>
        <Link to="/" className="text-sm font-medium" style={{ color: 'var(--brand)' }}>← Back to home</Link>
      </div>
    );
  }

  const isWishlisted = wishlist.some((i) => i.id === product.id);
  const related = products.filter((p) => p.category === product.category && p.id !== product.id).slice(0, 5);

  const handleAdd = () => {
    if (product.stock === 0) return;
    dispatch(addToCart({ id: product.id, name: product.name, image: product.images?.[0], price: product.discountPrice || product.price, qty }));
    toast.success('Added to cart');
  };

  const handleBuyNow = () => {
    if (product.stock === 0) return;
    dispatch(addToCart({ id: product.id, name: product.name, image: product.images?.[0], price: product.discountPrice || product.price, qty }));
    navigate('/checkout');
  };

  const handleReviewImage = async (fileList) => {
    const file = Array.from(fileList || []).find((f) => f.type.startsWith('image/'));
    if (!file) return;
    setUploadingReviewImg(true);
    try {
      const dataUrl = await fileToCompressedDataUrl(file, 700, 0.8);
      setReviewForm((f) => ({ ...f, image: dataUrl }));
    } catch {
      toast.error('Could not read that image');
    } finally {
      setUploadingReviewImg(false);
    }
  };

  const submitReview = (e) => {
    e.preventDefault();
    if (!isAuthenticated) { toast.error('Please log in to leave a review'); navigate('/login'); return; }
    if (!reviewForm.text.trim()) { toast.error('Write a few words about the product'); return; }

    dispatch(addReview({
      productId: product.id,
      productName: product.name,
      userId: user?.id,
      userName: user?.name || 'Customer',
      rating: reviewForm.rating,
      text: reviewForm.text.trim(),
      image: reviewForm.image,
    }));

    // Keep the product's displayed rating in sync with real reviews.
    const nextReviews = [{ rating: reviewForm.rating }, ...productReviews];
    const avg = nextReviews.reduce((sum, r) => sum + r.rating, 0) / nextReviews.length;
    dispatch(updateProduct({ id: product.id, rating: Math.round(avg * 10) / 10, reviewCount: nextReviews.length }));

    toast.success('Thanks for your review!');
    setReviewForm({ rating: 5, text: '', image: '' });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-6 py-8">
      <div className="text-xs mb-6 flex gap-1.5" style={{ color: 'var(--text-muted)' }}>
        <Link to="/">Home</Link> / <Link to={`/category/${product.category}`}>{product.categoryName}</Link> / <span>{product.name}</span>
      </div>

      <div className="grid md:grid-cols-2 gap-10">
        <div>
          <div
            className="relative aspect-square rounded-2xl overflow-hidden mb-3 cursor-zoom-in"
            style={{ background: 'var(--surface-2)' }}
            onMouseEnter={() => setZoom(true)}
            onMouseLeave={() => setZoom(false)}
          >
            <ProductImage
              src={product.images?.[activeImg]}
              alt={product.name}
              className="w-full h-full object-cover transition-transform duration-300"
              style={{ transform: zoom ? 'scale(1.4)' : 'scale(1)' }}
              iconSize={48}
            />
          </div>
          <div className="flex gap-3">
            {(product.images || []).map((img, i) => (
              <button key={i} onClick={() => setActiveImg(i)} className="w-16 h-16 rounded-xl overflow-hidden border-2" style={{ borderColor: i === activeImg ? 'var(--brand)' : 'var(--border)' }}>
                <ProductImage src={img} alt="" className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        </div>

        <div>
          <p className="text-xs uppercase tracking-wide mb-2" style={{ color: 'var(--text-muted)' }}>{product.categoryName} · {product.brand}</p>
          <h1 className="font-display text-3xl font-semibold mb-3">{product.name}</h1>
          <Rating value={product.rating} count={product.reviewCount} size={16} />
          <div className="my-5"><PriceTag price={product.price} discountPrice={product.discountPrice} size="lg" /></div>

          <div className="flex items-center gap-2 mb-6 text-sm">
            {product.stock > 0 ? (
              <span className="flex items-center gap-1" style={{ color: 'var(--accent)' }}><FiCheck /> In stock ({product.stock} available)</span>
            ) : (
              <span className="flex items-center gap-1" style={{ color: 'var(--danger)' }}><FiX /> Out of stock</span>
            )}
          </div>

          <div className="flex items-center gap-4 mb-4">
            <div className="flex items-center border rounded-full" style={{ borderColor: 'var(--border)' }}>
              <button onClick={() => setQty((q) => Math.max(1, q - 1))} className="w-9 h-9">−</button>
              <span className="w-8 text-center text-sm">{qty}</span>
              <button onClick={() => setQty((q) => q + 1)} className="w-9 h-9">+</button>
            </div>
            <button
              onClick={() => { dispatch(toggleWishlist({ id: product.id, name: product.name, image: product.images?.[0], price: product.discountPrice || product.price })); toast.success(isWishlisted ? 'Removed from wishlist' : 'Added to wishlist'); }}
              className="w-11 h-11 rounded-full border flex items-center justify-center shrink-0 ml-auto"
              style={{ borderColor: 'var(--border)', color: isWishlisted ? 'var(--danger)' : 'var(--text)' }}
            >
              <FiHeart fill={isWishlisted ? 'currentColor' : 'none'} />
            </button>
          </div>

          <div className="flex flex-col sm:flex-row items-stretch gap-3 mb-6">
            <Button onClick={handleAdd} disabled={product.stock === 0} variant="outline" icon={<FiShoppingCart size={15} />} className="flex-1">
              {product.stock === 0 ? 'Out of stock' : 'Add to cart'}
            </Button>
            <Button onClick={handleBuyNow} disabled={product.stock === 0} className="flex-1">
              Buy now
            </Button>
          </div>

          <div className="border-t pt-5" style={{ borderColor: 'var(--border)' }}>
            <div className="flex gap-6 mb-4 text-sm font-medium">
              {['description', 'specifications', 'reviews'].map((t) => (
                <button key={t} onClick={() => setTab(t)} className="pb-2 capitalize" style={{ color: tab === t ? 'var(--brand)' : 'var(--text-muted)', borderBottom: tab === t ? '2px solid var(--brand)' : 'none' }}>
                  {t}
                </button>
              ))}
            </div>
            {tab === 'description' && <p className="text-sm leading-relaxed" style={{ color: 'var(--text-muted)' }}>{product.description}</p>}
            {tab === 'specifications' && (
              <table className="w-full text-sm">
                <tbody>
                  {Object.entries(product.specifications).map(([k, v]) => (
                    <tr key={k} className="border-b" style={{ borderColor: 'var(--border)' }}>
                      <td className="py-2 font-medium">{k}</td>
                      <td className="py-2 text-right" style={{ color: 'var(--text-muted)' }}>{v}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
            {tab === 'reviews' && (
              <div className="space-y-6">
                {productReviews.length > 0 ? (
                  <div className="space-y-4">
                    {productReviews.map((r) => (
                      <div key={r.id} className="flex gap-3 pb-4 border-b last:border-0" style={{ borderColor: 'var(--border)' }}>
                        <div className="w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold shrink-0" style={{ background: 'var(--brand)', color: 'var(--brand-ink)' }}>
                          {r.userName?.[0]?.toUpperCase() || 'U'}
                        </div>
                        <div className="min-w-0">
                          <div className="flex items-center gap-2">
                            <span className="text-sm font-medium">{r.userName}</span>
                            <Rating value={r.rating} />
                          </div>
                          <p className="text-sm mt-1" style={{ color: 'var(--text-muted)' }}>{r.text}</p>
                          {r.image && <img src={r.image} alt="" className="w-24 h-24 object-cover rounded-lg mt-2" />}
                          <p className="text-[11px] mt-1.5" style={{ color: 'var(--text-muted)' }}>{new Date(r.date).toLocaleDateString()}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-sm" style={{ color: 'var(--text-muted)' }}>No reviews yet — be the first to share your experience.</p>
                )}

                <div className="rounded-2xl border p-5" style={{ borderColor: 'var(--border)', background: 'var(--surface-2)' }}>
                  <h3 className="font-display text-base font-semibold mb-3">Write a review</h3>
                  <form onSubmit={submitReview}>
                    <div className="mb-3">
                      <label className="block text-xs font-medium mb-1.5" style={{ color: 'var(--text-muted)' }}>Your rating</label>
                      <div className="flex gap-1">
                        {[1, 2, 3, 4, 5].map((n) => (
                          <button
                            key={n}
                            type="button"
                            onClick={() => setReviewForm((f) => ({ ...f, rating: n }))}
                            className="p-0.5"
                          >
                            <FiStar
                              size={22}
                              style={{ color: 'var(--brand)' }}
                              fill={n <= reviewForm.rating ? 'var(--brand)' : 'none'}
                            />
                          </button>
                        ))}
                      </div>
                    </div>

                    <textarea
                      value={reviewForm.text}
                      onChange={(e) => setReviewForm((f) => ({ ...f, text: e.target.value }))}
                      placeholder="What did you think of this product?"
                      rows={3}
                      className="w-full px-4 py-2.5 rounded-xl border bg-transparent outline-none text-sm resize-none mb-3"
                      style={{ borderColor: 'var(--border)', color: 'var(--text)' }}
                    />

                    <div className="flex items-center gap-3 mb-4">
                      {reviewForm.image ? (
                        <div className="relative w-16 h-16 rounded-lg overflow-hidden group shrink-0" style={{ background: 'var(--surface)' }}>
                          <img src={reviewForm.image} alt="" className="w-full h-full object-cover" />
                          <button
                            type="button"
                            onClick={() => setReviewForm((f) => ({ ...f, image: '' }))}
                            className="absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 group-hover:opacity-100 transition"
                          >
                            <FiX className="text-white" size={16} />
                          </button>
                        </div>
                      ) : (
                        <label className="flex items-center gap-2 px-3 py-2 rounded-xl border border-dashed text-xs font-medium cursor-pointer hover:opacity-80" style={{ borderColor: 'var(--border)', color: 'var(--text-muted)' }}>
                          <FiCamera size={14} />
                          {uploadingReviewImg ? 'Processing...' : 'Add a photo (optional)'}
                          <input type="file" accept="image/*" className="hidden" onChange={(e) => handleReviewImage(e.target.files)} />
                        </label>
                      )}
                    </div>

                    <Button type="submit" size="sm">Submit review</Button>
                    {!isAuthenticated && (
                      <p className="text-[11px] mt-2" style={{ color: 'var(--text-muted)' }}>You'll need to log in to submit a review.</p>
                    )}
                  </form>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <ProductAdvertising product={product} />

      {related.length > 0 && (
        <div className="mt-16">
          <h2 className="font-display text-2xl font-semibold mb-5">Related Products</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
            {related.map((p) => <ProductCard key={p.id} product={p} />)}
          </div>
        </div>
      )}
    </div>
  );
}
