import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { apiClient } from '../api/client';

// PUBLIC_INTERFACE
export const AuthContext = createContext(null);

/** Persist token key */
const TOKEN_KEY = 'cn_access_token';

// PUBLIC_INTERFACE
export function AuthProvider({ children }) {
  /** Provides auth state (user, token) and actions (login, logout, register) */
  const [token, setToken] = useState(() => localStorage.getItem(TOKEN_KEY) || null);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(!!token);
  const [error, setError] = useState(null);

  useEffect(() => {
    apiClient.setToken(token);
    if (token) {
      localStorage.setItem(TOKEN_KEY, token);
      // Try fetching current user
      (async () => {
        try {
          setLoading(true);
          const me = await apiClient.me();
          setUser(me);
          setError(null);
        } catch (e) {
          setUser(null);
          setToken(null);
          localStorage.removeItem(TOKEN_KEY);
        } finally {
          setLoading(false);
        }
      })();
    } else {
      localStorage.removeItem(TOKEN_KEY);
      setUser(null);
      setLoading(false);
    }
  }, [token]);

  const value = useMemo(() => ({
    user,
    token,
    loading,
    error,
    // PUBLIC_INTERFACE
    async login(email, password) {
      setError(null);
      const res = await apiClient.login(email, password);
      setToken(res.access_token);
      return res;
    },
    // PUBLIC_INTERFACE
    async register({ email, password, full_name }) {
      setError(null);
      const res = await apiClient.register({ email, password, full_name });
      return res;
    },
    // PUBLIC_INTERFACE
    logout() {
      setToken(null);
      setUser(null);
      localStorage.removeItem(TOKEN_KEY);
    },
  }), [user, token, loading, error]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

// PUBLIC_INTERFACE
export function useAuth() {
  /** Access auth context (user, login, logout, register, loading) */
  return useContext(AuthContext);
}
