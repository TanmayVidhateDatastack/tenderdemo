import DsCsvUpload from "@/Elements/DsComponents/DsButtons/dsCsvUpload";
import TextArea from "@/Elements/DsComponents/DsInputs/dsTextArea";
import styles from "./deposite.module.css";
import {  updateDocuments, useTenderData } from "../TenderDataContextProvider";
import IconFactory from "@/Elements/IconComponent";

export interface DsApplicableConditionsProps {
  title: string;
  id: string;
  type: string;
}

const DsSupplyConditions: React.FC<DsApplicableConditionsProps> = ({
  title,
  type,
  id,
}) => {
  const {
    updateApplicableCondition,
    addNewTenderDocument,
    tenderData,
    removeTenderDocument,
  } = useTenderData();

  return (
    <>
      <div className={styles.emdContainer}>
        <div className={styles.emdContainerHead} id={id}>
          <div>{title}</div>
        </div>
        <div className={styles.notes}>
          <h4>Notes</h4>
          <div className={styles.fieldColors}>
            <TextArea
             initialValue={tenderData.tenderSupplyConditions[0].applicableConditions.find((x)=>x.type==type)?.notes||""}
              id="embossmentNotes"
              placeholder="Please type here"
              minRows={2}
              disable={false}
              onBlur={(e) => {
                updateApplicableCondition(
                  type,
                  "notes",
                  (e.target as HTMLInputElement).value
                );
              }}
            />
          </div>
        </div>
        <div className={styles.attachFileBtn}>

          <DsCsvUpload
            id={id + "UploadedDocuments"}
            label="Attach File"
            buttonViewStyle="btnText"
            buttonSize="btnSmall"
            startIcon={<IconFactory name="fileAttach" />}
            onSelectedFileChange={(files) => { 
              const typeDocuments = tenderData.tenderDocuments?.filter(
                (x) =>
                  x.documentType == "TENDER_SUPPLY_CONDITION" &&
                  x.category == type
              )||[];
              // console.log("updateDocuments",files);
              updateDocuments(
                files,
                typeDocuments, 
                removeTenderDocument, 
                addNewTenderDocument,
                "TENDER_SUPPLY_CONDITION",
                type
              );
            }}
          ></DsCsvUpload>
        </div>
      </div>
    </>
  );
};
export default DsSupplyConditions;
