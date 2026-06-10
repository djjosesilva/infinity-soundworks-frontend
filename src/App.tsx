import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Intro from './components/Intro';
import { AuthProvider, useAuth } from './hooks/useAuth';

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth();
  if (loading) return <div className="flex items-center justify-center h-screen"><div className="status-pip active" style={{width:16,height:16}} /></div>;
  if (!user) return <Navigate to="/login" />;
  return <>{children}</>;
}

function IntroGate() {
  const [showIntro, setShowIntro] = useState(true);
  if (showIntro) return <Intro onFinish={() => setShowIntro(false)} />;
  return <Login />;
}

export default function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/login" element={<IntroGate />} />
        <Route path="/*" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
      </Routes>
    </AuthProvider>
  );
}
