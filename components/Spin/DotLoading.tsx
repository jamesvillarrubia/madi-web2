/** AUTO-SUMMARY **
   Purpose: This file defines a React component for displaying a loading indicator composed of dots.

   Key Components:
   - `DotProps`: TypeScript interface defining the properties for the `DotLoading` component.
   - `DotLoading`: React functional component that renders the loading dots.

   Functional Overview: The `DotLoading` component takes a size property to determine the size of the dots. It renders a container div with a dynamic width based on the size of the dots and contains five dots, each styled according to the specified size.

   Dependencies and Integrations: 
   - Uses `isNumber` from `lodash-es` to validate if the size is a number.
   - Imports `CSSProperties` from `react` for type-checking the style properties.

   Additional Context: The component is designed to be reusable and configurable through the `size` prop, allowing it to be adapted to different parts of the application where a loading indicator is needed.
*** END-SUMMARY **/
import { isNumber } from 'lodash-es'
import { CSSProperties } from 'react'

export interface DotProps {
  size?: CSSProperties['fontSize']
}

export default function DotLoading(props: DotProps) {
  const dotStyle = {
    width: props.size,
    height: props.size
  }

  const sizeNumber = props.size ? parseInt(String(props.size)) : 0

  return (
    <div
      className="spin-dot-list "
      style={{
        height: props.size,
        width: isNumber(sizeNumber) && sizeNumber > 0 ? sizeNumber * 7 : ''
      }}
    >
      {[...new Array(5)].map((_, index) => {
        return <div key={index} className="spin-dot-list " style={dotStyle} />
      })}
    </div>
  )
}
