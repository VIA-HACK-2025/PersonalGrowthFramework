import { faker } from "@faker-js/faker";
import Graph, { UndirectedGraph } from "graphology";
import erdosRenyi from "graphology-generators/random/erdos-renyi";
import { useCallback } from "react";

export type NodeType = {
    x: number;
    y: number;
    label: string;
    size: number;
    color: string;
    highlighted?: boolean;
};
export type EdgeType = { label: string };
export const useRandom = () => {

    const randomColor = useCallback(() => {
        const digits = "0123456789abcdef";
        let code = "#";
        for (let i = 0; i < 6; i++) {
            code += digits.charAt(Math.floor(Math.random() * 16));
        }
        return code;
    }, []);

    const randomGraph = useCallback(() => {
        // Create the graph
        const graph = erdosRenyi(UndirectedGraph, { order: 100, probability: 0.1 });
        graph.nodes().forEach((node: string) => {
            graph.mergeNodeAttributes(node, {
                label: faker.person.fullName(),
                size: faker.number.int({ min: 4, max: 20 }),
                color: randomColor(),
                x: Math.random(),
                y: Math.random(),
                // for node-border
                borderColor: randomColor(),
                borderSize: faker.number.float({ min: 0, max: 1, multipleOf: 0.1 }),
                // for node-image
                pictoColor: randomColor(),
                image: faker.image.urlLoremFlickr(),
            });
        });
        return graph as Graph<NodeType, EdgeType>;
    }, [faker, randomColor]);

    return { faker, randomColor, randomGraph };
};
