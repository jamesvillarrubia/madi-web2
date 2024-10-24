
'use client'


import { Flex, Select } from '@radix-ui/themes'


interface SideBarVisualsProps {
    onSelectChange: (value: string) => void
    graphOptions: React.ReactNode,
    graphMap: Record<string, [string, React.ReactNode, React.ReactNode]>
}


export const SideBarVisuals = ({ graphMap, onSelectChange, graphOptions }: SideBarVisualsProps) => {

    return (
      <Flex className="h-full" gap={'3'} direction={'column'}>
        <Select.Root defaultValue="networkGraph" onValueChange={onSelectChange} size="2">
          <Select.Trigger variant="soft" className="w-full" />
          <Select.Content className="w-full">
            <Select.Group className="w-full">
              {Object.entries(graphMap).map(([key, [label]]) => (
                <Select.Item key={key} value={key}>
                  {label}
                </Select.Item>
              ))}
            </Select.Group>
          </Select.Content>
        </Select.Root>
        {graphOptions}
      </Flex>
    )
  }

export default SideBarVisuals