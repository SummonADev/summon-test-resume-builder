import clsx from 'clsx';
import { Monitor, Tablet, Smartphone } from 'lucide-react';
import { UIState } from '@/types/resume';

interface PreviewPanelProps {
  previewMode: UIState['previewMode'];
  onModeChange: (mode: UIState['previewMode']) => void;
  children?: React.ReactNode;
}

export default function PreviewPanel({
  previewMode,
  onModeChange,
  children,
}: PreviewPanelProps) {
  const modes: Array<{ mode: UIState['previewMode']; icon: React.ReactNode; label: string }> = [
    { mode: 'desktop', icon: <Monitor className="w-4 h-4" />, label: 'Desktop' },
    { mode: 'tablet', icon: <Tablet className="w-4 h-4" />, label: 'Tablet' },
    { mode: 'mobile', icon: <Smartphone className="w-4 h-4" />, label: 'Mobile' },
  ];

  return (
    <div className="flex flex-col h-full bg-gray-50">
      {/* Mode Selector */}
      <div className="p-4 border-b border-gray-100 bg-white flex gap-2">
        {modes.map(({ mode, icon, label }) => (
          <button
            key={mode}
            onClick={() => onModeChange(mode)}
            className={clsx(
              'px-3 py-1.5 rounded transition-colors flex items-center gap-2 text-sm font-light',
              previewMode === mode
                ? 'bg-gray-900 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            )}
            title={label}
          >
            {icon}
            <span className="hidden sm:inline">{label}</span>
          </button>
        ))}
      </div>

      {/* Preview Container */}
      <div className="flex-1 overflow-auto p-6 flex items-start justify-center">
        <div
          className={clsx(
            'bg-white rounded shadow-sm pdf-preview transition-all duration-300',
            previewMode === 'desktop' && 'w-full max-w-4xl',
            previewMode === 'tablet' && 'w-full max-w-2xl',
            previewMode === 'mobile' && 'w-full max-w-sm'
          )}
        >
          {children}
        </div>
      </div>
    </div>
  );
}
