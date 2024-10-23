"use client";
import TextField from "./DsTextField";
import styles from "./DsTextField.module.css"
const DemoTextField: React.FC = () => {
  return (
    <>
    <TextField
    placeholder="placeholder"
    label="label"
    disable={false}
    // onClick={false}
    type="multiline"
    icon="Test"
    iconEnd="📋"
  />
      
  <TextField
  placeholder="placeholder"
  label="label"
  disable={false}
  // onClick={false}
  type="singleline"
  icon="Test"
  iconEnd="📋"
/>
     </>
        
  );
};

export default DemoTextField;






