import React, { useEffect, useState } from 'react';
import { apiClient } from '../api/client';

// PUBLIC_INTERFACE
export default function Dashboard() {
  /** Simple overview with links and quick stats */
  const [roles, setRoles] = useState([]);
  const [recs, setRecs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const [r, rec] = await Promise.all([
          apiClient.listRoles(),
          apiClient.recommendationsForCA({ limit: 5 }),
        ]);
        setRoles(r || []);
        setRecs(rec || []);
      } catch {
        // ignore for MVP surface
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  return (
    <div>
      <h1 className="title">Dashboard</h1>
      {loading ? <div className="loading" role="status">Loading…</div> : (
        <>
          <section className="card-grid">
            <div className="card">
              <h2>Roles</h2>
              <p>{roles.length} available roles</p>
            </div>
            <div className="card">
              <h2>Recommendations</h2>
              <p>{recs.length} suggestions for CA</p>
            </div>
          </section>
          <section className="card">
            <h2>Quick Tips</h2>
            <p>Explore adjacent roles and review competency definitions to plan your move.</p>
          </section>
        </>
      )}
    </div>
  );
}
