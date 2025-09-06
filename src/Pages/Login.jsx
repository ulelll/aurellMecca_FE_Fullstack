import { useState } from 'react';
import { useAuthStore } from '../api/auth';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login, loading, error } = useAuthStore();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log('Submitting login...', { email, password });
    await login(email, password);

    const token = localStorage.getItem('token');
    console.log('Token after login:', token);

    if (token) {
      console.log('Redirecting to /');
      navigate('/');
    } else {
      console.log('Login failed or token missing');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form className="w-full max-w-md p-6 bg-white rounded shadow" onSubmit={handleSubmit}>
        <h1 className="text-xl font-bold mb-4">Login</h1>
        <input
          type="text"
          placeholder="Email"
          className="w-full p-2 border rounded mb-2"
          value={email}
          onChange={e => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          className="w-full p-2 border rounded mb-2"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
        {error && <div className="text-red-500 text-sm mb-2">{error}</div>}
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
          disabled={loading}
        >
          {loading ? 'Loading...' : 'Login'}
        </button>
      </form>
    </div>
  );
}
