import { faker } from "@faker-js/faker";
import { SerializedGraph } from "graphology-types";
import { useMemo } from "react";

// Pick a fixed list of FA icon names you support
const faIcons = [
  "FaUser", "FaStar", "FaCog", "FaBolt", "FaBug",
  "FaAnchor", "FaApple", "FaBell", "FaBook", "FaCamera"
];

export function useRandomGraph(nodeCount = 50): SerializedGraph {
  return useMemo(() => {
    const degreeMap = new Map<string, number>();
    const nodes: SerializedGraph["nodes"] = [];
    const edgeSet = new Set<string>();
    const edges: SerializedGraph["edges"] = [];

    for (let i = 0; i < nodeCount; i++) {
      const key = `n${i}`;
      degreeMap.set(key, 0);
    }

    for (let i = 0; i < nodeCount; i++) {
      const source = `n${i}`;
      const connections = faker.number.int({ min: 1, max: 5 });

      for (let j = 0; j < connections; j++) {
        const targetIndex = faker.number.int({ min: 0, max: nodeCount - 1 });
        const target = `n${targetIndex}`;
        const edgeKey = source < target ? `${source}_${target}` : `${target}_${source}`;

        if (source !== target && !edgeSet.has(edgeKey)) {
          edgeSet.add(edgeKey);
          edges.push({
            key: edgeKey,
            source,
            target,
            attributes: { color: "#ccc" },
          });

          degreeMap.set(source, (degreeMap.get(source) || 0) + 1);
          degreeMap.set(target, (degreeMap.get(target) || 0) + 1);
        }
      }
    }

    for (let i = 0; i < nodeCount; i++) {
      const key = `n${i}`;
      const degree = degreeMap.get(key) || 1;
      const iconName = faker.helpers.arrayElement(faIcons);

      nodes.push({
        key,
        attributes: {
          label: faker.person.fullName(),
          x: faker.number.float({ min: -100, max: 100 }),
          y: faker.number.float({ min: -100, max: 100 }),
          size: Math.max(5, Math.sqrt(degree) * 10),
          color: faker.color.rgb(),
          image: iconName, // just a string
        },
      });
    }

    return {
      attributes: {},
      options: {},
      nodes,
      edges,
    };
  }, [nodeCount]);
}
