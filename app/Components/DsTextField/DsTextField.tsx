'use client';
import { useState } from "react";
import styles from "./DsTextField.module.css";

interface InputTextAreaProps {
  handleInputChange?: (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => void;
  handleKeyUp?: (e: React.KeyboardEvent<HTMLTextAreaElement | HTMLInputElement>) => void;
  Onmousehover?: (e: React.MouseEvent<HTMLTextAreaElement | HTMLInputElement>) => void;
  onMouseOver?: (e: React.MouseEvent<HTMLTextAreaElement | HTMLInputElement>) => void;
  onMouseOut?: (e: React.MouseEvent<HTMLTextAreaElement | HTMLInputElement>) => void;

  id?: string;
  className?: string;
  placeholder: string | undefined;
  label?: string;
  disable?: boolean;

  type?: 'singleline' | 'multiline';
  inputType?: 'password' | 'text' | 'number';
  icon?: string;
  iconEnd?: string;
  rows?: number;
  cols?: number;
  minRows?: number
}

/**
 * TextField component displays Normal input textField and textArea.
 * @param {string} id-id used for uniquely identifies the element.
 * @param {'singleline'|'multiline'} type - "Set the type of TextField: Simple Input Field (default) or TextArea (DsTextField for multiline input).
 * @param {string} ClassName -"(set name of the class )user defined styles and classes will be applied.
 * @param {'string'|'undefined'} placeholder-the placeholder displayed in DsTextField component.
 * @param {string} label - used as a title provides temporary hint.
 * @param  {boolean} disable - keep textField for readOnly purpose.
 * @param {'password'|'text'|'number'} inputType -diaplays type of the input to be enter in the textField.
 * @param {string} icon- displays icon at the Start of textfield .
 * @param {string} iconEnd-displays icon at the End of textfield.
 * @param {number} rows- use to display numbers of rows that have to show on TextArea.
 * @param {number} cols- use to display numbers of columns that have to show on TextArea.
 * @param {React.ChangeEvent} handleInputChange - event fired on change in the textField value  
 * @param {React.KeyboardEvent} handleKeyUp -event fired after key is released .
 * @param {React.KeyboardEvent} Onmousehover - Fires continuously as the mouse moves within an element.
 * @param {React.MouseEvent} onMouseOver - Fires when the mouse enters an element
 * @param {React,MouseEvent} onMouseOut - event triggers when the mouse pointer leaves the boundary of an element .
 
 */


const TextField: React.FC<InputTextAreaProps> = ({
  handleInputChange,
  handleKeyUp,
  Onmousehover,
  onMouseOut,
  onMouseOver,

  id,
  className,
  disable,
  placeholder,
  label,
  type = 'singleline',
  icon,
  iconEnd,

  inputType,
  minRows = 4,


}
) => {
  {

    const [value, setValue] = useState('');

    const [isFocused, setIsFocused] = useState(false);
    return (
      <>
        <div >

          <fieldset className={`${styles['custom-fieldset']} ${isFocused || value !== "" ? styles['focused'] : ''} ${disable ? styles.disabled : ""}`}>

            <legend className={`${styles['floating-label']} ${isFocused || value !== "" ? styles['shrink'] : ''}`}>
              {label}
            </legend>

            {type == "singleline" && (<div className={styles["iconwrapper"]}>{icon && <div className={styles.icon_left}>{icon}</div>}</div>)}
            <div className={styles["input-wrapper"]}>
              {type === 'multiline' ? (
               
               <textarea
                  className={`${styles['custom-input']}  ${className || ''}`}
                  onFocus={() => setIsFocused(true)}
                  onChange={(e) => {
                    setValue(e.target.value);
                    if(handleInputChange)
                    handleInputChange(e);
                  }}
                  required
                  onKeyUp={handleKeyUp}
                  onMouseOut={onMouseOut}
                  onMouseMove={Onmousehover}
                  onMouseOver={onMouseOver}
                  minRows={minRows}
            
                  onMouseLeave={onMouseOut}

                  placeholder={isFocused ? placeholder : ""}
                  disabled={disable}
                  aria-multiline={true}
                  // minRows={minRows}
                  onBlur={() => setIsFocused(false)}
                  id={id}

                />) :

                (
                  <input
                    className={`${styles['custom-input']}  ${className || ''}`}

                    type={inputType}
                    onFocus={() => setIsFocused(true)}
                    onChange={(e) => {
                      setValue(e.target.value);
                      if(handleInputChange)
                      handleInputChange(e);
                    }}
                    required
                    onKeyUp={handleKeyUp}
                    onMouseOut={onMouseOut}
                    onMouseMove={Onmousehover}
                    onMouseOver={onMouseOver}
                    onMouseLeave={onMouseOut}
                    placeholder={isFocused ? placeholder : ""}
                    disabled={disable}

                    onBlur={() => setIsFocused(false)}
                    id={id}

                  />

                )}
            </div>

            {type == "singleline" &&

              <div className={styles["iconwrapper"]}>
                {iconEnd && <div className={styles.icon_right}>{iconEnd}</div>}</div>}

          </fieldset>

        </div>
      </>
    );
  };

}
export default TextField;






