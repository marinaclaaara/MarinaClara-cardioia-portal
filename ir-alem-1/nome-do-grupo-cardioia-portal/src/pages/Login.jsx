import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext.jsx";
import styles from "./Page.module.css";

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [erro, setErro] = useState("");

  async function enviar(e) {
    e.preventDefault(); // impede o recarregamento da página
    try {
      await login(email, senha);
      navigate("/");
    } catch (err) {
      setErro(err.message);
    }
  }

  return (
    <main className={styles.pagina}>
      <form className={`${styles.painel} ${styles.form}`} onSubmit={enviar}>
        <h2 style={{ gridColumn: "1 / -1" }}>Entrar no CardioIA</h2>
        <label>E-mail<input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required /></label>
        <label>Senha<input type="password" value={senha} onChange={(e) => setSenha(e.target.value)} required /></label>
        <button className={styles.botao} type="submit">Entrar</button>
        {erro && <p className={styles.erro}>{erro}</p>}
        <small style={{ gridColumn: "1 / -1" }}>Login simulado: qualquer e-mail + senha <b>123456</b>.</small>
      </form>
    </main>
  );
}
