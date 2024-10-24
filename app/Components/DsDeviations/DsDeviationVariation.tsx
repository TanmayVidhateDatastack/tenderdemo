
import React from "react";
import styles from "./DsDeviations.module.css";

const Ds_DeviationVariation = ({ deviationVariation }) => {
  return (

    <div className={styles.variation}>

        
      <div className={styles.title}><b>{deviationVariation?.Title}</b></div>
      
      <div>
       <ul className={styles.list}>
         {deviationVariation.Reasons.map((reason, index) => (
            <li key={index}>{reason}</li>
         ))}
      </ul>  
     </div>
     
        <div className={styles.Statusvariation}>{deviationVariation.status}</div>
 
         

    </div>

    
  );
};

export default Ds_DeviationVariation;