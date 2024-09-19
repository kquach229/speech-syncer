import React, { ChangeEvent } from "react";

// Define the type for the component props
interface TextAreaProps {
  id: string;
  value: string;
  onChange: (event: ChangeEvent<HTMLTextAreaElement>) => void;
  placeholder?: string; // Optional prop
}

const TextArea: React.FC<TextAreaProps> = ({
  id,
  value,
  onChange,
  placeholder,
}) => {
  return (
    <textarea
      rows={5}
      id={id}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className="py-2 px-4 border-none focus:outline-none block w-full border-transparent rounded-lg dark:bg-neutral-900 dark:border-transparent dark:text-neutral-400 text-lg resize-y min-h-[150px] max-h-[400px] sm:min-h-[200px] lg:min-h-[250px] transition-all duration-200 ease-in-out"
    ></textarea>
  );
};

export default TextArea;
