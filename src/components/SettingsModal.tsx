import { useState } from 'react';
import { X } from 'lucide-react';
import { Button } from './Button';
import { SectionType } from '@/types/resume';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  sections: SectionType[];
  customSections: { id: string; title: string }[];
  onReorderSections: (reorderedSections: SectionType[]) => void;
  onReorderCustomSections: (reorderedCustom: { id: string; title: string }[]) => void;
}

export function SettingsModal({
  isOpen,
  onClose,
  sections,
  customSections,
  onReorderSections,
  onReorderCustomSections,
}: SettingsModalProps) {
  const [localSections, setLocalSections] = useState(sections);
  const [localCustom, setLocalCustom] = useState(customSections);

  if (!isOpen) return null;

  const handleSave = () => {
    onReorderSections(localSections as SectionType[]);
    onReorderCustomSections(localCustom);
    onClose();
  };

  const moveUp = (index: number, isCustom: boolean) => {
    if (index === 0) return;
    if (isCustom) {
      const newCustom = [...localCustom];
      [newCustom[index - 1], newCustom[index]] = [newCustom[index], newCustom[index - 1]];
      setLocalCustom(newCustom);
    } else {
      const newSections = [...localSections];
      [newSections[index - 1], newSections[index]] = [newSections[index], newSections[index - 1]];
      setLocalSections(newSections);
    }
  };

  const moveDown = (index: number, isCustom: boolean) => {
    const maxIndex = isCustom ? localCustom.length - 1 : localSections.length - 1;
    if (index === maxIndex) return;
    if (isCustom) {
      const newCustom = [...localCustom];
      [newCustom[index + 1], newCustom[index]] = [newCustom[index], newCustom[index + 1]];
      setLocalCustom(newCustom);
    } else {
      const newSections = [...localSections];
      [newSections[index + 1], newSections[index]] = [newSections[index], newSections[index + 1]];
      setLocalSections(newSections);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white border-4 border-black rounded max-w-md w-full mx-4 max-h-96 flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b-2 border-black">
          <h2 className="text-xl font-bold text-black">Manage Sections</h2>
          <button
            onClick={onClose}
            className="text-black hover:bg-gray-200 p-1 rounded transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        {/* Content */}
        <div className="overflow-y-auto flex-1 p-6">
          <div className="space-y-3">
            {/* Standard Sections */}
            {localSections.map((section, idx) => (
              <div key={section} className="flex items-center justify-between p-3 bg-white border-2 border-black rounded">
                <span className="font-medium text-black capitalize">{section}</span>
                <div className="flex gap-2">
                  <button
                    onClick={() => moveUp(idx, false)}
                    disabled={idx === 0}
                    className="px-2 py-1 bg-black text-white text-xs font-bold disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    ↑
                  </button>
                  <button
                    onClick={() => moveDown(idx, false)}
                    disabled={idx === localSections.length - 1}
                    className="px-2 py-1 bg-black text-white text-xs font-bold disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    ↓
                  </button>
                </div>
              </div>
            ))}

            {/* Custom Sections */}
            {localCustom.map((section, idx) => (
              <div key={section.id} className="flex items-center justify-between p-3 bg-white border-2 border-black rounded">
                <span className="font-medium text-black">{section.title}</span>
                <div className="flex gap-2">
                  <button
                    onClick={() => moveUp(idx, true)}
                    disabled={localSections.length + idx === 0}
                    className="px-2 py-1 bg-black text-white text-xs font-bold disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    ↑
                  </button>
                  <button
                    onClick={() => moveDown(idx, true)}
                    disabled={localSections.length + idx === localSections.length + localCustom.length - 1}
                    className="px-2 py-1 bg-black text-white text-xs font-bold disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    ↓
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="flex gap-3 p-6 border-t-2 border-black">
          <Button onClick={onClose} variant="secondary" size="md" className="flex-1">
            Cancel
          </Button>
          <Button onClick={handleSave} size="md" className="flex-1">
            Save
          </Button>
        </div>
      </div>
    </div>
  );
}
