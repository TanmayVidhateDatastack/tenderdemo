import styles from "./DsTable.module.css";
export interface sortprops {
  columnIndex: number;
  sortTable: (e: React.MouseEvent, type: "ASC" | "DESC") => void;
}

const SortComponent: React.FC<sortprops> = ({ columnIndex, sortTable }) => {
  return (
    <div className={`arrow-container column-index-${columnIndex}`}>
      <span
        className={`${styles["cursor-pointer"]} sort-icon up`}
        onClick={(e) => sortTable(e, "ASC")}
      >
        ▲
      </span>
      <span
        className={`${styles["cursor-pointer"]} sort-icon down`}
        onClick={(e) => sortTable(e, "DESC")}
      >
        ▼
      </span>
    </div>
  );
};

export default SortComponent;
