import { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Shield, Mail, Lock } from 'lucide-react';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { signIn } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const { error } = await signIn(email, password);

    if (error) {
      setError(error.message);
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4" style={{ backgroundColor: 'var(--bg-primary)' }}>
      <div className="stars-background"></div>

      <div className="card-container max-w-md w-full" style={{ position: 'relative', zIndex: 1 }}>
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-cyan-400 to-blue-500 mb-4">
            <Shield size={32} className="text-white" />
          </div>
          <h1 className="section-title justify-center mb-2">ADMIN ACCESS</h1>
          <p className="text-gray-400">Enter credentials to access the control panel</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="form-label flex items-center gap-2">
              <Mail size={16} />
              Email
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="form-input"
              placeholder="admin@example.com"
            />
          </div>

          <div>
            <label className="form-label flex items-center gap-2">
              <Lock size={16} />
              Password
            </label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="form-input"
              placeholder="Enter your password"
            />
          </div>

          {error && (
            <div className="error-message">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="submit-button"
          >
            {loading ? 'Authenticating...' : 'Access Admin Panel'}
          </button>
        </form>

        <div className="mt-6 p-4 bg-cyan-400/10 border border-cyan-400/30 rounded-lg">
          <p className="text-sm text-cyan-400 text-center">
            Secure authentication powered by Supabase
          </p>
        </div>
      </div>
    </div>
  );
}
