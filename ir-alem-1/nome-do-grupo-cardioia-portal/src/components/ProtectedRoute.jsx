// Proteção de rotas: só renderiza os filhos se houver usuário logado.
import { Navigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext.jsx";

export default function ProtectedRoute({ children }) {
  const { user, carregando } = useAuth();
  if (carregando) return <p style={{ padding: 24 }}>Carregando...</p>;
  return user ? children : <Navigate to="/login" replace />;
}
