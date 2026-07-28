import { useEffect } from 'react';

interface KeyboardShortcuts {
  onCtrlZ?: () => void;
  onCtrlY?: () => void;
  onCtrlShiftS?: () => void;
}

export function useKeyboardShortcuts({ onCtrlZ, onCtrlY, onCtrlShiftS }: KeyboardShortcuts) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Ctrl+Z (Cmd+Z on Mac)
      if ((e.ctrlKey || e.metaKey) && e.key === 'z' && !e.shiftKey) {
        e.preventDefault();
        onCtrlZ?.();
      }
      // Ctrl+Y (Cmd+Y on Mac) or Ctrl+Shift+Z
      if (((e.ctrlKey || e.metaKey) && e.key === 'y') || ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key === 'z')) {
        e.preventDefault();
        onCtrlY?.();
      }
      // Ctrl+Shift+S (Save - we use this for export)
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key === 's') {
        e.preventDefault();
        onCtrlShiftS?.();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onCtrlZ, onCtrlY, onCtrlShiftS]);
}
