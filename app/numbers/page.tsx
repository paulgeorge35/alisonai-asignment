import styles from "./page.module.css";
import NumberForm from "./_components/NumberForm/NumberForm";
import NumberTable from "./_components/NumberTable/NumberTable";

export default function NumbersPage() {
  return (
    <div className={styles.main}>
      <NumberForm />
      <NumberTable />
    </div>
  )
}
