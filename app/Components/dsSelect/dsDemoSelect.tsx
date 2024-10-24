"use client";

import DsSelect from "./dsSelect";
import DemoLayout from "@/app/ElProComponents/Demo/demoLayout";



const DemoSelect: React.FC = () => {
const options = ["option1", "option2", "option3", "option4", "option5"];
  return (
  
          <DemoLayout title="DsSelect">

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
    </DemoLayout>
            
    
     
       
  );
};
 
export default DemoSelect;
 
 
 

