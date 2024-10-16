'use client';
import { useState } from "react";
import styles from "./DsTextField.module.css";
import { platform } from "process";

interface InputTextProps {
  handleInputChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleKeyUp?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  Onmousehover?:(e: React.KeyboardEvent<HTMLInputElement>) => void;
// onClick?:(e: React.KeyboardEvent<HTMLInputElement>) => void;
  onChange?:(e: React.KeyboardEvent<HTMLInputElement>) => void;
  onMouseOver?:(e: React.KeyboardEvent<HTMLInputElement>) => void;
  onMouseOut?:(e: React.KeyboardEvent<HTMLInputElement>) => void;
  onBlur?:(e: React.FocusEventHandler<HTMLInputElement>) => void;
  id?: string;
  className?: string;
  placeholder: string|undefined;
  label:string;
  disable:boolean;
  onClick:boolean
  type:string;
icon:string;
iconEnd:string
 // list?: string;
}



const InputText: React.FC<InputTextProps> = ({

  id,
  className,
  disable,
  placeholder,  
  label,
  type,
  icon,
  iconEnd,
  
}
) =>
{
  {
const [value, setValue] = useState('');
// const [isDisabled,setIsDisabled]=useState(false)


// useEffect(() => {
//   if (disable) {
//   const activeElement=  document.activeElement
//    as HTMLElement |null;

//    document.activeElement?.blur(); 
//   }
// }, [disable]);
const [isFocused, setIsFocused] = useState(false);
const handleKeyUp = (e: any) => 
  {
  console.log(e.key);
};

return (
  <>
  <div >

  <fieldset className={`${styles['custom-fieldset']} ${isFocused || value !== "" ? styles['focused'] : ''} ${disable?styles.disabled:""}` }>
      {/* <fieldset className={`styles.custom-fieldset ${isFocused || value!=="" ? 'styles.focused' : ''}`}> */}
        <legend className={`${styles['floating-label']} ${isFocused || value!=="" ? styles['shrink'] : ''}`}>
          {label} 
          </legend>

          <div className={styles["iconwrapper"]}>{icon && <div className={styles.icon_left}>{icon}</div>}</div>
          <div className={styles["input-wrapper"]}>

          <input
            className={`${styles['custom-input']}  ${className || ''}`}
            
            type={type}
            onFocus={() => setIsFocused(true)}
            onChange={(e) => {setValue (e.target.value) 
            }}
            required
            onKeyUp={handleKeyUp} 
            
            placeholder={isFocused ? placeholder : ""}
            disabled={disable}

            onBlur={()=>setIsFocused(false)}
            id={id}
  
          />
          </div>

          <div className={styles["iconwrapper"]}>
            {iconEnd && <div className={styles.icon_right}>{iconEnd}</div>}</div>
          
           </fieldset>
           
      </div> 
 </>
  );
};

}
export default InputText;






