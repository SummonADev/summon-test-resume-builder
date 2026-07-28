import { useState } from 'react';
import FormInput from '../FormInput';
import FormTextarea from '../FormTextarea';
import SectionCard from '../SectionCard';
import Button from '../Button';
import { useResumeStore } from '@/store/resume-store';
import { Trash2, Plus } from 'lucide-react';

export default function EducationForm() {
  const resume = useResumeStore((state) => state.resume);
  const addEducation = useResumeStore((state) => state.addEducation);
  const deleteEducation = useResumeStore((state) => state.deleteEducation);
  const setEducationVisible = useResumeStore((state) => state.setEducationVisible);
  const toggleSectionExpanded = useResumeStore((state) => state.toggleSectionExpanded);
  const expandedSections = useResumeStore((state) => state.uiState.expandedSections);

  const [newEntry, setNewEntry] = useState({
    institution: '',
    degree: '',
    fieldOfStudy: '',
    startDate: '',
    endDate: '',
    gpa: '',
    description: '',
  });

  const isExpanded = expandedSections.has('education');

  const handleAddEducation = () => {
    if (newEntry.institution.trim() && newEntry.degree.trim()) {
      addEducation(newEntry);
      setNewEntry({
        institution: '',
        degree: '',
        fieldOfStudy: '',
        startDate: '',
        endDate: '',
        gpa: '',
        description: '',
      });
    }
  };

  const handleUpdateField = (key: keyof typeof newEntry, value: any) => {
    setNewEntry({ ...newEntry, [key]: value });
  };

  return (
    <SectionCard
      title={resume.education.customTitle}
      isVisible={resume.education.isVisible}
      isExpanded={isExpanded}
      onToggleExpanded={() => toggleSectionExpanded('education')}
      onToggleVisible={() => setEducationVisible(!resume.education.isVisible)}
      onDelete={() => setEducationVisible(false)}
    >
      <div className="space-y-4">
        {/* Add Form */}
        <div className="bg-slate-50 p-4 rounded-lg border border-slate-200">
          <h4 className="font-semibold text-sm text-slate-700 mb-3">Add Education</h4>
          <div className="space-y-3">
            <div className="grid grid-cols-2 gap-3">
              <FormInput
                label="Institution"
                placeholder="University of Example"
                value={newEntry.institution}
                onChange={(e) => handleUpdateField('institution', e.target.value)}
              />
              <FormInput
                label="Degree"
                placeholder="Bachelor of Science"
                value={newEntry.degree}
                onChange={(e) => handleUpdateField('degree', e.target.value)}
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <FormInput
                label="Field of Study"
                placeholder="Computer Science"
                value={newEntry.fieldOfStudy}
                onChange={(e) => handleUpdateField('fieldOfStudy', e.target.value)}
              />
              <FormInput
                label="GPA (optional)"
                placeholder="3.8"
                value={newEntry.gpa}
                onChange={(e) => handleUpdateField('gpa', e.target.value)}
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <FormInput
                label="Start Date"
                type="month"
                value={newEntry.startDate}
                onChange={(e) => handleUpdateField('startDate', e.target.value)}
              />
              <FormInput
                label="End Date"
                type="month"
                value={newEntry.endDate}
                onChange={(e) => handleUpdateField('endDate', e.target.value)}
              />
            </div>

            <FormTextarea
              label="Description"
              placeholder="Relevant coursework, honors, achievements..."
              value={newEntry.description}
              onChange={(e) => handleUpdateField('description', e.target.value)}
              rows={3}
            />

            <Button variant="primary" size="sm" onClick={handleAddEducation} className="w-full gap-2">
              <Plus className="w-4 h-4" />
              Add Education
            </Button>
          </div>
        </div>

        {/* Entries List */}
        {resume.education.items.length > 0 ? (
          <div className="space-y-3">
            {resume.education.items.map((entry) => (
              <div key={entry.id} className="bg-slate-50 p-3 rounded border border-slate-200">
                <div className="flex justify-between items-start gap-2 mb-1">
                  <div className="flex-1">
                    <h5 className="font-semibold text-sm text-slate-900">{entry.degree} in {entry.fieldOfStudy}</h5>
                    <p className="text-xs text-slate-600">{entry.institution}</p>
                  </div>
                  <button
                    onClick={() => deleteEducation(entry.id)}
                    className="p-1 hover:bg-red-50 rounded transition-colors"
                  >
                    <Trash2 className="w-4 h-4 text-red-600" />
                  </button>
                </div>
                <p className="text-xs text-slate-500">
                  {entry.startDate} - {entry.endDate}
                </p>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-sm text-slate-500 text-center py-4">No education added yet</p>
        )}
      </div>
    </SectionCard>
  );
}
