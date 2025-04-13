// pages/index.tsx

import styles from "./page.module.css";

export default function Home() {
  return (
    <>
      <main className={styles.main}>
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Bem-vindo ao Poker Scrum 🎯</h2>
          <p className={styles.sectionText}>
            Crie e compartilhe sua planning com o time em tempo real.
          </p>
        </section>
      </main>
    </>
  );
}
