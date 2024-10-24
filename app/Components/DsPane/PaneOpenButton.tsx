"use client";
import DSButton, { DSButtonProps } from "../dsButton/dsButton";
import { DisplayPane } from "./dsPane";

interface PaneOpenButtonProps extends DSButtonProps{
  paneId:string;
}
const PaneOpenButton: React.FC<PaneOpenButtonProps> = ({
  id,
  paneId,
  label,
  buttonClass,
  buttonSize = "btnMedium",
  iconSize = "iconSmall",
  buttonColor = "btnPrimary",
  type = "standard",
  tooltip,
  children,
  handleOnHover,
  handleMouseLeave,
  startIcon,
  endIcon,
}) => {
  return (
    <DSButton
        id={id}
        buttonClass={buttonClass}
        buttonSize={buttonSize}
        iconSize={iconSize}
        buttonColor={buttonColor}
        type={type}
        handleOnClick={()=>{DisplayPane(paneId)}}
        handleOnHover={handleOnHover}
        handleMouseLeave={handleMouseLeave}
        tooltip={tooltip}
        startIcon={startIcon}
        endIcon={endIcon}
        label={label}
        >{children}</DSButton>
  );
};
 
export default PaneOpenButton;