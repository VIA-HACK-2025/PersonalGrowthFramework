import {
  ControlsContainer,
  FullScreenControl,
  SigmaContainer,
  ZoomControl,
} from "@react-sigma/core";
import "@react-sigma/core/lib/style.css";
import { GraphSearch, GraphSearchOption } from "@react-sigma/graph-search";
import "@react-sigma/graph-search/lib/style.css";
import { CSSProperties, FC, useCallback, useState } from "react";
import { NodeImageProgram } from "@sigma/node-image";

import { FocusOnNode } from "./graph_utils/FocusOnNode";
import { LayoutsControl } from "./graph_utils/LayoutControls";
import { Graph } from "./graph_utils/Graph";
import { Task, TaskCard } from "../components/ui/TaskItem";
import { useGraphContext } from "./context/GraphContext";

interface GraphProps {
  style?: CSSProperties;
  className?: string;
}

export const GraphView: FC<GraphProps> = ({ style, className }) => {
  const { isLeafNode, selectedNode } = useGraphContext();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [nodeTasks, setNodeTasks] = useState<Record<string, Task[]>>({});
  const [focusNode, setFocusNode] = useState<string | null>(null);

  const onFocus = useCallback((value: GraphSearchOption | null) => {
    if (value === null) setFocusNode(null);
    else if (value.type === "nodes") setFocusNode(value.id);
  }, []);
  const onChange = useCallback((value: GraphSearchOption | null) => {
    if (value === null) return;
  }, []);
  const postSearchResult = useCallback(
    (options: GraphSearchOption[]): GraphSearchOption[] => {
      return options.length <= 10
        ? options
        : [
            ...options.slice(0, 10),
            {
              type: "message",
              message: (
                <span className="text-center text-muted">
                  And {options.length - 10} others
                </span>
              ),
            },
          ];
    },
    []
  );

  return (
    <SigmaContainer
      settings={{
        defaultNodeType: "image",
        nodeProgramClasses: {
          image: NodeImageProgram,
        },
        allowInvalidContainer: true,
        renderLabels: false,
      }}
      style={style}
      className={className}
    >
      <Graph disableHoverEffect={false} />
      {isLeafNode && selectedNode && (
        <TaskCard
          tasks={selectedNode ? nodeTasks[selectedNode] ?? [] : []}
          setTasks={setNodeTasks}
          className="fixed z-20 top-10 left-10 w-3/12"
          currentNode={selectedNode}
        />
      )}
      <FocusOnNode node={focusNode ?? selectedNode} />
      <ControlsContainer position={"bottom-right"}>
        <ZoomControl />
        <FullScreenControl />
        <LayoutsControl />
      </ControlsContainer>
      <ControlsContainer position={"top-right"}>
        <GraphSearch
          type="nodes"
          value={selectedNode ? { type: "nodes", id: selectedNode } : null}
          onFocus={onFocus}
          onChange={onChange}
          postSearchResult={postSearchResult}
        />
      </ControlsContainer>
      <ControlsContainer position={"bottom-left"}></ControlsContainer>
    </SigmaContainer>
  );
};
