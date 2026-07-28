import { TEMPLATES } from '@/lib/template-factory';
import { TemplateName } from '@/types/resume';
import clsx from 'clsx';

interface TemplateSelectorProps {
  currentTemplate: TemplateName;
  onSelect: (template: TemplateName) => void;
  onClose: () => void;
}

export default function TemplateSelector({
  currentTemplate,
  onSelect,
  onClose,
}: TemplateSelectorProps) {
  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b border-gray-100 sticky top-0 bg-white flex justify-between items-center">
          <h2 className="text-lg font-light text-gray-900">Select Template</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
          >
            ✕
          </button>
        </div>

        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {TEMPLATES.map((template) => (
              <button
                key={template.id}
                onClick={() => {
                  onSelect(template.id);
                  onClose();
                }}
                className={clsx(
                  'p-4 rounded border transition-all text-left',
                  currentTemplate === template.id
                    ? 'border-gray-900 bg-gray-50'
                    : 'border-gray-200 hover:border-gray-300'
                )}
              >
                <h3 className="font-light text-sm text-gray-900">{template.name}</h3>
                <p className="text-xs text-gray-500 mt-1">{template.description}</p>
                {currentTemplate === template.id && (
                  <div className="mt-3 inline-block px-2 py-1 bg-gray-900 text-white text-xs rounded font-light">
                    Current
                  </div>
                )}
              </button>
            ))}
          </div>

          <p className="text-xs text-gray-600 mt-6 p-3 bg-gray-50 rounded border border-gray-100">
            All your resume data is preserved when switching templates. Only the visual design changes.
          </p>
        </div>
      </div>
    </div>
  );
}
