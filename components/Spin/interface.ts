/** AUTO-SUMMARY **
   Purpose: This file defines the TypeScript interface for the properties of a `Spin` component used in a React project.

   Key Components:
   - `SpinProps`: Interface defining the properties for the `Spin` component.

   Functional Overview: The interface specifies optional and mandatory properties that can be passed to the `Spin` component, such as styling, loading status, icon customization, and delay settings. It ensures type safety and autocompletion features for developers working with the `Spin` component in the project.

   Dependencies and Integrations: This file likely integrates with other parts of the UI component library, specifically where `Spin` components are utilized. It depends on types from 'react' for defining properties like `CSSProperties` and `ReactNode`.

   Additional Context: The `Spin` component is typically used to indicate loading states in the UI, enhancing user experience by providing visual feedback during asynchronous operations. The properties allow for extensive customization to fit various design requirements.
*** END-SUMMARY **/
import { CSSProperties, ReactNode } from 'react'

/**
 * @title Spin
 */
export interface SpinProps {
  style?: CSSProperties
  className?: string | string[]
  children?: ReactNode
  /**
   * Whether is loading status (Only works when `Spin` has children))
   */
  loading?: boolean
  /**
   * The size of loading icon
   */
  size?: '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9'
  /**
   * Customize icon which will be rotated automatically.
   */
  icon?: ReactNode
  /**
   * Customize element which won't be rotated automatically, such as image/gif.
   */
  element?: ReactNode
  /**
   * Customize description content when Spin has children
   */
  tip?: string | ReactNode
  /**
   * Specifies a delay(ms) for loading state
   */
  delay?: number
  /**
   *  Whether to use dot type animation
   */
  dot?: boolean
  /**
   * @en Whether it is a block-level element
   */
  block?: boolean
}
