// import React, { createContext, useContext, useState, useEffect, useRef, useMemo } from 'react';
// import * as d3 from 'd3';
// import { NodeDatum, SimulationLink, MaturityLevel, SimilarityLink } from './types';
// import { createLabel, createNodes, createLinks, calculateSimilarity } from './utils'; // Import the functions
// import { useTheme } from '@/components/Themes';
// // const outputData = require('./output.json');

// import data from './output.json'
// type DataContextType = {
//   embeddings: NodeDatum[];
//   nodePositions: { [key: string]: { x: number; y: number } };
//   setNodePositions: React.Dispatch<React.SetStateAction<{ [key: string]: { x: number; y: number } }>>;
//   simulation: d3.Simulation<NodeDatum, SimulationLink>;
//   hasRun: boolean;
//   setHasRun: React.Dispatch<React.SetStateAction<boolean>>;
//   similarities: SimilarityLink[];
//   nodes: NodeDatum[];
//   links: SimulationLink[];
//   threshold: number;
//   shapes: d3.SymbolType[];
//   setThreshold: (threshold: number) => void;
// };

// const NODE_SHAPES = [
//   // d3.symbolDiamond,
//   d3.symbolCircle
//   // d3.symbolSquare,
//   // d3.symbolTriangle,
//   // d3.symbolStar,
//   // d3.symbolCross,
//   // d3.symbolWye,
//   // d3.symbolAsterisk
// ]

// const DataContext = createContext<DataContextType | undefined>(undefined);

// export const DataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
//   const [embeddings, setEmbeddings] = useState<any[]>([]);
//   const [hasRun, setHasRun] = useState(false);
//   const [nodePositions, setNodePositions] = useState<{ [key: string]: { x: number; y: number } }>({});
//   const simulationRef = useRef<d3.Simulation<NodeDatum, SimulationLink>>(d3.forceSimulation());
//   const [threshold, setThreshold] = useState(0.895);

//   const { theme } = useTheme();

//   // Load the data initially
//   useEffect(() => {
//     // setEmbeddings(data)
//     // console.log('Loading network data...');
//     // import('./output.json')
//     //   .then((module) => {
//     //     console.log('Data loaded');
//     //     if (Array.isArray(module.default)) {
//     //       setEmbeddings(module.default as any[]);
//     //       console.log('Embeddings set:', module.default);
//     //     } else {
//     //       console.error('Data is not an array:', module.default);
//     //     }
//     //   })
//     //   .catch((error) => {
//     //     console.error('Error importing data:', error);
//     //   });
//   }, []);

//   // Create a COLOR_SCALE memoized based on maturity levels and theme
//   // const COLOR_SCALE = useMemo(() => {
//   //   const maturityLevels = ['whitespace', 'Super High', 'High', 'Medium', 'Low', 'X1', 'Execution'];
//   //   const scale: Record<string, string> = {};
//   //   maturityLevels.forEach((level, index) => {
//   //     const t = (index + 1) / maturityLevels.length;
//   //     const color = d3.rgb(d3.interpolatePlasma(t));
//   //     scale[level] = theme === 'dark' ? color.brighter(1).toString() : color.darker(0.1).toString();
//   //   });
//   //   return scale;
//   // }, [theme]);

//   // // Define derived states that depend on `embeddings`
//   // const embeddingVectors = useMemo(() => {
//   //   console.log('Calculating embeddingVectors:', embeddings);
//   //   return embeddings.map((item) => item.embedding)
//   // }, [embeddings]);
//   // const maturityLevels = useMemo(() => embeddings.map((item) => item.maturity), [embeddings]);
//   // const sources = useMemo(() => embeddings.map((item) => item.source), [embeddings]);

//   // const uniqueSources = useMemo(() => Array.from(new Set(sources)), [sources]);
//   // const sourceShapeMap = useMemo(() => 
//   //   Object.fromEntries(uniqueSources.map((source, index) => [source, NODE_SHAPES[index % NODE_SHAPES.length]])), 
//   //   [uniqueSources]
//   // );

//   // const colors = useMemo(() => 
//   //   maturityLevels.map((maturity) => {
//   //     const color = COLOR_SCALE[maturity as MaturityLevel]
//   //       ? COLOR_SCALE[maturity as MaturityLevel]
//   //       : COLOR_SCALE['whitespace'];
//   //     return color;
//   //   }), 
//   //   [maturityLevels, COLOR_SCALE]
//   // );

//   // const shapes = useMemo(() => sources.map((source) => sourceShapeMap[source]), [sources, sourceShapeMap]);
//   // const labels = useMemo(() => embeddings.map((item) => createLabel(item)), [embeddings]);

//   // // Calculate similarity and nodes/links whenever embeddings change
//   // const similarities = useMemo(() => calculateSimilarity(embeddingVectors), [embeddingVectors]);
//   // const nodes = useMemo(() => createNodes(embeddings, colors, labels, nodePositions), [embeddings, colors, labels, nodePositions]);
//   // const links = useMemo(() => createLinks(nodes, similarities, threshold), [nodes, similarities, threshold]);


//   const COLOR_SCALE = (() => {
//     const maturityLevels = ['whitespace', 'Super High', 'High', 'Medium', 'Low', 'X1', 'Execution'];
//     const scale: Record<string, string> = {};
//     maturityLevels.forEach((level, index) => {
//       const t = (index + 1) / maturityLevels.length;
//       const color = d3.rgb(d3.interpolatePlasma(t));
//       scale[level] = theme === 'dark' ? color.brighter(1).toString() : color.darker(0.1).toString();
//     });
//     return scale;
//   })();

//   // Define derived states that depend on `embeddings`
//   const embeddingVectors = embeddings.map((item) => item.embedding);
//   const maturityLevels = embeddings.map((item) => item.maturity);
//   const sources = embeddings.map((item) => item.source);

//   const uniqueSources = Array.from(new Set(sources));
//   const sourceShapeMap = Object.fromEntries(
//     uniqueSources.map((source, index) => [source, NODE_SHAPES[index % NODE_SHAPES.length]])
//   );

//   const czolors = maturityLevels.map((maturity) => {
//     const color = COLOR_SCALE[maturity as MaturityLevel] ? COLOR_SCALE[maturity as MaturityLevel] : COLOR_SCALE['whitespace'];
//     return color;
//   });

//   const shapes = sources.map((source) => sourceShapeMap[source]);
//   const labels = embeddings.map((item) => createLabel(item));

//   // Calculate similarity and nodes/links whenever embeddings change
//   const similarities = calculateSimilarity(embeddingVectors);
//   const nodes = createNodes(embeddings, colors, labels, nodePositions);
//   const links = createLinks(nodes, similarities, threshold);







//   return (
//     <DataContext.Provider value={{ 
//       // embeddings, 
//       // nodePositions, 
//       // setNodePositions, 
//       // simulation: simulationRef.current, 
//       // hasRun, 
//       // setHasRun,
//       // similarities,
//       // shapes,
//       // nodes,
//       // links,
//       // threshold,
//       // setThreshold
//     }}>
//       {/* {children} */}
//     </DataContext.Provider>
//   );
// };

// export const useDataContext = () => {
//   const context = useContext(DataContext);
//   if (!context) {
//     throw new Error('useDataContext must be used within a DataProvider');
//   }
//   return context;
// };