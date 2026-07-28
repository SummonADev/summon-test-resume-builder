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
import KeyboardShortcutsHint from '@/components/KeyboardShortcutsHint';
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
  const [sidebarOpen, setSidebarOpen] = useState(true);
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
    alert('Custom sections coming in Phase 3');
  };

  const handleSettings = () => {
    setShowSettings(true);
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

      {/* Settings Modal */}
      {showSettings && <SettingsModal onClose={() => setShowSettings(false)} />}

      {/* Header */}
      <Header
        onSidebarToggle={() => setSidebarOpen(!sidebarOpen)}
        onExport={handleExport}
        onTemplateClick={() => setShowTemplateSelector(true)}
        exporting={exporting}
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
          <div ref={previewRef} className="p-8">
            {renderTemplate(resume)}
          </div>
        </PreviewPanel>
      </div>

      {/* Keyboard Shortcuts Help */}
      <KeyboardShortcutsHint />
    </div>
  );
}
