import React, { useEffect, useState } from 'react';
import { apiClient } from '../api/client';

// PUBLIC_INTERFACE
export default function Resources() {
  /** List learning/reference resources */
  const [items, setItems] = useState([]);
  const [err, setErr] = useState(null);

  useEffect(() => {
    apiClient.listResources().then(setItems).catch((e) => setErr(e.message || 'Failed to load'));
  }, []);

  return (
    <div>
      <h1 className="title">Resources</h1>
      {err && <div className="error" role="alert">{err}</div>}
      <ul className="list">
        {items.map((r) => (
          <li key={r.id} className="list-item">
            {r.url ? <a className="link" href={r.url} target="_blank" rel="noreferrer">{r.title}</a> : r.title}
            {r.tags?.length ? <span className="pill">{r.tags.join(', ')}</span> : null}
          </li>
        ))}
      </ul>
    </div>
  );
}
