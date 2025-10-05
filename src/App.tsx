import { useState, useEffect } from 'react';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import Login from './pages/Login';
import Portfolio from './pages/Portfolio';
import AdminDashboard from './pages/AdminDashboard';

function AppContent() {
  const { user, loading } = useAuth();
  const [isAdminRoute, setIsAdminRoute] = useState(false);

  useEffect(() => {
    const path = window.location.pathname;
    setIsAdminRoute(path === '/admin' || path.startsWith('/admin/'));

    const handlePopState = () => {
      const newPath = window.location.pathname;
      setIsAdminRoute(newPath === '/admin' || newPath.startsWith('/admin/'));
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: 'var(--bg-primary)' }}>
        <div className="text-cyan-400 text-xl">Loading...</div>
      </div>
    );
  }

  if (isAdminRoute) {
    if (!user) {
      return <Login />;
    }
    return <AdminDashboard />;
  }

  return <Portfolio />;
}

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;
