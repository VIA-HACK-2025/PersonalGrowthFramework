import {
  useLoadGraph,
  useRegisterEvents,
  useSetSettings,
  useSigma,
} from "@react-sigma/core";
import { FC, useCallback, useEffect, useState } from "react";
import { useGraph } from "../hooks/useGraph";
import { useGraphContext } from "../context/GraphContext";



export const Graph: FC<{ disableHoverEffect: boolean }> = ({ disableHoverEffect }) => {
  const { selectedNode, setSelectedNode, registerAddNode, setIsLeafNode } = useGraphContext();
  const { loadedGraph, addNode } = useGraph({
    nodeColors: {
      root: "purple",
      leaf: "green",
      default: "black",
    },
  });
  const sigma = useSigma();
  const registerEvents = useRegisterEvents();
  const setSettings = useSetSettings();
  const loadGraph = useLoadGraph();

  const [hoveredNode, setHoveredNode] = useState<string | null>(null);

  useEffect(() => {
    loadGraph(loadedGraph());
  }, [loadGraph, loadedGraph]);

  const memoizedRegisterEvents = useCallback(registerEvents, []);
  const memoizedRegisterAddNode = useCallback(registerAddNode, []);
  const memoizedAddNode = useCallback(addNode, [addNode]);
  const memoizedSetSelectedNode = useCallback(setSelectedNode, []);
  const memoizedSetIsLeafNode = useCallback(setIsLeafNode, []);

  useEffect(() => {
    memoizedRegisterEvents({
      enterNode: ({ node }) => setHoveredNode(node),
      leaveNode: () => setHoveredNode(null),
      downNode: ({ node }) => {
        setSelectedNode(node);
        requestAnimationFrame(() => {
          const graph = sigma.getGraph();
          const isLeaf = graph.hasNode(node) && graph.outNeighbors(node).length === 0;
          setIsLeafNode(isLeaf);
          console.log("isLeaf:", isLeaf);
        });
      },
      downStage: () => {
        setSelectedNode(null);
        setIsLeafNode(false);
      }
    });

    memoizedRegisterAddNode(() => memoizedAddNode());
  }, [
    memoizedRegisterEvents,
    memoizedRegisterAddNode,
    memoizedAddNode,
    memoizedSetSelectedNode,
    memoizedSetIsLeafNode,
    sigma,
  ]);
  useEffect(() => {
    setSettings({
      nodeReducer: (node, data) => {
        let nodeData = { ...data };

        if (selectedNode === node) {
          nodeData = {
            ...nodeData,
            borderColor: "#ff5733",
            borderWidth: 2,
            highlighted: true,
            zIndex: 2,
          };
        }

        if (!disableHoverEffect && hoveredNode !== null) {
          const graph = sigma.getGraph();
          const isNeighbor =
            node === hoveredNode ||
            (graph.hasNode(hoveredNode) && graph.neighbors(hoveredNode).includes(node));

          if (node !== selectedNode) {
            nodeData = {
              ...nodeData,
              color: isNeighbor ? nodeData.color : "#E2E2E2",
              highlighted: isNeighbor,
              zIndex: isNeighbor ? 1 : 0,
            };
          }

          if (selectedNode === node && hoveredNode !== node) {
            nodeData.zIndex = 1;
          }
        }

        return nodeData;
      },

      edgeReducer: (edge, data) => {
        if (disableHoverEffect || hoveredNode == null) {
          if (selectedNode) {
            const graph = sigma.getGraph();
            const isConnectedToSelected = graph.extremities(edge).includes(selectedNode);

            if (isConnectedToSelected) {
              return {
                ...data,
                color: "#ff8c66",
                size: data.size * 1.5,
              };
            }
          }
          return data;
        }

        const graph = sigma.getGraph();
        const isIncident = graph.extremities(edge).includes(hoveredNode);

        if (selectedNode && hoveredNode) {
          const extremities = graph.extremities(edge);
          if (extremities.includes(selectedNode) && extremities.includes(hoveredNode)) {
            return {
              ...data,
              color: "#ff5733",
              size: data.size * 2,
            };
          }
        }

        return {
          ...data,
          hidden: !isIncident,
        };
      },
    });
  }, [hoveredNode, selectedNode, setSettings, sigma, disableHoverEffect]);

  return null;
};
