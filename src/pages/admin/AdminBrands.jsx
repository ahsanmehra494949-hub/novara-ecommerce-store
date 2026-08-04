import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import toast from 'react-hot-toast';
import { FiPlus, FiEdit2, FiTrash2 } from 'react-icons/fi';
import Modal from '../../components/common/Modal';
import Button from '../../components/common/Button';
import TextField from '../../components/common/TextField';
import ImageUploadField from '../../components/common/ImageUploadField';
import { addBrand, updateBrand, deleteBrand, toggleBrand } from '../../redux/slices/brandsSlice';

const emptyForm = { name: '', logo: '' };

export default function AdminBrands() {
  const brands = useSelector((s) => s.brands.list);
  const dispatch = useDispatch();
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState(emptyForm);
  const [confirmDelete, setConfirmDelete] = useState(null);

  const openAdd = () => { setEditing(null); setForm(emptyForm); setModalOpen(true); };
  const openEdit = (b) => { setEditing(b); setForm({ name: b.name, logo: b.logo || '' }); setModalOpen(true); };

  const save = (e) => {
    e.preventDefault();
    if (!form.name.trim()) { toast.error('Enter a brand name'); return; }
    const payload = { name: form.name.trim(), logo: form.logo };
    if (editing) {
      dispatch(updateBrand({ id: editing.id, ...payload }));
      toast.success('Brand updated');
    } else {
      dispatch(addBrand(payload));
      toast.success('Brand added');
    }
    setModalOpen(false);
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="font-display text-2xl font-semibold">Brand Management</h1>
          <p className="text-sm mt-1" style={{ color: 'var(--text-muted)' }}>
            {brands.length} brands · shown in "Featured Brands" on the homepage
          </p>
        </div>
        <Button icon={<FiPlus size={15} />} onClick={openAdd}>Add Brand</Button>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {brands.map((b) => (
          <div key={b.id} className="rounded-2xl border p-4 flex items-center gap-4" style={{ borderColor: 'var(--border)', background: 'var(--surface)' }}>
            <div className="w-16 h-16 rounded-xl flex items-center justify-center shrink-0 overflow-hidden" style={{ background: 'var(--surface-2)' }}>
              {b.logo ? (
                <img src={b.logo} alt={b.name} className="w-full h-full object-contain p-1.5" />
              ) : (
                <span className="font-display font-semibold text-sm text-center px-1">{b.name}</span>
              )}
            </div>
            <div className="min-w-0 flex-1">
              <p className="font-medium truncate">{b.name}</p>
              <button
                onClick={() => dispatch(toggleBrand(b.id))}
                className="mt-1.5 inline-flex items-center gap-2 text-xs"
                style={{ color: 'var(--text-muted)' }}
              >
                <span className="w-8 h-4.5 rounded-full relative" style={{ background: b.enabled !== false ? 'var(--brand)' : 'var(--border)' }}>
                  <span className="absolute top-0.5 w-3.5 h-3.5 rounded-full bg-white transition-transform" style={{ left: b.enabled !== false ? 16 : 2 }} />
                </span>
                {b.enabled !== false ? 'Visible' : 'Hidden'}
              </button>
            </div>
            <div className="flex flex-col gap-2 shrink-0">
              <button onClick={() => openEdit(b)} className="p-1.5 rounded-lg hover:opacity-70" style={{ background: 'var(--surface-2)' }}><FiEdit2 size={13} /></button>
              <button onClick={() => setConfirmDelete(b)} className="p-1.5 rounded-lg hover:opacity-70" style={{ background: 'var(--surface-2)', color: 'var(--danger)' }}><FiTrash2 size={13} /></button>
            </div>
          </div>
        ))}
        {brands.length === 0 && (
          <div className="col-span-full rounded-2xl border border-dashed p-10 text-center text-sm" style={{ borderColor: 'var(--border)', color: 'var(--text-muted)' }}>
            No brands yet. Add one to feature it on the homepage.
          </div>
        )}
      </div>

      <Modal open={modalOpen} onClose={() => setModalOpen(false)} title={editing ? 'Edit Brand' : 'Add Brand'} maxWidth="max-w-sm">
        <form onSubmit={save}>
          <TextField label="Brand name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="e.g. Auralite" />
          <ImageUploadField
            label="Brand logo (optional)"
            value={form.logo}
            onChange={(logo) => setForm({ ...form, logo })}
            hint="Leave blank to show the brand name as text instead."
          />
          <Button type="submit" className="w-full mt-2">{editing ? 'Save changes' : 'Add brand'}</Button>
        </form>
      </Modal>

      <Modal open={!!confirmDelete} onClose={() => setConfirmDelete(null)} title="Delete brand?" maxWidth="max-w-sm">
        <p className="text-sm mb-5" style={{ color: 'var(--text-muted)' }}>Are you sure you want to delete "{confirmDelete?.name}"?</p>
        <div className="flex gap-3">
          <Button variant="danger" className="flex-1" onClick={() => { dispatch(deleteBrand(confirmDelete.id)); toast.success('Brand deleted'); setConfirmDelete(null); }}>Delete</Button>
          <Button variant="outline" className="flex-1" onClick={() => setConfirmDelete(null)}>Cancel</Button>
        </div>
      </Modal>
    </div>
  );
}
