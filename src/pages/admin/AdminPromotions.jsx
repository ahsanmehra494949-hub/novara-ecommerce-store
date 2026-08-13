import { useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import toast from 'react-hot-toast';
import { FiPlus, FiEdit2, FiTrash2, FiTag, FiMove, FiX } from 'react-icons/fi';
import DataTable from '../../components/admin/DataTable';
import Modal from '../../components/common/Modal';
import Button from '../../components/common/Button';
import TextField from '../../components/common/TextField';
import Select from '../../components/common/Select';
import { updateProduct } from '../../redux/slices/catalogSlice';
import { addPromotion, updatePromotion, deletePromotion, togglePromotion } from '../../redux/slices/promotionsSlice';
import { addEvent, updateEvent, deleteEvent, toggleEvent, reorderEvents } from '../../redux/slices/eventsSlice';

const emptyRow = () => ({ productId: '', discountPercent: '' });
const emptyForm = { eventName: '', rows: [emptyRow()] };

function applyDiscount(dispatch, product, percent) {
  const discountPrice = Math.round(product.price * (1 - percent / 100) * 100) / 100;
  dispatch(updateProduct({ id: product.id, discountPrice }));
}
function revertDiscount(dispatch, productId, prevDiscountPrice) {
  dispatch(updateProduct({ id: productId, discountPrice: prevDiscountPrice ?? null }));
}
function revertItems(dispatch, items) {
  (items || []).forEach((it) => revertDiscount(dispatch, it.productId, it.prevDiscountPrice));
}
function applyItems(dispatch, products, items) {
  (items || []).forEach((it) => {
    const product = products.find((p) => p.id === it.productId);
    if (product) applyDiscount(dispatch, product, it.discountPercent);
  });
}

export default function AdminPromotions() {
  const [tab, setTab] = useState('sales'); // 'sales' | 'announcements'
  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="font-display text-2xl font-semibold">Promotions</h1>
          <p className="text-sm mt-1" style={{ color: 'var(--text-muted)' }}>
            Sale events and the announcement bar at the top of the site — all in one place.
          </p>
        </div>
      </div>

      <div className="flex gap-1 mb-6 border-b" style={{ borderColor: 'var(--border)' }}>
        {[
          { key: 'sales', label: 'Sale Promotions' },
          { key: 'announcements', label: 'Announcements' },
        ].map((t) => (
          <button
            key={t.key}
            onClick={() => setTab(t.key)}
            className="px-4 py-2.5 text-sm font-medium border-b-2 -mb-px transition"
            style={tab === t.key
              ? { borderColor: 'var(--brand)', color: 'var(--brand)' }
              : { borderColor: 'transparent', color: 'var(--text-muted)' }}
          >
            {t.label}
          </button>
        ))}
      </div>

      {tab === 'sales' ? <SalesPromotionsPanel /> : <AnnouncementsPanel />}
    </div>
  );
}

function SalesPromotionsPanel() {
  const promotions = useSelector((s) => s.promotions.list);
  const products = useSelector((s) => s.catalog.products);
  const dispatch = useDispatch();
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState(emptyForm);
  const [confirmDelete, setConfirmDelete] = useState(null);

  const openAdd = () => { setEditing(null); setForm(emptyForm); setModalOpen(true); };
  const openEdit = (p) => {
    setEditing(p);
    setForm({
      eventName: p.eventName,
      rows: (p.items && p.items.length ? p.items : [emptyRow()]).map((it) => ({
        productId: String(it.productId), discountPercent: String(it.discountPercent),
      })),
    });
    setModalOpen(true);
  };

  const addRow = () => setForm((f) => ({ ...f, rows: [...f.rows, emptyRow()] }));
  const removeRow = (idx) => setForm((f) => ({ ...f, rows: f.rows.filter((_, i) => i !== idx) }));
  const updateRow = (idx, patch) => setForm((f) => ({
    ...f, rows: f.rows.map((r, i) => (i === idx ? { ...r, ...patch } : r)),
  }));

  const save = (e) => {
    e.preventDefault();
    if (!form.eventName.trim()) { toast.error('Enter an event name'); return; }

    const seenProducts = new Set();
    const items = [];
    for (const row of form.rows) {
      if (!row.productId && !row.discountPercent) continue; // skip fully blank rows
      if (!row.productId) { toast.error('Select a product for every row'); return; }
      const percent = Number(row.discountPercent);
      if (!percent || percent <= 0 || percent >= 100) { toast.error('Each row needs a discount % between 1 and 99'); return; }
      const productId = Number(row.productId);
      if (seenProducts.has(productId)) { toast.error('Each product can only appear once in a promotion'); return; }
      seenProducts.add(productId);
      const product = products.find((p) => p.id === productId);
      if (!product) continue;
      items.push({ productId, discountPercent: percent, product });
    }
    if (items.length === 0) { toast.error('Add at least one product with a discount'); return; }

    if (editing) {

      revertItems(dispatch, editing.items);
      const finalItems = items.map(({ productId, discountPercent, product }) => ({
        productId, discountPercent, prevDiscountPrice: product.discountPrice ?? null,
      }));
      dispatch(updatePromotion({ id: editing.id, eventName: form.eventName.trim(), items: finalItems }));
      if (editing.enabled !== false) applyItems(dispatch, products, finalItems);
      toast.success('Promotion updated');
    } else {
      const finalItems = items.map(({ productId, discountPercent, product }) => ({
        productId, discountPercent, prevDiscountPrice: product.discountPrice ?? null,
      }));
      dispatch(addPromotion({ eventName: form.eventName.trim(), items: finalItems }));
      applyItems(dispatch, products, finalItems);
      toast.success('Promotion added — sale prices are live');
    }
    setModalOpen(false);
  };

  const handleToggle = (promo) => {
    if (promo.enabled) {
      revertItems(dispatch, promo.items);
    } else {
      applyItems(dispatch, products, promo.items);
    }
    dispatch(togglePromotion(promo.id));
  };

  const handleDelete = (promo) => {
    revertItems(dispatch, promo.items);
    dispatch(deletePromotion(promo.id));
    toast.success('Promotion deleted');
    setConfirmDelete(null);
  };

  const rows = promotions.map((p) => {
    const names = (p.items || []).map((it) => {
      const prod = products.find((pr) => pr.id === it.productId);
      return `${prod?.name || 'Unknown'} (-${it.discountPercent}%)`;
    });
    return { ...p, productSummary: names.join(', ') || '—', productCount: (p.items || []).length };
  });

  return (
    <div>
      <div className="flex justify-end mb-4">
        <Button icon={<FiPlus size={15} />} onClick={openAdd}>Add Promotion</Button>
      </div>

      <DataTable
        searchKeys={['eventName', 'productSummary']}
        columns={[
          { key: 'eventName', label: 'Event', render: (r) => (
            <span className="flex items-center gap-1.5 font-medium"><FiTag size={12} style={{ color: 'var(--brand)' }} />{r.eventName}</span>
          ) },
          { key: 'productSummary', label: 'Products', render: (r) => (
            <span className="text-xs" title={r.productSummary}>{r.productCount} product{r.productCount === 1 ? '' : 's'} · <span style={{ color: 'var(--text-muted)' }}>{r.productSummary}</span></span>
          ) },
          { key: 'enabled', label: 'Status', render: (r) => (
            <button onClick={() => handleToggle(r)} className="w-10 h-5.5 rounded-full relative" style={{ background: r.enabled ? 'var(--brand)' : 'var(--border)' }}>
              <span className="absolute top-0.5 w-4.5 h-4.5 rounded-full bg-white transition-transform" style={{ left: r.enabled ? 20 : 2 }} />
            </button>
          ) },
        ]}
        data={rows}
        actions={(row) => (
          <>
            <button onClick={() => openEdit(row)} className="p-1.5 rounded-lg hover:opacity-70" style={{ background: 'var(--surface-2)' }}><FiEdit2 size={13} /></button>
            <button onClick={() => setConfirmDelete(row)} className="p-1.5 rounded-lg hover:opacity-70" style={{ background: 'var(--surface-2)', color: 'var(--danger)' }}><FiTrash2 size={13} /></button>
          </>
        )}
      />
      {promotions.length === 0 && (
        <p className="text-center text-sm py-10" style={{ color: 'var(--text-muted)' }}>No promotions yet.</p>
      )}

      <Modal open={modalOpen} onClose={() => setModalOpen(false)} title={editing ? 'Edit Promotion' : 'Add Promotion'} maxWidth="max-w-lg">
        <form onSubmit={save}>
          <TextField label="Event name" value={form.eventName} onChange={(e) => setForm({ ...form, eventName: e.target.value })} placeholder="e.g. Eid Sale" />

          <label className="block text-xs font-medium mb-1.5" style={{ color: 'var(--text-muted)' }}>Products &amp; discounts</label>
          <div className="space-y-3 mb-3">
            {form.rows.map((row, idx) => (
              <div key={idx} className="flex items-start gap-2 p-3 rounded-xl border" style={{ borderColor: 'var(--border)' }}>
                <div className="flex-1 min-w-0">
                  <Select
                    value={row.productId}
                    onChange={(v) => updateRow(idx, { productId: v })}
                    className="w-full px-3 py-2 rounded-lg text-sm mb-2"
                    placeholder="Select product"
                    options={products.map((p) => ({ value: p.id, label: `${p.name} · $${p.price.toFixed(2)}` }))}
                  />
                  <input
                    type="number" min="1" max="99"
                    value={row.discountPercent}
                    onChange={(e) => updateRow(idx, { discountPercent: e.target.value })}
                    placeholder="Discount % e.g. 40"
                    className="w-full px-3 py-2 rounded-lg border bg-transparent outline-none text-sm"
                    style={{ borderColor: 'var(--border)', color: 'var(--text)' }}
                  />
                </div>
                {form.rows.length > 1 && (
                  <button type="button" onClick={() => removeRow(idx)} className="p-2 rounded-lg hover:opacity-70 shrink-0" style={{ background: 'var(--surface-2)', color: 'var(--danger)' }}>
                    <FiX size={14} />
                  </button>
                )}
              </div>
            ))}
          </div>
          <button type="button" onClick={addRow} className="text-xs font-semibold uppercase tracking-wide mb-4" style={{ color: 'var(--brand)' }}>
            + Add another product
          </button>

          <Button type="submit" className="w-full mt-2">{editing ? 'Save changes' : 'Add promotion'}</Button>
        </form>
      </Modal>

      <Modal open={!!confirmDelete} onClose={() => setConfirmDelete(null)} title="Delete promotion?" maxWidth="max-w-sm">
        <p className="text-sm mb-5" style={{ color: 'var(--text-muted)' }}>
          Are you sure you want to remove "{confirmDelete?.eventName}"? All its products will go back to normal price.
        </p>
        <div className="flex gap-3">
          <Button variant="danger" className="flex-1" onClick={() => handleDelete(confirmDelete)}>Delete</Button>
          <Button variant="outline" className="flex-1" onClick={() => setConfirmDelete(null)}>Cancel</Button>
        </div>
      </Modal>
    </div>
  );
}

function AnnouncementsPanel() {
  const events = useSelector((s) => s.events.list);
  const dispatch = useDispatch();
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState({ text: '' });
  const [confirmDelete, setConfirmDelete] = useState(null);
  const [dragOverId, setDragOverId] = useState(null);
  const [draggingId, setDraggingId] = useState(null);
  const dragId = useRef(null);

  const openAdd = () => { setEditing(null); setForm({ text: '' }); setModalOpen(true); };
  const openEdit = (ev) => { setEditing(ev); setForm({ text: ev.text }); setModalOpen(true); };

  const save = (e) => {
    e.preventDefault();
    if (!form.text.trim()) { toast.error('Enter the announcement text'); return; }
    if (editing) {
      dispatch(updateEvent({ id: editing.id, text: form.text.trim() }));
      toast.success('Announcement updated');
    } else {
      dispatch(addEvent({ text: form.text.trim() }));
      toast.success('Announcement added');
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

    const list = [...events];
    const fromIdx = list.findIndex((ev) => ev.id === sourceId);
    const toIdx = list.findIndex((ev) => ev.id === targetId);
    if (fromIdx === -1 || toIdx === -1) return;

    const [moved] = list.splice(fromIdx, 1);
    list.splice(toIdx, 0, moved);
    dispatch(reorderEvents(list));
    toast.success('Order updated');
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <p className="text-sm" style={{ color: 'var(--text-muted)' }}>
          Controls the scrolling announcement line at the very top of the site · drag to reorder
        </p>
        <Button icon={<FiPlus size={15} />} onClick={openAdd}>Add Announcement</Button>
      </div>

      <div className="rounded-2xl border overflow-hidden" style={{ borderColor: 'var(--border)', background: 'var(--surface)' }}>
        {events.map((ev) => (
          <div
            key={ev.id}
            draggable
            onDragStart={() => handleDragStart(ev.id)}
            onDragOver={(e) => handleDragOver(e, ev.id)}
            onDrop={(e) => handleDrop(e, ev.id)}
            onDragEnd={handleDragEnd}
            className="flex items-center gap-3 px-4 py-3 border-t first:border-t-0 cursor-grab active:cursor-grabbing"
            style={{
              borderColor: 'var(--border)',
              background: dragOverId === ev.id ? 'var(--surface-2)' : 'transparent',
              opacity: draggingId === ev.id ? 0.5 : 1,
            }}
          >
            <FiMove size={15} style={{ color: 'var(--text-muted)' }} />
            <span className={`font-medium flex-1 min-w-0 truncate ${!ev.enabled ? 'opacity-40' : ''}`}>{ev.text}</span>
            <button
              onClick={() => dispatch(toggleEvent(ev.id))}
              className="w-10 h-5.5 rounded-full relative shrink-0"
              style={{ background: ev.enabled ? 'var(--brand)' : 'var(--border)' }}
              title={ev.enabled ? 'Showing on site' : 'Hidden'}
            >
              <span className="absolute top-0.5 w-4.5 h-4.5 rounded-full bg-white transition-transform" style={{ left: ev.enabled ? 20 : 2 }} />
            </button>
            <div className="flex gap-2 shrink-0">
              <button onClick={() => openEdit(ev)} className="p-1.5 rounded-lg hover:opacity-70" style={{ background: 'var(--surface-2)' }}><FiEdit2 size={13} /></button>
              <button onClick={() => setConfirmDelete(ev)} className="p-1.5 rounded-lg hover:opacity-70" style={{ background: 'var(--surface-2)', color: 'var(--danger)' }}><FiTrash2 size={13} /></button>
            </div>
          </div>
        ))}
        {events.length === 0 && (
          <div className="px-4 py-10 text-center text-sm" style={{ color: 'var(--text-muted)' }}>No announcements yet — the top bar will be hidden.</div>
        )}
      </div>

      <Modal open={modalOpen} onClose={() => setModalOpen(false)} title={editing ? 'Edit Announcement' : 'Add Announcement'} maxWidth="max-w-sm">
        <form onSubmit={save}>
          <TextField label="Announcement text" value={form.text} onChange={(e) => setForm({ text: e.target.value })} placeholder="e.g. Free shipping on orders over $50" />
          <Button type="submit" className="w-full mt-2">{editing ? 'Save changes' : 'Add announcement'}</Button>
        </form>
      </Modal>

      <Modal open={!!confirmDelete} onClose={() => setConfirmDelete(null)} title="Delete announcement?" maxWidth="max-w-sm">
        <p className="text-sm mb-5" style={{ color: 'var(--text-muted)' }}>Are you sure you want to remove "{confirmDelete?.text}" from the top bar?</p>
        <div className="flex gap-3">
          <Button variant="danger" className="flex-1" onClick={() => { dispatch(deleteEvent(confirmDelete.id)); toast.success('Announcement deleted'); setConfirmDelete(null); }}>Delete</Button>
          <Button variant="outline" className="flex-1" onClick={() => setConfirmDelete(null)}>Cancel</Button>
        </div>
      </Modal>
    </div>
  );
}
