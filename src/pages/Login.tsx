import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); setError(''); setLoading(true);
    try {
      await login(email, password);
      navigate('/');
    } catch (err: any) {
      setError(err.response?.data?.detail || 'Erro de autenticacao');
    } finally { setLoading(false); }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4" style={{background:'radial-gradient(ellipse at top, rgba(0,209,255,0.08), transparent 60%)'}}>
      <div className="glass-card p-8 w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="font-sora text-2xl font-bold text-primary glow-text mb-1">INFINITY SOUNDWORKS</h1>
          <p className="mono-label">Estúdio DJ José Silva</p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div><label className="mono-label">Email</label><input type="email" className="glass-input" value={email} onChange={e => setEmail(e.target.value)} required /></div>
          <div><label className="mono-label">Password</label><input type="password" className="glass-input" value={password} onChange={e => setPassword(e.target.value)} required /></div>
          {error && <div className="text-status-error text-sm mono-label">{error}</div>}
          <button type="submit" disabled={loading} className="btn-primary w-full">{loading ? '...' : 'ENTRAR'}</button>
        </form>
        <p className="text-center mt-6 text-xs text-gray-500">v3.0 — DeepSeek V4 Pro + HuggingFace Demo</p>
      </div>
    </div>
  );
}
