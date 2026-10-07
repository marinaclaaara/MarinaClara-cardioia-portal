import { useEffect, useState } from "react";
import { getPatients } from "../services/api.js";
import { useAppointments } from "../contexts/AppointmentsContext.jsx";
import styles from "./Page.module.css";

const FORM_VAZIO = { paciente: "", data: "", horario: "", motivo: "" };

export default function Appointments() {
  const { consultas, dispatch } = useAppointments();
  const [pacientes, setPacientes] = useState([]);
  const [form, setForm] = useState(FORM_VAZIO); // useState controla os campos do formulário

  useEffect(() => { getPatients().then(setPacientes).catch(() => {}); }, []);

  // Um único handler atualiza qualquer campo usando o atributo "name" do input.
  const alterar = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  function agendar(e) {
    e.preventDefault();
    dispatch({ type: "ADICIONAR", payload: form }); // useReducer atualiza a lista global
    setForm(FORM_VAZIO);
  }

  return (
    <main className={styles.pagina}>
      <form className={`${styles.painel} ${styles.form}`} onSubmit={agendar}>
        <h2 style={{ gridColumn: "1 / -1" }}>Agendar consulta</h2>
        <label>Paciente
          <select name="paciente" value={form.paciente} onChange={alterar} required>
            <option value="">Selecione...</option>
            {pacientes.map((p) => <option key={p.id} value={p.nome}>{p.nome}</option>)}
          </select>
        </label>
        <label>Data<input type="date" name="data" value={form.data} onChange={alterar} required /></label>
        <label>Horário<input type="time" name="horario" value={form.horario} onChange={alterar} required /></label>
        <label>Motivo<input name="motivo" value={form.motivo} onChange={alterar} required /></label>
        <button className={styles.botao} type="submit">Agendar</button>
      </form>

      <div className={styles.painel}>
        <h2>Consultas agendadas ({consultas.length})</h2>
        {consultas.length === 0 ? <p>Nenhuma consulta ainda.</p> : (
          <div className={styles.tabelaWrap}>
            <table>
              <thead><tr><th>Paciente</th><th>Data</th><th>Hora</th><th>Motivo</th><th></th></tr></thead>
              <tbody>
                {consultas.map((c) => (
                  <tr key={c.id}>
                    <td>{c.paciente}</td><td>{c.data}</td><td>{c.horario}</td><td>{c.motivo}</td>
                    <td><button onClick={() => dispatch({ type: "REMOVER", id: c.id })}>Cancelar</button></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </main>
  );
}
