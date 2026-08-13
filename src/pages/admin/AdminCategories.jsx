import { useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import toast from 'react-hot-toast';
import { FiPlus, FiEdit2, FiTrash2, FiMove } from 'react-icons/fi';
import CategoryIcon from '../../components/common/CategoryIcon';
import Modal from '../../components/common/Modal';
import Button from '../../components/common/Button';
import TextField from '../../components/common/TextField';
import ImageUploadField from '../../components/common/ImageUploadField';
import suggestIcon from '../../components/common/iconSuggest';
import { addCategory, updateCategory, deleteCategory, reorderCategories } from '../../redux/slices/catalogSlice';

const emptyForm = { name: '', icon: '', image: '' };

export default function AdminCategories() {
  const categories = useSelector((s) => s.catalog.categories);
  const products = useSelector((s) => s.catalog.products);
  const dispatch = useDispatch();
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState(emptyForm);
  const [iconTouched, setIconTouched] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(null);
  const [dragOverId, setDragOverId] = useState(null);
  const [draggingId, setDraggingId] = useState(null);
  const dragId = useRef(null);

  const openAdd = () => { setEditing(null); setForm(emptyForm); setIconTouched(false); setModalOpen(true); };
  const openEdit = (c) => { setEditing(c); setForm({ name: c.name, icon: c.icon, image: c.image || '' }); setIconTouched(true); setModalOpen(true); };

  const handleNameChange = (name) => {
    setForm((f) => ({ ...f, name, icon: iconTouched ? f.icon : suggestIcon(name) }));
  };

  const save = (e) => {
    e.preventDefault();
    if (!form.name) { toast.error('Enter a category name'); return; }
    const slug = form.name.toLowerCase().replace(/\s+/g, '-');
    const payload = { name: form.name, slug: editing?.slug || slug, icon: form.icon || suggestIcon(form.name), image: form.image || '' };
    if (editing) {
      dispatch(updateCategory({ id: editing.id, ...payload }));
      toast.success('Category updated');
    } else {
      dispatch(addCategory(payload));
      toast.success('Category added');
    }
    setModalOpen(false);
  };

  const handleDragStart = (id) => { dragId.current = id; setDraggingId(id); };
  const handleDragOver = (e, id) => { e.preventDefault(); setDragOverId(id); };
  const handleDragEnd = () => { setDragOverId(null); setDraggingId(null); };

  const handleDrop = (e, targetId) => {
    e.preventDefault();
    setDragOverId(null);
    setDraggingId(null);
    const sourceId = dragId.current;
    dragId.current = null;
    if (sourceId == null || sourceId === targetId) return;

    const list = [...categories];
    const fromIdx = list.findIndex((c) => c.id === sourceId);
    const toIdx = list.findIndex((c) => c.id === targetId);
    if (fromIdx === -1 || toIdx === -1) return;

    const [moved] = list.splice(fromIdx, 1);
    list.splice(toIdx, 0, moved);
    dispatch(reorderCategories(list));
    toast.success('Category order updated');
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="font-display text-2xl font-semibold">Category Management</h1>
          <p className="text-sm mt-1" style={{ color: 'var(--text-muted)' }}>
            {categories.length} categories · drag to reorder
          </p>
        </div>
        <Button icon={<FiPlus size={15} />} onClick={openAdd}>Add Category</Button>
      </div>

      <div className="rounded-2xl border overflow-hidden" style={{ borderColor: 'var(--border)', background: 'var(--surface)' }}>
        {categories.map((c) => (
          <div
            key={c.id}
            draggable
            onDragStart={() => handleDragStart(c.id)}
            onDragOver={(e) => handleDragOver(e, c.id)}
            onDrop={(e) => handleDrop(e, c.id)}
            onDragEnd={handleDragEnd}
            className="flex items-center gap-3 px-4 py-3 border-t first:border-t-0 cursor-grab active:cursor-grabbing"
            style={{
              borderColor: 'var(--border)',
              background: dragOverId === c.id ? 'var(--surface-2)' : 'transparent',
              opacity: draggingId === c.id ? 0.5 : 1,
            }}
          >
            <FiMove size={15} style={{ color: 'var(--text-muted)' }} />
            <div className="w-10 h-10 rounded-full flex items-center justify-center shrink-0" style={{ background: 'var(--surface-2)' }}>
              <CategoryIcon slug={c.slug} fallback={c.icon || '🏷️'} size={18} style={{ color: 'var(--brand)' }} />
            </div>
            <span className="font-medium flex-1 min-w-0 truncate">{c.name}</span>
            <span className="text-xs shrink-0 hidden sm:inline" style={{ color: 'var(--text-muted)' }}>
              {products.filter((p) => p.category === c.slug).length} products
            </span>
            <div className="flex gap-2 shrink-0">
              <button onClick={() => openEdit(c)} className="p-1.5 rounded-lg hover:opacity-70" style={{ background: 'var(--surface-2)' }}><FiEdit2 size={13} /></button>
              <button onClick={() => setConfirmDelete(c)} className="p-1.5 rounded-lg hover:opacity-70" style={{ background: 'var(--surface-2)', color: 'var(--danger)' }}><FiTrash2 size={13} /></button>
            </div>
          </div>
        ))}
        {categories.length === 0 && (
          <div className="px-4 py-10 text-center text-sm" style={{ color: 'var(--text-muted)' }}>No categories yet.</div>
        )}
      </div>

      <Modal open={modalOpen} onClose={() => setModalOpen(false)} title={editing ? 'Edit Category' : 'Add Category'} maxWidth="max-w-sm">
        <form onSubmit={save}>
          <TextField label="Category name" value={form.name} onChange={(e) => handleNameChange(e.target.value)} />
          <TextField
            label="Icon (emoji)"
            value={form.icon}
            onChange={(e) => { setIconTouched(true); setForm({ ...form, icon: e.target.value }); }}
            placeholder="🎧"
          />
          <p className="text-[11px] -mt-3 mb-4" style={{ color: 'var(--text-muted)' }}>Auto-filled from the name — edit if you'd like something else.</p>
          <ImageUploadField
            label="Category photo (optional)"
            value={form.image}
            onChange={(image) => setForm({ ...form, image })}
            aspect="aspect-square"
            round
            hint="Used on the homepage category circles. Leave blank to just use the icon."
          />
          <Button type="submit" className="w-full mt-2">{editing ? 'Save changes' : 'Add category'}</Button>
        </form>
      </Modal>

      <Modal open={!!confirmDelete} onClose={() => setConfirmDelete(null)} title="Delete category?" maxWidth="max-w-sm">
        <p className="text-sm mb-5" style={{ color: 'var(--text-muted)' }}>Are you sure you want to delete "{confirmDelete?.name}"?</p>
        <div className="flex gap-3">
          <Button variant="danger" className="flex-1" onClick={() => { dispatch(deleteCategory(confirmDelete.id)); toast.success('Category deleted'); setConfirmDelete(null); }}>Delete</Button>
          <Button variant="outline" className="flex-1" onClick={() => setConfirmDelete(null)}>Cancel</Button>
        </div>
      </Modal>
    </div>
  );
}
