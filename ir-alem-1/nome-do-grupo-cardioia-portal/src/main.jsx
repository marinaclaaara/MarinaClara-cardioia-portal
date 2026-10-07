// Ponto de entrada: monta o React no <div id="root"> e envolve o app com os
// "Providers" (Contexts) e com o roteador.
// Autoria: Marina Clara
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import { AuthProvider } from "./contexts/AuthContext.jsx";
import { AppointmentsProvider } from "./contexts/AppointmentsContext.jsx";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    {/* BrowserRouter habilita rotas; AuthProvider/AppointmentsProvider
        disponibilizam estado global para TODOS os componentes filhos. */}
    <BrowserRouter>
      <AuthProvider>
        <AppointmentsProvider>
          <App />
        </AppointmentsProvider>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);
