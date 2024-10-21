export class InputTextProps {
  value?: string;
  handleInputChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleKeyUp?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  id?: string;
  className?: string;
  placeholder?: string;
  type?: string = "text";
  // list?: string;
}

const InputText: React.FC<InputTextProps> = ({
  value,
  handleInputChange,
  handleKeyUp,
  id,
  className,
  placeholder,
  type,
  // list,
}) => {
  return (
    <input
      type={type}
      value={value}
      onChange={handleInputChange}
      onKeyUp={handleKeyUp}
      id={id}
      className={`input-text form-control m-0 ${className || ""}`}
      placeholder={placeholder}
      // list={list}
    />
  );
};

export default InputText;
