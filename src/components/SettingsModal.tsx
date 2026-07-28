import { useResumeStore } from '@/store/resume-store';
import SectionsManager from './SectionsManager';

interface SettingsModalProps {
  onClose: () => void;
}

export default function SettingsModal({ onClose }: SettingsModalProps) {
  const resume = useResumeStore((state) => state.resume);
  const reorderSections = useResumeStore((state) => state.reorderSections);

  const sectionMap: Record<string, string> = {
    personal: 'Personal Information',
    summary: resume.summary.customTitle,
    experience: resume.experience.customTitle,
    education: resume.education.customTitle,
    skills: resume.skills.customTitle,
    projects: resume.projects.customTitle,
    certifications: resume.certifications.customTitle,
    awards: resume.awards.customTitle,
  };

  // Add custom sections
  resume.customSections.forEach((section) => {
    sectionMap[section.id] = section.title;
  });

  const visibilityMap: Record<string, boolean> = {
    personal: true,
    summary: resume.summary.isVisible,
    experience: resume.experience.isVisible,
    education: resume.education.isVisible,
    skills: resume.skills.isVisible,
    projects: resume.projects.isVisible,
    certifications: resume.certifications.isVisible,
    awards: resume.awards.isVisible,
  };

  // Add custom sections visibility
  resume.customSections.forEach((section) => {
    visibilityMap[section.id] = section.isVisible;
  });

  const sections = resume.sectionOrder
    .filter((section) => section in sectionMap)
    .map((section) => ({
      id: section,
      label: sectionMap[section],
      isVisible: visibilityMap[section],
    }));

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg max-w-md w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b border-slate-200 sticky top-0 bg-white flex justify-between items-center">
          <h2 className="text-2xl font-bold text-slate-900">Section Order</h2>
          <button
            onClick={onClose}
            className="text-slate-500 hover:text-slate-700 text-2xl leading-none"
          >
            ✕
          </button>
        </div>

        <div className="p-6">
          <p className="text-sm text-slate-600 mb-4">
            Drag sections to reorder them on your resume. Hidden sections are shown with a label.
          </p>

          <SectionsManager sections={sections} onReorder={(newOrder) => reorderSections(newOrder as any)} />

          <div className="mt-6 p-4 bg-blue-50 rounded border border-blue-200">
            <p className="text-sm text-blue-900">
              💡 Use the eye icon on each section card to hide/show sections from your resume.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
