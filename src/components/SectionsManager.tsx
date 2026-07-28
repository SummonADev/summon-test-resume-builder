import React from 'react';
import { GripVertical } from 'lucide-react';

interface SectionsManagerProps {
  items: { id: string; label: string }[];
  onReorder: (newOrder: string[]) => void;
}

export function SectionsManager({ items, onReorder }: SectionsManagerProps) {
  const [draggedId, setDraggedId] = React.useState<string | null>(null);
  const [items_local, setItemsLocal] = React.useState(items);

  const handleDragStart = (e: React.DragEvent, id: string) => {
    setDraggedId(id);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };

  const handleDrop = (e: React.DragEvent, targetId: string) => {
    e.preventDefault();
    if (!draggedId || draggedId === targetId) return;

    const draggedIdx = items_local.findIndex(i => i.id === draggedId);
    const targetIdx = items_local.findIndex(i => i.id === targetId);

    const newItems = [...items_local];
    [newItems[draggedIdx], newItems[targetIdx]] = [newItems[targetIdx], newItems[draggedIdx]];
    
    setItemsLocal(newItems);
    onReorder(newItems.map(i => i.id));
    setDraggedId(null);
  };

  return (
    <div className="space-y-2">
      {items_local.map(item => (
        <div
          key={item.id}
          draggable
          onDragStart={e => handleDragStart(e, item.id)}
          onDragOver={handleDragOver}
          onDrop={e => handleDrop(e, item.id)}
          className={`flex items-center gap-3 p-3 bg-white border-2 border-black rounded cursor-move transition-all ${
            draggedId === item.id ? 'opacity-50' : ''
          }`}
        >
          <GripVertical size={18} className="text-black" />
          <span className="font-medium text-black">{item.label}</span>
        </div>
      ))}
    </div>
  );
}
