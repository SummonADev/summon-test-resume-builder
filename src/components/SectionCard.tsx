import clsx from 'clsx';
import { ChevronDown, Eye, EyeOff, Trash2 } from 'lucide-react';

interface SectionCardProps {
  title: string;
  isVisible: boolean;
  isExpanded: boolean;
  onToggleExpanded: () => void;
  onToggleVisible: () => void;
  onDelete: () => void;
  canDelete?: boolean;
  children?: React.ReactNode;
  isDragging?: boolean;
  dragHandle?: React.ReactNode;
  className?: string;
}

export default function SectionCard({
  title,
  isVisible,
  isExpanded,
  onToggleExpanded,
  onToggleVisible,
  onDelete,
  canDelete = true,
  children,
  isDragging = false,
  dragHandle,
  className,
}: SectionCardProps) {
  return (
    <div
      className={clsx(
        'border border-gray-100 rounded bg-white overflow-hidden transition-all duration-200',
        isDragging && 'opacity-50',
        className
      )}
    >
      {/* Header */}
      <div className="px-4 py-3 border-b border-gray-100 flex items-center justify-between gap-3 bg-gray-50 hover:bg-gray-100 transition-colors">
        <div className="flex items-center gap-3 flex-1 min-w-0">
          {dragHandle && (
            <div className="text-gray-400 cursor-grab active:cursor-grabbing flex-shrink-0">
              {dragHandle}
            </div>
          )}
          <button
            onClick={onToggleExpanded}
            className="flex items-center gap-2 flex-1 min-w-0 hover:text-gray-900 transition-colors"
          >
            <ChevronDown
              className={clsx(
                'w-4 h-4 transition-transform flex-shrink-0',
                !isExpanded && '-rotate-90'
              )}
            />
            <h3 className="font-light text-sm text-gray-900 truncate">{title}</h3>
          </button>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-1 flex-shrink-0">
          <button
            onClick={onToggleVisible}
            className="p-1.5 hover:bg-gray-200 rounded transition-colors"
            title={isVisible ? 'Hide section' : 'Show section'}
          >
            {isVisible ? (
              <Eye className="w-4 h-4 text-gray-600" />
            ) : (
              <EyeOff className="w-4 h-4 text-gray-400" />
            )}
          </button>

          {canDelete && (
            <button
              onClick={onDelete}
              className="p-1.5 hover:bg-red-50 rounded transition-colors"
              title="Delete section"
            >
              <Trash2 className="w-4 h-4 text-red-500" />
            </button>
          )}
        </div>
      </div>

      {/* Content */}
      {isExpanded && isVisible && (
        <div className="p-4">
          {children}
        </div>
      )}
    </div>
  );
}
