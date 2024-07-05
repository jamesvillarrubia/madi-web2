/** AUTO-SUMMARY **
   Purpose: This file defines a React component named `SpinComponent` which provides a loading spinner with customizable features for the project's UI.

   Key Components:
   - `Spin`: The main functional component that handles the spinner's behavior and appearance.
   - `isEmptyReactNode`: A utility function to check if a React node is empty.
   - `SpinProps`: TypeScript interface imported to type-check the props of the `Spin` component.
   - `DotLoading`: A component used for dot-style loading animation.

   Functional Overview: The `Spin` component displays a loading spinner which can be customized with different icons, sizes, and additional text (tip). It supports delayed loading and can be used either as a block or inline element. The component also handles children elements by overlaying the spinner or replacing the content with the spinner based on the content's presence.

   Dependencies and Integrations:
   - Uses `lodash-es` for debouncing state updates.
   - Integrates with `@radix-ui/themes` and `react-icons` for styling and icons.
   - Relies on CSS classes defined in `index.scss` for styling.

   Additional Context: The component is designed to be flexible, allowing for various customization options through props. It uses React hooks like `useState`, `useEffect`, and `useCallback` for managing state and side effects, ensuring optimal performance and reusability.
*** END-SUMMARY **/
'use client'

import { Text } from '@radix-ui/themes'
import cs from 'classnames'
import { debounce } from 'lodash-es'
import React, { ReactElement, useCallback, useEffect, useState, ForwardedRef } from 'react'
import { SpinProps } from './interface'

import { AiOutlineLoading3Quarters } from 'react-icons/ai'
import DotLoading from './DotLoading'

export function isEmptyReactNode(node: unknown): boolean {
  return !node && (node === null || node === undefined || node === '' || node === false)
}

import './index.scss'

const Spin = (props: SpinProps, ref: ForwardedRef<HTMLDivElement>) => {
  const {
    style,
    className,
    children,
    loading: propLoading = true,
    size = '4',
    icon,
    element,
    tip,
    dot,
    delay,
    block = false,
    ...rest
  } = props

  const [loading, setLoading] = useState<boolean>(delay ? false : propLoading)

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debouncedSetLoading = useCallback(debounce(setLoading, delay), [delay])

  const _usedLoading = delay ? loading : propLoading

  useEffect(() => {
    delay && debouncedSetLoading(propLoading)
    return () => {
      debouncedSetLoading && debouncedSetLoading.cancel()
    }
  }, [debouncedSetLoading, delay, propLoading])

  const loadingIcon = (
    <span className="" style={{ color: 'var(--accent-9)' }}>
      {icon
        ? React.cloneElement(icon as ReactElement, {
            style: {
              fontSize: size
            }
          })
        : element ||
          (dot ? (
            <DotLoading size={size} />
          ) : (
            <Text size={size}>
              <AiOutlineLoading3Quarters className="animate-spin" />
            </Text>
          ))}
    </span>
  )

  return (
    <div
      ref={ref}
      className={cs(
        {
          block,
          'inline-block': !block,
          'spin-loading': _usedLoading,
          'text-center': tip && !children
        },
        className
      )}
      style={style}
      {...rest}
    >
      {isEmptyReactNode(children) ? (
        <>
          {loadingIcon}
          {tip ? (
            <Text as="div" mt="2" weight="medium" size="4" style={{ color: 'var(--accent-9)' }}>
              {tip}
            </Text>
          ) : null}
        </>
      ) : (
        <>
          <div className="relative spin-chidren">{children}</div>
          {_usedLoading && (
            <div className="spin-loading-layer" style={{ fontSize: size }}>
              <span className="spin-loading-layer-inner">
                {loadingIcon}
                {tip ? (
                  <Text
                    as="div"
                    mt="2"
                    weight="medium"
                    size="4"
                    style={{ color: 'var(--accent-9)' }}
                  >
                    {tip}
                  </Text>
                ) : null}
              </span>
            </div>
          )}
        </>
      )}
    </div>
  )
}

const SpinComponent = React.forwardRef<HTMLDivElement, SpinProps>(Spin)

SpinComponent.displayName = 'Spin'

export default SpinComponent
