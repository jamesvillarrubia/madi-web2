'use client'

import { AiOutlineCloseCircle } from 'react-icons/ai'
import { IconButton } from '@radix-ui/themes'
import React, { useState } from 'react'

export const Banner = () => {
  const [isVisible, setIsVisible] = useState(true)

  const handleClick = () => {
    setIsVisible(false)
  }

  if (!isVisible) return null

  return (
    <div
      className="relative isolate flex items-center gap-x-6 overflow-hidden bg-crimson-2 px-6 py-2.5 sm:px-3.5 sm:before:flex-1 light"
      style={{
        backgroundColor: 'var(--danger-dark)'
      }}
    >
      <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
        <p className="md:text-base text-center text-xs leading-6 text-white">
          <strong>WARNING!</strong> Do not use this system for non-public or sensitive data.
        </p>
      </div>
      <div className="flex flex-1 justify-end">
        <IconButton size="2" variant="ghost" color="gray" radius="full" onClick={handleClick}>
          <AiOutlineCloseCircle className="h-5 w-5 text-white" />
        </IconButton>
      </div>
    </div>
  )
}
