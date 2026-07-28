import Button from './Button';
import { Undo2, Redo2, Download, Settings } from 'lucide-react';
import { useResumeStore } from '@/store/resume-store';

interface HeaderProps {
  onExport: () => void | Promise<void>;
  onSettingsClick?: () => void;
  exporting?: boolean;
}

export default function Header({ onExport, onSettingsClick, exporting }: HeaderProps) {
  const canUndo = useResumeStore((state) => state.canUndo());
  const canRedo = useResumeStore((state) => state.canRedo());
  const undo = useResumeStore((state) => state.undo);
  const redo = useResumeStore((state) => state.redo);

  return (
    <header className="bg-white border-b border-gray-100 sticky top-0 z-50">
      <div className="px-6 py-3 flex items-center justify-between gap-4">
        {/* Left */}
        <h1 className="text-base font-light text-gray-900 tracking-tight">Resume Builder</h1>

        {/* Right - Controls */}
        <div className="flex items-center gap-1">
          <button
            onClick={undo}
            disabled={!canUndo}
            className="p-2 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed rounded transition-colors"
            title="Undo (Ctrl+Z)"
          >
            <Undo2 className="w-4 h-4 text-gray-600" />
          </button>
          <button
            onClick={redo}
            disabled={!canRedo}
            className="p-2 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed rounded transition-colors"
            title="Redo (Ctrl+Y)"
          >
            <Redo2 className="w-4 h-4 text-gray-600" />
          </button>
          
          <div className="w-px h-5 bg-gray-200 mx-1" />
          
          {onSettingsClick && (
            <button
              onClick={onSettingsClick}
              className="p-2 hover:bg-gray-50 rounded transition-colors"
              title="Settings"
            >
              <Settings className="w-4 h-4 text-gray-600" />
            </button>
          )}
          
          <Button
            variant="primary"
            size="sm"
            onClick={onExport}
            loading={exporting}
            className="gap-2 flex items-center ml-2"
            disabled={exporting}
          >
            <Download className="w-4 h-4" />
            <span className="text-sm">Export</span>
          </Button>
        </div>
      </div>
    </header>
  );
}
