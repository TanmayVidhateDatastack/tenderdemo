import React from "react";
import styles from "./dsRadioButton.module.css";
type RadioButtonProps = {
  id: string;
  label: string;
  value: string;
  defaultChecked?: boolean;
  className?: string;
  onClick?: () => void;
  onHover?: () => void;
  onBlur?: () => void;
  onSelectedRadioButton?: (value: string) => void;
};

const RadioButton: React.FC<RadioButtonProps> = ({
  id,
  label,
  value,
  defaultChecked = false,
  className = "",
  onClick,
  onHover,
  onBlur,
  onSelectedRadioButton,
}) => {
  const handleChange = () => {
    onSelectedRadioButton?.(value);
  };

  return (
    <div
      className={`${styles.wrapper} ${className}`}
      onMouseEnter={onHover}
      onClick={onClick}
      onBlur={onBlur}
    >
      <input
        type="radio"
        id={id}
        name="custom-radio"
        value={value}
        defaultChecked={defaultChecked}
        onChange={handleChange}
        className={styles.input}
      />
      <label htmlFor={id} className={styles.label}>
        {label}
      </label>
    </div>
  );
};

export default RadioButton;
