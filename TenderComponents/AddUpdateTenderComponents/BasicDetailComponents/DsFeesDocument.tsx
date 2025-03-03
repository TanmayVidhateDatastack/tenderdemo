import DsButton from "@/Elements/DsComponents/DsButtons/dsButton";
import DsCsvUpload, {
  getFilesFromLocalStorage
} from "@/Elements/DsComponents/DsButtons/dsCsvUpload";
import Ds_checkbox from "@/Elements/DsComponents/DsCheckbox/dsCheckbox";
import DsTextField from "@/Elements/DsComponents/DsInputs/dsTextField";
import DsSingleSelect from "@/Elements/DsComponents/dsSelect/dsSingleSelect";
import Image from "next/image";
import downarrow from "@/Icons/smallIcons/verticleArrow.svg";
import styles from "./deposite.module.css";
import calender from "@/Icons/smallIcons/calender.svg";
import eleStyles from "./tender.module.css";
import { DsSelectOption } from "@/helpers/types";
import { useTenderData } from "../TenderDataContextProvider";
import TextArea from "@/Elements/DsComponents/DsInputs/dsTextArea";
 
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
}
 
const DsFeesDocument: React.FC<DsFeesProps> = ({
  title,
  id,
  mode,
  paidBy,
  downloadVisible = false
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
            <div>
              <Ds_checkbox
                id={"payment"}
                name={"Payment Completed"}
                value={"Payment Completed"}
                label={"Payment Completed"}
              />
            </div>
          </div>
        </div>
        <div className={eleStyles.inputDetails}>
          <DsTextField
            className={styles.fieldColors}
            label={"Amount"}
            placeholder="Please type here"
            onChange={(e) => {
              updateTenderFee(
                id.replace("DocumentView", ""),
                "amount",
                e.target.value
              );
            }}
          ></DsTextField>
          <DsSingleSelect
            className={styles.fieldColors}
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
          <DsSingleSelect
            className={styles.fieldColors}
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
          <DsTextField
            className={styles.fieldColors}
            label="Due Date"
            placeholder="DD/MM/YYYY"
            iconEnd={<Image src={calender} alt="icon" />}
            onChange={(e) => {
              updateTenderFee(
                id.replace("DocumentView", ""),
                "paymentDueDate",
                e.target.value
              );
            }}
          ></DsTextField>
        </div>
 
        <div className={styles.notes}>
          <h4>Notes</h4>
          <TextArea
            className={styles.fieldColors}
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
        <div>
          <DsCsvUpload
            id={id + "UploadedDocuments"}
            label="Attach File"
            buttonViewStyle="btnText"
            buttonSize="btnSmall"
            onSetFiles={(id) => {
              getFilesFromLocalStorage(id).then((files) => {
                if (files && files.length > 0) {
                  const documentArray = files.map((file) => ({
                    name: file.attributes.name,
                    document: file.file
                  }));
 
                  updateTenderFee(
                    id.replace("DocumentView", ""),
                    "documents",
                    documentArray
                  );
                }
              });
            }}
          ></DsCsvUpload>
        </div>
      </div>
    </>
  );
};
 
export default DsFeesDocument;
 
 