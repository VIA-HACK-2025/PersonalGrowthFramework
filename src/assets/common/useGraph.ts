import { useCallback } from "react";
import Graph from "graphology";
import { useSigma } from "@react-sigma/core";
import { useGraphContext } from "../context/GraphSelectionContext";

export const useGraph = () => {
    const sigma = useSigma();
    const { selectedNode } = useGraphContext();

    const loadedGraph = useCallback((): Graph => {
        const graph = new Graph();
        graph.addNode("me", {
            label: "me",
            x: 0,
            y: 0,
            size: 10,
            color: "#4F46E5",
        });
        return graph;
    }, []);

    const addNode = useCallback(() => {
        if (!selectedNode) return;
        const graph = sigma.getGraph();

        const newId = `n${graph.order}`;
        const angle = Math.random() * 2 * Math.PI;
        const distance = 30;
        const x0 = graph.getNodeAttribute(selectedNode, "x");
        const y0 = graph.getNodeAttribute(selectedNode, "y");

        graph.addNode(newId, {
            label: newId,
            x: x0 + Math.cos(angle) * distance,
            y: y0 + Math.sin(angle) * distance,
            size: 8,
            color: "#10B981", // Emerald-500
        });
        graph.addEdge(selectedNode, newId, { label: "" });
    }, [sigma, selectedNode]);

    return { loadedGraph, addNode };
};
