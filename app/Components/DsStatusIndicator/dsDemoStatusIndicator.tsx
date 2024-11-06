import React from "react";
import DsStateChange from "./dsStatusIndicator";
import styles from "./dsstatusIndicator.module.css";
import commentIcon from "../../Icons/smallIcons/commenticon.svg";
import Image from "next/image";
import DemoLayout from "@/app/ElProComponents/Demo/demoLayout";

const DsDemoStatusIndocator: React.FC = () => {
  return (
    <>
      <DemoLayout title="Staus indicators (DsStatusIndicator)" className="flex-column">

        <DsStateChange
          className={styles.statusIndicator}
          type="user_defined"
          id="state1"
          status="Approved"
          label="approved"
          status_icon={<Image src={commentIcon} alt="icon" />}
          comment="Justification and Comments"
        />

        <DsStateChange
          className={styles.statusIndicator}
          type="system_default"
          id="state8"
          status="Pending"
          label="Deviation Pending"
          btn_label="Check Failed"
        />
        <DsStateChange
          className={styles.statusIndicator}
          type="system_default"
          id="state2"
          status="Cancelled"
          label="cancelled"
        />
        <DsStateChange
          className={styles.statusIndicator}
          type="user_defined"
          id="state2"
          status="Cancelled"
          label="Rejected"
          status_icon={<Image src={commentIcon} alt="icon" />}
          comment="Reason of Rejection"
        />
        <DsStateChange
          className={styles.statusIndicator}
          id="state3"
          type="system_default"
          status="Pending"
          label="pending"
        />
        <DsStateChange
          className={styles.statusIndicator}
          type="system_default"
          id="state4"
          status="Submitted"
          label="submitted"
        />
        <DsStateChange
          className={styles.statusIndicator}
          type="system_default"
          id="state4"
          status="Submitted"
          label="Open"
          btn_label="Partial qty awail"
        />
        <DsStateChange
          className={styles.statusIndicator}
          type="system_default"
          id="state4"
          status="Submitted"
          label="Open"
          btn_label="Quantity unavailable"
        />
        <DsStateChange
          className={styles.statusIndicator}
          type="system_default"
          id="state5"
          status="underApproval"
          label="under approvel"
        />
        <DsStateChange
          className={styles.statusIndicator}
          type="system_default"
          id="state6"
          status="underReview"
          label="under review"
        />
        <DsStateChange
          className={styles.statusIndicator}
          type="system_default"
          id="state7"
          status="InProcess"
          label="In Process"
        />
      </DemoLayout>
      
    </>
  );
};

export default DsDemoStatusIndocator;
