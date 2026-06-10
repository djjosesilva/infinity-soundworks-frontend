import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import api from './api';

interface User { id: number; email: string; nome: string; role: string; has_deepseek: boolean; }
interface AuthContextType { user: User | null; loading: boolean; login: (email: string, password: string) => Promise<void>; logout: () => void; token: string | null; }

const AuthContext = createContext<AuthContextType>({ user: null, loading: true, login: async () => {}, logout: () => {}, token: null });

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem('token');

  const fetchUser = useCallback(async () => {
    if (!token) { setLoading(false); return; }
    try {
      const { data } = await api.get('/api/auth/me', { headers: { Authorization: `Bearer ${token}` } });
      setUser(data);
    } catch { localStorage.removeItem('token'); } finally { setLoading(false); }
  }, [token]);

  useEffect(() => { fetchUser(); }, [fetchUser]);

  const login = async (email: string, password: string) => {
    const { data } = await api.post('/api/auth/login', { email, password });
    localStorage.setItem('token', data.access_token);
    api.defaults.headers.common['Authorization'] = `Bearer ${data.access_token}`;
    setUser(data.user);
  };

  const logout = () => { localStorage.removeItem('token'); setUser(null); };

  return <AuthContext.Provider value={{ user, loading, login, logout, token }}>{children}</AuthContext.Provider>;
}

export const useAuth = () => useContext(AuthContext);
