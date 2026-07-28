import { Command } from 'lucide-react';
import { useState } from 'react';

export default function KeyboardShortcutsHint() {
  const [isOpen, setIsOpen] = useState(false);

  const shortcuts = [
    { keys: 'Ctrl+Z', action: 'Undo' },
    { keys: 'Ctrl+Y', action: 'Redo' },
    { keys: 'Ctrl+Shift+S', action: 'Export PDF' },
  ];

  const isMac = typeof navigator !== 'undefined' && /Mac/.test(navigator.platform);

  return (
    <>
      {/* Floating Help Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 w-12 h-12 rounded-full bg-blue-600 text-white shadow-lg hover:bg-blue-700 transition-colors flex items-center justify-center z-40"
        title="Keyboard shortcuts"
      >
        <Command className="w-6 h-6" />
      </button>

      {/* Shortcuts Popup */}
      {isOpen && (
        <div className="fixed bottom-20 right-6 bg-white rounded-lg shadow-xl p-4 max-w-xs border border-slate-200 z-40">
          <h3 className="font-semibold text-slate-900 mb-3">Keyboard Shortcuts</h3>
          <div className="space-y-2">
            {shortcuts.map((shortcut) => (
              <div key={shortcut.keys} className="flex justify-between items-center">
                <span className="text-sm text-slate-600">{shortcut.action}</span>
                <code className="text-xs bg-slate-100 px-2 py-1 rounded text-slate-800">
                  {isMac ? shortcut.keys.replace('Ctrl', '⌘') : shortcut.keys}
                </code>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
}
