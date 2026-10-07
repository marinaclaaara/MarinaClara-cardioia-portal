// Context API: estado de autenticação global (quem está logado).
import { createContext, useContext, useEffect, useState } from "react";
import { fakeLogin } from "../services/api.js";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [carregando, setCarregando] = useState(true);

  // useEffect com [] roda UMA vez ao abrir o app: restaura a sessão do localStorage.
  useEffect(() => {
    const salvo = localStorage.getItem("cardioia_session");
    if (salvo) setUser(JSON.parse(salvo).user);
    setCarregando(false);
  }, []);

  async function login(email, senha) {
    const sessao = await fakeLogin(email, senha);
    localStorage.setItem("cardioia_session", JSON.stringify(sessao)); // JWT fake persistido
    setUser(sessao.user);
  }

  function logout() {
    localStorage.removeItem("cardioia_session");
    setUser(null);
  }

  return (
    <AuthContext.Provider value={{ user, carregando, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

// Hook personalizado: evita repetir useContext(AuthContext) em todo lugar.
export const useAuth = () => useContext(AuthContext);
