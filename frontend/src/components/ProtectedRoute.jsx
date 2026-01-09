import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export function ProtectedRoute({ children, allowedRoles, redirectTo = "/" }) {
  const { user, loading } = useAuth();

  if (loading) {
    return <div style={{ padding: '20px', textAlign: 'center' }}>Carregando...</div>;
  }

  if (!user) {
    return <Navigate to="/entrar" replace />;
  }

  if (allowedRoles && !allowedRoles.includes(user.tipo)) {
    return <Navigate to={redirectTo} replace />;
  }

  return children;
}
