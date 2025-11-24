import React, { useEffect, useState } from 'react';
import { apiClient } from '../api/client';

// PUBLIC_INTERFACE
export default function Competencies() {
  /** Show competency definitions; optionally raw matrix */
  const [defs, setDefs] = useState([]);
  const [matrixOpen, setMatrixOpen] = useState(false);
  const [matrix, setMatrix] = useState(null);

  useEffect(() => {
    apiClient.competencyDefinitions().then(setDefs).catch(() => setDefs([]));
  }, []);

  const loadMatrix = async () => {
    if (matrix) return;
    try {
      const m = await apiClient.competencyMatrix();
      setMatrix(m);
    } catch {
      setMatrix({ error: 'Unable to load matrix' });
    }
  };

  return (
    <div>
      <h1 className="title">Competencies</h1>
      <div className="card">
        <h2>Glossary</h2>
        <ul className="list">
          {defs.map((d, i) => (
            <li key={i} className="list-item">
              <strong>{d.competency}</strong>: {d.definition}
            </li>
          ))}
        </ul>
      </div>
      <div className="card">
        <details onToggle={(e) => e.target.open && loadMatrix()}>
          <summary className="summary">Show raw matrix (advanced)</summary>
          <pre className="code">{matrix ? JSON.stringify(matrix, null, 2) : 'Loading…'}</pre>
        </details>
      </div>
    </div>
  );
}
