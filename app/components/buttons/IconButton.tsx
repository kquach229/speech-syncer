import React from "react";

// Define the type for the component props
interface IconButtonProps {
  onClick: React.MouseEventHandler<HTMLSpanElement>; // Type for the onClick prop
}

const IconButton: React.FC<IconButtonProps> = ({ onClick }) => {
  return (
    <span
      className="cursor-pointer flex items-center space-x-2"
      onClick={onClick}
    >
      {/* You can add an icon or label here */}
    </span>
  );
};

export default IconButton;
