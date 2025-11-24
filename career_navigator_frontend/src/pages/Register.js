import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

// PUBLIC_INTERFACE
export default function Register() {
  /** Registration form; does not auto-login by default */
  const { register } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [fullName, setFullName] = useState('');
  const [password, setPassword] = useState('');
  const [err, setErr] = useState(null);
  const [ok, setOk] = useState(null);
  const [busy, setBusy] = useState(false);

  const onSubmit = async (e) => {
    e.preventDefault();
    setBusy(true);
    setErr(null);
    setOk(null);
    try {
      await register({ email, password, full_name: fullName || null });
      setOk('Account created. You can now sign in.');
      setTimeout(() => navigate('/login'), 800);
    } catch (e) {
      setErr(e?.data?.detail || e.message || 'Registration failed');
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="center-card">
      <h1 className="title">Create your account</h1>
      <form onSubmit={onSubmit} className="form" aria-describedby={err ? 'form-error' : undefined}>
        <label>
          Full name (optional)
          <input
            type="text"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            aria-label="Full name"
          />
        </label>
        <label>
          Email
          <input
            required
            type="email"
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            aria-label="Email"
          />
        </label>
        <label>
          Password (min 8 chars)
          <input
            required
            minLength={8}
            type="password"
            autoComplete="new-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            aria-label="Password"
          />
        </label>
        {err && <div id="form-error" role="alert" className="error">{err}</div>}
        {ok && <div role="status" className="success">{ok}</div>}
        <button className="btn primary" disabled={busy} type="submit">
          {busy ? 'Creating…' : 'Create account'}
        </button>
      </form>
      <p className="helper">
        Already have an account? <Link to="/login">Sign in</Link>
      </p>
    </div>
  );
}
