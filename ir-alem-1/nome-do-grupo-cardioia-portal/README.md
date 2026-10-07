# nome-do-grupo-cardioia-portal

**Autoria:** Marina Clara  |  **Integrante:** Marina Clara Constantino Ribeiro – RM 568576
**Vídeo (YouTube, não listado):** _adicionar o link após a gravação_

Portal front-end do CardioIA em **React + Vite**, com dados simulados.

## Funcionalidades
- Autenticação simulada via **Context API** (JWT fake no `localStorage`; senha `123456`).
- **Proteção de rotas** com `ProtectedRoute` + `AuthContext`: sem login, redireciona para `/login`.
- Listagem de **pacientes** via API fake (JSONPlaceholder `/users`).
- **Formulário de agendamento** com `useState` (campos) e `useReducer` (lista de consultas, persistida no `localStorage`).
- **Dashboard** com contagem de pacientes e de consultas agendadas.
- Estilização com **CSS Modules**, layout responsivo.

## Estrutura
```
src/
  contexts/    AuthContext.jsx, AppointmentsContext.jsx
  components/  Navbar, ProtectedRoute, StatCard
  services/    api.js
  pages/       Login, Dashboard, Patients, Appointments
```

## Instalação e execução
```bash
npm install
npm run dev      # abre em http://localhost:5173
npm run build    # build de produção
```
Login: qualquer e-mail + senha `123456`.
