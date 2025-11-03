import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  const closeMenu = () => setOpen(false);

  const canAccessCitas = ["admin", "recepcion", "medico"].includes(user?.rol);
  const canAccessPacientes = ["admin", "recepcion"].includes(user?.rol);
  const canAccessServicios = user?.rol === "admin";
  const canAccessUsuarios = user?.rol === "admin";

  return (
    <nav className="bg-black/50 text-white shadow-md ">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        {/* Brand */}
        <div className="flex items-center space-x-3">
          <button
            onClick={() => setOpen((s) => !s)}
            aria-controls="main-menu"
            aria-expanded={open}
            className="md:hidden p-2 rounded-md hover:bg-green-500/20 focus:outline-none focus:ring-2 focus:ring-white"
          >
            {/* Hamburger / Close icon */}
            {open ? (
              <svg
                className="w-6 h-6"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                aria-hidden
              >
                <path
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            ) : (
              <svg
                className="w-6 h-6"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                aria-hidden
              >
                <path
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            )}
          </button>

          <div className="flex flex-col">
            <Link
              to="/"
              className="text-lg font-bold hover:underline"
              onClick={closeMenu}
            >
              Sistema de Clínica
            </Link>
            <span className="text-xs opacity-90">
              Usuario: {user?.nombre ?? "—"} ({user?.rol ?? "—"})
            </span>
          </div>
        </div>

        {/* Desktop menu */}
        <ul className="hidden md:flex items-center space-x-4">
          <li>
            <Link to="/">
              Dashboard
            </Link>
          </li>
          {canAccessCitas && (
            <li>
              <Link to="/citas">
                Citas
              </Link>
            </li>
          )}
          {canAccessPacientes && (
            <li>
              <Link to="/pacientes">
                Pacientes
              </Link>
            </li>
          )}
          {canAccessServicios && (
            <li>
              <Link to="/servicios">
                Servicios
              </Link>
            </li>
          )}
          {canAccessUsuarios && (
            <li>
              <Link to="/usuarios">
                Usuarios
              </Link>
            </li>
          )}
          <li>
            <button
              onClick={handleLogout}
              className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded-md"
            >
              Cerrar Sesión
            </button>
          </li>
        </ul>
      </div>

      {/* Mobile panel */}
      <div
        id="main-menu"
        className={`md:hidden bg-green-600/95 border-t border-green-700 overflow-hidden transition-[max-height,opacity] duration-200 ease-out ${
          open ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <ul className="flex flex-col px-4 py-3 space-y-2 text-center">
          <li>
            <Link
              to="/"
              onClick={closeMenu}
              className="block py-2 px-2 rounded hover:bg-green-500/20"
            >
              Dashboard
            </Link>
          </li>
          {canAccessCitas && (
            <li>
              <Link
                to="/citas"
                onClick={closeMenu}
                className="block py-2 px-2 rounded hover:bg-green-500/20"
              >
                Citas
              </Link>
            </li>
          )}
          {canAccessPacientes && (
            <li>
              <Link
                to="/pacientes"
                onClick={closeMenu}
                className="block py-2 px-2 rounded hover:bg-green-500/20"
              >
                Pacientes
              </Link>
            </li>
          )}
          {canAccessServicios && (
            <li>
              <Link
                to="/servicios"
                onClick={closeMenu}
                className="block py-2 px-2 rounded hover:bg-green-500/20"
              >
                Servicios
              </Link>
            </li>
          )}
          {canAccessUsuarios && (
            <li>
              <Link
                to="/usuarios"
                onClick={closeMenu}
                className="block py-2 px-2 rounded hover:bg-green-500/20"
              >
                Usuarios
              </Link>
            </li>
          )}
          <li>
            <button
              onClick={() => {
                closeMenu();
                handleLogout();
              }}
              className="w-full text-center bg-red-600 hover:bg-red-700 text-white px-3 py-2 rounded-md"
            >
              Cerrar Sesión
            </button>
          </li>
        </ul>
      </div>
    </nav>
  );
};