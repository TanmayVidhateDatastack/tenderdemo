import React from "react";
import styles from "./DsSummaryCount.module.css";

export interface countProps {
  Title: string;
  Value:string;
  statusValues: Array<{ status: string; value: string }>; 
}

const Ds_SummaryCount: React.FC<countProps> = ({ Title,Value, statusValues }) => {

  return (
    
    <div className={styles.scount}>

      <div className={styles.title}>
        <div><b>{Title}</b> </div>
        <div><b>{Value}</b></div>
      </div>
     
       {statusValues.map((item, index) => (
        <div key={index} className={styles.statusIndicator+" "+ styles[item.status.replaceAll(" ","_")]}> 

          <div className={styles.items}>
            <div className={styles.status}>{item.status}</div>
            <div className={styles.values}>{item.value}</div> 
          </div>
        </div> 
    
      ))}
    </div>
  );
};

export default Ds_SummaryCount;
