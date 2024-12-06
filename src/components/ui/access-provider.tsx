import { createContext, useContext, useState, ReactNode } from 'react'

interface AccessContextType {
  canAccessGame: boolean
  setCanAccessGame: (value: boolean) => void
}

const AccessContext = createContext<AccessContextType | undefined>(undefined)

export const AccessProvider = ({ children }: { children: ReactNode }) => {
  const [canAccessGame, setCanAccessGame] = useState(false)

  return <AccessContext.Provider value={{ canAccessGame, setCanAccessGame }}>{children}</AccessContext.Provider>
}

export const useAccess = (): AccessContextType => {
  const context = useContext(AccessContext)
  if (!context) {
    throw new Error('useAccess must be used within an AccessProvider')
  }
  return context
}
