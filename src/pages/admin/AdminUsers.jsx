import { useDispatch, useSelector } from 'react-redux';
import toast from 'react-hot-toast';
import { useState } from 'react';
import { FiLock, FiUnlock, FiTrash2, FiEdit2 } from 'react-icons/fi';
import DataTable from '../../components/admin/DataTable';
import Modal from '../../components/common/Modal';
import Button from '../../components/common/Button';
import TextField from '../../components/common/TextField';
import { toggleBlockUser, deleteUser, updateUser } from '../../redux/slices/usersSlice';

export default function AdminUsers() {
  const users = useSelector((s) => s.users.list);
  const dispatch = useDispatch();
  const [confirmDelete, setConfirmDelete] = useState(null);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState({ name: '', email: '', role: 'customer' });

  const openEdit = (user) => {
    setEditing(user);
    setForm({ name: user.name, email: user.email, role: user.role });
  };

  const saveEdit = (e) => {
    e.preventDefault();
    dispatch(updateUser({ id: editing.id, ...form }));
    toast.success('User updated');
    setEditing(null);
  };

  return (
    <div>
      <div className="mb-6">
        <h1 className="font-display text-2xl font-semibold">User Management</h1>
        <p className="text-sm mt-1" style={{ color: 'var(--text-muted)' }}>{users.length} registered users</p>
      </div>

      <DataTable
        searchKeys={['name', 'email']}
        columns={[
          { key: 'name', label: 'Name' },
          { key: 'email', label: 'Email' },
          { key: 'role', label: 'Role', render: (r) => <span className="capitalize text-xs px-2 py-1 rounded-full" style={{ background: 'var(--surface-2)' }}>{r.role}</span> },
          { key: 'joined', label: 'Joined' },
          { key: 'status', label: 'Status', render: (r) => (
            <span className="text-xs font-medium px-2 py-1 rounded-full" style={{ color: r.status === 'active' ? 'var(--accent)' : 'var(--danger)', background: 'var(--surface-2)' }}>{r.status}</span>
          ) },
        ]}
        data={users}
        actions={(row) => (
          <>
            <button onClick={() => openEdit(row)} className="p-1.5 rounded-lg hover:opacity-70" style={{ background: 'var(--surface-2)' }} aria-label="Edit user">
              <FiEdit2 size={13} />
            </button>
            <button onClick={() => dispatch(toggleBlockUser(row.id))} className="p-1.5 rounded-lg hover:opacity-70" style={{ background: 'var(--surface-2)' }} aria-label="Block or unblock user">
              {row.status === 'active' ? <FiLock size={13} /> : <FiUnlock size={13} />}
            </button>
            <button onClick={() => setConfirmDelete(row)} className="p-1.5 rounded-lg hover:opacity-70" style={{ background: 'var(--surface-2)', color: 'var(--danger)' }} aria-label="Delete user"><FiTrash2 size={13} /></button>
          </>
        )}
      />

      <Modal open={!!editing} onClose={() => setEditing(null)} title="Edit User" maxWidth="max-w-sm">
        <form onSubmit={saveEdit}>
          <TextField label="Full name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required />
          <TextField label="Email address" type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} required />
          <label className="block text-xs font-medium mb-1.5" style={{ color: 'var(--text-muted)' }}>Role</label>
          <select
            value={form.role}
            onChange={(e) => setForm({ ...form, role: e.target.value })}
            className="w-full px-4 py-2.5 rounded-xl border bg-transparent outline-none text-sm mb-4"
            style={{ borderColor: 'var(--border)', color: 'var(--text)' }}
          >
            <option value="customer" style={{ color: '#000' }}>Customer</option>
            <option value="admin" style={{ color: '#000' }}>Admin</option>
          </select>
          <Button type="submit" className="w-full">Save changes</Button>
        </form>
      </Modal>

      <Modal open={!!confirmDelete} onClose={() => setConfirmDelete(null)} title="Delete user?" maxWidth="max-w-sm">
        <p className="text-sm mb-5" style={{ color: 'var(--text-muted)' }}>Are you sure you want to delete "{confirmDelete?.name}"?</p>
        <div className="flex gap-3">
          <Button variant="danger" className="flex-1" onClick={() => { dispatch(deleteUser(confirmDelete.id)); toast.success('User deleted'); setConfirmDelete(null); }}>Delete</Button>
          <Button variant="outline" className="flex-1" onClick={() => setConfirmDelete(null)}>Cancel</Button>
        </div>
      </Modal>
    </div>
  );
}
