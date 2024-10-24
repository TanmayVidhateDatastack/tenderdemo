"use client";

import DsSelect from "./dsSelect";
import styles from "../../page.module.css";


const DemoSelect: React.FC = () => {
const options = ["option1", "option2", "option3", "option4", "option5"];
  return (
  
        <div className={styles.demo}>
          <DsSelect
              options={options}
              type="single"
              placeholder="Click me to select"
              label="multiselect"
            ></DsSelect>
              <DsSelect
              options={options}
              type="multi"
              placeholder="Click me to select"
              label="multiselect"
            ></DsSelect>
        </div>    
    
     
       
  );
};
 
export default DemoSelect;
 
 
 

