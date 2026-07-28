import { useState, useRef } from 'react';
import { useResumeStore } from '@/store/resume-store';
import { TemplateName } from '@/types/resume';
import { useKeyboardShortcuts } from '@/hooks/useKeyboardShortcuts';
import Header from '@/components/Header';
import EditorSidebar from '@/components/EditorSidebar';
import PreviewPanel from '@/components/PreviewPanel';
import TemplateSelector from '@/components/TemplateSelector';
import SettingsModal from '@/components/SettingsModal';
import CompletenessIndicator from '@/components/CompletenessIndicator';
import PersonalInfoForm from '@/components/sections/PersonalInfoForm';
import SummaryForm from '@/components/sections/SummaryForm';
import SkillsForm from '@/components/sections/SkillsForm';
import ExperienceForm from '@/components/sections/ExperienceForm';
import EducationForm from '@/components/sections/EducationForm';
import ProjectsForm from '@/components/sections/ProjectsForm';
import CertificationsForm from '@/components/sections/CertificationsForm';
import AwardsForm from '@/components/sections/AwardsForm';
import { renderTemplate } from '@/lib/template-factory';
import { exportResumeToPDF } from '@/lib/pdf-export';

export default function ResumeBuilder() {
  const [showTemplateSelector, setShowTemplateSelector] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [exporting, setExporting] = useState(false);
  const previewRef = useRef<HTMLDivElement>(null);
  const resume = useResumeStore((state) => state.resume);
  const setTemplate = useResumeStore((state) => state.setTemplate);
  const setPreviewMode = useResumeStore((state) => state.setPreviewMode);
  const previewMode = useResumeStore((state) => state.uiState.previewMode);
  const undo = useResumeStore((state) => state.undo);
  const redo = useResumeStore((state) => state.redo);
  const canUndo = useResumeStore((state) => state.canUndo());
  const canRedo = useResumeStore((state) => state.canRedo());

  const handleExport = async () => {
    if (!previewRef.current) {
      alert('Preview not available');
      return;
    }

    try {
      setExporting(true);
      await exportResumeToPDF(resume, previewRef.current, `${resume.name}.pdf`);
    } catch (error) {
      alert('Failed to export PDF. Please try again.');
      console.error(error);
    } finally {
      setExporting(false);
    }
  };

  // Keyboard shortcuts
  useKeyboardShortcuts({
    onCtrlZ: () => canUndo && undo(),
    onCtrlY: () => canRedo && redo(),
    onCtrlShiftS: handleExport,
  });

  const handleAddSection = () => {
    alert('Custom sections coming soon');
  };

  const handleSettings = () => {
    setShowSettings(true);
  };

  const handleSelectTemplate = (template: TemplateName) => {
    setTemplate(template);
  };

  return (
    <div className="flex flex-col h-screen bg-white">
      {/* Template Selector Modal */}
      {showTemplateSelector && (
        <TemplateSelector
          currentTemplate={resume.template}
          onSelect={handleSelectTemplate}
          onClose={() => setShowTemplateSelector(false)}
        />
      )}

      {/* Settings Modal */}
      {showSettings && <SettingsModal onClose={() => setShowSettings(false)} />}

      {/* Header */}
      <Header
        onExport={handleExport}
        onSettingsClick={handleSettings}
        exporting={exporting}
      />

      {/* Main Layout */}
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar Editor */}
        <EditorSidebar
          isOpen={true}
          onAddSection={handleAddSection}
        >
          <div className="p-4 space-y-3">
            <CompletenessIndicator resume={resume} />
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
          <div ref={previewRef} className="bg-white">
            {renderTemplate(resume)}
          </div>
        </PreviewPanel>
      </div>
    </div>
  );
}
