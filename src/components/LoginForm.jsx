import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate, useLocation } from "react-router-dom";

export const LoginForm = () => {
  const [correo, setCorreo] = useState("");
  const [password, setPassword] = useState("");
  const { login, user, error } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (user) {
      return navigate("/");
    }
  }, [user, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await login(correo, password);
      const origin = location.state?.from?.pathname || "/";
      navigate(origin);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div
      className="flex items-center justify-center min-h-screen bg-white dark:bg-gray-900 px-4"
      style={{
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url("https://i.pinimg.com/1200x/a4/02/b0/a402b016289466ff0953a81fc82a6db3.jpg")`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        width: "100%",
        height: "100vh",
      }}
    >
      <div className="w-full max-w-md bg-white/50 dark:bg-gray-800/50 p-8 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-4 text-center">
          Iniciar Sesión
        </h2>
        {error && <p className="text-center text-red-600">{error}</p>}
        <form onSubmit={handleSubmit} className="space-y-4 bg-white/2 dark:bg-gray-800/2  ">
          <div>
            <label htmlFor="correo">Correo:</label>
            <input
              type="email"
              id="correo"
              value={correo}
              autoComplete="email"
              onChange={(e) => setCorreo(e.target.value)}
              required
              className="input-form"
            />
          </div>
          <div>
            <label htmlFor="password">Contraseña:</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              autoComplete="current-password"
              className="input-form"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-4 rounded-md transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 dark:bg-green-700 dark:hover:bg-green-600"
          >
            Iniciar Sesión
          </button>
        </form>
      </div>
    </div>
  );
};
