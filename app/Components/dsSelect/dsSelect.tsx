"use client";

import { useState } from "react";
import styles from "./dsSelect.module.css";
// import Image from "next/image";
import remove from "../../Icons/mediumIcons/remove.svg";
// import { displaycontext } from "./dsContext";
import DsOption from "./dsOption";
import { closecontext, displaycontext } from "../dsContext/dscontext";

/**
 * DsPane component displays pane.
 *
 * @param {array} options - options for dropdown in json format value-option pair
 * @param {string} type - selcting dropdown multiple selection or single select
 * @param {string} placeholder- placehoder of input field.
 * @param {string} label - label which is given by user
 * @param {string} handleOnChange - return values which are selected
 */

interface Option {
  label: string;
  value: string | Option[];
}
interface SelectProps {
  options: Option[];
  type: "single" | "multi" | "twolevel";
  placeholder: string;
  label?: string;
}

const DsSelect: React.FC<SelectProps> = ({
  options,
  type,
  placeholder = "Click to Select",
  label,
}) => {
  const [selectedOption, setSelectedOption] = useState<string[]>([]);
  const [isOpen, setIsopen] = useState(false);
  // setSelectedOption([...selectedOption,opt]);
  const [singleSelectedOption, setSingleSelectedOption] = useState<string>("");
  const toggleDropdown = () => setIsopen(!isOpen);
  // const [selectedMain, setSelectedMain] = useState<string | null>(null); // For two-level
  // const [selectedSub, setSelectedSub] = useState<string | null>(null);

  const handleSelect = (option: string) => {
    if (type == "single") {
      setSingleSelectedOption(option);
      closecontext("test");
    }

    if (type == "multi") {
      if (selectedOption.includes(option)) {
        setSelectedOption(
          selectedOption.filter((selected) => selected !== option)
        );
      } else {
        setSelectedOption([...selectedOption, option]);
      }
    }
    if (type == "twolevel") {
      if (selectedOption.includes(option)) {
        setSelectedOption(
          selectedOption.filter((selected) => selected !== option)
        );
      } else {
        setSelectedOption([...selectedOption, option]);
      }
    }
    
  };
  const removeOption = (select: string) => {
    const removeItem = selectedOption.filter((option) => option !== select);
    setSelectedOption(removeItem);
  };
  const [isFocused, setIsFocused] = useState(false);
  const [value, setValue] = useState("");

  // const handleChange = (value: string) => {
  //   setValue(value);
  //   console.log(value); // Log the new value to the console
  // };
  // const [selectedGroup, setSelectedGroup] = useState<string>("");
  // const [selectedItem, setSelectedItem] = useState<string>("");
  // const [isVisible, setIsVisible] = useState(false);
  // const contextMenuId = "itemSelect";
  // const containerId = "groupSelect";

  // const handleGroupChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
  //   setSelectedGroup(e.target.value);
  //   setSelectedItem(""); // Reset the item when group changes
  // };

  // const handleItemChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
  //   setSelectedItem(e.target.value);
  // };

  // // Find the selected group based on the selectedGroup value
  // const selectedGroupData = options.find(
  //   (group) => group.label === selectedGroup
  // );

  return (
    <>
      {/* {type == "multi" && (
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
            required
            name="title"
            placeholder={isFocused || value !== "" ? placeholder : ""}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            onChange={(e) => setValue(e.target.value)}
            onClick={toggleDropdown}
            className={styles.mainselection}
          />
          {isOpen && (
            <div className={styles.list}>
              {options.map((option, index) => (
                <div key={index} className={styles.option}>
                  <input
                    type="checkbox"
                    name="check"
                    id="check"
                    // value={option.value}
                    // onBlur={() => setIsFocused(false)}
                    className={styles.checkbox_container}
                    checked={selectedOption.includes(option.label)}
                    onChange={(e) => {
                      handleSelect(option.label);
                      handleChange(e.target.value);
                    }}
                  />
                  {option.label}
                </div>
              ))}
            </div>
          )}
          <div className={styles.selectcontainer}>
            {selectedOption.map((select, index) => (
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
        </div>
      )}
      ; */}
      {/* {type == "single" && ( */}
      <div>
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
            value={type == "single" ? singleSelectedOption : ""}
            name="title"
            placeholder={isFocused || value !== "" ? placeholder : ""}
            onClick={toggleDropdown}
            className={styles.mainselection}
            onFocus={(e) => {
              setIsFocused(true);
              displaycontext(e, "test", "test1", "vertical", "left");
            }}
            onBlur={() => {
              setIsFocused(false);
              // closecontext("test");
            }}
            onChange={(e) => setValue(e.target.value)}
          />
          <DsOption
            isOpen={true}
            options={options}
            handleSelect={handleSelect}
          ></DsOption>
          {/* {isOpen && (
            <div className={styles.list}>
              {options.map((option, index) => (
                <div
                  key={index}
                  onClick={() => handleSelect(option.label)}
                  className={styles.option}
                >
                  {option.label}
                </div>
              ))}
            </div>
          )} */}
        </div>
        {singleSelectedOption}
      </div>
      {/* )} */}
      {/* ;
      {type == "twolevel" && (
        <div className={styles.dropdownContainer}>
          <div className={styles.dropdown_group}>
            <div className={styles.dropdown}>
              <select
                id="groupSelect"
                onChange={handleGroupChange}
                value={selectedGroup}
                // onClick={(e) => displaycontext(e, contextMenuId, containerId)}
                className={styles.dropdownSelect}
              >
                {options.map((group) => (
                  <option
                    key={group.label}
                    value={group.label}
                    onMouseOver={(e) =>
                      displaycontext(e, contextMenuId, containerId)
                    }
                  >
                    {group.label}
                  </option>
                ))}
              </select>
            </div>

            {selectedGroup && selectedGroupData && (
              <div className={styles.sub_dropdown}>
                <select
                  id="itemSelect"
                  onChange={handleItemChange}
                  value={selectedItem}
                  className={styles.dropdownSelect}
                >
                  {selectedGroupData.value.map((item) => (
                    <option key={item.value} value={item.value}>
                      {item.label}
                    </option>
                  ))}
                </select>
              </div>
            )}
          </div>

          {selectedItem && (
            <div className={styles.selectedItem}>
              You selected: {selectedItem}
            </div>
          )}
        </div>
      )}
      <select>
        {options.map((opt, index) => {
          if (typeof opt.value == "string") {
            return (
              <option key={index} value={opt.value}>
                {opt.label}
              </option>
            );
          } else {
            return (
              <DsSelect
                key={index}
                options={opt.value}
                type={"single"}
                placeholder={""}
              ></DsSelect>
            );
          }
        })}
      </select> */}
    </>
  );
};

export default DsSelect;
