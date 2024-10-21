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
import Ds_UserProfile from "./Components/DsUserProfile/DsUserProfile";
import Ds_Usershort from "./Components/DsUserProfile/DsUsershort";


export default function Home() {


  const user = {
    name: 'Abhishek Kumar',
    email: 'abhishek.kumar@Ipca.com',
    Id: '5212',
    Company: 'IPCA Labs',
    Department: 'Formulation',
    Location: 'Pune'
    
  };
  const [isVisible,setIsVisible]=useState<boolean>(false);
const toggleValue=()=>{
setIsVisible(!isVisible);
  };

  return (
    <div className="Ds_UserProfile">
      
<Ds_Usershort onProfileClick={toggleValue}  user={user}></Ds_Usershort>
      {isVisible &&  (
      <Ds_UserProfile user={user} onProfileClick={toggleValue}/>
      )}
    </div>
  );
};




