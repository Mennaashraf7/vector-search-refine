
import React from 'react';
import { Switch } from '@/components/ui/switch';
import { Moon, Sun } from 'lucide-react';

interface DarkModeToggleProps {
  darkMode: boolean;
  onToggle: () => void;
}

const DarkModeToggle: React.FC<DarkModeToggleProps> = ({ darkMode, onToggle }) => {
  return (
    <div className="fixed bottom-4 left-4 z-50 flex items-center gap-2 bg-white dark:bg-gray-800 p-3 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700">
      <Sun className={`h-4 w-4 ${darkMode ? 'text-gray-400' : 'text-yellow-500'}`} />
      <Switch
        checked={darkMode}
        onCheckedChange={onToggle}
        aria-label="Toggle dark mode"
      />
      <Moon className={`h-4 w-4 ${darkMode ? 'text-blue-400' : 'text-gray-400'}`} />
    </div>
  );
};

export default DarkModeToggle;
