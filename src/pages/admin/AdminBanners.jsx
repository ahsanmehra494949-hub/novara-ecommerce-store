import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import toast from 'react-hot-toast';
import { FiPlus, FiEdit2, FiTrash2 } from 'react-icons/fi';
import DataTable from '../../components/admin/DataTable';
import Modal from '../../components/common/Modal';
import Button from '../../components/common/Button';
import TextField from '../../components/common/TextField';
import ImageUploadField from '../../components/common/ImageUploadField';
import { addBanner, updateBanner, deleteBanner, toggleBanner } from '../../redux/slices/bannersSlice';

const emptyForm = { title: '', subtitle: '', cta: '', image: '' };

export default function AdminBanners() {
  const banners = useSelector((s) => s.banners.list);
  const dispatch = useDispatch();
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState(emptyForm);
  const [confirmDelete, setConfirmDelete] = useState(null);

  const openAdd = () => { setEditing(null); setForm(emptyForm); setModalOpen(true); };
  const openEdit = (b) => { setEditing(b); setForm({ title: b.title, subtitle: b.subtitle, cta: b.cta, image: b.image }); setModalOpen(true); };

  const save = (e) => {
    e.preventDefault();
    if (!form.title) { toast.error('Enter a banner title'); return; }
    if (!form.image) { toast.error('Upload a banner image'); return; }
    const payload = { ...form };
    if (editing) {
      dispatch(updateBanner({ id: editing.id, ...payload }));
      toast.success('Banner updated');
    } else {
      dispatch(addBanner(payload));
      toast.success('Banner added');
    }
    setModalOpen(false);
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="font-display text-2xl font-semibold">Banner Management</h1>
          <p className="text-sm mt-1" style={{ color: 'var(--text-muted)' }}>{banners.length} banners</p>
        </div>
        <Button icon={<FiPlus size={15} />} onClick={openAdd}>Add Banner</Button>
      </div>

      <DataTable
        searchKeys={['title']}
        columns={[
          { key: 'image', label: '', render: (r) => <img src={r.image} alt="" className="w-16 h-10 rounded-lg object-cover" /> },
          { key: 'title', label: 'Title' },
          { key: 'subtitle', label: 'Subtitle' },
          { key: 'enabled', label: 'Status', render: (r) => (
            <button onClick={() => dispatch(toggleBanner(r.id))} className="w-10 h-5.5 rounded-full relative" style={{ background: r.enabled ? 'var(--brand)' : 'var(--border)' }}>
              <span className="absolute top-0.5 w-4.5 h-4.5 rounded-full bg-white transition-transform" style={{ left: r.enabled ? 20 : 2 }} />
            </button>
          ) },
        ]}
        data={banners}
        actions={(row) => (
          <>
            <button onClick={() => openEdit(row)} className="p-1.5 rounded-lg hover:opacity-70" style={{ background: 'var(--surface-2)' }}><FiEdit2 size={13} /></button>
            <button onClick={() => setConfirmDelete(row)} className="p-1.5 rounded-lg hover:opacity-70" style={{ background: 'var(--surface-2)', color: 'var(--danger)' }}><FiTrash2 size={13} /></button>
          </>
        )}
      />

      <Modal open={modalOpen} onClose={() => setModalOpen(false)} title={editing ? 'Edit Banner' : 'Add Banner'}>
        <form onSubmit={save}>
          <TextField label="Title" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} />
          <TextField label="Subtitle" value={form.subtitle} onChange={(e) => setForm({ ...form, subtitle: e.target.value })} />
          <TextField label="Button text" value={form.cta} onChange={(e) => setForm({ ...form, cta: e.target.value })} placeholder="Shop now" />
          <ImageUploadField
            label="Banner image"
            value={form.image}
            onChange={(image) => setForm({ ...form, image })}
            hint="Uploaded from your device."
          />
          <Button type="submit" className="w-full mt-2">{editing ? 'Save changes' : 'Add banner'}</Button>
        </form>
      </Modal>

      <Modal open={!!confirmDelete} onClose={() => setConfirmDelete(null)} title="Delete banner?" maxWidth="max-w-sm">
        <p className="text-sm mb-5" style={{ color: 'var(--text-muted)' }}>Are you sure you want to delete "{confirmDelete?.title}"?</p>
        <div className="flex gap-3">
          <Button variant="danger" className="flex-1" onClick={() => { dispatch(deleteBanner(confirmDelete.id)); toast.success('Banner deleted'); setConfirmDelete(null); }}>Delete</Button>
          <Button variant="outline" className="flex-1" onClick={() => setConfirmDelete(null)}>Cancel</Button>
        </div>
      </Modal>
    </div>
  );
}
