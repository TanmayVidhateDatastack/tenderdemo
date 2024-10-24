
import React from "react";
import styles from "./Ds_UserProfile.module.css";


export interface userprops{
   user:{name: string,
   email: string,
   Id: string,
   Company: string,
   Department: string,
   Location: string
};
   onProfileClick:()=>void;
   
}

const Ds_UserProfile:React.FC<userprops>=({ user,onProfileClick }) => {
  return ( 



   <div className={styles.UserProfile} onClick={onProfileClick}>
      
      <div className="profileImage">
       
      </div>

    <div className={styles.UserDetailed}>

      <div className={styles.UserName}><b>{user.name}</b></div>
      <div className={styles.UserId}>EMP ID:{user.Id}</div>
      <div className={styles.UserEmail}>{user.email}</div>
      
    </div>

      <hr className={styles.hr}></hr>

    <div className={styles.CompanyDetails}>
      <div className="CompanyName">{user.Company}</div>|
      <div className="UserDepartment">{user.Department}</div>|
      <div className="UserLocation">{user.Location}</div>
    </div>

    <hr className={styles.hr}></hr>

    <div className={styles.Buttons}>
     <div > <button className={styles.SettingBtn}>Account Setting</button> </div>
     <div><button className={styles.LogoutBtn}>Logout</button></div>
    </div>

   </div>
    
    
  );
};

export default Ds_UserProfile;
