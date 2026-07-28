import { Plus } from 'lucide-react';
import { Button } from './Button';

interface EditorSidebarProps {
  onAddSection?: () => void;
  children: React.ReactNode;
}

export function EditorSidebar({ onAddSection, children }: EditorSidebarProps) {
  return (
    <aside className="w-full lg:w-2/5 bg-white border-r border-black overflow-y-auto">
      <div className="p-8">
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-black mb-6">Resume Information</h2>
          {onAddSection && (
            <Button
              onClick={onAddSection}
              variant="primary"
              size="lg"
              className="w-full flex items-center justify-center gap-2"
            >
              <Plus size={20} />
              Add Custom Section
            </Button>
          )}
        </div>
        
        <div className="space-y-8">
          {children}
        </div>
      </div>
    </aside>
  );
}
