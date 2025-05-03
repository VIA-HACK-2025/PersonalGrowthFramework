import { useCallback, useRef } from "react";
import Graph from "graphology";
import { useSigma } from "@react-sigma/core";
import { useGraphContext } from "../context/GraphContext";

interface useGraphProps {
  nodeColors: {
    leaf: string;
    root: string;
    default: string;
  };
}

export const useGraph = (props: useGraphProps) => {
  const sigma = useSigma();
  const { selectedNode } = useGraphContext();

  const descendantCounts = useRef<Map<string, number>>(new Map());

  const loadedGraph = useCallback(() => {
    const g = new Graph();
    g.addNode("me", {
      label: "me",
      x: 0,
      y: 0,
      size: 10,
      color: props.nodeColors.root,
      parent: null,
      baseSize: 10,
    });
    descendantCounts.current.set("me", 0);
    return g;
  }, [props.nodeColors.root]);

  const addNode = useCallback(() => {
    if (!selectedNode) return;
    const graph = sigma.getGraph();
    if (!graph.hasNode(selectedNode)) return;

    const newId = `n${graph.order}`;
    let depth = 0;
    let p: string | null = selectedNode;

    while (p !== null) {
      p = graph.getNodeAttribute(p, "parent") as string | null;
      if (p) depth++;
    }
    const offset = 1 / Math.pow(3, depth + 1);

    const x0 = graph.getNodeAttribute(selectedNode, "x") as number;
    const y0 = graph.getNodeAttribute(selectedNode, "y") as number;
    const angle = Math.random() * 2 * Math.PI;
    const x = x0 + Math.cos(angle) * offset;
    const y = y0 + Math.sin(angle) * offset;

    graph.addNode(newId, {
      label: newId,
      x,
      y,
      size: 8,
      color: props.nodeColors.leaf,
      parent: selectedNode,
      baseSize: 8,
      image:
        "https://cdnjs.cloudflare.com/ajax/libs/twemoji/14.0.2/72x72/1f600.png",
    });
    graph.addEdge(selectedNode, newId, {
      size: 2,
      color: "#94A3B8",
    });

    descendantCounts.current.set(newId, 0);

    let curr: string | null = selectedNode;
    while (curr !== null) {
      const prev = descendantCounts.current.get(curr) || 0;
      descendantCounts.current.set(curr, prev + 1);

      if (curr !== "me") {
        graph.setNodeAttribute(curr, "color", props.nodeColors.default);
      }

      curr = graph.getNodeAttribute(curr, "parent") as string | null;
    }

    curr = selectedNode;
    while (curr !== null) {
      const base = graph.getNodeAttribute(curr, "baseSize") as number;
      const count = descendantCounts.current.get(curr) || 0;
      graph.setNodeAttribute(curr, "size", base * Math.sqrt(count + 1));
      curr = graph.getNodeAttribute(curr, "parent") as string | null;
    }

    graph.setNodeAttribute(newId, "size", 8);
  }, [sigma, selectedNode, props.nodeColors.leaf, props.nodeColors.default]);

  return { loadedGraph, addNode };
};
