import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import { AuthProvider } from './context/AuthContext';
import { ProtectedLayout } from './components/Layout';
import { ProtectedRoute } from './routes/ProtectedRoute';

// Pages
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Roles from './pages/Roles';
import Competencies from './pages/Competencies';
import Recommendations from './pages/Recommendations';
import Resources from './pages/Resources';
import Jobs from './pages/Jobs';
import Progress from './pages/Progress';

// PUBLIC_INTERFACE
function App() {
  /** Root app with router and providers */
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          {/* Public routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Protected routes within app shell */}
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <ProtectedLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<Dashboard />} />
            <Route path="roles" element={<Roles />} />
            <Route path="competencies" element={<Competencies />} />
            <Route path="recommendations" element={<Recommendations />} />
            <Route path="resources" element={<Resources />} />
            <Route path="jobs" element={<Jobs />} />
            <Route path="progress" element={<Progress />} />
          </Route>

          {/* Fallback */}
          <Route path="*" element={<Login />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
