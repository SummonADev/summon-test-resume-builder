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
      <div className="bg-white rounded max-w-md w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b border-gray-100 sticky top-0 bg-white flex justify-between items-center">
          <h2 className="text-lg font-light text-gray-900">Section Order</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 text-2xl leading-none"
          >
            ✕
          </button>
        </div>

        <div className="p-6">
          <p className="text-xs text-gray-600 mb-4">
            Drag sections to reorder them. Hidden sections won't appear on your resume.
          </p>

          <SectionsManager sections={sections} onReorder={(newOrder) => reorderSections(newOrder as any)} />

          <div className="mt-6 p-3 bg-gray-50 rounded border border-gray-200">
            <p className="text-xs text-gray-700">
              Use the eye icon to hide or show sections on your resume.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
