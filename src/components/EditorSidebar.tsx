import { Plus } from 'lucide-react';
import Button from './Button';

interface EditorSidebarProps {
  onAddSection: () => void;
  isOpen: boolean;
  children?: React.ReactNode;
}

export default function EditorSidebar({
  onAddSection,
  isOpen,
  children,
}: EditorSidebarProps) {
  return (
    <div className={`
      fixed lg:static inset-y-0 left-0 w-80 bg-white border-r border-gray-100
      transform lg:transform-none transition-transform duration-300 z-40
      ${isOpen ? 'translate-x-0' : '-translate-x-full'}
      flex flex-col overflow-hidden
    `}>
      {/* Top Actions */}
      <div className="p-4 border-b border-gray-100 flex gap-2">
        <Button
          variant="primary"
          size="sm"
          onClick={onAddSection}
          className="gap-2 flex-1 flex items-center justify-center"
        >
          <Plus className="w-4 h-4" />
          Add Section
        </Button>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto">
        {children}
      </div>
    </div>
  );
}
