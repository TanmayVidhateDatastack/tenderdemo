interface UiButtonProps {
  children?: React.ReactNode;
  id?: string;
  buttonText?: string;
  buttonClass?: string;
  handleOnClick?: (e: React.MouseEvent<HTMLElement>) => void;
}
const UiButton: React.FC<UiButtonProps> = ({
  id,
  buttonText,
  buttonClass,
  handleOnClick,
  children,
}) => {
  return (
    <button id={id} className={`btn ${buttonClass}`} onClick={handleOnClick}>
      {buttonText || children}
    </button>
  );
};

export default UiButton;
