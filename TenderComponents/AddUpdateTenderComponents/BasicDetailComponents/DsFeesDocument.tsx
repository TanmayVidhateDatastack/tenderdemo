import DsButton from "@/Elements/DsComponents/DsButtons/dsButton";
import DsCsvUpload from "@/Elements/DsComponents/DsButtons/dsCsvUpload";
import Ds_checkbox from "@/Elements/DsComponents/DsCheckbox/dsCheckbox";
import DsTextField from "@/Elements/DsComponents/DsInputs/dsTextField";
import DsSingleSelect from "@/Elements/DsComponents/dsSelect/dsSingleSelect";
import Image from "next/image";
import downarrow from "@/Common/TenderIcons/smallIcons/verticleArrow.svg";
import styles from "./deposite.module.css";
import eleStyles from "./tender.module.css";
import { DsSelectOption } from "@/Common/helpers/types";
import { useTenderData } from "../TenderDataContextProvider";
import TextArea from "@/Elements/DsComponents/DsInputs/dsTextArea";
import DatePicker from "@/Elements/DsComponents/DsDatePicker/DsDatePicker";

export type tenderDocument = {
  name: string;
  document: File;
};
 
export type tenderFee = {
  type: string;
  amount: number;
  currency: string;
  paidBy: string;
  paymentMode: string;
  paymentDueDate: string;
  notes: string;
  documents: tenderDocument[];
};
 
export interface DsFeesProps {
  title: string;
  id: string;
  mode: DsSelectOption[];
  paidBy: DsSelectOption[];
  downloadVisible: boolean;
  paymentCompletedVisible: boolean;
}
 
const getTodayDate = (date: Date) => {
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, "0"); // Ensure two digits
  const day = date.getDate().toString().padStart(2, "0"); // Ensure two digits

  return `${year}-${month}-${day}`;
};

const DsFeesDocument: React.FC<DsFeesProps> = ({
  title,
  id,
  mode,
  paidBy,
  downloadVisible,
  paymentCompletedVisible
}) => {
  const { updateTenderFee } = useTenderData();
  return (
    <>
      <div>
        <div>
          <div className={styles.emdContainerHead} id={id}>
            <div>{title}</div>
            {downloadVisible && (
              <DsButton
                label="Download Reciept"
                disable={true}
                startIcon={<Image src={downarrow} alt="downarrow" />}
              />
            )}
          </div>
          <div>
            {paymentCompletedVisible && (
              <div>
                <Ds_checkbox
                  id={"payment"}
                  name={"Payment Completed"}
                  value={"Payment Completed"}
                  label={"Payment Completed"}
                />
              </div>
            )}
          </div>
        </div>
        <div className={eleStyles.inputDetails}>
          <div className={styles.fieldColors}>

            <DsTextField
              // className={styles.fieldColors}
              label={"Amount"}
              // placeholder="Please type here"
              inputType="positive"
              onChange={(e) => {
                updateTenderFee(
                  id.replace("DocumentView", ""),
                  "amount",
                  e.target.value
                );
              }}
            ></DsTextField>
          </div>
          <div className={styles.fieldColors}>

            <DsSingleSelect
              // className={styles.fieldColors}
              id={id + "_paidType1"}
              options={paidBy}
              label="Paid by"
              placeholder={"Please select here"}
              setSelectOption={(option) => {
                if (typeof option.value == "string") {
                  updateTenderFee(
                    id.replace("DocumentView", ""),
                    "paidBy",
                    option.value
                  );
                }
              }}
            ></DsSingleSelect>
          </div>
          <div className={styles.fieldColors}>

            <DsSingleSelect
              // className={styles.fieldColors}
              id={id + "_modes1"}
              options={mode}
              label="Modes"
              placeholder={"Please search and select here"}
              setSelectOption={(option) => {
                if (typeof option.value == "string") {
                  updateTenderFee(
                    id.replace("DocumentView", ""),
                    "paymentMode",
                    option.value
                  );
                }
              }}
            ></DsSingleSelect>
          </div>
          <div className={styles.fieldColors}>

          <DatePicker
              id={id + "dueDate"}
              initialDate={""}
              className={""}
              placeholder="DD/MM/YYYY"
              label="Due Date"
              setDateValue={(date) => {
                if (date instanceof Date) {
                  updateTenderFee(id.replace("DocumentView",""),"paymentDueDate",getTodayDate(date));
                }
              }}
            />
          </div>
        </div>
 
        <div className={styles.notes}>
          <h4>Notes</h4>
          <div className={styles.fieldColors}>

            <TextArea
              // className={styles.fieldColors}
              placeholder="Please type here"
              disable={false}
              onChange={(e) => {
                updateTenderFee(
                  id.replace("DocumentView", ""),
                  "type",
                  e.target.value
                );
              }}
            />
          </div>
        </div>
        <div>
          <DsCsvUpload
            id={id + "UploadedDocuments"}
            label="Attach File"
            buttonViewStyle="btnText"
            buttonSize="btnSmall"
          ></DsCsvUpload>
        </div>
      </div>
    </>
  );
};
 
export default DsFeesDocument;
 
 