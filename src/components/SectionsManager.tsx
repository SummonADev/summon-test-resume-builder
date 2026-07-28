import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { DndContext, closestCenter, DragEndEvent } from '@dnd-kit/core';
import { GripVertical } from 'lucide-react';
import clsx from 'clsx';
import { SectionType } from '@/types/resume';

interface DraggableSectionProps {
  id: string;
  label: string;
  isVisible: boolean;
}

function DraggableSection({ id, label, isVisible }: DraggableSectionProps) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={clsx(
        'flex items-center gap-2 p-3 bg-slate-50 rounded border border-slate-200 cursor-move',
        isDragging && 'opacity-50 bg-blue-50',
        !isVisible && 'opacity-60'
      )}
      {...attributes}
      {...listeners}
    >
      <GripVertical className="w-4 h-4 text-slate-400" />
      <span className={clsx('flex-1 text-sm font-medium', !isVisible && 'line-through text-slate-400')}>
        {label}
      </span>
      {!isVisible && <span className="text-xs bg-slate-200 text-slate-700 px-2 py-1 rounded">Hidden</span>}
    </div>
  );
}

interface SectionsManagerProps {
  sections: Array<{ id: string; label: string; isVisible: boolean }>;
  onReorder: (newOrder: (SectionType | string)[]) => void;
}

export default function SectionsManager({ sections, onReorder }: SectionsManagerProps) {
  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (!over || active.id === over.id) {
      return;
    }

    const oldIndex = sections.findIndex((s) => s.id === active.id);
    const newIndex = sections.findIndex((s) => s.id === over.id);

    const newOrder = Array.from(sections);
    const [removed] = newOrder.splice(oldIndex, 1);
    newOrder.splice(newIndex, 0, removed);

    onReorder(newOrder.map((s) => s.id));
  };

  const sectionIds = sections.map((s) => s.id);

  return (
    <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
      <SortableContext items={sectionIds} strategy={verticalListSortingStrategy}>
        <div className="space-y-2">
          {sections.map((section) => (
            <DraggableSection key={section.id} id={section.id} label={section.label} isVisible={section.isVisible} />
          ))}
        </div>
      </SortableContext>
    </DndContext>
  );
}
