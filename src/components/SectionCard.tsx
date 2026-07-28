import clsx from 'clsx';
import { ChevronDown, Eye, EyeOff, Trash2, Copy, Settings } from 'lucide-react';

interface SectionCardProps {
  title: string;
  isVisible: boolean;
  isExpanded: boolean;
  onToggleExpanded: () => void;
  onToggleVisible: () => void;
  onDelete: () => void;
  onDuplicate?: () => void;
  onRename?: () => void;
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
  onDuplicate,
  onRename,
  canDelete = true,
  children,
  isDragging = false,
  dragHandle,
  className,
}: SectionCardProps) {
  return (
    <div
      className={clsx(
        'draggable-section border border-slate-200 rounded-lg bg-white overflow-hidden transition-all duration-200',
        isDragging && 'dragging opacity-50',
        className
      )}
    >
      {/* Header */}
      <div className="section-header">
        <div className="flex items-center gap-3 flex-1">
          {dragHandle && <div className="text-slate-400 cursor-grab active:cursor-grabbing">{dragHandle}</div>}
          <button
            onClick={onToggleExpanded}
            className="flex items-center gap-2 flex-1 hover:text-blue-600 transition-colors"
          >
            <ChevronDown
              className={clsx(
                'w-5 h-5 transition-transform',
                !isExpanded && '-rotate-90'
              )}
            />
            <h3 className="font-semibold text-slate-900">{title}</h3>
          </button>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-1">
          <button
            onClick={onToggleVisible}
            className="p-2 hover:bg-slate-100 rounded transition-colors"
            title={isVisible ? 'Hide section' : 'Show section'}
          >
            {isVisible ? (
              <Eye className="w-4 h-4 text-slate-600" />
            ) : (
              <EyeOff className="w-4 h-4 text-slate-400" />
            )}
          </button>

          {onRename && (
            <button
              onClick={onRename}
              className="p-2 hover:bg-slate-100 rounded transition-colors"
              title="Rename section"
            >
              <Settings className="w-4 h-4 text-slate-600" />
            </button>
          )}

          {onDuplicate && (
            <button
              onClick={onDuplicate}
              className="p-2 hover:bg-slate-100 rounded transition-colors"
              title="Duplicate section"
            >
              <Copy className="w-4 h-4 text-slate-600" />
            </button>
          )}

          {canDelete && (
            <button
              onClick={onDelete}
              className="p-2 hover:bg-red-50 rounded transition-colors"
              title="Delete section"
            >
              <Trash2 className="w-4 h-4 text-red-600" />
            </button>
          )}
        </div>
      </div>

      {/* Content */}
      {isExpanded && isVisible && (
        <div className="section-body animate-slide-in">
          {children}
        </div>
      )}
    </div>
  );
}
