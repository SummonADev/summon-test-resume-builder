import { useState } from 'react';
import { useResumeStore } from '@/store/resume-store';
import { TemplateName } from '@/types/resume';
import Header from '@/components/Header';
import EditorSidebar from '@/components/EditorSidebar';
import PreviewPanel from '@/components/PreviewPanel';
import TemplateSelector from '@/components/TemplateSelector';
import PersonalInfoForm from '@/components/sections/PersonalInfoForm';
import SummaryForm from '@/components/sections/SummaryForm';
import SkillsForm from '@/components/sections/SkillsForm';
import ExperienceForm from '@/components/sections/ExperienceForm';
import EducationForm from '@/components/sections/EducationForm';
import ProjectsForm from '@/components/sections/ProjectsForm';
import CertificationsForm from '@/components/sections/CertificationsForm';
import AwardsForm from '@/components/sections/AwardsForm';
import { renderTemplate } from '@/lib/template-factory';

export default function ResumeBuilder() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [showTemplateSelector, setShowTemplateSelector] = useState(false);
  const resume = useResumeStore((state) => state.resume);
  const setTemplate = useResumeStore((state) => state.setTemplate);
  const setPreviewMode = useResumeStore((state) => state.setPreviewMode);
  const previewMode = useResumeStore((state) => state.uiState.previewMode);

  const handleExport = () => {
    alert('PDF export coming in Phase 5');
  };

  const handleAddSection = () => {
    alert('Custom sections coming in Phase 3');
  };

  const handleSettings = () => {
    alert('Settings coming in Phase 2');
  };

  const handleSelectTemplate = (template: TemplateName) => {
    setTemplate(template);
  };

  return (
    <div className="flex flex-col h-screen bg-slate-50">
      {/* Template Selector Modal */}
      {showTemplateSelector && (
        <TemplateSelector
          currentTemplate={resume.template}
          onSelect={handleSelectTemplate}
          onClose={() => setShowTemplateSelector(false)}
        />
      )}

      {/* Header */}
      <Header
        onSidebarToggle={() => setSidebarOpen(!sidebarOpen)}
        onExport={handleExport}
        onTemplateClick={() => setShowTemplateSelector(true)}
      />

      {/* Main Layout */}
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar Editor */}
        <EditorSidebar
          isOpen={sidebarOpen}
          onAddSection={handleAddSection}
          onSettings={handleSettings}
        >
          <div className="p-4 space-y-4">
            <PersonalInfoForm />
            <SummaryForm />
            <ExperienceForm />
            <EducationForm />
            <SkillsForm />
            <ProjectsForm />
            <CertificationsForm />
            <AwardsForm />
          </div>
        </EditorSidebar>

        {/* Preview Panel */}
        <PreviewPanel previewMode={previewMode} onModeChange={setPreviewMode}>
          <div className="p-8">
            {renderTemplate(resume)}
          </div>
        </PreviewPanel>
      </div>
    </div>
  );
}
