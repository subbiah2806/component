import { useContext } from 'react';
import { CursorContext } from './provider';

export function useCursorContext() {
  const context = useContext(CursorContext);
  if (context === undefined) {
    throw new Error('useCursorContext must be used within a CursorProvider');
  }
  return context;
}
