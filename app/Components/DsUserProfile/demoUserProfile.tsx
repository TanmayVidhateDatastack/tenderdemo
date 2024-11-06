// import Image from "next/image";
// import styles from "./page.module.css";
// import buttonStyles from "./Components/DsButton/Ds_Button.module.css";
// import PaneStyles from "./Components/DsPane/DsPane.module.css";
// import addIcon from "./Icons/add.svg";
// import DSButton from "./Components/DsButton/DsButton";
// import DsPane from "./Components/DsPane/DsPane";
// import PaneOpenButton from "./Components/DsPane/PaneOpenButton";
"use client";
import { useState } from "react";
import Ds_UserProfile from "./DsUserProfile";
import Ds_Usershort from "./DsUsershort";
import DemoLayout from "@/app/ElProComponents/Demo/demoLayout";

export default function DemoUserProfile() {
  const user = {
    name: "Abhishek Kumar",
    email: "abhishek.kumar@Ipca.com",
    Id: "5212",
    Company: "IPCA Labs",
    Department: "Formulation",
    Location: "Pune",
  };
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const toggleValue = () => {
    setIsVisible(!isVisible);
  };

  return (
    <DemoLayout title="User Card (DsUserProfile)">
      <Ds_Usershort onProfileClick={toggleValue} user={user}></Ds_Usershort>
      {isVisible && <Ds_UserProfile user={user} onProfileClick={toggleValue} />}
    </DemoLayout>
  );
}
