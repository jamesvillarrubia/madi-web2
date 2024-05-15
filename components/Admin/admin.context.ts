'use client'

import { createContext, useCallback, useState } from 'react'

export type AdminContextType = {
  openAdminPanel: boolean
  onOpenAdminPanel: ()=> void
  onCloseAdminPanel: ()=> void
}

export const useAdminContext = () => {

  const [openAdminPanel, setOpenAdminPanel] = useState<boolean>(false)

  const onOpenAdminPanel = () => {
    setOpenAdminPanel(true)
  }

  const onCloseAdminPanel = useCallback(() => {
    setOpenAdminPanel(false)
  }, [setOpenAdminPanel])

  return {
    openAdminPanel,
    onOpenAdminPanel,
    onCloseAdminPanel,
  }
}

export const AdminContext = createContext<AdminContextType>(undefined as unknown as any)
