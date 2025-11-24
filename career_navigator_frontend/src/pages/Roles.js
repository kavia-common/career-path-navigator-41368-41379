import React, { useEffect, useState } from 'react';
import { apiClient } from '../api/client';

// PUBLIC_INTERFACE
export default function Roles() {
  /** Display list of canonical roles from backend */
  const [roles, setRoles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    apiClient.listRoles().then(setRoles).catch(() => setRoles([])).finally(() => setLoading(false));
  }, []);

  if (loading) return <div className="loading" role="status">Loading roles…</div>;

  return (
    <div>
      <h1 className="title">Career Roles</h1>
      <ul className="list">
        {roles.map((r, idx) => (
          <li key={`${r.name}-${idx}`} className="list-item">
            <strong>{r.name}</strong>{r.abbreviation ? ` (${r.abbreviation})` : ''}
          </li>
        ))}
      </ul>
    </div>
  );
}
