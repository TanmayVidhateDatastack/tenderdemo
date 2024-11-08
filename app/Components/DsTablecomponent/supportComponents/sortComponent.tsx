import styles from "../DsTable.module.css";
import verticalArrow from "../../../Icons/smallIcons/verticleArrow.svg";
import DSButton from "../../DsButton/DsButton";
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
        className={`${styles["cursor-pointer"]} sort-icon up`}
        startIcon={<Image src={verticalArrow} alt="icon" />}
        handleOnClick={(e) => sortTable(e, columnIndex, "ASC")}
      />
      {/* <DSButton
        type="icon_image"
        buttonSize="btnSmall"
        className={`${styles["cursor-pointer"]} sort-icon up`}
        startIcon={<Image src={verticalArrow} alt="icon" />}
        handleOnClick={(e) => sortTable(e, columnIndex, "ASC")}
      /> */}
    </div>
  );
};

export default SortComponent;
