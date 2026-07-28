import { Plus, Settings } from 'lucide-react';
import Button from './Button';

interface EditorSidebarProps {
  onAddSection: () => void;
  onSettings: () => void;
  isOpen: boolean;
  children?: React.ReactNode;
}

export default function EditorSidebar({
  onAddSection,
  onSettings,
  isOpen,
  children,
}: EditorSidebarProps) {
  return (
    <div className={`
      fixed lg:static inset-y-0 left-0 w-80 bg-slate-50 border-r border-slate-200
      transform lg:transform-none transition-transform duration-300 z-40
      ${isOpen ? 'translate-x-0' : '-translate-x-full'}
      flex flex-col overflow-hidden
    `}>
      {/* Top Actions */}
      <div className="p-4 border-b border-slate-200 flex gap-2">
        <Button
          variant="primary"
          size="sm"
          onClick={onAddSection}
          className="gap-2 flex-1"
        >
          <Plus className="w-4 h-4" />
          Add Section
        </Button>
        <button
          onClick={onSettings}
          className="p-2 hover:bg-slate-100 rounded transition-colors"
          title="Settings"
        >
          <Settings className="w-4 h-4 text-slate-600" />
        </button>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto">
        {children}
      </div>
    </div>
  );
}
