
import React from "react";
import styles from "./DsDeviations.module.css";

export interface DeviationProps{
  Title:string;
    Reasons:string[];
    status:string;
    Actions:React.ReactNode[]
}
const Ds_Deviations:React.FC<DeviationProps> = (deviation) => {
  return (

    <div className={styles.Deviation}>
     
        
      <div className={styles.title}><b>{deviation.Title}</b></div>
      
      <div>
       <ul className={styles.list}>
         {deviation.Reasons.map((reason, index) => (
            <li key={index}>{reason}</li>
         ))}
      </ul>  
     </div>
     
        <div className={styles.Status}>{deviation.status}</div>
 
         <div className={styles.Buttons}>
        
           {deviation.Actions.map((action, index) => (
                    <span key={index}>{action}</span>
                    
                ))}

        </div>       

    </div>

    
  );
};

export default Ds_Deviations;