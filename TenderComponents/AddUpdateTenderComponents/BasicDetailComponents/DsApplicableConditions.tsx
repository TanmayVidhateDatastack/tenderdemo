import styles from "./deposite.module.css";
import Image from "next/image";
import downarrow from "@/Icons/smallIcons/verticleArrow.svg";
import { useState, useEffect } from "react";
import React from "react";
import Ds_checkbox from "@/Elements/DsComponents/DsCheckbox/dsCheckbox";
import { createContext } from "@/Elements/DsComponents/dsContextHolder/dsContextHolder";
import {
  displayContext,
  closeContext
} from "@/Elements/DsComponents/dsContextHolder/dsContextHolder";
import { CheckboxProp } from "@/helpers/types";
import DsButton from "@/Elements/DsComponents/DsButtons/dsButton";
import DsCsvUpload from "@/Elements/DsComponents/DsButtons/dsCsvUpload";
import TextArea from "@/Elements/DsComponents/DsInputs/dsTextArea";

const DsApplicableConditions: React.FC = () => {
  const contextMenuId = "context-display-11";
  const [context, setContext] = useState(false);
  const [embossmentTableVisible, setEmbossmentTebleVisible] = useState(false);
  const [logogramVisible, setLogogramVisible] = useState(false);
  const [barcodingVisible, setBarCodingVisible] = useState(false);
  const [printingVisible, setPrintingVisible] = useState(false);
  const [checkedCheckboxes, setCheckedCheckboxes] = useState<string[]>([]);

  const checkboxOptions: CheckboxProp[] = [
    {
      label: "Embossment on Tablet",
      id: "embossmentTablet",
      name: "Embossment on Tablet",
      value: "Embossment on Tablet"
    },
    {
      label: "Logogram",
      id: "logogram",
      name: "Logogram",
      value: "Logogram"
    },
    {
      label: "Bar Coding",
      id: "barcoding",
      name: "Bar Coding",
      value: "Bar Coding"
    },
    {
      label: "Printing",
      id: "printing",
      name: "Printing",
      value: "Printing"
    }
  ];

  function handleonclick(e) {
    setContext(true);
    console.log("context : ", context);
    displayContext(e, contextMenuId);
  }

  const handleCheckboxClick = (e) => {
    const { id, checked } = e.target as HTMLInputElement;
    // console.log("checked id : ", id);

    // if (checked) {
    //   setCheckedCheckboxes((prevState) => [...prevState, id]);

    // } else {
    //   setCheckedCheckboxes((prevState) =>
    //     prevState.filter((checkbox) => checkbox !== id)
    //   );
    // }
  };

  const handleAdd = (e) => {
    checkboxOptions.forEach((opt) => {
      if ((document.getElementById(opt.id) as HTMLInputElement)?.checked) {
        if (opt.id == "embossmentTable") {
          setEmbossmentTebleVisible(true);
        } else if (opt.id == "logogram") {
          setLogogramVisible(true);
        } else if (opt.id == "barcoding") {
          setBarCodingVisible(true);
        } else if (opt.id == "printing") {
          setPrintingVisible(true);
        }
      } else {
        console.log("no checkbox is checked");
        if (opt.id == "embossmentTable") {
          setEmbossmentTebleVisible(false);
        } else if (opt.id == "logogram") {
          setLogogramVisible(false);
        } else if (opt.id == "barcoding") {
          setBarCodingVisible(false);
        } else if (opt.id == "printing") {
          setPrintingVisible(false);
        }
      }
    });
  };

  useEffect(() => {
    console.log("context1 : ", context);

    createContext(
      contextMenuId,
      <>
        <div>
          {checkboxOptions.map((checkbox, index) => (
            <Ds_checkbox
              key={index}
              id={checkbox.id}
              name={checkbox.name}
              value={checkbox.value}
              label={checkbox.label}
              isChecked={checkedCheckboxes.includes(checkbox.id)}
              onClick={handleCheckboxClick}
            />
          ))}
        </div>
        <DsButton
          label="Add"
          buttonViewStyle="btnContained"
          className={styles.addBtn}
          buttonSize="btnLarge"
          onClick={(e) => handleAdd(e)}
        />{" "}
      </>,
      true
    );
    window.addEventListener("click", (e) => {
      const target = (e.target as HTMLElement).closest(
        `.${styles["depositsBtn"]}`
      );

      const target2 = (e.target as HTMLElement).closest(`#${contextMenuId}`);

      if (!target && !target2) {
        closeContext(contextMenuId);
        return;
      }
    });

    return () => {
      window.removeEventListener("click", (e) => {
        const target = (e.target as HTMLElement).closest(
          `.${styles["depositsBtn"]}`
        );
        const target2 = (e.target as HTMLElement).closest(`#${contextMenuId}`);

        if (!target && !target2) {
          closeContext(contextMenuId);
          return;
        }
      });
    };
  }, []);
  return (
    <div className={styles.container}>
      <div className={styles.emdContainerHead2}>
        {/* <div>{checkedName}</div> */}
        <DsButton
          buttonViewStyle="btnText"
          className={styles.optionBtn + " " + styles.depositsBtn}
          label="Applicable Supply Conditions"
          endIcon={<Image src={downarrow} alt="downarrow" />}
          onClick={(e) => handleonclick(e)}
        />
      </div>
      {embossmentTableVisible && (
        <div className={styles.emdContainer}>
          <div className={styles.emdContainerHead}>
            <div>Embossment on Table</div>
          </div>
          <div className={styles.notes}>
            <h4>Notes</h4>
            <TextArea
              placeholder="Please type here"
              // label="label"
              disable={false}
              //   type="multiline"
              // minRows={5}
            />
          </div>
          <div className={styles.attachFileBtn}>
            <DsCsvUpload
              id="upload1"
              label="Attach File"
              // type="upload"
              buttonViewStyle="btnText"
              buttonSize="btnSmall"
            ></DsCsvUpload>
          </div>
        </div>
      )}
      {logogramVisible && (
        <div className={styles.emdContainer}>
          <div className={styles.emdContainerHead}>
            <div>Leogram</div>
          </div>

          <div className={styles.notes}>
            <h4>Notes</h4>
            <TextArea
              placeholder="Please type here"
              // label="label"
              disable={false}
              // type="multiline"
              // minRows={5}
            />
          </div>
          <div>
            <DsCsvUpload
              id="upload2"
              label="Attach File"
              // type="upload"
              buttonViewStyle="btnText"
              buttonSize="btnSmall"
            ></DsCsvUpload>
          </div>
        </div>
      )}
      {barcodingVisible && (
        <div className={styles.emdContainer}>
          <div className={styles.emdContainerHead}>
            <div>Bar Coding</div>
          </div>

          <div className={styles.notes}>
            <h4>Notes</h4>
            <TextArea
              placeholder="Please type here"
              // label="label"
              disable={false}
              // type="multiline"
              // minRows={5}
            />
          </div>
          <div>
            <DsCsvUpload
              id="upload3"
              label="Attach File"
              // type="upload"
              buttonViewStyle="btnText"
              buttonSize="btnSmall"
            ></DsCsvUpload>
          </div>
        </div>
      )}
      {printingVisible && (
        <div className={styles.emdContainer}>
          <div className={styles.emdContainerHead}>
            <div>Printing</div>
          </div>

          <div className={styles.notes}>
            <h4>Notes</h4>
            <TextArea
              placeholder="Please type here"
              // label="label"
              disable={false}
              // type="multiline"
              // minRows={5}
            />
          </div>
          <div>
            <DsCsvUpload
              id="upload4"
              label="Attach File"
              // type="upload"
              buttonViewStyle="btnText"
              buttonSize="btnSmall"
            ></DsCsvUpload>
          </div>
        </div>
      )}
    </div>
  );
};
export default DsApplicableConditions;
