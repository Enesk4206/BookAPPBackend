// LoginPage.jsx
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext'; // ✅ Context'ten çek
// NOT: authService'ten login'i import ETME!

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { login } = useAuth(); // ✅ Context kullanımı

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login({ username, password }); // ✅ Context içindeki login
      navigate('/');
    } catch (err) {
      setError(err.message || 'Giriş Hatası');
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-md">
      <h2 className="text-3xl font-bold mb-6">Giriş Yap</h2>
      {error && <div className="text-red-600">{error}</div>}

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Kullanıcı adı"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
          className="w-full border px-4 py-2 rounded"
        />
        <input
          type="password"
          placeholder="Şifre"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="w-full border px-4 py-2 rounded"
        />
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
        >
          Giriş Yap
        </button>
      </form>

      <p className="mt-4 text-center">
        Hesabın yok mu?{' '}
        <Link to="/register" className="text-blue-600 hover:underline">
          Kayıt Ol
        </Link>
      </p>
    </div>
  );
};

export default LoginPage;
