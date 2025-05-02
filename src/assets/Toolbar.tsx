import React from 'react';
import { FaPlus } from 'react-icons/fa';

interface ToolbarProps {
  className?: string;
}

const Toolbar: React.FC<ToolbarProps> = ({ className }) => {
  return (
    <div className={className}>
      <button className="w-12 h-12 rounded-full bg-blue-500 text-white flex items-center justify-center hover:bg-blue-600">
        <FaPlus />
      </button>
    </div>
  );
};

export default Toolbar;
