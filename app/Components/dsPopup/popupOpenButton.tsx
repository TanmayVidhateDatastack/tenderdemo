"use client";
import DSButton from "../DsButton/DsButton";
import { OpenPopup } from "./dsPopup";

interface PopupOpenButtonProps {
  children?: React.ReactNode;
  id?: string;
  popupId:string;
  buttonText?: string;
  buttonClass?: string;
  img?: string;
  beforeIcon?: React.ReactNode;
  afterIcon?: React.ReactNode;
  handleOnHover?: (e: React.MouseEvent<HTMLElement>) => void;
}
const PopupOpenButton: React.FC<PopupOpenButtonProps> = ({
  id,
  popupId,
  buttonText,
  buttonClass,
  children,
  handleOnHover,
  beforeIcon,
  afterIcon,
}) => {
  return (
    <DSButton
        id={id}
        buttonClass={buttonClass}
        handleOnClick={()=>OpenPopup(popupId)}
        handleOnHover={handleOnHover}
        beforeIcon={beforeIcon}
        afterIcon={afterIcon}
        buttonText={buttonText}
        >{children}</DSButton>
    

  );
};
 
export default PopupOpenButton;