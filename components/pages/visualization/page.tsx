/* eslint-disable react/jsx-key */
'use client'

import { useState } from 'react'
import Wrapper from '@/components/Layout/Wrapper.component'
import SideBar from '@/components/Visuals/Visuals.sidebar'
import Visuals from '@/components/Visuals/Visuals.component'
import NetworkGraph, { NetworkGraphOptions } from '@/components/Visuals/NetworkGraph/NetworkGraph.main'




const VisualizationPage = () => {
  const [selectedGraph, setSelectedGraph] = useState('networkGraph')
  const handleSelectChange = (value: string) => {
    setSelectedGraph(value)
  }

  const graphMap : Record<string, [string, React.ReactNode, React.ReactNode]> = {
    networkGraph: ['Network Graph', <NetworkGraph />, <NetworkGraphOptions />], 
    graph2: ['Graph 2',<div>Graph 2</div>, <div>Graph 2 Options</div>],
    graph3: ['Graph 3',<div>Graph 3</div>, <div>Graph 3 Options</div>],
  }
  

  return (
    <Wrapper sidebarComponent={<SideBar graphMap={graphMap} graphOptions={graphMap[selectedGraph][2]} onSelectChange={handleSelectChange}/>
    }>
      <Visuals selectedGraph={selectedGraph} graphMap={graphMap} />
    </Wrapper>
  )
}

export default VisualizationPage
