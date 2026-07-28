import { Resume, TemplateName } from '@/types/resume';
import ModernMinimal from '@/templates/ModernMinimal';
import ProfessionalCorporate from '@/templates/ProfessionalCorporate';
import ATSFriendly from '@/templates/ATSFriendly';

export function renderTemplate(resume: Resume) {
  switch (resume.template) {
    case 'modern-minimal':
      return <ModernMinimal resume={resume} />;
    case 'professional-corporate':
      return <ProfessionalCorporate resume={resume} />;
    case 'elegant-two-column':
      // TODO: Implement elegant two-column
      return <ModernMinimal resume={resume} />;
    case 'creative-designer':
      // TODO: Implement creative designer
      return <ModernMinimal resume={resume} />;
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
  {
    id: 'professional-corporate',
    name: 'Professional Corporate',
    description: 'Traditional business-focused layout',
  },
  {
    id: 'elegant-two-column',
    name: 'Elegant Two Column',
    description: 'Sidebar design with summary on left',
  },
  {
    id: 'creative-designer',
    name: 'Creative Designer',
    description: 'Bold, visually striking layout',
  },
  {
    id: 'ats-friendly',
    name: 'ATS-Friendly',
    description: 'Optimized for applicant tracking systems',
  },
];
