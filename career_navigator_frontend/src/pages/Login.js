import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

// PUBLIC_INTERFACE
export default function Login() {
  /** Login form for users to obtain token */
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || '/';
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [err, setErr] = useState(null);
  const [busy, setBusy] = useState(false);

  const onSubmit = async (e) => {
    e.preventDefault();
    setBusy(true);
    setErr(null);
    try {
      await login(email, password);
      navigate(from, { replace: true });
    } catch (e) {
      setErr(e?.data?.detail || e.message || 'Login failed');
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="center-card">
      <h1 className="title">Welcome back</h1>
      <p className="subtitle">Sign in to your account</p>
      <form onSubmit={onSubmit} className="form" aria-describedby={err ? 'form-error' : undefined}>
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
          Password
          <input
            required
            minLength={8}
            type="password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            aria-label="Password"
          />
        </label>
        {err && <div id="form-error" role="alert" className="error">{err}</div>}
        <button className="btn primary" disabled={busy} type="submit">
          {busy ? 'Signing in…' : 'Sign in'}
        </button>
      </form>
      <p className="helper">
        New here? <Link to="/register">Create an account</Link>
      </p>
    </div>
  );
}
