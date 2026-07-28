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
      <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b border-slate-200 sticky top-0 bg-white flex justify-between items-center">
          <h2 className="text-2xl font-bold text-slate-900">Select Template</h2>
          <button
            onClick={onClose}
            className="text-slate-500 hover:text-slate-700"
          >
            ✕
          </button>
        </div>

        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {TEMPLATES.map((template) => (
              <button
                key={template.id}
                onClick={() => {
                  onSelect(template.id);
                  onClose();
                }}
                className={clsx(
                  'p-4 rounded-lg border-2 transition-all text-left',
                  currentTemplate === template.id
                    ? 'border-blue-600 bg-blue-50'
                    : 'border-slate-200 hover:border-slate-300'
                )}
              >
                <h3 className="font-semibold text-slate-900">{template.name}</h3>
                <p className="text-sm text-slate-600">{template.description}</p>
                {currentTemplate === template.id && (
                  <div className="mt-2 inline-block px-2 py-1 bg-blue-600 text-white text-xs rounded font-medium">
                    Current
                  </div>
                )}
              </button>
            ))}
          </div>

          <p className="text-sm text-slate-500 mt-6 p-3 bg-blue-50 rounded">
            ℹ️ Switching templates preserves all your resume data. Only the visual presentation changes.
          </p>
        </div>
      </div>
    </div>
  );
}
