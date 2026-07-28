import { useState } from 'react';
import FormInput from '../FormInput';
import FormTextarea from '../FormTextarea';
import SectionCard from '../SectionCard';
import Button from '../Button';
import { useResumeStore } from '@/store/resume-store';
import { Trash2, Plus } from 'lucide-react';

export default function ExperienceForm() {
  const resume = useResumeStore((state) => state.resume);
  const addExperience = useResumeStore((state) => state.addExperience);
  const deleteExperience = useResumeStore((state) => state.deleteExperience);
  const setExperienceVisible = useResumeStore((state) => state.setExperienceVisible);
  const toggleSectionExpanded = useResumeStore((state) => state.toggleSectionExpanded);
  const expandedSections = useResumeStore((state) => state.uiState.expandedSections);
  const [newEntry, setNewEntry] = useState({
    company: '',
    position: '',
    location: '',
    startDate: '',
    endDate: '',
    isCurrentPosition: false,
    responsibilities: '',
    achievements: '',
  });

  const isExpanded = expandedSections.has('experience');

  const handleAddExperience = () => {
    if (newEntry.company.trim() && newEntry.position.trim()) {
      addExperience(newEntry);
      setNewEntry({
        company: '',
        position: '',
        location: '',
        startDate: '',
        endDate: '',
        isCurrentPosition: false,
        responsibilities: '',
        achievements: '',
      });
    }
  };

  const handleUpdateField = (key: keyof typeof newEntry, value: any) => {
    setNewEntry({ ...newEntry, [key]: value });
  };

  return (
    <SectionCard
      title={resume.experience.customTitle}
      isVisible={resume.experience.isVisible}
      isExpanded={isExpanded}
      onToggleExpanded={() => toggleSectionExpanded('experience')}
      onToggleVisible={() => setExperienceVisible(!resume.experience.isVisible)}
      onDelete={() => setExperienceVisible(false)}
    >
      <div className="space-y-4">
        {/* Add Form */}
        <div className="bg-slate-50 p-4 rounded-lg border border-slate-200">
          <h4 className="font-semibold text-sm text-slate-700 mb-3">Add Experience</h4>
          <div className="space-y-3">
            <div className="grid grid-cols-2 gap-3">
              <FormInput
                label="Company"
                placeholder="Acme Corp"
                value={newEntry.company}
                onChange={(e) => handleUpdateField('company', e.target.value)}
              />
              <FormInput
                label="Position"
                placeholder="Senior Engineer"
                value={newEntry.position}
                onChange={(e) => handleUpdateField('position', e.target.value)}
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <FormInput
                label="Location"
                placeholder="San Francisco, CA"
                value={newEntry.location}
                onChange={(e) => handleUpdateField('location', e.target.value)}
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
                disabled={newEntry.isCurrentPosition}
              />
            </div>

            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={newEntry.isCurrentPosition}
                onChange={(e) => handleUpdateField('isCurrentPosition', e.target.checked)}
              />
              <span className="text-sm text-slate-700">Current Position</span>
            </label>

            <FormTextarea
              label="Responsibilities"
              placeholder="Main duties and responsibilities..."
              value={newEntry.responsibilities}
              onChange={(e) => handleUpdateField('responsibilities', e.target.value)}
              rows={3}
            />

            <FormTextarea
              label="Achievements"
              placeholder="Key accomplishments..."
              value={newEntry.achievements}
              onChange={(e) => handleUpdateField('achievements', e.target.value)}
              rows={3}
            />

            <Button variant="primary" size="sm" onClick={handleAddExperience} className="w-full gap-2">
              <Plus className="w-4 h-4" />
              Add Experience
            </Button>
          </div>
        </div>

        {/* Entries List */}
        {resume.experience.items.length > 0 ? (
          <div className="space-y-3">
            {resume.experience.items.map((entry) => (
              <div key={entry.id} className="bg-slate-50 p-3 rounded border border-slate-200">
                <div className="flex justify-between items-start gap-2 mb-1">
                  <div className="flex-1">
                    <h5 className="font-semibold text-sm text-slate-900">{entry.position}</h5>
                    <p className="text-xs text-slate-600">{entry.company}</p>
                  </div>
                  <button
                    onClick={() => deleteExperience(entry.id)}
                    className="p-1 hover:bg-red-50 rounded transition-colors"
                  >
                    <Trash2 className="w-4 h-4 text-red-600" />
                  </button>
                </div>
                <p className="text-xs text-slate-500">
                  {entry.startDate} - {entry.isCurrentPosition ? 'Present' : entry.endDate}
                </p>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-sm text-slate-500 text-center py-4">No experience added yet</p>
        )}
      </div>
    </SectionCard>
  );
}
