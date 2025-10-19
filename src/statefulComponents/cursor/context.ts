import { createContext, useContext } from 'react';

export interface CursorContextType {
  isEnabled: boolean;
  toggleCursor: () => void;
  canUseCursor: boolean;
}

export const CursorContext = createContext<CursorContextType | undefined>(undefined);

export function useCursorContext() {
  const context = useContext(CursorContext);
  if (context === undefined) {
    throw new Error('useCursorContext must be used within a CursorProvider');
  }
  return context;
}
