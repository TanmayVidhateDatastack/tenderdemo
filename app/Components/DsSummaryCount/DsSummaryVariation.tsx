import React from "react";
import  styles from "./DsSummaryCount.module.css"


export interface countVariationProps {
    Title:string;
    Value:string;
    statusValues: Array<{ status: string; value: string }>; 
    
  }

const Ds_SummaryVariation :React.FC<countVariationProps> = ({ Title,Value, statusValues })  => {
    
    return(

        <div className={styles.summaryVariation}>
        <div className={styles.title}>
          <div><b>{Title}</b></div>
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
export default Ds_SummaryVariation;