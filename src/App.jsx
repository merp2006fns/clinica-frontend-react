import "./App.css";
import { AuthProvider } from "./context/AuthProvider";
import {
  HashRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { Dashboard } from "./components/Dashboard";
import { LoginForm } from "./components/LoginForm";
import { ProtectedRoute } from "./components/ProtectedRoute";
import { RoleProtectedRoute } from "./components/RoleProtectedRoute";
import { Navbar } from "./components/Navbar";
import { CitasPage } from "./pages/CitasPage";
import { PacientesPage } from "./pages/PacientesPage";
import { ServiciosPage } from "./pages/ServiciosPage";
import { UsuariosPage } from "./pages/UsuariosPage";
import { ThemeProvider } from "./context/ThemeProvider";

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <Router>
          <Routes>
            <Route path="/login" element={<LoginForm />} />
            <Route
              path="/"
              element={
                <ProtectedRoute>
                  <Navbar />
                  <Dashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/citas"
              element={
                <ProtectedRoute>
                  <Navbar />
                  <RoleProtectedRoute
                    allowedRoles={["admin", "recepcion", "medico"]}
                  >
                    <CitasPage />
                  </RoleProtectedRoute>
                </ProtectedRoute>
              }
            />
            <Route
              path="/pacientes"
              element={
                <ProtectedRoute>
                  <Navbar />
                  <RoleProtectedRoute allowedRoles={["admin", "recepcion"]}>
                    <PacientesPage />
                  </RoleProtectedRoute>
                </ProtectedRoute>
              }
            />
            <Route
              path="/servicios"
              element={
                <ProtectedRoute>
                  <Navbar />
                  <RoleProtectedRoute allowedRoles={["admin"]}>
                    <ServiciosPage />
                  </RoleProtectedRoute>
                </ProtectedRoute>
              }
            />
            <Route
              path="/usuarios"
              element={
                <ProtectedRoute>
                  <Navbar />
                  <RoleProtectedRoute allowedRoles={["admin"]}>
                    <UsuariosPage />
                  </RoleProtectedRoute>
                </ProtectedRoute>
              }
            />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
