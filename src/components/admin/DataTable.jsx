import { useState } from 'react';
import { FiSearch } from 'react-icons/fi';

export default function DataTable({ columns, data, searchKeys = [], actions, emptyText = 'No records found.' }) {
  const [query, setQuery] = useState('');

  const filtered = query
    ? data.filter((row) => searchKeys.some((k) => String(row[k] ?? '').toLowerCase().includes(query.toLowerCase())))
    : data;

  return (
    <div className="rounded-2xl border overflow-hidden" style={{ borderColor: 'var(--border)', background: 'var(--surface)' }}>
      <div className="p-4 border-b flex items-center gap-2" style={{ borderColor: 'var(--border)' }}>
        <div className="flex items-center gap-2 px-3 py-2 rounded-full border w-full max-w-xs" style={{ borderColor: 'var(--border)' }}>
          <FiSearch size={14} style={{ color: 'var(--text-muted)' }} />
          <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search..." className="bg-transparent outline-none text-sm w-full" />
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left" style={{ background: 'var(--surface-2)' }}>
              {columns.map((c) => <th key={c.key} className="px-4 py-3 font-medium whitespace-nowrap">{c.label}</th>)}
              {actions && <th className="px-4 py-3 font-medium text-right">Actions</th>}
            </tr>
          </thead>
          <tbody>
            {filtered.map((row, i) => (
              <tr key={row.id ?? i} className="border-t" style={{ borderColor: 'var(--border)' }}>
                {columns.map((c) => (
                  <td key={c.key} className="px-4 py-3 whitespace-nowrap">{c.render ? c.render(row) : row[c.key]}</td>
                ))}
                {actions && <td className="px-4 py-3 text-right"><div className="flex justify-end gap-2">{actions(row)}</div></td>}
              </tr>
            ))}
            {filtered.length === 0 && (
              <tr><td colSpan={columns.length + 1} className="px-4 py-10 text-center" style={{ color: 'var(--text-muted)' }}>{emptyText}</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
