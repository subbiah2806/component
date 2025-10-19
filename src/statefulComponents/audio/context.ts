import { createContext, useContext } from 'react';

export interface AudioContextType {
  isMuted: boolean;
  toggleMute: () => void;
}

export const AudioContext = createContext<AudioContextType | undefined>(undefined);

export function useAudioContext() {
  const context = useContext(AudioContext);
  if (context === undefined) {
    throw new Error('useAudioContext must be used within an AudioProvider');
  }
  return context;
}
