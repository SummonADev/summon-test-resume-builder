import FormTextarea from '../FormTextarea';
import SectionCard from '../SectionCard';
import { useResumeStore } from '@/store/resume-store';

export default function SummaryForm() {
  const resume = useResumeStore((state) => state.resume);
  const updateSummary = useResumeStore((state) => state.updateSummary);
  const setSummaryVisible = useResumeStore((state) => state.setSummaryVisible);
  const toggleSectionExpanded = useResumeStore((state) => state.toggleSectionExpanded);
  const expandedSections = useResumeStore((state) => state.uiState.expandedSections);

  const isExpanded = expandedSections.has('summary');

  return (
    <SectionCard
      title={resume.summary.customTitle}
      isVisible={resume.summary.isVisible}
      isExpanded={isExpanded}
      onToggleExpanded={() => toggleSectionExpanded('summary')}
      onToggleVisible={() => setSummaryVisible(!resume.summary.isVisible)}
      onDelete={() => setSummaryVisible(false)}
    >
      <FormTextarea
        label="Professional Summary"
        placeholder="Write a brief overview of your professional background, skills, and career objectives..."
        value={resume.summary.content}
        onChange={(e) => updateSummary(e.target.value)}
        rows={5}
      />
    </SectionCard>
  );
}
