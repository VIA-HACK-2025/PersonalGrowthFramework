import {
  useLoadGraph,
  useRegisterEvents,
  useSetSettings,
  useSigma,
} from "@react-sigma/core";
import { useLayoutCircular } from "@react-sigma/layout-circular";
import { FC, useEffect, useState } from "react";

import { useGraph } from "./useGraph";
import { useGraphContext } from "../context/GraphSelectionContext";

export const Graph: FC<{ disableHoverEffect: boolean }> = ({
  disableHoverEffect,
}) => {
  const { setSelectedNode, selectedNode, registerAddNode } = useGraphContext();
  const { loadedGraph, addNode: internalAddNode } = useGraph();
  const sigma = useSigma();
  const registerEvents = useRegisterEvents();
  const setSettings = useSetSettings();
  const loadGraph = useLoadGraph();
  const { assign: assignCircular } = useLayoutCircular();
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);

  useEffect(() => {
    const graph = loadedGraph();
    loadGraph(graph);
    assignCircular();
  
    registerEvents({
      enterNode: (event) => setHoveredNode(event.node),
      leaveNode: () => setHoveredNode(null),
      downNode: (event) => {
        setSelectedNode(event.node);
      },
      downStage: () => {
        setSelectedNode(null);
      },
    });
  
    registerAddNode(internalAddNode);
  }, [assignCircular, loadGraph, registerEvents, loadedGraph, sigma, selectedNode, setSelectedNode, registerAddNode, internalAddNode]);

  useEffect(() => {
    setSettings({
      nodeReducer: (node, data) => {
        const graph = sigma.getGraph();
        const isHovered =
          !disableHoverEffect &&
          hoveredNode &&
          graph.hasNode(hoveredNode) &&
          (node === hoveredNode || graph.neighbors(hoveredNode).includes(node));
      
        return {
          ...data,
          highlighted: data.highlighted || false,
          color: isHovered ? data.color : "#E2E2E2"
        };
      },      
      edgeReducer: (edge, data) => {
        const graph = sigma.getGraph();
        const newData = { ...data, hidden: false };

        if (
          !disableHoverEffect &&
          hoveredNode &&
          !graph.extremities(edge).includes(hoveredNode)
        ) {
          newData.hidden = true;
        }
        return newData;
      },
    });
  }, [hoveredNode, setSettings, sigma, disableHoverEffect, selectedNode]);

  return null;
};
