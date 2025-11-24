import React, { useEffect, useState } from 'react';
import { apiClient } from '../api/client';

// PUBLIC_INTERFACE
export default function Jobs() {
  /** Protected page: list and add job applications */
  const [items, setItems] = useState([]);
  const [form, setForm] = useState({ title: '', company: '', status: 'applied', notes: '' });
  const [err, setErr] = useState(null);
  const [busy, setBusy] = useState(false);

  const load = async () => {
    try {
      setErr(null);
      const res = await apiClient.listJobs();
      setItems(res || []);
    } catch (e) {
      setErr(e.message || 'Failed to load jobs');
    }
  };

  useEffect(() => {
    load();
  }, []);

  const add = async (e) => {
    e.preventDefault();
    setBusy(true);
    try {
      await apiClient.addJob({
        title: form.title,
        company: form.company,
        status: form.status,
        notes: form.notes || null
      });
      setForm({ title: '', company: '', status: 'applied', notes: '' });
      await load();
    } catch (e) {
      setErr(e?.data?.detail || e.message || 'Failed to add job');
    } finally {
      setBusy(false);
    }
  };

  return (
    <div>
      <h1 className="title">Job Tracking</h1>
      {err && <div className="error" role="alert">{err}</div>}
      <form onSubmit={add} className="form inline">
        <input required placeholder="Job title" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} />
        <input required placeholder="Company" value={form.company} onChange={(e) => setForm({ ...form, company: e.target.value })} />
        <select value={form.status} onChange={(e) => setForm({ ...form, status: e.target.value })} aria-label="Status">
          <option value="applied">applied</option>
          <option value="interview">interview</option>
          <option value="offer">offer</option>
          <option value="rejected">rejected</option>
        </select>
        <input placeholder="Notes (optional)" value={form.notes} onChange={(e) => setForm({ ...form, notes: e.target.value })} />
        <button className="btn primary" type="submit" disabled={busy}>{busy ? 'Adding…' : 'Add'}</button>
      </form>
      <ul className="list">
        {items.map((j) => (
          <li key={j.id} className="list-item">
            <strong>{j.title}</strong> at {j.company} — <em>{j.status}</em>
            {j.notes ? <p className="muted">{j.notes}</p> : null}
          </li>
        ))}
      </ul>
    </div>
  );
}
