import React, { ChangeEvent } from "react";
import { FaLink } from "react-icons/fa";

// Define the type for the component props
interface LinkPasteProps {
  handleLinkPaste: (event: ChangeEvent<HTMLInputElement>) => void;
}

const LinkPaste: React.FC<LinkPasteProps> = ({ handleLinkPaste }) => {
  return (
    <label htmlFor="link-input" className="cursor-pointer">
      <FaLink size={22} />
      <input
        type="text"
        id="link-input"
        className="hidden"
        onChange={handleLinkPaste}
      />
    </label>
  );
};

export default LinkPaste;
