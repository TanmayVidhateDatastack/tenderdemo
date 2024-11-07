"use client";
import DSButton from "../dsButton/dsButton";
import { OpenPopup } from "./dsPopup";

interface PopupOpenButtonProps {
  children?: React.ReactNode;
  id?: string;
  popupId: string;
  buttonText?: string;
  buttonClass?: string;
  img?: string;
  beforeIcon?: React.ReactElement;
  afterIcon?: React.ReactElement;
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
      className={buttonClass}
      handleOnClick={() => OpenPopup(popupId)}
      handleOnHover={handleOnHover}
      startIcon={beforeIcon}
      endIcon={afterIcon}
      label={buttonText}
    >
      {children}
    </DSButton>
  );
};

export default PopupOpenButton;
