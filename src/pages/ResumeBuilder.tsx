import { useState } from 'react';
import { useResumeStore } from '@/store/resume-store';
import Header from '@/components/Header';
import EditorSidebar from '@/components/EditorSidebar';
import PreviewPanel from '@/components/PreviewPanel';
import PersonalInfoForm from '@/components/sections/PersonalInfoForm';
import SummaryForm from '@/components/sections/SummaryForm';
import SkillsForm from '@/components/sections/SkillsForm';

export default function ResumeBuilder() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
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

  return (
    <div className="flex flex-col h-screen bg-slate-50">
      {/* Header */}
      <Header onSidebarToggle={() => setSidebarOpen(!sidebarOpen)} onExport={handleExport} />

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
            <SkillsForm />
          </div>
        </EditorSidebar>

        {/* Preview Panel */}
        <PreviewPanel previewMode={previewMode} onModeChange={setPreviewMode}>
          <div className="p-8">
            <div className="text-center text-slate-500">
              <p>Resume preview coming in Phase 4</p>
            </div>
          </div>
        </PreviewPanel>
      </div>
    </div>
  );
}
