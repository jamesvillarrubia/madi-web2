'use client'

import { useState } from 'react'
import Wrapper from '@/components/Wrapper.component'
import Contexts from '@/components/Contexts.component'
import { NetworkGraph } from '@/components/Visuals/NetworkGraph/NetworkGraph'
import { Flex, Select } from '@radix-ui/themes'

const SideBarVisuals = ({ onSelectChange }) => {
  return (
    <Flex className="h-full">
      <Select.Root 
      defaultValue="networkGraph" 
      onValueChange={onSelectChange}
      size="2"
      >
        <Select.Trigger variant="soft" />
        <Select.Content className="w-full">
          <Select.Group className="w-full">
            <Select.Item value="networkGraph">Network Graph</Select.Item>
            <Select.Item value="graph2">Graph 2</Select.Item>
            <Select.Item value="graph3">Graph 3</Select.Item>
          </Select.Group>
        </Select.Content>
      </Select.Root>
    </Flex>
  )
}

const NetworkGraphPage = () => {
  const [selectedGraph, setSelectedGraph] = useState('networkGraph')

  const handleSelectChange = (value) => {
    setSelectedGraph(value)
  }

  const renderGraph = () => {
    switch (selectedGraph) {
      case 'networkGraph':
        return <NetworkGraph />
      case 'graph2':
        return <>Graph2</>
      case 'graph3':
        return <>Graph3</>
      default:
        return null
    }
  }

  return (
    <Contexts>
      <Wrapper sidebarComponent={<SideBarVisuals onSelectChange={handleSelectChange} />}>
        {renderGraph()}
      </Wrapper>
    </Contexts>
  )
}

export default NetworkGraphPage