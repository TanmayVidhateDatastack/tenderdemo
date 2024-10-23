'use client'
import React from 'react';
import { useState } from 'react';
import styles from "./dsSelect.module.css";
interface SelectProps{
    options: string[];
    placeholder: string;
}
const DsSelect:React.FC<SelectProps> =({options, placeholder= "Click to Select"})=>{
    // const[selectedOption, setSelectedOption]=useState('');
//     const handleChange = (e: { target: { value: React.SetStateAction<string>; }; }) => {
//         // setSelectedOption(selectedOption);
//         // eslint-disable-next-line @typescript-eslint/no-unused-expressions
//         setSelectedOption(e.target.value);
//       }; 
//     return(
//         <div > 
//             <h3>Dropdown</h3>
            
//             <select value={selectedOption} onChange={handleChange} className={styles.mainselection}  >
//                 <option value="Option" > </option>
//                 <option value="option1">Option 2</option>
//                 <option value="option2">Option 3</option>
//                 <option value="option3">Option 4</option>
//             </select>
//         </div>
//     );
    const[selectedOption, setSelectedOption]= useState<string>("");
    const[isOpen, setIsopen]=useState(false)
    const toggleDropdown =()=> setIsopen(!isOpen);
    const handleSelect=(option: string)=>{
        setSelectedOption(option);
        setIsopen(false);
    }
    
    return(
    <div className={styles.allselect}>
        <input
          type="text"
          value={selectedOption}
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
    );
};
export default DsSelect;