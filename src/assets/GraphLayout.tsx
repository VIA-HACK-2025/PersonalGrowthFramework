// ./assets/GraphLayout.tsx
import React from "react";
import {
  GraphProvider,
  useGraphContext as useGraphContext,
} from "./context/GraphContext";
import { GraphView } from "./GraphView";
import Toolbar from "./Toolbar";

const Content = () => {
  const { addNode } = useGraphContext();
  return (
    <>
      <div className="w-full h-[90vh]">
        <GraphView />
      </div>
      <Toolbar
        className="flex justify-center items-center w-full"
        onAddNode={(data: { icon: string; title: string }) => {
          console.log("HUI3: Node added:", data);
          addNode(data);
        }}
      />
    </>
  );
};

const GraphLayout: React.FC = () => (
  <GraphProvider>
    <Content />
  </GraphProvider>
);

export default GraphLayout;
