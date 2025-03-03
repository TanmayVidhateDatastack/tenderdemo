import DsCsvUpload, {
    getFilesFromLocalStorage
  } from "@/Elements/DsComponents/DsButtons/dsCsvUpload";
  import TextArea from "@/Elements/DsComponents/DsInputs/dsTextArea";
  import styles from "./deposite.module.css";
  import { useTenderData } from "../TenderDataContextProvider";
   
  export interface DsApplicableConditionsProps {
    title: string;
    id: string;
  }
   
  const DsSupplyConditions: React.FC<DsApplicableConditionsProps> = ({
    title,
    id
  }) => {
    const { updateApplicableCondition } = useTenderData();
    return (
      <>
        <div className={styles.emdContainer}>
          <div className={styles.emdContainerHead} id={id}>
            <div>{title}</div>
          </div>
          <div className={styles.notes}>
            <h4>Notes</h4>
            <TextArea
              id="embossmentNotes"
              placeholder="Please type here"
              disable={false}
              onChange={(e) => {
                updateApplicableCondition(
                  id.replace("conditionsView", ""),
                  "type",
                  e.target.value
                );
              }}
            />
          </div>
          <div className={styles.attachFileBtn}>
            <DsCsvUpload
              id="upload1"
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
   
                    updateApplicableCondition(
                      id.replace("conditionsView", ""),
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
   
  export default DsSupplyConditions;
   
   