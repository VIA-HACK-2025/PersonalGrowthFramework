import React from 'react';
import { FaPlus } from 'react-icons/fa';
import { useGraphContext } from './context/GraphContext';

interface ToolbarProps {
  className?: string;
  onAddNode?: React.MouseEventHandler<HTMLButtonElement>;
}

const Toolbar: React.FC<ToolbarProps> = ({ className, onAddNode }) => {
  const { selectedNode } = useGraphContext();
  const isDisabled = !selectedNode;

  return (
    <div className={className}>
      <button
        className={`w-12 h-12 rounded-full text-white flex items-center justify-center
          ${isDisabled ? 'bg-blue-500 opacity-50 cursor-not-allowed' : 'bg-blue-500 hover:bg-blue-600'}`}
        onClick={onAddNode}
        disabled={isDisabled}
      >
        <FaPlus />
      </button>
    </div>
  );
};

export default Toolbar;
