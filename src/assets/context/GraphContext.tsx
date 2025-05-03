import React, { createContext, useContext, useState, useCallback, ReactNode } from 'react';

interface AddNodeProps{
  icon: string;
  title: string;
}

interface GraphContextType {
    selectedNode: string | null;
    setSelectedNode: (node: string | null) => void;
    addNode: (data: AddNodeProps) => void;
    registerAddNodeImplementation: (callback: (data: AddNodeProps) => void) => void;
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
  const [addNodeFunction, setAddNodeFunction] = useState<(data: AddNodeProps) => void>(() => {
    console.warn('addNode was called before it was registered');
  });


  const registerAddNodeImplementation = useCallback((implementation: (data: AddNodeProps) => void) => {
    setAddNodeFunction(() => implementation);
  }, []);

  const addNode = useCallback((data: AddNodeProps) => {
    if (addNodeFunction) {
      addNodeFunction(data);
    } else {
      console.warn('addNode was called before a handler was registered');
    }
  }, [addNodeFunction]);
  

  return (
    <GraphContext.Provider
      value={{
        selectedNode,
        setSelectedNode,
        addNode,
        registerAddNodeImplementation,
      }}
    >
      {children}
    </GraphContext.Provider>
  );
};