// import Image from "next/image";
// import styles from "./page.module.css";
// import buttonStyles from "./Components/DsButton/Ds_Button.module.css";
// import PaneStyles from "./Components/DsPane/DsPane.module.css";
// import addIcon from "./Icons/add.svg";
// import DSButton from "./Components/DsButton/DsButton";
// import DsPane from "./Components/DsPane/DsPane";
// import PaneOpenButton from "./Components/DsPane/PaneOpenButton";
"use client";
import DemoLayout from "@/app/ElProComponents/Demo/demoLayout";
// import { useState } from "react";
// import Ds_UserProfile from "./Components/DsUserProfile/DsUserProfile";
// import Ds_Usershort from "./Components/DsUserProfile/DsUsershort";
// import Ds_UserProfile from "./Components/DsUserProfile/DsUserProfile";

import Ds_Deviations, { DeviationProps } from "./DsDeviations";

export default function DemoDeviation() {
  const deviation:DeviationProps = {
    Title: "Basic Check Fail",
    Reasons: ["Drug licence no.has Expired ", "FSSAI licence No.has Expired"],
    status: "Approval Pending ",
    Actions: [
      <button key="reject"> Reject</button>,
      <button key="approve"> Approve</button>,
    ],
  };
  return (
    <DemoLayout title="Deviation Card (dsDeviation)">
      <Ds_Deviations Actions={deviation.Actions} Reasons={deviation.Reasons} Title={deviation.Title} status={deviation.status} />
    </DemoLayout>
  );
}
