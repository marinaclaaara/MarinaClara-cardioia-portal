import { useEffect, useState } from "react";
import { getPatients } from "../services/api.js";
import { useAppointments } from "../contexts/AppointmentsContext.jsx";
import StatCard from "../components/StatCard.jsx";
import styles from "./Page.module.css";

export default function Dashboard() {
  const { consultas } = useAppointments();
  const [totalPacientes, setTotalPacientes] = useState("…");

  useEffect(() => {
    getPatients().then((p) => setTotalPacientes(p.length)).catch(() => setTotalPacientes("—"));
  }, []);

  return (
    <main className={styles.pagina}>
      <h1>Dashboard</h1>
      <div className={styles.linha}>
        <StatCard titulo="Pacientes cadastrados" valor={totalPacientes} />
        <StatCard titulo="Consultas agendadas" valor={consultas.length} />
      </div>
    </main>
  );
}
