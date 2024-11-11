import { DetailProp } from "../types";
import styles from "./Detail.module.css";
const Detail: React.FC<DetailProp> = ({ children, detailOf }) => {
  return (
    <div className={styles.detail}>
      <div className={styles.detailOf}>{detailOf}:</div>
      <div className={styles.data}>{children}</div>
    </div>
  );
};
export default Detail;
