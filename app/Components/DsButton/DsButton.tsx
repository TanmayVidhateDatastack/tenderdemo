import React, { useState } from "react";
import styles from "../dsButton/dsButton.module.css";
import Image from "next/image";
import uploadIcon from "../../Icons/smallIcons/uploadicon.svg";

/**
 * Button component displays buttons and buttongroup with variations
 * @param {string} id-id used for uniquely identifies the element.
 * @param {'standard'  | 'split'| "toggle"| "icon_image"| "button_icon"| "upload"| "tab"| "count"} type - Set the type of button .
 * @param {"btnSmall" | "btnMedium" | "btnLarge"} buttonSize - Set the size of button .
 * @param {"iconSmall" | "iconMedium" | "iconLarge"} iconSize - Set the size of icon .
 * @param { "btnPrimary"| "btnSecondary" | "btnDanger" | "btnWarning" | "btnDark" | "btnInfo"} buttonColor - set the color of button.
 * @param { "btnText" | "btnContained" | "btnOutlined"} buttonViewStyle - set the style of button.
 * @param {string} ClassName -(set name of the class )user defined styles and classes will be applied.
 * @param {'string'|'undefined'} label-the label displayed in DsButton component.
 * @param {"string" | "00"} count - the count displayed in DsButton initially "00".
 * @param {string} tooltip - used as a title provides temporary hint.
 * @param  {boolean} disable - keep buttons for readOnly purpose.
 * @param {Image} startIcon- displays icon at the Start of button .
 * @param {Image} endIcon-displays icon at the End of button.
 *@param {React.MouseEvent} onClick - Fires when mouse click on element.
 * @param {React.MouseEvent} onMouseOver - Fires when the mouse enters an element
 * @param {React.MouseEvent} onMouseOut - event triggers when the mouse pointer leaves the boundary of an element .
 */

export interface DSButtonProps {
  children?: React.ReactNode;
  id?: string;
  label?: string;
  tooltip?: string;
  type?:
    | "standard"
    | "split"
    | "toggle"
    | "icon_image"
    | "button_icon"
    | "upload"
    | "tab"
    | "count";
  buttonSize?: "btnSmall" | "btnMedium" | "btnLarge";
  iconSize?: "iconSmall" | "iconMedium" | "iconLarge";
  buttonColor?:
    | "btnPrimary"
    | "btnSecondary"
    | "btnDanger"
    | "btnWarning"
    | "btnDark"
    | "btnInfo";
  buttonViewStyle?: "btnText" | "btnContained" | "btnOutlined";
  disable?: boolean;
  className?: string;
  count?: string | "00";
  handleOnClick?: (e: React.MouseEvent<HTMLElement>) => void;
  img?: string;
  startIcon?: React.ReactElement;
  endIcon?: React.ReactElement;
  spliticon?: React.ReactElement;
  handleOnHover?: (e: React.MouseEvent<HTMLElement>) => void;
  handleMouseLeave?: (e: React.MouseEvent<HTMLElement>) => void;
}
const DSButton: React.FC<DSButtonProps> = ({
  id,
  label,
  className,
  buttonSize = "btnMedium",
  iconSize = "iconSmall",
  buttonColor = "btnPrimary",
  buttonViewStyle = "btnOutlined",
  type = "standard",
  count = "00",
  disable,
  tooltip,
  handleOnClick,
  children,
  handleOnHover,
  handleMouseLeave,
  startIcon,
  endIcon,
  spliticon,
}) => {
  const [toggled, setToggled] = useState(false);
  const [selectedFile, setSelectedFiles] = useState<File[]>([]);
  function displayFileBrowser(e: React.MouseEvent<HTMLButtonElement>) {
    const id = (e.target as HTMLElement)?.id;
    const fileInput = document.getElementById(
      `${id}_upload`
    ) as HTMLInputElement | null;

    fileInput?.click();

    if (fileInput) {
      fileInput.addEventListener("change", function () {
        // const maxSize = 5 * 1024 * 1024; // 5 MB
        const maxSize = 10 * 1024 * 1024;

        if (fileInput.files) {
          console.log("Selected files:");
          const validFiles: File[] = []; // To store valid files
          for (let i = 0; i < fileInput.files.length; i++) {
            const file = fileInput.files[i];
            console.log(`File ${i + 1}: ${file.name} (${file.size} bytes)`);

            if (file.size > maxSize) {
              alert("Each file must be less than 5 MB.");
              fileInput.value = ""; // Clear the selected files
              break; // Stop processing after an invalid file
            } else {
              validFiles.push(file); // Add valid file to the array
            }
          }

          if (validFiles.length > 0) {
            // Update state with valid files
            setSelectedFiles(validFiles);
          }
        }
      });
    }

    // document.getElementById("_upload")?.addEventListener("change", function () {
    //   const maxSize = 5 * 1024 * 1024; // 5 MB
    //   for (let i = 0; i < this.files.length; i++) {
    //     if (this.files[i].size > maxSize) {
    //       alert("Each file must be less than 5 MB.");
    //       this.value = ""; // Clear selected files
    //       break;
    //     }
    //   }
    // });
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  function toggleSwitch(e: React.MouseEvent<HTMLButtonElement>) {
    setToggled(!toggled);
    const button = document.querySelector(".togglebtn") as HTMLButtonElement;
    if (button) {
      if (toggled) {
        button.classList.add(styles.toggled);
      } else if (!toggled) {
        button.classList.remove(styles.toggled);
      }
    }
    // (e.target as HTMLElement).classList.add(styles.toggled);
  }
  return (
    <>
      {type == "standard" && (
        <button
          id={id}
          className={` ${
            styles.btn +
            " " +
            className +
            " " +
            styles[buttonSize] +
            " " +
            styles[buttonViewStyle] +
            " " +
            styles[buttonColor]
          } ${disable ? styles.disable : ""}`}
          title={tooltip !== undefined ? tooltip : label}
          onClick={(e) => {
            if (!disable && handleOnClick) handleOnClick(e);
          }}
          onMouseOver={(e) => {
            if (!disable && handleOnHover) handleOnHover(e);
          }}
          onMouseLeave={(e) => {
            if (!disable && handleMouseLeave) handleMouseLeave(e);
          }}
        >
          {startIcon !== undefined && (
            <span
              className={"icon " + styles.startIcon + " " + styles[iconSize]}
            >
              {startIcon}
            </span>
          )}
          {label || children}

          {endIcon !== undefined && (
            <span className={"icon " + styles.endIcon + " " + styles[iconSize]}>
              {endIcon}
            </span>
          )}
        </button>
      )}
      {type == "split" && (
        <div className={styles.split_container}>
          <button
            id={id}
            className={`${
              styles.btn +
              " " +
              className +
              " " +
              styles.split_btn +
              " " +
              styles[buttonSize] +
              " " +
              styles[buttonColor] +
              " " +
              styles[buttonViewStyle]
            } ${disable ? styles.disable : ""}`}
            title={tooltip !== undefined ? tooltip : label}
            onClick={(e) => {
              if (!disable && handleOnClick) handleOnClick(e);
            }}
            onMouseOver={(e) => {
              if (!disable && handleOnHover) handleOnHover(e);
            }}
            onMouseLeave={(e) => {
              if (!disable && handleMouseLeave) handleMouseLeave(e);
            }}
          >
            {startIcon !== undefined && (
              <span
                className={"icon " + styles.startIcon + " " + styles[iconSize]}
              >
                {startIcon}
              </span>
            )}
            {label || children}

            {endIcon !== undefined && (
              <span
                className={
                  "icon " +
                  styles.endIcon +
                  " " +
                  styles.split_icon_btn +
                  " " +
                  styles[iconSize] +
                  " " +
                  styles[buttonColor]
                }
              >
                {endIcon}
              </span>
            )}
          </button>

          <div className={styles.split_icon_btn + " " + styles.left_separator}>
            {spliticon}
          </div>
        </div>
      )}
      {type == "toggle" && (
        <div className={styles.toggle}>
          <button
            id={id}
            // className={`${styles.btn} ${className} ${styles[buttonSize]} ${styles.toggle_btn} togglebtn`}
            // className={styles.btn + " " + className + " " + styles[buttonSize]}
            className={`${styles.btn} ${className} ${styles[buttonSize]} ${
              styles.toggle_btn
            } ${toggled ? styles.toggled : ""} ${
              disable ? styles.disable : " "
            }`}
            // onClick={handleOnClick}
            // onClick={(e) => toggleSwitch(e)}
            onClick={(e) => {
              if (!disable && toggleSwitch(e)) toggleSwitch(e);
            }}
            onMouseOver={(e) => {
              if (!disable && handleOnHover) handleOnHover(e);
            }}
            onMouseLeave={(e) => {
              if (!disable && handleMouseLeave) handleMouseLeave(e);
            }}
          >
            <div className={styles.thumb}></div>
          </button>
        </div>
      )}
      {type == "icon_image" && (
        <div className={styles.icon_image}>
          <button
            id={id}
            className={`${
              styles.btn +
              " " +
              className +
              " " +
              styles.icon_image +
              " " +
              styles[buttonSize] +
              " " +
              styles[buttonViewStyle]
            } ${disable ? styles.disable : ""}`}
            onClick={(e) => {
              if (!disable && handleOnClick) handleOnClick(e);
            }}
            onMouseOver={(e) => {
              if (!disable && handleOnHover) handleOnHover(e);
            }}
            onMouseLeave={(e) => {
              if (!disable && handleMouseLeave) handleMouseLeave(e);
            }}
          >
            {startIcon !== undefined && (
              <span
                className={"icon " + styles.startIcon + " " + styles[iconSize]}
                title={tooltip !== undefined ? tooltip : tooltip}
              >
                {startIcon}
              </span>
            )}
          </button>
        </div>
      )}
      {type == "button_icon" && (
        <div className={styles.icon_image}>
          <button
            id={id}
            className={`${
              styles.btn +
              " " +
              className +
              " " +
              styles.icon_btn +
              " " +
              styles[buttonSize] +
              " " +
              styles[buttonViewStyle]
            } ${disable ? styles.disable : ""}`}
            onClick={(e) => {
              if (!disable && handleOnClick) handleOnClick(e);
            }}
            onMouseOver={(e) => {
              if (!disable && handleOnHover) handleOnHover(e);
            }}
            onMouseLeave={(e) => {
              if (!disable && handleMouseLeave) handleMouseLeave(e);
            }}
          >
            {startIcon !== undefined && (
              <span
                className={"icon " + styles[iconSize]}
                title={tooltip !== undefined ? tooltip : tooltip}
              >
                {startIcon}
              </span>
            )}
          </button>
        </div>
      )}
      {type == "upload" && (
        <div>
          <button
            id={id}
            className={`${
              styles.btn +
              " " +
              className +
              " " +
              styles[buttonSize] +
              " " +
              styles[buttonViewStyle] +
              " " +
              styles[buttonColor]
            } ${disable ? styles.disable : ""}`}
            title={tooltip !== undefined ? tooltip : label}
            // onClick={displayFileBrowser}
            onClick={(e) => {
              if (!disable && displayFileBrowser(e)) displayFileBrowser(e);
            }}
            onMouseOver={(e) => {
              if (!disable && handleOnHover) handleOnHover(e);
            }}
            onMouseLeave={(e) => {
              if (!disable && handleMouseLeave) handleMouseLeave(e);
            }}
          >
            {startIcon && (
              <span
                className={"icon " + styles.startIcon + " " + styles[iconSize]}
              >
                {startIcon}
              </span>
            )}
            {startIcon ||
              (uploadIcon && (
                <span
                  className={
                    "icon " + styles.startIcon + " " + styles[iconSize]
                  }
                >
                  {<Image src={uploadIcon} alt="icon" />}
                </span>
              ))}
            {label || children}

            {endIcon !== undefined && (
              <span
                className={"icon " + styles.endIcon + " " + styles[iconSize]}
              >
                {endIcon}
              </span>
            )}
            <input
              id={id + "_upload"}
              type="file"
              multiple
              accept=".pdf,.docs,.jpeg,.png,.svg,.xls"
              hidden
            />
          </button>

          <div>
            <h3>Selected Files:</h3>
            <div>
              {selectedFile.length === 0 ? (
                <p>No files selected</p>
              ) : (
                selectedFile.map((file, index) => (
                  <div key={index}>
                    <p>
                      <strong>File Name:</strong> {file.name}
                    </p>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      )}

      {type == "tab" && (
        <button
          id={id}
          className={`${
            styles.btn +
            " " +
            className +
            " " +
            styles.tab_btn +
            " " +
            styles[buttonSize] +
            " " +
            styles[buttonViewStyle]
          } ${disable ? styles.disable : ""}`}
          title={tooltip !== undefined ? tooltip : label}
          onClick={(e) => {
            if (!disable && handleOnClick) handleOnClick(e);
          }}
          onMouseOver={(e) => {
            if (!disable && handleOnHover) handleOnHover(e);
          }}
          onMouseLeave={(e) => {
            if (!disable && handleMouseLeave) handleMouseLeave(e);
          }}
        >
          {startIcon !== undefined && (
            <span
              className={"icon " + styles.startIcon + " " + styles[iconSize]}
            >
              {startIcon}
            </span>
          )}
          {label || children}

          {endIcon !== undefined && (
            <span className={"icon " + styles.endIcon + " " + styles[iconSize]}>
              {endIcon}
            </span>
          )}
        </button>
      )}
      {type == "count" && (
        <button
          id={id}
          className={`${
            styles.btn +
            " " +
            className +
            " " +
            styles[buttonSize] +
            " " +
            styles[buttonColor] +
            " " +
            styles[buttonViewStyle]
          } ${disable ? styles.disable : ""}`}
          title={tooltip !== undefined ? tooltip : label}
          onClick={(e) => {
            if (!disable && handleOnClick) handleOnClick(e);
          }}
          onMouseOver={(e) => {
            if (!disable && handleOnHover) handleOnHover(e);
          }}
          onMouseLeave={(e) => {
            if (!disable && handleMouseLeave) handleMouseLeave(e);
          }}
        >
          {startIcon !== undefined && (
            <span
              className={"icon " + styles.startIcon + " " + styles[iconSize]}
            >
              {startIcon}
            </span>
          )}
          {(label && (
            <>
              {label} <div className={styles.count}>{count}</div>
            </>
          )) ||
            children}

          {endIcon !== undefined && (
            <span className={"icon " + styles.endIcon + " " + styles[iconSize]}>
              {endIcon}
            </span>
          )}
        </button>
      )}
    </>
  );
};

export default DSButton;
