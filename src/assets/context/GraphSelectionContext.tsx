// src/context/GraphSelectionContext.tsx
import React, { createContext, useContext, useState, useCallback, ReactNode } from 'react';

interface GraphContextType {
    selectedNode: string | null;
    setSelectedNode: (node: string | null) => void;
    addNode: () => void;
    registerAddNode: (callback: () => void) => void;
    isReady: boolean
}

const GraphContext = createContext<GraphContextType | null>(null);

export const useGraphContext = (): GraphContextType => {
  const context = useContext(GraphContext);
  if (!context) {
    throw new Error('useGraphSelection must be used within a GraphSelectionProvider');
  }
  return context;
};

interface GraphProviderProps {
  children: ReactNode;
}

export const GraphProvider: React.FC<GraphProviderProps> = ({ children }) => {
  const [selectedNode, setSelectedNode] = useState<string | null>(null);
  const [addNodeCallback, setAddNodeCallback] = useState<() => void>(() => {
    console.warn('addNode was called before it was registered');
  });
  const [isReady, setIsReady] = useState(false);

  const registerAddNode = useCallback((callback: () => void) => {
    setAddNodeCallback(() => callback);
    setIsReady(true);
  }, []);

  const addNode = useCallback(() => {
    addNodeCallback();
  }, [addNodeCallback]);

  return (
    <GraphContext.Provider
      value={{
        selectedNode,
        setSelectedNode,
        addNode,
        registerAddNode,
        isReady
      }}
    >
      {children}
    </GraphContext.Provider>
  );
};