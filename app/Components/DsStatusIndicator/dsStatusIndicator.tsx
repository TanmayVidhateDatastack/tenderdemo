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

/**
 * Status Indicator component displays status Indicator
 * @param {string} id-id used for uniquely identifies the element.
 * @param {"system_default" | "user_defined"} type - Set the type of status indicator .
 * @param {dsStatus} status - set status of status indicator/ display color as per status
 * @param {string} ClassName -(set name of the class )user defined styles and classes will be applied.
 * @param {'string'} label-the label displayed in dsStatusIndicator component.
 * @param {'string'} btn_label-the label displayed in button component.
 * @param {string} tooltip - used as a title provides temporary hint.
 * @param  {boolean} disable - keep status indicator for readOnly purpose.
 * @param {Image} startIcon- displays icon at the Start of button .
 * @param {Image} endIcon-displays icon at the End of button.
 * @param {"top" | "bottom" | "left" | "right"} positionProp - set position of context menu displayed on hovering effect.
 * @param {boolean} showArrow - set arrow visibility for context menu.
 * @param {string} comment - show comment in context menu
 *@param {React.MouseEvent} onClick - Fires when mouse click on element.
 * @param {React.MouseEvent} onMouseOver - Fires when the mouse enters an element
 * @param {React.MouseEvent} onMouseOut - event triggers when the mouse pointer leaves the boundary of an element .
 */

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
