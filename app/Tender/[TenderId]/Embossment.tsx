import styles from "./deposits.module.css";
import DSButton from "@/app/Elements/Components/dsButton/dsButton";
import Image from "next/image";
import downarrow from "@/app/Elements/Icons/smallIcons/verticleArrow.svg";
import TextField from "@/app/Elements/Components/DsTextField/DsTextField";

export default function Embossment() {
  return (
    <div className={styles.container}>
      <div className={styles.emdContainer}>
        <div className={styles.emdContainerHead}>
          <div>Embossment on Tablet</div>
          <DSButton
            buttonViewStyle="btnText"
            className={styles.optionBtn}
            label="Applicable Supply Conditions"
            endIcon={<Image src={downarrow} alt="downarrow" />}
          />
        </div>

        <div className={styles.notes}>
          <h4>Notes</h4>
          <TextField
            placeholder="Please type here"
            // label="label"
            disable={false}
            type="multiline"
            minRows={5}
          />
        </div>
        <div>
          <DSButton
            id="upload1"
            label="Attach File"
            type="upload"
            buttonViewStyle="btnText"
            buttonSize="btnSmall"
          ></DSButton>
        </div>
      </div>
      <div className={styles.emdContainer}>
        <div className={styles.emdContainerHead}>
          <div>Leogram</div>
        </div>

        <div className={styles.notes}>
          <h4>Notes</h4>
          <TextField
            placeholder="Please type here"
            // label="label"
            disable={false}
            type="multiline"
            minRows={5}
          />
        </div>
        <div>
          <DSButton
            id="upload2"
            label="Attach File"
            type="upload"
            buttonViewStyle="btnText"
            buttonSize="btnSmall"
          ></DSButton>
        </div>
      </div>
      <div className={styles.emdContainer}>
        <div className={styles.emdContainerHead}>
          <div>Bar Coding</div>
        </div>

        <div className={styles.notes}>
          <h4>Notes</h4>
          <TextField
            placeholder="Please type here"
            // label="label"
            disable={false}
            type="multiline"
            minRows={5}
          />
        </div>
        <div>
          <DSButton
            id="upload3"
            label="Attach File"
            type="upload"
            buttonViewStyle="btnText"
            buttonSize="btnSmall"
          ></DSButton>
        </div>
      </div>
      <div className={styles.emdContainer}>
        <div className={styles.emdContainerHead}>
          <div>Printing</div>
        </div>

        <div className={styles.notes}>
          <h4>Notes</h4>
          <TextField
            placeholder="Please type here"
            // label="label"
            disable={false}
            type="multiline"
            minRows={5}
          />
        </div>
        <div>
          <DSButton
            id="upload4"
            label="Attach File"
            type="upload"
            buttonViewStyle="btnText"
            buttonSize="btnSmall"
          ></DSButton>
        </div>
      </div>
    </div>
  );
}
