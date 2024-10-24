// import Image from "next/image";
// import styles from "./page.module.css";
// import buttonStyles from "./Components/DsButton/Ds_Button.module.css";
// import PaneStyles from "./Components/DsPane/DsPane.module.css";
// import addIcon from "./Icons/add.svg";
// import DSButton from "./Components/DsButton/DsButton";
// import DsPane from "./Components/DsPane/DsPane";
// import PaneOpenButton from "./Components/DsPane/PaneOpenButton";
"use client";
import Ds_DeviationsVariation from "./DsDeviations";
// import { useState } from "react";
// import Ds_UserProfile from "./Components/DsUserProfile/DsUserProfile";
// import Ds_Usershort from "./Components/DsUserProfile/DsUsershort";
// import Ds_UserProfile from "./Components/DsUserProfile/DsUserProfile";

import Ds_Deviations from "./DsDeviations";
import Ds_DeviationVariation from "./DsDeviationVariation";

export default function DemoDeviation() {


  const deviation = {
  Title:'Basic Check Fail', 
  Reasons:["Drug licence no.has Expired ",
           "FSSAI licence No.has Expired"
          ],
  status:"Approvel Pending ",
  Actions:[ <button key="reject"> Reject</button>,
            <button key="approve"> Approve</button>]


     
  };
  const deviationVariation = {
    Title:'Credit Check Fail', 
    Reasons:[
             "On hold for cheque bounce"
            ],
    status:"Deviation Pending " 
    };

  
  return (
    <div className="Ds_Deviations">
      <Ds_Deviations deviation={deviation} />
      <Ds_DeviationVariation deviationVariation={deviationVariation}/>
     </div>

  );
};