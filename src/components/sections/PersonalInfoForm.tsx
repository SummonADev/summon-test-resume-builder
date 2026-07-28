import FormInput from '../FormInput';
import SectionCard from '../SectionCard';
import { useResumeStore } from '@/store/resume-store';

export default function PersonalInfoForm() {
  const resume = useResumeStore((state) => state.resume);
  const updatePersonal = useResumeStore((state) => state.updatePersonal);
  const toggleSectionExpanded = useResumeStore((state) => state.toggleSectionExpanded);
  const expandedSections = useResumeStore((state) => state.uiState.expandedSections);

  const isExpanded = expandedSections.has('personal');

  const handleChange = (field: keyof typeof resume.personal) => (e: React.ChangeEvent<HTMLInputElement>) => {
    updatePersonal({ [field]: e.target.value });
  };

  return (
    <SectionCard
      title="Personal Information"
      isVisible={true}
      isExpanded={isExpanded}
      onToggleExpanded={() => toggleSectionExpanded('personal')}
      onToggleVisible={() => {}}
      onDelete={() => {}}
      canDelete={false}
    >
      <div className="space-y-4">
        <FormInput
          label="Full Name *"
          placeholder="John Doe"
          value={resume.personal.fullName}
          onChange={handleChange('fullName')}
        />

        <FormInput
          label="Professional Title"
          placeholder="Senior Software Engineer"
          value={resume.personal.professionalTitle}
          onChange={handleChange('professionalTitle')}
        />

        <FormInput
          label="Email *"
          type="email"
          placeholder="john@example.com"
          value={resume.personal.email}
          onChange={handleChange('email')}
        />

        <FormInput
          label="Phone"
          type="tel"
          placeholder="+1 (555) 123-4567"
          value={resume.personal.phone}
          onChange={handleChange('phone')}
        />

        <FormInput
          label="Location"
          placeholder="San Francisco, CA"
          value={resume.personal.location}
          onChange={handleChange('location')}
        />

        <FormInput
          label="LinkedIn"
          type="url"
          placeholder="https://linkedin.com/in/johndoe"
          value={resume.personal.linkedin}
          onChange={handleChange('linkedin')}
        />

        <FormInput
          label="Portfolio Website"
          type="url"
          placeholder="https://johndoe.com"
          value={resume.personal.portfolio}
          onChange={handleChange('portfolio')}
        />

        <FormInput
          label="GitHub"
          type="url"
          placeholder="https://github.com/johndoe"
          value={resume.personal.github}
          onChange={handleChange('github')}
        />
      </div>
    </SectionCard>
  );
}
