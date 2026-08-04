import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import { FiTrash2, FiStar } from 'react-icons/fi';
import Rating from '../../components/common/Rating';
import { deleteReview, markAllReviewsRead } from '../../redux/slices/reviewsSlice';

export default function AdminReviews() {
  const reviews = useSelector((s) => s.reviews.list);
  const dispatch = useDispatch();

  // Visiting this page acknowledges any new reviews — clears the sidebar badge.
  useEffect(() => {
    if (reviews.some((r) => !r.read)) dispatch(markAllReviewsRead());
  }, [dispatch, reviews]);

  const avg = reviews.length ? reviews.reduce((s, r) => s + r.rating, 0) / reviews.length : 0;

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="font-display text-2xl font-semibold">Customer Reviews</h1>
          <p className="text-sm mt-1" style={{ color: 'var(--text-muted)' }}>{reviews.length} reviews submitted by customers</p>
        </div>
        {reviews.length > 0 && (
          <div className="flex items-center gap-2 px-4 py-2 rounded-xl border" style={{ borderColor: 'var(--border)', background: 'var(--surface)' }}>
            <FiStar style={{ color: 'var(--brand)' }} fill="var(--brand)" />
            <span className="font-display font-semibold">{avg.toFixed(1)}</span>
            <span className="text-xs" style={{ color: 'var(--text-muted)' }}>average</span>
          </div>
        )}
      </div>

      {reviews.length === 0 ? (
        <div className="rounded-2xl border border-dashed p-14 text-center" style={{ borderColor: 'var(--border)', background: 'var(--surface)' }}>
          <p className="text-sm font-medium mb-1">No reviews yet</p>
          <p className="text-xs" style={{ color: 'var(--text-muted)' }}>You'll be notified here as soon as a customer leaves one.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {reviews.map((r) => (
            <div key={r.id} className="rounded-2xl border p-4 flex gap-4" style={{ borderColor: 'var(--border)', background: 'var(--surface)' }}>
              <div className="w-10 h-10 rounded-full flex items-center justify-center text-xs font-bold shrink-0" style={{ background: 'var(--brand)', color: 'var(--brand-ink)' }}>
                {r.userName?.[0]?.toUpperCase() || 'U'}
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-center flex-wrap gap-x-2 gap-y-1">
                  <span className="font-medium text-sm">{r.userName}</span>
                  <Rating value={r.rating} />
                  <span className="text-[11px]" style={{ color: 'var(--text-muted)' }}>{new Date(r.date).toLocaleDateString()}</span>
                </div>
                {r.productName && (
                  <Link to={`/product/${r.productId}`} className="text-xs font-medium hover:underline" style={{ color: 'var(--brand)' }}>{r.productName}</Link>
                )}
                <p className="text-sm mt-1.5" style={{ color: 'var(--text-muted)' }}>{r.text}</p>
                {r.image && <img src={r.image} alt="" className="w-20 h-20 object-cover rounded-lg mt-2" />}
              </div>
              <button
                onClick={() => { dispatch(deleteReview(r.id)); toast.success('Review deleted'); }}
                className="p-1.5 rounded-lg hover:opacity-70 self-start shrink-0"
                style={{ background: 'var(--surface-2)', color: 'var(--danger)' }}
              >
                <FiTrash2 size={13} />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
