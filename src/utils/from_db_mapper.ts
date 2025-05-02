import Graph from "graphology";
import { getAllNodes } from "../services/db";
import { Node } from "../model/types";

export const generateGraph = async () => {
    const nodes: Node[] = await getAllNodes() as Node[];
    if (!nodes) throw new Error("No nodes found in the database");
    const graph = new Graph();

    nodes.forEach((node) => {
        graph.addNode(node._id, {
            label: node.info?.title ?? "",
            size: 8,
            color: "#10B981"
        });
    });

    nodes.forEach((node) => {
        if (!node.children) return;
        node.children.forEach((child) => {
            graph.addEdge(node._id, child, { label: "" });
        });
    });

    return graph;
}