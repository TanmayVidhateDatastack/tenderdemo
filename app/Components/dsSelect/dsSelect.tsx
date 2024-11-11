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
                setIsFocused(false);
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
