import { Button } from './Button';

interface Template {
  id: string;
  name: string;
}

interface TemplateSelectorProps {
  templates: Template[];
  currentTemplate: string;
  onSelectTemplate: (templateId: string) => void;
}

export function TemplateSelector({ 
  templates, 
  currentTemplate, 
  onSelectTemplate 
}: TemplateSelectorProps) {
  return (
    <div className="bg-white border-b border-black px-8 py-6">
      <p className="text-sm font-semibold text-black mb-4">Select Template:</p>
      <div className="flex flex-wrap gap-3">
        {templates.map(template => (
          <Button
            key={template.id}
            onClick={() => onSelectTemplate(template.id)}
            variant={currentTemplate === template.id ? 'primary' : 'secondary'}
            size="md"
          >
            {template.name}
          </Button>
        ))}
      </div>
    </div>
  );
}
