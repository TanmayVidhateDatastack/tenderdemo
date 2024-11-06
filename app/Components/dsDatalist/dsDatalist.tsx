
'use client'
import styles from "./dsDatalist.module.css"
import React, { useState } from "react";
interface datalistOptions {
  attributes: Record<string, string>;
  id: string;
  value?: string;
}
interface DataListProps {
  options: datalistOptions[];
  handleChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleKeyUp?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  placeholder?: string;
  inputId: string;
  label?:string;
  disable?:boolean
  dataListId: string;
  className:string;
  customAttributes?: Record<string, string>;
}






const DataList: React.FC<DataListProps> = ({
  handleChange,
  handleKeyUp,
  options,
  customAttributes,
  placeholder,
  disable,
  label,
  inputId,
  className,
  dataListId,

}) => {
  {
    const [value, setValue] = useState("");

    const [isFocused, setIsFocused] = useState(false);
    return (
      <>
        <div >
          <fieldset
            className={`${styles["custom-fieldset"]} ${
              isFocused || value !== "" ? styles["focused"] : ""
            } ${disable ? styles.disabled : ""}`}
          >
            <legend
              className={`${styles["floating-label"]} ${
                isFocused || value !== "" ? styles["shrink"] : ""
              }`}
            >
              {label}
            </legend>
            
            <div className={styles["input-wrapper"]}>
                <input
                  className={`${styles["custom-input"]}  ${className || ""}`}
                  onFocus={() => setIsFocused(true)}
                  onChange={(e) => {
                    setValue(e.target.value);
                    if (handleChange) handleChange(e);
                  }}
                  required
                  onKeyUp={handleKeyUp}
                  disabled={disable}
                  onBlur={() => setIsFocused(false)}
                  list={dataListId}
                  placeholder={isFocused ? placeholder : ""}
                  autoComplete="off"
                  {...(customAttributes && {
                    ...Object.keys(customAttributes)?.reduce((acc, key) => {
                      acc[`data-${key}`] = customAttributes[key];
                      return acc;
                    }, {}as Record<string,string|number|boolean>),
                  })}
                  id={inputId}
                />

<datalist id={dataListId}  className={`${styles["datalist"]}`}>
        {options?.map((option, index) => (
          <option
            key={index}
            value={option.id}

            {...(option.attributes ?{
              ...Object.keys(option.attributes)?.reduce((acc, key) => {
                if(option.attributes)
                {
                acc[`data-${key}`] = option.attributes[key];
                }
                return acc;
              },  {}as Record<string,string|number|boolean>),
                 }:{})}
          >
            {option.value}
          </option>
        ))}
      </datalist>
            
            </div>
          </fieldset>
        </div>
      </>
    );
  }
};
export default DataList;










