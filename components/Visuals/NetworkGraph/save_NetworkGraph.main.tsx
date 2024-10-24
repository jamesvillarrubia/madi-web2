// /* eslint-disable @typescript-eslint/ban-ts-comment */
// 'use client'

// import React from 'react'
// import * as d3 from 'd3'
// import { useEffect, useRef, useState, useMemo } from 'react'
// import { Flex } from '@radix-ui/themes'
// import { useTheme } from '@/components/Themes'
// import { useDataContext } from './DataContext';

// const usePrevious = (value, initialValue) => {
//   const ref = useRef(initialValue);
//   useEffect(() => {
//     ref.current = value;
//   });
//   return ref.current;
// };

// const useEffectDebugger = (effectHook, dependencies, dependencyNames = []) => {
//   const previousDeps = usePrevious(dependencies, []);

//   const changedDeps = dependencies.reduce((accum, dependency, index) => {
//     if (dependency !== previousDeps[index]) {
//       const keyName = dependencyNames[index] || index;
//       return {
//         ...accum,
//         [keyName]: {
//           before: previousDeps[index],
//           after: dependency
//         }
//       };
//     }

//     return accum;
//   }, {});

//   if (Object.keys(changedDeps).length) {
//     console.log('[use-effect-debugger] ', changedDeps);
//   }

//   useEffect(effectHook, dependencies);
// };

// import {
//   createZoomBehavior,
//   drag,
//   createNodeElements,
//   createLinkElements,
//   createLabelElements,
//   updateLinkPositions,
//   updateNodePositions,
//   updateLabelPositions,
//   showLabel,
//   hideLabel,
//   setupSimulation
// } from './_utils'
// import { ThresholdSlider } from './ThresholdSlider'



// export const NetworkGraphOptions = () => {
//   return (
//     <Flex className="h-full mt-5" gap={'3'}>
//       <span className="w-full text-center italic text-gray-600 dark:text-gray-400">
//         No options available.
//       </span>
//     </Flex>
//   )
// }

// export const NetworkGraph = () => {
//   const { embeddings, nodePositions, links, simulation, nodes, shapes, hasRun, setHasRun } = useDataContext();
//   const [threshold, setThreshold] = useState(0.895);
//   const svgRef = useRef<SVGSVGElement | null>(null);
//   const { theme } = useTheme();


//   const lineColor = useMemo(() => {
//     return theme === 'dark' ? '#595959' : '#adadad'
//   }, [theme])








//   useEffectDebugger(() => {
//     console.log('Rendering network graph...')
//     if (!svgRef.current) return

//     const svg = d3.select(svgRef.current)
//     svg.selectAll('*').remove()

//     const linkElements = createLinkElements(svg, links, lineColor)
//     const nodeElements = createNodeElements(svg, nodes, shapes, drag(simulation))
//     const labelElements = createLabelElements(svg, nodes)

//     // const { width, height } = svg.node()?.getBoundingClientRect() ?? { width: 800, height: 600 }
//     setupSimulation(simulation, nodes, links, 800, 600)


//     if(!hasRun && embeddings.length > 0 && nodePositions) {
//       console.log('Setting up simulation...')
//     }

//     const zoom = createZoomBehavior(svg)

//     //@ts-ignore
//     svg.call(zoom)


//     nodeElements
//       .on('mouseover', function (event, d) {
//         showLabel.call(this, event, d, labelElements)
//       })
//       .on('mouseout', function (event, d) {
//         hideLabel.call(this, event, d, labelElements)
//       })

//     // if(!hasRun) {
      
//       simulation?.on('tick', () => {
//         //@ts-ignore
//         updateLinkPositions(linkElements)
//         //@ts-ignore
//         updateNodePositions(nodeElements)
//         //@ts-ignore
//         updateLabelPositions(labelElements)
//       })

//     //   setHasRun(true)
//     // }

//   }, [
//     // embeddings, 
//     // nodePositions, 
//     // simulation, 
//     // hasRun, 
//     // threshold, 
//     // lineColor, 
//     // links, 
//     nodes, 
//     // setHasRun, 
//     // shapes
//   ])

//   return (
//     <div>
//       <svg ref={svgRef} width="100%" height="800px" />
//       <ThresholdSlider value={threshold} onChange={setThreshold} />
//     </div>
//   )
// }

// export default NetworkGraph
