import DataList from "@/app/Components/dsDatalist/dsDatalist";
import NavBack from "../../ElProComponents/NavigationComponent/navBack";
import styles from "../order.module.css";

export default function Home() {
  return (
    <>
      <NavBack>Back</NavBack>
      <div className={styles.container}>
        <div className={styles.Customer}>
          <div className={styles.title}>Customer Dtails</div>
          <div className={styles.inputDetails}>
            <DataList options={[]} inputId={""} dataListId={""} className={""}></DataList>
          </div>
          <div className={styles.details}></div>
        </div>
        <div className={styles.Product}>
          <div className={styles.addProduct}>
            <div className={styles.title}>Product Details</div>
            <div className={styles.input}></div>
            <div className={styles.summary}></div>
          </div>
          <div className={styles.ProductDetails}>

          </div>
        </div>
        <div className={styles.footer}></div>
      </div>
    </>
  );
}
