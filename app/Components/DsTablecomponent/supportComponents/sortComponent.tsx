import styles from "../DsTable.module.css";
import verticalArrow from "../../../Icons/smallIcons/verticleArrow.svg";
import DSButton from "../../dsButton/dsButton";
import Image from "next/image";
export interface sortprops {
  columnIndex: number;
  sortTable: (
    e: React.MouseEvent,
    columnIndex: number,
    type: "ASC" | "DESC"
  ) => void;
}

const SortComponent: React.FC<sortprops> = ({ columnIndex, sortTable }) => {
  return (
    <div className={`${styles["arrow-container"]} column-index-${columnIndex}`}>
      {/* <span
        className={`${styles["cursor-pointer"]} sort-icon up`}
        onClick={(e) => sortTable(e, columnIndex, "ASC")}
      >
        ▲
      </span>
      <span
        className={`${styles["cursor-pointer"]} sort-icon down`}
        onClick={(e) => sortTable(e, columnIndex, "DESC")}
      >
        ▼
      </span> */}
      <DSButton
        type="icon_image"
        buttonSize="btnSmall"
        className={`${styles["cursor-pointer"]} ${styles["arrow-container"]} sort-icon up`}
        startIcon={<Image src={verticalArrow} alt="icon" />}
        handleOnClick={(e) => {
          const tr = e.target as HTMLElement;
          if (tr.classList.contains("ASC")) {
            tr.classList.remove("ASC");
            tr.classList.add("DESC");
            sortTable(e, columnIndex, "DESC");
          } else if (tr.classList.contains("DESC")) {
            tr.classList.remove("DESC");
            tr.classList.add("ASC");
            sortTable(e, columnIndex, "ASC");
          } else {
            tr.classList.add("ASC");
            sortTable(e, columnIndex, "ASC");
          }
          if (tr.style.transform == "") {
            tr.style.transform = "rotateX(180deg)";
          } else {
            tr.style.transform = "";
          }
        }}
      />
    </div>
  );
};

export default SortComponent;
