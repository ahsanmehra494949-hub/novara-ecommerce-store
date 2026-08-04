import { useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import toast from 'react-hot-toast';
import { FiPlus, FiEdit2, FiTrash2, FiUpload, FiX } from 'react-icons/fi';
import DataTable from '../../components/admin/DataTable';
import Modal from '../../components/common/Modal';
import Button from '../../components/common/Button';
import TextField from '../../components/common/TextField';
import ProductImage from '../../components/common/ProductImage';
import { addProduct, updateProduct, deleteProduct } from '../../redux/slices/catalogSlice';
import { fileToCompressedDataUrl } from '../../utils/imageUpload';

const emptyForm = { name: '', category: '', price: '', discountPrice: '', stock: '', images: [] };

export default function AdminProducts() {
  const products = useSelector((s) => s.catalog.products);
  const categories = useSelector((s) => s.catalog.categories);
  const dispatch = useDispatch();
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState(emptyForm);
  const [confirmDelete, setConfirmDelete] = useState(null);
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef(null);

  const openAdd = () => { setEditing(null); setForm(emptyForm); setModalOpen(true); };
  const openEdit = (p) => {
    setEditing(p);
    setForm({ name: p.name, category: p.category, price: p.price, discountPrice: p.discountPrice || '', stock: p.stock, images: p.images || [] });
    setModalOpen(true);
  };

  const handleFiles = async (fileList) => {
    const files = Array.from(fileList || []).filter((f) => f.type.startsWith('image/'));
    if (!files.length) return;
    setUploading(true);
    try {
      const newImages = await Promise.all(files.map((f) => fileToCompressedDataUrl(f)));
      setForm((f) => ({ ...f, images: [...f.images, ...newImages] }));
    } catch {
      toast.error('Could not read one of the selected images');
    } finally {
      setUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  const removeImage = (idx) => setForm((f) => ({ ...f, images: f.images.filter((_, i) => i !== idx) }));

  const save = (e) => {
    e.preventDefault();
    if (!form.name || !form.category || !form.price) { toast.error('Fill in name, category and price'); return; }
    const cat = categories.find((c) => c.slug === form.category);
    const payload = {
      name: form.name,
      category: form.category,
      categoryName: cat?.name || form.category,
      price: Number(form.price),
      discountPrice: form.discountPrice ? Number(form.discountPrice) : null,
      stock: Number(form.stock) || 0,
      images: form.images,
      description: editing?.description || 'A quality product curated for the Novara store.',
      specifications: editing?.specifications || { Brand: 'Novara', Category: cat?.name || '', Warranty: '12 Months' },
      brand: editing?.brand || 'Novara',
    };
    if (editing) {
      dispatch(updateProduct({ id: editing.id, ...payload }));
      toast.success('Product updated');
    } else {
      dispatch(addProduct(payload));
      toast.success('Product added');
    }
    setModalOpen(false);
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="font-display text-2xl font-semibold">Product Management</h1>
          <p className="text-sm mt-1" style={{ color: 'var(--text-muted)' }}>{products.length} products</p>
        </div>
        <Button icon={<FiPlus size={15} />} onClick={openAdd}>Add Product</Button>
      </div>

      <DataTable
        searchKeys={['name', 'categoryName']}
        columns={[
          { key: 'image', label: '', render: (r) => <ProductImage src={r.images?.[0]} alt="" className="w-10 h-10 rounded-lg object-cover" iconSize={16} /> },
          { key: 'name', label: 'Name' },
          { key: 'categoryName', label: 'Category' },
          { key: 'price', label: 'Price', render: (r) => `$${r.price.toFixed(2)}` },
          { key: 'stock', label: 'Stock', render: (r) => <StockBadge stock={r.stock} /> },
          { key: 'status', label: 'Status', render: (r) => <span className="text-xs px-2 py-1 rounded-full" style={{ background: 'var(--surface-2)' }}>{r.stock > 0 ? 'Active' : 'Out of stock'}</span> },
        ]}
        data={products}
        actions={(row) => (
          <>
            <button onClick={() => openEdit(row)} className="p-1.5 rounded-lg hover:opacity-70" style={{ background: 'var(--surface-2)' }}><FiEdit2 size={13} /></button>
            <button onClick={() => setConfirmDelete(row)} className="p-1.5 rounded-lg hover:opacity-70" style={{ background: 'var(--surface-2)', color: 'var(--danger)' }}><FiTrash2 size={13} /></button>
          </>
        )}
      />

      <Modal open={modalOpen} onClose={() => setModalOpen(false)} title={editing ? 'Edit Product' : 'Add Product'}>
        <form onSubmit={save}>
          <TextField label="Product name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
          <div className="mb-4">
            <label className="block text-xs font-medium mb-1.5" style={{ color: 'var(--text-muted)' }}>Category</label>
            <select value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} className="w-full px-4 py-2.5 rounded-xl border bg-transparent outline-none text-sm" style={{ borderColor: 'var(--border)', color: 'var(--text)' }}>
              <option value="">Select category</option>
              {categories.map((c) => <option key={c.slug} value={c.slug}>{c.name}</option>)}
            </select>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <TextField label="Price ($)" type="number" step="0.01" value={form.price} onChange={(e) => setForm({ ...form, price: e.target.value })} />
            <TextField label="Discount price ($)" type="number" step="0.01" value={form.discountPrice} onChange={(e) => setForm({ ...form, discountPrice: e.target.value })} />
          </div>
          <TextField label="Stock quantity" type="number" value={form.stock} onChange={(e) => setForm({ ...form, stock: e.target.value })} />

          <div className="mb-4">
            <label className="block text-xs font-medium mb-1.5" style={{ color: 'var(--text-muted)' }}>Product photos (optional)</label>

            {form.images.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-3">
                {form.images.map((src, idx) => (
                  <div key={idx} className="relative w-16 h-16 rounded-lg overflow-hidden group" style={{ background: 'var(--surface-2)' }}>
                    <img src={src} alt="" className="w-full h-full object-cover" />
                    <button
                      type="button"
                      onClick={() => removeImage(idx)}
                      className="absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 group-hover:opacity-100 transition"
                    >
                      <FiX className="text-white" size={16} />
                    </button>
                  </div>
                ))}
              </div>
            )}

            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              multiple
              className="hidden"
              onChange={(e) => handleFiles(e.target.files)}
            />
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              disabled={uploading}
              className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl border border-dashed text-sm font-medium hover:opacity-80 transition disabled:opacity-50"
              style={{ borderColor: 'var(--border)', color: 'var(--text-muted)' }}
            >
              <FiUpload size={15} />
              {uploading ? 'Processing...' : 'Upload from your computer'}
            </button>
            <p className="text-[11px] mt-1.5" style={{ color: 'var(--text-muted)' }}>Leave blank to show an icon instead. You can select multiple photos.</p>
          </div>

          <Button type="submit" className="w-full mt-2">{editing ? 'Save changes' : 'Add product'}</Button>
        </form>
      </Modal>

      <Modal open={!!confirmDelete} onClose={() => setConfirmDelete(null)} title="Delete product?" maxWidth="max-w-sm">
        <p className="text-sm mb-5" style={{ color: 'var(--text-muted)' }}>Are you sure you want to delete "{confirmDelete?.name}"? This can't be undone.</p>
        <div className="flex gap-3">
          <Button variant="danger" className="flex-1" onClick={() => { dispatch(deleteProduct(confirmDelete.id)); toast.success('Product deleted'); setConfirmDelete(null); }}>Delete</Button>
          <Button variant="outline" className="flex-1" onClick={() => setConfirmDelete(null)}>Cancel</Button>
        </div>
      </Modal>
    </div>
  );
}

function StockBadge({ stock }) {
  const color = stock === 0 ? 'var(--danger)' : stock < 10 ? 'var(--brand)' : 'var(--accent)';
  return <span className="font-mono text-xs font-semibold" style={{ color }}>{stock}</span>;
}
