import React, { ChangeEvent } from "react";
import { FaLanguage } from "react-icons/fa6";

// Define the type for the component props
interface LanguageSelectorProps {
  selectedLanguage: string;
  setSelectedLanguage: (language: string) => void;
  languages: string[];
}

const LanguageSelector: React.FC<LanguageSelectorProps> = ({
  selectedLanguage,
  setSelectedLanguage,
  languages,
}) => {
  // Event handler type for the select element change event
  const handleLanguageChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setSelectedLanguage(e.target.value);
  };

  return (
    <span className="cursor-pointer rounded-full space-x-1 pl-2 bg-black flex items-center flex-row">
      <FaLanguage size={22} />
      <select
        value={selectedLanguage}
        onChange={handleLanguageChange}
        className="bg-black flex flex-row rounded-full py-1 text-white"
      >
        {languages.map((language) => (
          <option key={language} value={language}>
            {language}
          </option>
        ))}
      </select>
    </span>
  );
};

export default LanguageSelector;
