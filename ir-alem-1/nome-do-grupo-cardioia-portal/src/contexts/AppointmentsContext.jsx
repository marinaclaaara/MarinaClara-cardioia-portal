// Estado global das consultas com useReducer (várias ações sobre uma lista).
import { createContext, useContext, useEffect, useReducer } from "react";

const AppointmentsContext = createContext(null);

// Reducer: função pura (estado, ação) => novo estado. Nunca altera o estado antigo.
function reducer(estado, acao) {
  switch (acao.type) {
    case "ADICIONAR":
      return [...estado, { id: Date.now(), ...acao.payload }];
    case "REMOVER":
      return estado.filter((c) => c.id !== acao.id);
    default:
      return estado;
  }
}

export function AppointmentsProvider({ children }) {
  // Inicializa lendo do localStorage (função "lazy" executa só na 1ª renderização).
  const [consultas, dispatch] = useReducer(reducer, [], () => {
    const salvo = localStorage.getItem("cardioia_consultas");
    return salvo ? JSON.parse(salvo) : [];
  });

  // Sempre que a lista mudar, persiste no navegador.
  useEffect(() => {
    localStorage.setItem("cardioia_consultas", JSON.stringify(consultas));
  }, [consultas]);

  return (
    <AppointmentsContext.Provider value={{ consultas, dispatch }}>
      {children}
    </AppointmentsContext.Provider>
  );
}

export const useAppointments = () => useContext(AppointmentsContext);
