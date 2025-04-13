import InputGeneric from "@/app/components/input/input-generic/input-generic";
import styles from "./page.module.css";

export default function Home() {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <h1 className={styles.title}>Join in a room</h1>

        <div style={{ width: "300px" }}>
          <InputGeneric placeholder="Enter Room Id"></InputGeneric>
        </div>
      </main>
    </div>
  );
}
