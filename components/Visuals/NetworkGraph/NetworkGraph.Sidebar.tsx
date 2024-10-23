
'use client'

import {  NetworkGraphOptions, } from '@/components/Visuals/NetworkGraph/NetworkGraph'

import { Flex, Select } from '@radix-ui/themes'


interface SideBarVisualsProps {
    selectedGraph: string
    onSelectChange: (value: string) => void
  }
  
  /**
   * Given the selected graph, render the associated options
   * @returns a JSX element representing the options for the selected graph
   */
export const SideBarVisuals = ({ selectedGraph, onSelectChange }: SideBarVisualsProps) => {

    const renderOptions = () => {
      switch (selectedGraph) {
        case 'networkGraph':
          return <NetworkGraphOptions />
        case 'graph2':
          return <>Graph 2 Options</>
        case 'graph3':
          return <>Graph 3 Options</>
        default:
          return null
      }
    }
  
    return (
      <Flex className="h-full" gap={'3'} direction={'column'}>
        <Select.Root defaultValue="networkGraph" onValueChange={onSelectChange} size="2">
          <Select.Trigger variant="soft" className="w-full" />
          <Select.Content className="w-full">
            <Select.Group className="w-full">
              <Select.Item value="networkGraph">Network Graph</Select.Item>
              <Select.Item value="graph2">Graph 2</Select.Item>
              <Select.Item value="graph3">Graph 3</Select.Item>
            </Select.Group>
          </Select.Content>
        </Select.Root>
        {renderOptions()}
      </Flex>
    )
  }