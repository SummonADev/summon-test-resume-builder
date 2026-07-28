import Button from './Button';
import { Menu, Undo2, Redo2, Download } from 'lucide-react';
import { useResumeStore } from '@/store/resume-store';

interface HeaderProps {
  onSidebarToggle: () => void;
  onExport: () => void;
  onTemplateClick?: () => void;
}

export default function Header({ onSidebarToggle, onExport, onTemplateClick }: HeaderProps) {
  const resume = useResumeStore((state) => state.resume);
  const canUndo = useResumeStore((state) => state.canUndo());
  const canRedo = useResumeStore((state) => state.canRedo());
  const undo = useResumeStore((state) => state.undo);
  const redo = useResumeStore((state) => state.redo);

  return (
    <header className="bg-white border-b border-slate-200 sticky top-0 z-50">
      <div className="px-4 py-3 flex items-center justify-between">
        {/* Left */}
        <div className="flex items-center gap-3">
          <button
            onClick={onSidebarToggle}
            className="p-2 hover:bg-slate-100 rounded transition-colors lg:hidden"
          >
            <Menu className="w-5 h-5" />
          </button>
          <h1 className="text-xl font-bold text-slate-900">{resume.name}</h1>
        </div>

        {/* Center - History Controls & Template */}
        <div className="hidden md:flex items-center gap-1">
          <button
            onClick={undo}
            disabled={!canUndo}
            className="p-2 hover:bg-slate-100 disabled:opacity-50 disabled:cursor-not-allowed rounded transition-colors"
            title="Undo"
          >
            <Undo2 className="w-4 h-4" />
          </button>
          <button
            onClick={redo}
            disabled={!canRedo}
            className="p-2 hover:bg-slate-100 disabled:opacity-50 disabled:cursor-not-allowed rounded transition-colors"
            title="Redo"
          >
            <Redo2 className="w-4 h-4" />
          </button>
          {onTemplateClick && (
            <button
              onClick={onTemplateClick}
              className="ml-4 px-3 py-1 text-sm bg-slate-100 hover:bg-slate-200 rounded transition-colors"
              title="Change template"
            >
              Template
            </button>
          )}
        </div>

        {/* Right */}
        <div className="flex items-center gap-2">
          <Button
            variant="primary"
            size="sm"
            onClick={onExport}
            className="gap-2 flex items-center"
          >
            <Download className="w-4 h-4" />
            <span className="hidden sm:inline">Export PDF</span>
          </Button>
        </div>
      </div>
    </header>
  );
}
