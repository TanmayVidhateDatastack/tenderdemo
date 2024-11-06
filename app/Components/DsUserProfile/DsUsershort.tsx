"use client";
import React from "react";
import styles from "./Ds_UserProfile.module.css";

export interface userprops {
  user: {
    name: string;
    email: string;
    Id: string;
    Company: string;
    Department: string;
    Location: string;
  };
  onProfileClick?: () => void;
}

const Ds_Usershort: React.FC<userprops> = ({ user, onProfileClick }) => {
   if(!onProfileClick){
      onProfileClick=()=>{
         
      }
   }
  return (
    <div className={styles.UserProfile} onClick={onProfileClick}>
      <div className="profileImage"></div>
      <div className={styles.UserDetailed}>
        <div className={styles.UserName}>
          <b>{user.name}</b>
        </div>
        <div className={styles.UserId}>EMP ID:{user.Id}</div>
      </div>
    </div>
  );
};

export default Ds_Usershort;