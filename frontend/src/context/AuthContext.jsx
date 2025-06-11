import React, { createContext, useContext, useEffect, useState } from 'react';
import { getProfile, login as loginService, register as registerService } from '../api/authService';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      const token = localStorage.getItem("token");
      if (token) {
        try {
          const data = await getProfile();
          setUser({ id: data.id, username: data.username, role: data.role });
        } catch (err) {
          localStorage.removeItem("token");
          setUser(null);
          navigate("/login");
        }
      }
      setLoading(false); // ✅ loading state tamamlandı
    };
    fetchProfile();
   // 🔔 JWT expired event listener
    const handleJwtExpired = () => {
      localStorage.removeItem("token");
      setUser(null);
       navigate("/login");

    };

    window.addEventListener("jwt-expired", handleJwtExpired);

    return () => {
      window.removeEventListener("jwt-expired", handleJwtExpired);
    };
  }, []);

  const login = async (credentials) => {
    const data = await loginService(credentials);
    localStorage.setItem('token', data.token);
    const profile = await getProfile();
    setUser({ id: profile.id, username: profile.username, role: profile.role });
  };

  const register = async (credentials) => {
    const data = await registerService(credentials);
    localStorage.setItem('token', data.token);
    const profile = await getProfile();
    setUser({ id: profile.id, username: profile.username, role: profile.role });
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
    navigate("/login");

  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
