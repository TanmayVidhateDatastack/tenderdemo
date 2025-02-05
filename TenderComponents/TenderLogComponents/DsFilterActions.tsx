import DsDataList from "@/Elements/DsComponents/DsInputs/dsDatalist";
import styles from "./filteractions.module.css";
import DsTabButton from "@/Elements/DsComponents/DsButtons/DsTabButton";
import Image from "next/image";
import filter from "@/Icons/smallIcons/filtericon.svg";
import PaneOpenButton from "@/Elements/DsComponents/DsPane/PaneOpenButton";

const DsFilterActions: React.FC = () => {
  return (
    <>
      <div className={styles.filterContainer}>
        <DsDataList
          id={"tenderList"}
          dataListId={"tenderData"}
          label="Search Tender By Name, Value and Id"
          placeholder="Search Tender By Name, Value and Id"
        />
        <DsTabButton
          className={styles.submissionBtn}
          label="Near Submission"
          id="nearSubmission"
          buttonSize="btnLarge"
          buttonViewStyle="btnOutlined"
        />
        <DsTabButton
          className={styles.feesBtn}
          label="Fees Pending"
          id="fees"
          buttonSize="btnLarge"
          buttonViewStyle="btnOutlined"
        />
        <DsTabButton
          className={styles.approvalBtn}
          label="Approval"
          id="approval"
          buttonSize="btnLarge"
          buttonViewStyle="btnOutlined"
        />
        <PaneOpenButton
          paneId="y"
          id="paneBTN"
          className={styles.filterBtn}
          label="Filter"
          startIcon={<Image src={filter} alt="filter" />}
          buttonSize="btnMedium"
          buttonViewStyle="btnText"
        />
      </div>
    </>
  );
};

export default DsFilterActions;
