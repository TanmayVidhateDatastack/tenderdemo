import styles from "./deposits.module.css";
import eleStyles from "./tender.module.css";
import DSButton from "@/app/Elements/Components/dsButton/dsButton";
import Image from "next/image";
import downarrow from "@/app/Elements/Icons/smallIcons/verticleArrow.svg";
import TextField from "@/app/Elements/Components/DsTextField/DsTextField";
import DsSelect from "@/app/Elements/Components/dsSelect/dsSelect";

export default function TenderFees() {
  return (
    <div className={styles.container}>
      <div className={styles.emdContainer}>
        <div className={styles.emdContainerHead}>
          <div>Tender Fees</div>
        </div>
        <div className={eleStyles.inputDetails}>
          <TextField
            label={"Amount"}
            placeholder="Please type here"
          ></TextField>
          <DsSelect
            id={"paidType"}
            options={[
              {
                label: "Paid by IPCA",
                value: [
                  { label: "Apple", value: "apple" },
                  { label: "Banana", value: "banana" },
                ],
              },
              {
                label: "Paid by Stockist",
                value: [
                  { label: "Apple", value: "apple" },
                  { label: "Banana", value: "banana" },
                ],
              },
            ]}
            label="Paid by"
            type={"single"}
            placeholder={"Please select here"}
          ></DsSelect>
          <DsSelect
            id={"modes"}
            options={[
              {
                label: "Bank Guarantee",
                value: [
                  { label: "Apple", value: "apple" },
                  { label: "Banana", value: "banana" },
                ],
              },
              {
                label: "FDR",
                value: [
                  { label: "Apple", value: "apple" },
                  { label: "Banana", value: "banana" },
                ],
              },
              {
                label: "NEFT",
                value: [
                  { label: "Apple", value: "apple" },
                  { label: "Banana", value: "banana" },
                ],
              },
              {
                label: "RTGS",
                value: [
                  { label: "Apple", value: "apple" },
                  { label: "Banana", value: "banana" },
                ],
              },
              {
                label: "Credit Card",
                value: [
                  { label: "Apple", value: "apple" },
                  { label: "Banana", value: "banana" },
                ],
              },
              {
                label: "DD",
                value: [
                  { label: "Apple", value: "apple" },
                  { label: "Banana", value: "banana" },
                ],
              },
            ]}
            label="Modes"
            type={"single"}
            placeholder={"Please search and select here"}
          ></DsSelect>
          <TextField label="Due Date" placeholder="DD/MM/YYYY"></TextField>
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
            id="uploadFile"
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
