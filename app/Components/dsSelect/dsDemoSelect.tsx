"use client";

import DsSelect from "./dsSelect";

const DemoSelect: React.FC = () => {
const options = ["option1", "option2", "option3", "option4", "option5"];
  return (
  
        <>
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
        </>    
    
     
       
  );
};
 
export default DemoSelect;
 
 
 

