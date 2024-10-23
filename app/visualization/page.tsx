'use client'

import { useState } from 'react'
import Wrapper from '@/components/Layout/Wrapper.component'
import { NetworkGraph } from '@/components/Visuals/NetworkGraph/NetworkGraph'
import { SideBarVisuals } from '@/components/Visuals/NetworkGraph/NetworkGraph.Sidebar'




const VisualizationPage = () => {
  const [selectedGraph, setSelectedGraph] = useState('networkGraph')
  const handleSelectChange = (value: string) => {
    setSelectedGraph(value)
  }

  return (
    <Wrapper sidebarComponent={<SideBarVisuals  selectedGraph={selectedGraph} onSelectChange={handleSelectChange}/>}>
      <NetworkGraph />
    </Wrapper>
  )
}

export default VisualizationPage
