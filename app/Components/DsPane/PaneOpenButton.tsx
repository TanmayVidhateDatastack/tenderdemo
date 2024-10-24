"use client";

import DSButton from "../dsButton/DsButton";
import { DisplayPane } from "./DsPane";

interface PaneOpenButtonProps {
  children?: React.ReactNode;
  id?: string;
  paneId: string;
  buttonText?: string;
  buttonClass?: string;
  img?: string;
  beforeIcon?: React.ReactElement;
  afterIcon?: React.ReactElement;
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
      handleOnClick={() => DisplayPane(paneId)}
      handleOnHover={handleOnHover}
      startIcon={beforeIcon}
      endIcon={afterIcon}
      label={buttonText}
    >
      {children}
    </DSButton>
  );
};

export default PaneOpenButton;
