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

import { FocusOnNode } from "./common/FocusOnNode";
import { LayoutsControl } from "./common/LayoutControls";
import { Graph } from "./common/Graph";

interface GraphProps{
  style?: CSSProperties,
  className?: string
}

export const GraphView: FC<GraphProps> = ({ style, className }) => {
  const [selectedNode, setSelectedNode] = useState<string | null>(null);
  const [focusNode, setFocusNode] = useState<string | null>(null);

  const onFocus = useCallback((value: GraphSearchOption | null) => {
    if (value === null) setFocusNode(null);
    else if (value.type === "nodes") setFocusNode(value.id);
  }, []);
  const onChange = useCallback((value: GraphSearchOption | null) => {
    if (value === null) setSelectedNode(null);
    else if (value.type === "nodes") setSelectedNode(value.id);
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
    <SigmaContainer settings={{ allowInvalidContainer: true }} style={style} className={className}>
      <Graph disableHoverEffect={false} />
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

      <ControlsContainer position={"bottom-left"}>
      </ControlsContainer>
    </SigmaContainer>
  );
};
