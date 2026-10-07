import { useEffect, useState } from "react";
import { getPatients } from "../services/api.js";
import styles from "./Page.module.css";

export default function Patients() {
  const [pacientes, setPacientes] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState("");

  // useEffect: busca os dados quando a página abre ([] = só uma vez).
  useEffect(() => {
    getPatients()
      .then(setPacientes)
      .catch((e) => setErro(e.message))
      .finally(() => setCarregando(false));
  }, []);

  if (carregando) return <main className={styles.pagina}>Carregando pacientes...</main>;
  if (erro) return <main className={styles.pagina}><p className={styles.erro}>{erro}</p></main>;

  return (
    <main className={styles.pagina}>
      <div className={styles.painel}>
        <h2>Pacientes ({pacientes.length})</h2>
        <div className={styles.tabelaWrap}>
          <table>
            <thead><tr><th>Nome</th><th>E-mail</th><th>Cidade</th></tr></thead>
            <tbody>
              {pacientes.map((p) => (
                <tr key={p.id}><td>{p.nome}</td><td>{p.email}</td><td>{p.cidade}</td></tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </main>
  );
}
