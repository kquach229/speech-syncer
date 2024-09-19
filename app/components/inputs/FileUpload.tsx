import React, { ChangeEvent } from "react";
import { FaPaperclip } from "react-icons/fa";

// Define the type for the prop
interface FileUploadProps {
  handleFileUpload: (event: ChangeEvent<HTMLInputElement>) => void;
}

const FileUpload: React.FC<FileUploadProps> = ({ handleFileUpload }) => {
  return (
    <label htmlFor="file-upload" className="cursor-pointer">
      <FaPaperclip size={22} className="text-gray-400" />
      <input
        id="file-upload"
        type="file"
        onChange={handleFileUpload}
        className="hidden"
      />
    </label>
  );
};

export default FileUpload;
