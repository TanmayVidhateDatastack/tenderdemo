"use client";
import styles from "./dsstatusIndicator.module.css";
import btnStyles from "../dsButton/dsButton.module.css";
import dsStatus from "../../constant";

interface DsStatusIndicatorProps {
  status?: dsStatus;
  stateClass?: string;
  id?: string;
  label?: string;
}

const DsStateChange: React.FC<DsStatusIndicatorProps> = ({
  stateClass,
  id,
  label,
  status = "under_approved",
}) => {
  return (
    <>
      <div
        className={
          btnStyles.btnContained+" "+ styles.statusIndicator + " " + stateClass + " "  + styles[status]
        }
        id={id}
      >
        {label}
      </div>
    </>
  );
};

export default DsStateChange;
