import React from "react";
import UiButton from "./UIButton";

interface IconButtonProps {
  srcImg?: string;
  id?: string;
  title?: string;
  handleOnClick: (e: React.MouseEvent<HTMLElement>) => void; // Accepts MouseEvent for any HTML element
}

const IconButton: React.FC<IconButtonProps> = ({
  id,
  srcImg,
  title,
  handleOnClick,
}) => {
  return (
    <UiButton id={id} handleOnClick={handleOnClick}>
      <img
        src={srcImg}
        alt={title}
        title={title}
        className="context-menu-icon icons"
        onClick={handleOnClick} // Bind the event handler to the img tag
      />
    </UiButton>
  );
};

export default IconButton;
