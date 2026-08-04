import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import toast from 'react-hot-toast';
import DataTable from '../../components/admin/DataTable';
import Select from '../../components/common/Select';
import { updateOrderStatus } from '../../redux/slices/ordersSlice';

const statuses = ['Pending', 'Processing', 'Completed', 'Cancelled'];

export default function AdminOrders() {
  const orders = useSelector((s) => s.orders.list);
  const dispatch = useDispatch();
  const [tab, setTab] = useState('Pending');

  const filtered = tab === 'All' ? orders : orders.filter((o) => o.status === tab);

  const changeStatus = (id, status) => {
    dispatch(updateOrderStatus({ id, status }));
    toast.success(`Order marked as ${status}`);
  };

  return (
    <div>
      <div className="mb-6">
        <h1 className="font-display text-2xl font-semibold">Order Management</h1>
        <p className="text-sm mt-1" style={{ color: 'var(--text-muted)' }}>{orders.length} total orders</p>
      </div>

      <div className="mb-4">
        <label className="text-xs font-medium mb-1.5 block" style={{ color: 'var(--text-muted)' }}>Filter by status</label>
        <Select
          value={tab}
          onChange={(v) => setTab(v)}
          className="px-4 py-2 rounded-full text-sm font-medium w-full max-w-[220px]"
          options={['All', ...statuses].map((s) => ({ value: s, label: s }))}
        />
      </div>

      <DataTable
        searchKeys={['id', 'customer']}
        columns={[
          { key: 'id', label: 'Order ID', render: (r) => <span className="font-mono">{r.id}</span> },
          { key: 'customer', label: 'Customer' },
          { key: 'date', label: 'Date' },
          { key: 'items', label: 'Items' },
          { key: 'total', label: 'Total', render: (r) => `$${r.total.toFixed(2)}` },
          { key: 'status', label: 'Status', render: (r) => (
            <Select
              value={r.status}
              onChange={(v) => changeStatus(r.id, v)}
              className="px-2 py-1 rounded-lg text-xs"
              options={statuses.map((s) => ({ value: s, label: s }))}
            />
          ) },
        ]}
        data={filtered}
      />
    </div>
  );
}
