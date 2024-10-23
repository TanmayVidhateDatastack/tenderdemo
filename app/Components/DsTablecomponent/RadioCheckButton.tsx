import React from "react";

interface Option {
  customAttribute?: Record<string, string>;
  id: string;
  type: "radio" | "checkbox";
  value: string;
  code: string;
  className?: string;
  selectedOption?: string[];
}

interface RadioCheckProps {
  groupName: string;
  options: Option[];
  selectedOption?: string[];
  handleOnChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const RadioCheckButton: React.FC<RadioCheckProps> = ({
  groupName,
  options,
  selectedOption = [],
  handleOnChange,
}) => {
  return (
    <>
      {options.map((option) => (
        <span key={option.id} className="mx-1 flex items-center">
          <input
            type={option.type}
            id={option.code}
            name={groupName}
            value={option.value}
            checked={
              option.type === "radio"
                ? selectedOption.includes(option.value)
                : selectedOption.some((value) => value === option.value)
            }
            onChange={handleOnChange}
            {...(option.customAttribute && {
              ...Object.keys(option.customAttribute).reduce((acc, key) => {
                // Provide a default value (empty string) when customAttribute[key] is undefined
                acc[`data-${key}`] = option.customAttribute?.[key] ?? "";
                return acc;
              }, {} as Record<string, string>),
            })}
          />
          <label htmlFor={option.code} className={`ms-1 ${option.className}`}>
            {option.value}
          </label>
        </span>
      ))}
    </>
  );
};

export default RadioCheckButton;
