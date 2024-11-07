import NavBack from "../../ElProComponents/NavigationComponent/navBack";
import styles from "../order.module.css";

export default function Home() {
  return (
    <>
      <NavBack>Back</NavBack>
      <div className={styles.container}>
        <div className={styles.Customer}>
          <div className={styles.title}></div>
          <div className={styles.inputDetails}></div>
          <div className={styles.details}></div>
        </div>
        <div className={styles.Product}></div>
        <div className={styles.footer}></div>
      </div>
    </>
  );
}
