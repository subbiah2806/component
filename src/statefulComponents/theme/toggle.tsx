import { Sun, Moon } from 'lucide-react';
import { useThemeContext } from './useState';
import { Button } from '../../components/ui/button';
import { cn } from '../../lib/utils';

export default function ThemeToggle() {
  const { isDark, toggleTheme: handleToggle } = useThemeContext();

  const toggleTheme = (): void => {
    handleToggle();
  };

  return (
    <Button
      variant="outline"
      size="icon"
      onClick={toggleTheme}
      className={cn('clickable rounded-full')}
      aria-label="Toggle theme"
    >
      {isDark ? (
        <Sun className="h-5 w-5 transition-colors" />
      ) : (
        <Moon className="h-5 w-5 transition-colors" />
      )}
    </Button>
  );
}
