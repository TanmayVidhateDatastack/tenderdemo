import DsCsvUpload from "@/Elements/DsComponents/DsButtons/dsCsvUpload";
import TextArea from "@/Elements/DsComponents/DsInputs/dsTextArea";
import styles from "./deposite.module.css";
import { updateDocuments, useTenderData } from "../TenderDataContextProvider";
import IconFactory from "@/Elements/IconComponent";
import { useAppSelector } from "@/Redux/hook/hook";
import { RootState } from "@/Redux/store/store";
import { downloadDocumentUrl } from "@/Common/helpers/constant";

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
  const permissions = useAppSelector((state: RootState) => state.permissions);
  const { condtionNotesDisable, attachFileConditionButtonDisable } = permissions;
  return (
    <>
      <div className={styles.emdContainer}>
        <div className={styles.emdContainerHead} id={id}>
          <div className={styles.headTitle}>{title}</div>
        </div>
        <div className={styles.notes}>
          <span className={styles.notesTitle}>Notes</span>
          <TextArea
            containerClasses={styles.feeFields}
            className={styles.notesField}
            initialValue={
              tenderData.tenderSupplyCondition.applicableConditions?.find(
                (x) => x.type == type
              )?.notes || ""
            }
            id="embossmentNotes"
            placeholder="Please type here"
            minRows={2}
            disable={condtionNotesDisable}
            onBlur={(e) => {
              updateApplicableCondition(
                type,
                "notes",
                (e.target as HTMLInputElement).value
              );
            }}
          />
        </div>
        <div className={styles.attachFileBtn}>
          <DsCsvUpload
            id={id + "UploadedDocuments"}
            label="Attach File"
            buttonViewStyle="btnText"
            buttonSize="btnSmall"
            disable={attachFileConditionButtonDisable}
            startIcon={
              <IconFactory
                name="fileAttach"
                disabled={attachFileConditionButtonDisable} />}
            previouslySelectedFile={
              tenderData.tenderDocuments?.filter(
                (x) =>
                  x.documentType == type &&
                  x.documentCategory == "TENDER_SUPPLY_CONDITION"
                  // x.id !== undefined
              ).map((x) => {
                return {
                  ...x,
                  fileDownloadHref: downloadDocumentUrl(tenderData.id, x.id),
                };
              }) || []
            }
            onSelectedFileChange={(files) => {
              const typeDocuments =
                tenderData.tenderDocuments?.filter(
                  (x) =>
                    x.documentType == type &&
                    x.documentCategory == "TENDER_SUPPLY_CONDITION"
                ) || [];
              // console.log("updateDocuments",files); 
              updateDocuments(
                files,
                typeDocuments,
                removeTenderDocument,
                addNewTenderDocument,
                type,
                "TENDER_SUPPLY_CONDITION",
              );

            }}
          ></DsCsvUpload>
        </div>
      </div>
    </>
  );
};
export default DsSupplyConditions; 