import { ChevronDown, ChevronUp, Eye, EyeOff, Trash2, Edit2 } from 'lucide-react';
import { Button } from './Button';

interface SectionCardProps {
  title: string;
  isExpanded: boolean;
  isVisible: boolean;
  isLocked?: boolean;
  onToggleExpand: () => void;
  onToggleVisibility: () => void;
  onDelete?: () => void;
  onRename?: () => void;
  children: React.ReactNode;
  isDragging?: boolean;
}

export function SectionCard({
  title,
  isExpanded,
  isVisible,
  isLocked = false,
  onToggleExpand,
  onToggleVisibility,
  onDelete,
  onRename,
  children,
  isDragging = false
}: SectionCardProps) {
  return (
    <div className={`bg-white border-2 border-black rounded mb-8 transition-all duration-200 ${isDragging ? 'opacity-50' : ''}`}>
      <div className="section-header">
        <div className="flex items-center gap-4 flex-1">
          <button
            onClick={onToggleExpand}
            className="text-black hover:bg-gray-100 p-2 rounded transition-colors"
          >
            {isExpanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
          </button>
          <h3 className="text-lg font-bold text-black">{title}</h3>
        </div>
        
        <div className="flex items-center gap-3">
          {onRename && (
            <Button
              onClick={onRename}
              variant="secondary"
              size="sm"
              className="p-2 h-auto"
              title="Rename section"
            >
              <Edit2 size={16} />
            </Button>
          )}
          
          <Button
            onClick={onToggleVisibility}
            variant="secondary"
            size="sm"
            className="p-2 h-auto"
            title={isVisible ? 'Hide section' : 'Show section'}
          >
            {isVisible ? <Eye size={16} /> : <EyeOff size={16} />}
          </Button>
          
          {onDelete && !isLocked && (
            <Button
              onClick={onDelete}
              variant="danger"
              size="sm"
              className="p-2 h-auto"
              title="Delete section"
            >
              <Trash2 size={16} />
            </Button>
          )}
        </div>
      </div>
      
      {isExpanded && (
        <div className="section-body border-t-2 border-black">
          {children}
        </div>
      )}
    </div>
  );
}
