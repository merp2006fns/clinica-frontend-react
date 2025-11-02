import { useState, useEffect } from "react";
import { AuthContext } from "./AuthContext";
const API_URL = import.meta.env.VITE_API_URL;

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const login = async (correo, password) => {
    try {
      const response = await fetch(`${API_URL}/auth/login`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ correo, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error);
        throw new Error(data.error || "Error en el inicio de sesión");
      }

      setUser(data.usuario);
      setError(null);
      return data;
    } catch (error) {
      console.error(error);
    }
  };

  const logout = async () => {
    try {
      await fetch(`${API_URL}/auth/logout`, {
        method: "POST",
        credentials: "include",
      });
      setUser(null);
    } catch (error) {
      console.error("Error al cerrar sesión:", error);
    }
  };

  const checkAuth = async () => {
    try {
      const response = await fetch(`${API_URL}/auth/verificar`, {
        credentials: "include",
      });
      const data = await response.json();

      if (data.logueado) {
        setUser(data.usuario);
      } else {
        setUser(null);
      }
    } catch (error) {
      console.error("Error al verificar autenticación:", error);
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  const registerUser = async (userData) => {
    if (!user || user.rol !== "admin") {
      throw new Error("No tienes permisos para registrar usuarios");
    }

    try {
      const response = await fetch(`${API_URL}/auth/registrar`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error);
        throw new Error(data.error || "Error al registrar usuario");
      }

      setError(null);
      return data;
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    checkAuth();
  }, []);

  const value = {
    user,
    login,
    logout,
    registerUser,
    loading,
    error,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
