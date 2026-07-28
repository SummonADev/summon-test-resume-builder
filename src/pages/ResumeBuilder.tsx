import { useState, useRef } from 'react';
import { useResumeStore } from '@/store/resume-store';
import { TemplateName } from '@/types/resume';
import { useKeyboardShortcuts } from '@/hooks/useKeyboardShortcuts';
import { Header } from '@/components/Header';
import { EditorSidebar } from '@/components/EditorSidebar';
import { PreviewPanel } from '@/components/PreviewPanel';
import { TemplateSelector } from '@/components/TemplateSelector';
import { CompletenessIndicator } from '@/components/CompletenessIndicator';
import { PersonalInfoForm } from '@/components/sections/PersonalInfoForm';
import { SummaryForm } from '@/components/sections/SummaryForm';
import { SkillsForm } from '@/components/sections/SkillsForm';
import { ExperienceForm } from '@/components/sections/ExperienceForm';
import { EducationForm } from '@/components/sections/EducationForm';
import { ProjectsForm } from '@/components/sections/ProjectsForm';
import { CertificationsForm } from '@/components/sections/CertificationsForm';
import { AwardsForm } from '@/components/sections/AwardsForm';
import { renderTemplate } from '@/lib/template-factory';
import { exportResumeToPDF } from '@/lib/pdf-export';
import { exportResumeToDocx } from '@/lib/docx-export';

export default function ResumeBuilder() {
  const [exporting, setExporting] = useState(false);
  const previewRef = useRef<HTMLDivElement>(null);

  const resume = useResumeStore((state) => state.resume);
  const setTemplate = useResumeStore((state) => state.setTemplate);
  const undo = useResumeStore((state) => state.undo);
  const redo = useResumeStore((state) => state.redo);
  const canUndo = useResumeStore((state) => state.canUndo());
  const canRedo = useResumeStore((state) => state.canRedo());

  const handleExportPdf = async () => {
    if (!previewRef.current) {
      alert('Preview not available');
      return;
    }

    try {
      setExporting(true);
      await exportResumeToPDF(resume, previewRef.current, `${resume.personalInfo.fullName || 'resume'}.pdf`);
    } catch (error) {
      alert('Failed to export PDF. Please try again.');
      console.error(error);
    } finally {
      setExporting(false);
    }
  };

  const handleExportDocx = async () => {
    try {
      setExporting(true);
      await exportResumeToDocx(resume, `${resume.personalInfo.fullName || 'resume'}.docx`);
    } catch (error) {
      alert('Failed to export DOCX. Please try again.');
      console.error(error);
    } finally {
      setExporting(false);
    }
  };

  useKeyboardShortcuts({
    onCtrlZ: () => canUndo && undo(),
    onCtrlY: () => canRedo && redo(),
    onCtrlShiftS: handleExportPdf,
  });

  const templates: Array<{ id: TemplateName; name: string }> = [
    { id: 'modern-minimal', name: 'Modern Minimal' },
    { id: 'professional-corporate', name: 'Professional' },
    { id: 'elegant-two-column', name: 'Elegant' },
    { id: 'creative-designer', name: 'Creative' },
    { id: 'ats-friendly', name: 'ATS-Friendly' },
  ];

  const handleSelectTemplate = (templateId: string) => {
    setTemplate(templateId as TemplateName);
  };

  return (
    <div className="flex flex-col h-screen bg-white">
      {/* Header */}
      <Header
        onExportPdf={handleExportPdf}
        onExportDocx={handleExportDocx}
        onSettings={() => alert('Settings coming soon')}
        isExporting={exporting}
        templateName={templates.find((t) => t.id === resume.template)?.name || 'Unknown'}
      />

      {/* Template Selector */}
      <TemplateSelector
        templates={templates}
        currentTemplate={resume.template}
        onSelectTemplate={handleSelectTemplate}
      />

      {/* Main Layout */}
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar Editor */}
        <EditorSidebar onAddSection={() => alert('Custom sections coming soon')}>
          <CompletenessIndicator resume={resume} />
          <PersonalInfoForm />
          <SummaryForm />
          <ExperienceForm />
          <EducationForm />
          <SkillsForm />
          <ProjectsForm />
          <CertificationsForm />
          <AwardsForm />
        </EditorSidebar>

        {/* Preview Panel */}
        <PreviewPanel>
          <div ref={previewRef} className="bg-white">
            {renderTemplate(resume)}
          </div>
        </PreviewPanel>
      </div>
    </div>
  );
}
