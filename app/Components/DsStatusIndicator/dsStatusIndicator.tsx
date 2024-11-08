"use client";
import styles from "./dsstatusIndicator.module.css";
// import btnStyles from "../dsButton/dsButton.module.css";
import dsStatus from "../../constant";
import React from "react";
import PopUpContext, {
  displayContext,
  closeContext,
  // handlerblur,
} from "../dsContextHolder/dsContextHolder";
// import PopUpContext from "../dscontext/dscontext";

interface DsStatusIndicatorProps {
  status?: dsStatus;
  className?: string;
  id?: string;
  label?: string;
  type?: string;
  status_icon?: React.ReactElement;
  btn_label?: string;
  handleOnClick?: (e: React.MouseEvent<HTMLElement>) => void;
  handleOnHover?: (e: React.MouseEvent<HTMLElement>) => void;
  tooltip?: string;
  positionProp?: "top" | "bottom" | "left" | "right";
  showArrow?: boolean;
  comment?: string;
}

const DsStateChange: React.FC<DsStatusIndicatorProps> = ({
  className,
  id,
  label,
  status = "under_approved",
  type = "system_default",
  status_icon,
  handleOnClick,
  handleOnHover,
  btn_label,
  tooltip,
  positionProp = "top",
  showArrow = "true",
  comment,
}) => {
  const contextMenuId = "context-display";

  return (
    <>
      {type == "system_default" && (
        <>
          <div className={styles.statusIndicator}>
            <div
              className={
                styles.btnContained +
                " " +
                styles.statusIndicator +
                " " +
                className +
                " " +
                styles[status]
              }
              id={id}
            >
              {label}
            </div>

            {btn_label && (
              <button
                onClick={handleOnClick}
                className={"icon " + styles.button_label}
                title={tooltip != undefined ? tooltip : tooltip}
                onMouseOver={handleOnHover}
              >
                {btn_label}
              </button>
            )}
          </div>
        </>
      )}
      {type == "user_defined" && (
        <>
          <div id={id} className={styles.statusIndicator}>
            <div
              className={
                styles.btnContained + " " + className + " " + styles[status]
              }
              id={id}
            >
              {label}
            </div>
            {status_icon && (
              <button
                id={id}
                className={"icon " + styles.status_icon}
                onMouseOver={(e) => {
                  displayContext(e, contextMenuId); // Call first function
                }}
                onMouseLeave={() => closeContext(contextMenuId)}
              >
                {status_icon}
                <PopUpContext id={contextMenuId} content={comment} />
              </button>
            )}
          </div>
        </>
      )}
    </>
  );
};

export default DsStateChange;
