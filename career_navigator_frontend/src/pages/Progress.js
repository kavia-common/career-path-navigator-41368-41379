import React, { useEffect, useState } from 'react';
import { apiClient } from '../api/client';

// PUBLIC_INTERFACE
export default function Progress() {
  /** Protected page: track progress entries */
  const [items, setItems] = useState([]);
  const [form, setForm] = useState({ competency: '', level: 'P', evidence_url: '' });
  const [err, setErr] = useState(null);
  const [busy, setBusy] = useState(false);

  const load = async () => {
    try {
      setErr(null);
      const res = await apiClient.listProgress();
      setItems(res || []);
    } catch (e) {
      setErr(e.message || 'Failed to load progress');
    }
  };

  useEffect(() => {
    load();
  }, []);

  const add = async (e) => {
    e.preventDefault();
    setBusy(true);
    try {
      await apiClient.addProgress({
        competency: form.competency,
        level: form.level,
        evidence_url: form.evidence_url || null,
      });
      setForm({ competency: '', level: 'P', evidence_url: '' });
      await load();
    } catch (e) {
      setErr(e?.data?.detail || e.message || 'Failed to add progress');
    } finally {
      setBusy(false);
    }
  };

  return (
    <div>
      <h1 className="title">Progress</h1>
      {err && <div className="error" role="alert">{err}</div>}
      <form onSubmit={add} className="form inline">
        <input required placeholder="Competency" value={form.competency} onChange={(e) => setForm({ ...form, competency: e.target.value })} />
        <select value={form.level} onChange={(e) => setForm({ ...form, level: e.target.value })} aria-label="Level">
          <option value="P">P</option>
          <option value="A">A</option>
          <option value="E">E</option>
        </select>
        <input placeholder="Evidence URL (optional)" value={form.evidence_url} onChange={(e) => setForm({ ...form, evidence_url: e.target.value })} />
        <button className="btn primary" type="submit" disabled={busy}>{busy ? 'Adding…' : 'Add'}</button>
      </form>
      <ul className="list">
        {items.map((p) => (
          <li key={p.id} className="list-item">
            <strong>{p.competency}</strong> — <em>{p.level}</em>
            {p.evidence_url ? (
              <span> • <a className="link" href={p.evidence_url} target="_blank" rel="noreferrer">evidence</a></span>
            ) : null}
          </li>
        ))}
      </ul>
    </div>
  );
}
