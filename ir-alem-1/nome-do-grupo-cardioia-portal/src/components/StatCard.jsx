import styles from "./StatCard.module.css";
// Componente de apresentação (sem estado): só recebe props e desenha.
export default function StatCard({ titulo, valor }) {
  return (
    <div className={styles.card}>
      <span>{titulo}</span>
      <strong>{valor}</strong>
    </div>
  );
}
