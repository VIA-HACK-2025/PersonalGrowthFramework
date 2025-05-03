import { useCallback, useRef } from "react";
import Graph from "graphology";
import { useSigma } from "@react-sigma/core";
import { useGraphContext } from "../context/GraphContext";
import { initialGraph } from "../../fixtures/init_graph";
import { generateGraph } from "../../utils/from_db_mapper";

interface useGraphProps {
  nodeColors: {
    leaf: string;
    root: string;
    default: string;
  };
}

function emojiToTwemojiCode(emoji: string): string {
  return [...emoji]
    .map((char) => char.codePointAt(0)?.toString(16))
    .filter(Boolean)
    .join("-");
}

export const useGraph = (props: useGraphProps) => {
  const sigma = useSigma();
  const { selectedNode } = useGraphContext();

  const descendantCounts = useRef<Map<string, number>>(new Map());

  const loadedGraph = useCallback(async (): Promise<Graph> => {
    const dbGraph = await generateGraph();
    if (!dbGraph) {
      descendantCounts.current.set("me", 0);
      return initialGraph;
    }
    console.log("Graph loaded from DB:", dbGraph.nodes()[0]);
    descendantCounts.current.set(dbGraph.nodes()[0], 0);
    return dbGraph;
  }, []);

  const addNode = useCallback(
    (data: { icon?: string; title?: string }) => {
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
      const offset = 1 / Math.pow(2, depth + 1);

      const x0 = graph.getNodeAttribute(selectedNode, "x") as number;
      const y0 = graph.getNodeAttribute(selectedNode, "y") as number;
      const angle = Math.random() * 2 * Math.PI;
      const x = x0 + Math.cos(angle) * offset;
      const y = y0 + Math.sin(angle) * offset;

      graph.addNode(newId, {
        label: null,
        x,
        y,
        size: 32,
        color: props.nodeColors.leaf,
        parent: selectedNode,
        baseSize: 32,
        image: data.icon
          ? `https://cdnjs.cloudflare.com/ajax/libs/twemoji/14.0.2/72x72/${emojiToTwemojiCode(
              data.icon
            )}.png`
          : undefined,
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

      graph.setNodeAttribute(newId, "size", 32);
    },
    [sigma, selectedNode, props.nodeColors.leaf, props.nodeColors.default]
  );

  return { loadedGraph, addNode };
};
