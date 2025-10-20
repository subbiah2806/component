import { Volume2, VolumeX } from 'lucide-react';
import { useAudioContext } from './context';
import { Button } from '../../components/ui/button';
import { cn } from '../../lib/utils';

export function AudioToggle() {
  const { isMuted, toggleMute } = useAudioContext();

  return (
    <Button
      variant="outline"
      size="icon"
      onClick={toggleMute}
      className={cn('clickable rounded-full')}
      aria-label="Toggle mute"
    >
      {isMuted ? (
        <VolumeX className="h-5 w-5 transition-colors" />
      ) : (
        <Volume2 className="h-5 w-5 transition-colors" />
      )}
    </Button>
  );
}
