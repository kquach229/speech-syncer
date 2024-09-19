import React, { ReactNode } from "react";
import { FaBriefcase, FaLightbulb, FaJournalWhills } from "react-icons/fa";
import { FaSchool } from "react-icons/fa6";
import { MdHealthAndSafety } from "react-icons/md";
import { TbMoodSmileFilled } from "react-icons/tb";

// Define the type for each category item
interface Category {
  icon: React.ComponentType; // ComponentType for icon components
  label: string;
}

const categories: Category[] = [
  { icon: FaBriefcase, label: "Business" },
  { icon: FaSchool, label: "Education" },
  { icon: FaLightbulb, label: "Creative" },
  { icon: MdHealthAndSafety, label: "Health" },
  { icon: FaJournalWhills, label: "Journaling" },
  { icon: TbMoodSmileFilled, label: "Communication" },
];

// Define a type for the mapIconToLabel function parameter
const mapIconToLabel = (label: string): ReactNode => {
  switch (label) {
    case "Business":
      return <FaBriefcase />;
    case "Education":
      return <FaSchool />;
    case "Creative":
      return <FaLightbulb />;
    case "Health":
      return <MdHealthAndSafety />;
    case "Journaling":
      return <FaJournalWhills />;
    case "Communication":
      return <TbMoodSmileFilled />;
    default:
      return null; // Return null for unsupported labels
  }
};

const CategoryLinks: React.FC = () => {
  return (
    <div className="mt-10 sm:mt-20">
      {categories.map((category) => (
        <div
          key={category.label}
          className="text-black m-1 py-2 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none bg-neutral-900 text-white"
        >
          {category.label}
          {mapIconToLabel(category.label)}
        </div>
      ))}
    </div>
  );
};

export default CategoryLinks;
