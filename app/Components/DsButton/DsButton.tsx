import styles from "../DsButton/Ds_Button.module.css";
 
interface DSButtonProps {
  children?: React.ReactNode;
  id?: string;
  buttonText?: string;
  buttonClass?: string;
  handleOnClick?: (e: React.MouseEvent<HTMLElement>) => void;
  img?: string;
  beforeIcon?: React.ReactNode;
  afterIcon?: React.ReactNode;
  handleOnHover?: (e: React.MouseEvent<HTMLElement>) => void;
}
const DSButton: React.FC<DSButtonProps> = ({
  id,
  buttonText,
  buttonClass,
  handleOnClick,
  children,
  handleOnHover,
 
  beforeIcon,
  afterIcon,
}) => {
  return (
    <button
      id={id}
      className={styles.btn +" "+ buttonClass}
      onClick={handleOnClick}
      onMouseOver={handleOnHover}
    >
      {beforeIcon !== undefined && (
        <span className={styles.button_icon}>{beforeIcon}</span>
      )}
      {buttonText || children}
      {afterIcon !== undefined && (
        <span className="button-icon">{afterIcon}</span>
      )}
    </button>
  );
};
 
export default DSButton;