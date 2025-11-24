import React, { useEffect, useState } from 'react';
import { apiClient } from '../api/client';

// PUBLIC_INTERFACE
export default function Recommendations() {
  /** Display role recommendations for Chief Architect */
  const [minOverlap, setMinOverlap] = useState(55);
  const [items, setItems] = useState([]);
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState(null);

  const load = async () => {
    setBusy(true);
    setErr(null);
    try {
      const res = await apiClient.recommendationsForCA({ min_overlap: minOverlap, limit: 10 });
      setItems(res || []);
    } catch (e) {
      setErr(e.message || 'Failed to load recommendations');
    } finally {
      setBusy(false);
    }
  };

  useEffect(() => {
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <h1 className="title">Recommendations</h1>
      <div className="toolbar">
        <label>
          Min overlap %
          <input
            type="number"
            min={0}
            max={100}
            value={minOverlap}
            onChange={(e) => setMinOverlap(Number(e.target.value))}
            aria-label="Minimum overlap percent"
          />
        </label>
        <button className="btn primary" onClick={load} disabled={busy}>Apply</button>
      </div>
      {err && <div role="alert" className="error">{err}</div>}
      <div className="card-grid">
        {items.map((it, idx) => (
          <div className="card" key={idx}>
            <h2>{it.role}</h2>
            <p>Overlap: <strong>{it.overlap_pct}%</strong></p>
            <p>Score: <strong>{it.score}</strong></p>
            {it.resources?.length ? (
              <details>
                <summary className="summary">Resources</summary>
                <ul className="list">
                  {it.resources.map((r, i) => (
                    <li key={i} className="list-item">
                      {r.url ? <a className="link" href={r.url} target="_blank" rel="noreferrer">{r.title}</a> : r.title}
                      {r.tags?.length ? <span className="pill">{r.tags.join(', ')}</span> : null}
                    </li>
                  ))}
                </ul>
              </details>
            ) : null}
          </div>
        ))}
      </div>
    </div>
  );
}
