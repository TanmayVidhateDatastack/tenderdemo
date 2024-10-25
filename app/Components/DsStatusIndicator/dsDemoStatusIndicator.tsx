import React from "react";
import DsStateChange from "./dsStatusIndicator";
import styles from "./dsstatusIndicator.module.css";
import DemoLayout from "@/app/ElProComponents/Demo/demoLayout";

const DsDemoStatusIndocator: React.FC = () => {
  return (
    <>
      <DemoLayout title="Staus indicators (DsStatusIndicator)" className="flex-column">

        <DsStateChange
          stateClass={styles.statusIndicator}
          id="state1"
          status="Approved"
          label="approved"
        />
        <DsStateChange
          stateClass={styles.statusIndicator}
          id="state2"
          status="Cancelled"
          label="cancelled"
        />
        <DsStateChange
          stateClass={styles.statusIndicator}
          id="state3"
          status="Pending"
          label="pending"
        />
        <DsStateChange
          stateClass={styles.statusIndicator}
          id="state4"
          status="Submitted"
          label="submitted"
        />
        <DsStateChange
          stateClass={styles.statusIndicator}
          id="state5"
          status="underApproval"
          label="under approvel"
        />
        <DsStateChange
          stateClass={styles.statusIndicator}
          id="state6"
          status="underReview"
          label="under review"
        />
        <DsStateChange
          stateClass={styles.statusIndicator}
          id="state7"
          status="InProcess"
          label="In Process"
        />
      </DemoLayout>
      
    </>
  );
};

export default DsDemoStatusIndocator;
