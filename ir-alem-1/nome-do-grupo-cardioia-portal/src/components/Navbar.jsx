import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext.jsx";
import styles from "./Navbar.module.css";

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  function sair() {
    logout();
    navigate("/login");
  }

  return (
    <header className={styles.barra}>
      <strong className={styles.logo}>❤ CardioIA</strong>
      {user && (
        <nav className={styles.links}>
          <NavLink to="/">Dashboard</NavLink>
          <NavLink to="/pacientes">Pacientes</NavLink>
          <NavLink to="/consultas">Consultas</NavLink>
          <button onClick={sair}>Sair ({user.email})</button>
        </nav>
      )}
    </header>
  );
}
