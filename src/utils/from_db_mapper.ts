import Graph from "graphology";
import { getAllNodes } from "../services/node.service";
import { Node } from "../model/types";

export const generateGraph = async () => {
  const nodes: Node[] | undefined = await getAllNodes();
  if (!nodes) throw new Error("No nodes found in the database");
  const graph = new Graph();

  nodes.forEach((node) => {
    graph.addNode(node._id, {
      label: node.info?.title ?? "",
      size: 15,
      color: "#10B981",
      x: 0,
      y: 0,
      parent: null,
      baseSize: 10,
      image:
        "https://cdnjs.cloudflare.com/ajax/libs/twemoji/14.0.2/72x72/1f600.png",
    });
  });

  nodes.forEach((node) => {
    if (!node.children) return;
    node.children.forEach((child) => {
      graph.addEdge(node._id, child, { label: "" });
    });
  });

  console.log("Graph generated from DB:", graph);
  return graph;
};
