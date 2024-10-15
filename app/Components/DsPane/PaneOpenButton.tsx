"use client";
import DSButton from "../DsButton/DsButton";
import { DisplayPane } from "./DsPane";

interface PaneOpenButtonProps {
  children?: React.ReactNode;
  id?: string;
  paneId:string;
  buttonText?: string;
  buttonClass?: string;
  img?: string;
  beforeIcon?: React.ReactNode;
  afterIcon?: React.ReactNode;
  handleOnHover?: (e: React.MouseEvent<HTMLElement>) => void;
}
const PaneOpenButton: React.FC<PaneOpenButtonProps> = ({
  id,
  paneId,
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
        handleOnClick={()=>DisplayPane(paneId)}
        handleOnHover={handleOnHover}
        beforeIcon={beforeIcon}
        afterIcon={afterIcon}
        buttonText={buttonText}
        >{children}</DSButton>
    

  );
};
 
export default PaneOpenButton;