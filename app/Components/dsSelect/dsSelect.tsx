'use client'
import React from 'react';
import { useState } from 'react';
import styles from "./dsSelect.module.css";
import Image from 'next/image';
import remove from "../../Icons/mediumIcons/remove.svg"
 
interface SelectProps{
    options: string[];
    type: "single" | "multi" ;
    placeholder: string;
    label?:string;
}
const DsSelect:React.FC<SelectProps> =({options,type, placeholder= "Click to Select",label})=>{
 
    const[selectedOption, setSelectedOption]= useState<string[]>([]);
    const[isOpen, setIsopen]=useState(false)

    const[singleSelectedOption, setSingleSelectedOption]= useState<string>("");
    const toggleDropdown =()=> setIsopen(!isOpen);
    const handleSelect=(option: string)=>{
      if(type=="single"){

        setSingleSelectedOption(option);
        setIsopen(false);
      }
   
    if(type=="multi"){
      if (selectedOption.includes(option)) {
        setSelectedOption(selectedOption.filter((selected) => selected !== option));
      } else {
        setSelectedOption([...selectedOption, option]);
      }
    }
    };
    const removeOption=(select: string)=>{
        const removeItem=selectedOption.filter(option=> option !== select);
        setSelectedOption(removeItem);
    };
    const[isFocused,setIsFocused]=useState(false);
    const[value,setValue]=useState("");
    return(
      <>
    
      { type=="multi" && (

      <div className={styles.allselect}>
      <legend
        className={`${styles["floating-label"]} ${
          isFocused || value !== "" ? styles["shrink"] : ""
        }`}
      >
        {label}
      </legend>
        <input
          type="text"
          value={isFocused ? placeholder:""}
          name="title"
          placeholder={isFocused || value !== "" ? placeholder :""}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(true)}
          onChange={(e) => setValue(e.target.value)}
          onClick={toggleDropdown}
          className={styles.mainselection}
        />    
        {isOpen && (
        <div className={styles.list }>
          {options.map((option, index) => (
            <div key={index} className={styles.option}>
              <input
                type="checkbox"
                name="check"
                id="check"
                className={styles.checkbox_container}
                checked={selectedOption.includes(option)}
                onChange={() => handleSelect(option)}
              />
              {option}
            </div>
          ))}
        </div>
      )}
        <div className={styles.selectcontainer}>
         {selectedOption.map((select, index) => (
          <div key={index} className={styles.selectoption}>
          <button className={styles.selecteditem}>{select}<Image className={styles.remove} src={remove} alt="Remove Icon" onClick={()=>removeOption(select)}/></button>
</div>
  ))}
</div>
<div>
</div>
    </div>
)
}
{ type=="single" && (
  <div>
    <div className={styles.allselect}>
        <input
          type="text"
          value={singleSelectedOption}
          name="title"
          placeholder={placeholder}
          onClick={toggleDropdown}
          className={styles.mainselection}
        />
    {isOpen &&( 
    <div className={styles.list}>
      {options.map((option,index)=>(
        <div
            key={index}
            onClick= {()=>handleSelect(option)}
            className={styles.option}
        >
           {option } 
        </div>
      ))}
    </div>
    )} 
    </div>
  </div>
)}
</>
  );
};

 
export default DsSelect;
 