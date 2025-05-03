import Graph from "graphology";

export const createInitialGraph = () => {
  const graph = new Graph();
  graph.addNode("me", {
    label: "me",
    x: 0,
    y: 0,
    size: 10,
    color: "#ff0000",
    parent: null,
    baseSize: 10,
  });
  return graph;
};
