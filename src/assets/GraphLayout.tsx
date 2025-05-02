// ./assets/GraphLayout.tsx
import React from "react";
import { GraphProvider, useGraphContext as useGraphContext } from "./context/GraphSelectionContext";
import { GraphView } from "./GraphView";
import Toolbar from "./Toolbar";

const Content = () => {
  const { addNode, isReady } = useGraphContext();
  return (
    <>
      <div className="w-full h-[90vh]">
        <GraphView />
      </div>
      {isReady && (
        <Toolbar
          className="flex justify-center items-center w-full"
          onAddNode={addNode}
        />
      )}
    </>
  );
};

const GraphLayout: React.FC = () => (
  <GraphProvider>
    <Content />
  </GraphProvider>
);

export default GraphLayout;
