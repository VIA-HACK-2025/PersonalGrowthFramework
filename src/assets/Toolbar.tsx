import React from "react";
import { FaPlus } from "react-icons/fa";
import { useGraphContext } from "./context/GraphContext";
import { NodeDialogCard } from "../components/ui/node-dialog-card";

interface ToolbarProps {
  className?: string;
  onAddNode?: (data: { icon: string; title: string }) => any;
}

const Toolbar: React.FC<ToolbarProps> = ({ className, onAddNode }) => {
  const { selectedNode } = useGraphContext();
  const isDisabled = !selectedNode;

  return (
    <div className={className}>
      <NodeDialogCard
        className={`w-12 h-12 rounded-full text-white flex items-center justify-center
          ${
            isDisabled
              ? "bg-blue-500 opacity-50 cursor-not-allowed"
              : "bg-blue-500 hover:bg-blue-600"
          }`}
        onClick={({ icon, title }) => {
          onAddNode?.({ icon, title });
        }}
        disabled={isDisabled}
      />
    </div>
  );
};

export default Toolbar;
