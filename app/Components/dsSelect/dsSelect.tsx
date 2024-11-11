// "use client";

// import { useState } from "react";
// import styles from "./dsSelect.module.css";
// import DsOption from "./dsOption";
// import {
//   closeContext,
//   displayContext,
// } from "@/app/Components/dsContextHolder/dsContextHolder";

// /**
//  * DsPane component displays pane.
//  *
//  * @param {array} options - options for dropdown in json format value-option pair
//  * @param {string} type - selcting dropdown multiple selection or single select
//  * @param {string} placeholder- placehoder of input field.
//  * @param {string} label - label which is given by user
//  * @param {string} handleOnChange - return values which are selected
//  */

// interface Option {
//   label: string;
//   value: string | Option[];
// }
// interface SelectProps {
//   id: string;
//   options: Option[];
//   type: "single" | "multi" | "twolevel";
//   placeholder: string;
//   label?: string;
// }

// const DsSelect: React.FC<SelectProps> = ({
//   id = "",
//   options,
//   type,
//   placeholder = "Click to Select",
//   label,
// }) => {
//   const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
//   const [isOpen, setIsopen] = useState(false);
//   const [singleSelectedOption, setSingleSelectedOption] = useState<string[]>(
//     []
//   );
//   const toggleDropdown = () => setIsopen(!isOpen);

// const handleSelect = (option: string) => {
//   if (type == "single") {
//     if (singleSelectedOption.includes(option)) {
//       setSingleSelectedOption(
//         singleSelectedOption.filter((selected) => selected !== option)
//       );
//       closeContext("test");
//     } else {
//       setSingleSelectedOption([option]);
//     }
//   }

//   if (type == "multi") {
//     if (selectedOptions.includes(option)) {
//       setSelectedOptions(
//         selectedOptions.filter((selected) => selected !== option)
//       );
//       closeContext("test");
//     } else {
//       setSelectedOptions([...selectedOptions, option]);
//     }
//   }
//   if (type == "twolevel") {
//     if (singleSelectedOption.includes(option)) {
//       setSingleSelectedOption(
//         singleSelectedOption.filter((selected) => selected !== option)
//       );
//       closeContext("test");
//     } else {
//       setSingleSelectedOption([option]);
//     }
//   }
// };
//   // const removeOption = (select: string) => {
//   //   const removeItem = selectedOptions.filter((option) => option !== select);
//   //   setSelectedOptions(removeItem);
//   // };
//   const [isFocused, setIsFocused] = useState(false);
//   const [value, setValue] = useState("");

//   // const handleChange = (value: string) => {
//   //   setValue(value);
//   //   console.log(value); // Log the new value to the console
//   // };

//   return (
//     <>
//       {/* {type == "multi" && (
//         <div className={styles.allselect}>
//           <legend
//             className={`${styles["floating-label"]} ${
//               isFocused || value !== "" ? styles["shrink"] : ""
//             }`}
//           >
//             {label}
//           </legend>
//           <input
//             type="text"
//             required
//             name="title"
//             placeholder={isFocused || value !== "" ? placeholder : ""}
//             onFocus={() => setIsFocused(true)}
//             onBlur={() => setIsFocused(false)}
//             onChange={(e) => setValue(e.target.value)}
//             onClick={toggleDropdown}
//             className={styles.mainselection}
//           />
//           {isOpen && (
//             <div className={styles.list}>
// {options.map((option, index) => (
//   <div key={index} className={styles.option}>
// <input
// type="checkbox"
// name="check"
// id="check"
//   // value={option.value}
//   // onBlur={() => setIsFocused(false)}
//   className={styles.checkbox_container}
// checked={selectedOption.includes(option.label)}
// onChange={(e) => {
//   handleSelect(option.label);
//   handleChange(e.target.value);
// }}
// />
// {option.label}
//   </div>
// ))}
//             </div>
//           )}
//   <div className={styles.selectcontainer}>
//     {selectedOption.map((select, index) => (
//       <div key={index} className={styles.selectoption}>
//         <button className={styles.selecteditem}>
//           {select}
//           <Image
//             className={styles.remove}
//             src={remove}
//             alt="Remove Icon"
//             onClick={() => removeOption(select)}
//           />
//         </button>
//       </div>
//     ))}
//   </div>
// </div>
//       )}
//       ; */}
//       {/* {type == "single" && ( */}
//       <div>
//         <div className={styles.allselect} id={id}>
//           <fieldset
//             className={`${styles["custom-select"]} ${
//               isFocused || value !== "" ? styles["focused"] : ""
//             } `}
//           >
//             <legend
//               className={`${styles["floating-label"]} ${
//                 isFocused || value !== "" ? styles["shrink"] : ""
//               }`}
//             >
//               {label}
//             </legend>
//             <input
//               type="text"
//               value={type == "single" ? singleSelectedOption : ""}
//               name="title"
//               placeholder={isFocused || value !== "" ? placeholder : ""}
//               onClick={toggleDropdown}
//               onFocus={(e) => {
//                 setIsFocused(true);
//                 displayContext(e, id + "Options", "vertical", "left");
//               }}
//               onBlur={() => {
//                 setIsFocused(false);
//                 //closeContext(id + "Options");
//               }}
//               onChange={(e) => setValue(e.target.value)}
//             />
//             {/* {type == "multi" && (

//             )} */}
//             <DsOption
//               id={id + "Options"}
//               isOpen={true}
//               options={options}
//               handleSelect={handleSelect}
//             ></DsOption>

//             {/* {isOpen && (
//             <div className={styles.list}>
//               {options.map((option, index) => (
//                 <div
//                   key={index}
//                   onClick={() => handleSelect(option.label)}
//                   className={styles.option}
//                 >
//                   {option.label}
//                 </div>
//               ))}
//             </div>
//           )} */}
//           </fieldset>
//         </div>
//         {selectedOptions}
//       </div>
//       {/* )} */}
//       {/* ;
//       {type == "twolevel" && (
//         <div className={styles.dropdownContainer}>
//           <div className={styles.dropdown_group}>
//             <div className={styles.dropdown}>
//               <select
//                 id="groupSelect"
//                 onChange={handleGroupChange}
//                 value={selectedGroup}
//                 // onClick={(e) => displaycontext(e, contextMenuId)}
//                 className={styles.dropdownSelect}
//               >
//                 {options.map((group) => (
//                   <option
//                     key={group.label}
//                     value={group.label}
//                     onMouseOver={(e) =>
//                       displaycontext(e, contextMenuId)
//                     }
//                   >
//                     {group.label}
//                   </option>
//                 ))}
//               </select>
//             </div>

//             {selectedGroup && selectedGroupData && (
//               <div className={styles.sub_dropdown}>
//                 <select
//                   id="itemSelect"
//                   onChange={handleItemChange}
//                   value={selectedItem}
//                   className={styles.dropdownSelect}
//                 >
//                   {selectedGroupData.value.map((item) => (
//                     <option key={item.value} value={item.value}>
//                       {item.label}
//                     </option>
//                   ))}
//                 </select>
//               </div>
//             )}
//           </div>

//           {selectedItem && (
//             <div className={styles.selectedItem}>
//               You selected: {selectedItem}
//             </div>
//           )}
//         </div>
//       )}
//       <select>
//         {options.map((opt, index) => {
//           if (typeof opt.value == "string") {
//             return (
//               <option key={index} value={opt.value}>
//                 {opt.label}
//               </option>
//             );
//           } else {
//             return (
//               <DsSelect
//                 key={index}
//                 options={opt.value}
//                 type={"single"}
//                 placeholder={""}
//               ></DsSelect>
//             );
//           }
//         })}
//       </select> */}
//     </>
//   );
// };

// export default DsSelect;

"use client";

import { useEffect, useState } from "react";
import styles from "./dsSelect.module.css";
import DsOption from "./dsOption";
import {
  closeContext,
  displayContext,
} from "@/app/Components/dsContextHolder/dsContextHolder";
import Image from "next/image";
import remove from "@/app/Icons/smallIcons/cross.svg";

interface Option {
  label: string;
  value: string | Option[];
}
interface SelectProps {
  id: string;
  options: Option[];
  type: "single" | "multi" | "twolevel";
  placeholder: string;
  label?: string;
  disable?: boolean;
  customAttributes?: Record<string, string>;
  className?: string;
}

const DsSelect: React.FC<SelectProps> = ({
  id = "",
  options,
  type,
  placeholder = "Click to Select",
  label,
  disable,
  customAttributes,
  className,
}) => {
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
  const [singleSelectedOption, setSingleSelectedOption] = useState<string[]>(
    []
  );

  const handleSelect = (option: string | { label: string; value: string }) => {
    const optionLabel = typeof option === "string" ? option : option.label;

    if (type === "single") {
      if (singleSelectedOption.includes(optionLabel)) {
        setSingleSelectedOption(
          singleSelectedOption.filter((selected) => selected !== optionLabel)
        );
        closeContext(id + "Options");
        setIsFocused(false);
      } else {
        setSingleSelectedOption([optionLabel]);
        closeContext(id + "Options");
      }
    }

    if (type === "multi") {
      setIsFocused(true);
      if (selectedOptions.includes(optionLabel)) {
        setSelectedOptions(
          selectedOptions.filter((selected) => selected !== optionLabel)
        );
        // setIsFocused(true);
      } else {
        setSelectedOptions([...selectedOptions, optionLabel]);
      }
    }

    if (type === "twolevel") {
      if (singleSelectedOption.includes(optionLabel)) {
        setSingleSelectedOption(
          singleSelectedOption.filter((selected) => selected !== optionLabel)
        );
        closeContext(id + "Options");
        setIsFocused(false);
      } else {
        setSingleSelectedOption([optionLabel]);
        closeContext(id + "Options");
      }
    }
  };
  const removeOption = (select: string) => {
    setIsFocused(true);
    const removeItem = selectedOptions.filter((option) => option !== select);
    setSelectedOptions(removeItem);
  };
  const [isFocused, setIsFocused] = useState(false);
  const [value, setValue] = useState("");
  useEffect(() => {
    window.addEventListener("click", (e) => {
      const target = (e.target as HTMLElement)
        .closest(`.${styles["input-wrapper"]}`)
        ?.querySelector("#" + id);
      if (!target) {
        closeContext(id + "Options");
        setIsFocused(false);
      }
    });
  });
  // window.onclick = () => setIsopen(false);
  return (
    <>
      <div className={styles.selectContainer}>
        <fieldset
          className={`${styles["custom-fieldset"]} ${
            isFocused ||
            singleSelectedOption.length > 0 ||
            selectedOptions.length > 0
              ? styles["focused"]
              : ""
          } ${disable ? styles.disabled : ""}`}
        >
          <legend
            className={`${styles["floating-label"]} ${
              isFocused ||
              singleSelectedOption.length > 0 ||
              selectedOptions.length > 0
                ? styles["shrink"]
                : ""
            }`}
          >
            {placeholder && !label ? placeholder : label}
          </legend>

          <div className={styles["input-wrapper"]}>
            <input
              id={id}
              className={`${styles["custom-input"]}  ${className || ""}`}
              type="text"
              value={type == "multi" ? "" : singleSelectedOption}
              name="title"
              placeholder={isFocused && value == "" ? placeholder : ""}
              onClick={() => {
                setIsFocused(true);
              }}
              onFocus={(e) => {
                setIsFocused(true);
                displayContext(e, id + "Options", "vertical", "left");
              }}
              onBlur={() => {
                // if (type == "multi") {
                setIsFocused(false);
                // } else {
                //   setIsFocused(true);
                // }
              }}
              onChange={(e) => setValue(e.target.value)}
              {...(customAttributes && {
                ...Object.keys(customAttributes)?.reduce((acc, key) => {
                  acc[`data-${key}`] = customAttributes[key];
                  return acc;
                }, {} as Record<string, string | number | boolean>),
              })}
            />

            <DsOption
              id={id + "Options"}
              isOpen={true}
              options={options}
              handleSelect={handleSelect}
              type={type}
              selectedOptions={selectedOptions}
            ></DsOption>
          </div>
        </fieldset>
        {type == "multi" && (
          <div className={styles.selectedcontainer}>
            {selectedOptions.map((select, index) => (
              <div key={index} className={styles.selectoption}>
                <button className={styles.selecteditem}>
                  {select}
                  <Image
                    className={styles.remove}
                    src={remove}
                    alt="Remove Icon"
                    onClick={() => removeOption(select)}
                  />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
};
export default DsSelect;
