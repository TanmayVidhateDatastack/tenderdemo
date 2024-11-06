// import Image from "next/image";
// import styles from "./page.module.css";
// import buttonStyles from "./Components/DsButton/Ds_Button.module.css";
// import PaneStyles from "./Components/DsPane/DsPane.module.css";
// import addIcon from "./Icons/add.svg";
// import DSButton from "./Components/DsButton/DsButton";
// import DsPane from "./Components/DsPane/DsPane";
// import PaneOpenButton from "./Components/DsPane/PaneOpenButton";
"use client";
import DemoDeviation from "./Components/DsDeviations/demoDeviation";
// import { useState } from "react";
// import Ds_UserProfile from "./Components/DsUserProfile/DsUserProfile";
// import Ds_Usershort from "./Components/DsUserProfile/DsUsershort";
// import Ds_UserProfile from "./Components/DsUserProfile/DsUserProfile";

import Ds_Deviations from "./Components/DsDeviations/DsDeviations";
import DemoSummaryCount from "./Components/DsSummaryCount/demoSummaryCount";
import DemoUserProfile from "./Components/DsUserProfile/demoUserProfile";


export default function Home() {
  

  return (
    <>
    <DemoSummaryCount></DemoSummaryCount>
    <DemoDeviation></DemoDeviation>
    <DemoUserProfile></DemoUserProfile>
    </>
  );
};




