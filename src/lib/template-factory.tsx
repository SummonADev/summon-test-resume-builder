import { Resume, TemplateName } from '@/types/resume';
import { ModernMinimal } from '@/templates/ModernMinimal';
import { ProfessionalCorporate } from '@/templates/ProfessionalCorporate';
import { ElegantTwoColumn } from '@/templates/ElegantTwoColumn';
import { CreativeDesigner } from '@/templates/CreativeDesigner';
import { ATSFriendly } from '@/templates/ATSFriendly';

export function renderTemplate(resume: Resume) {
  switch (resume.template) {
    case 'modern-minimal':
      return <ModernMinimal resume={resume} />;
    case 'professional-corporate':
      return <ProfessionalCorporate resume={resume} />;
    case 'elegant-two-column':
      return <ElegantTwoColumn resume={resume} />;
    case 'creative-designer':
      return <CreativeDesigner resume={resume} />;
    case 'ats-friendly':
      return <ATSFriendly resume={resume} />;
    default:
      return <ModernMinimal resume={resume} />;
  }
}

export const TEMPLATES: Array<{ id: TemplateName; name: string; description: string }> = [
  {
    id: 'modern-minimal',
    name: 'Modern Minimal',
    description: 'Clean, minimal design with accent color',
  },
];
