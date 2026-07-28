import { useState } from 'react';
import FormInput from '../FormInput';
import FormTextarea from '../FormTextarea';
import SectionCard from '../SectionCard';
import Button from '../Button';
import { useResumeStore } from '@/store/resume-store';
import { Trash2, Plus } from 'lucide-react';

export default function AwardsForm() {
  const resume = useResumeStore((state) => state.resume);
  const addAward = useResumeStore((state) => state.addAward);
  const deleteAward = useResumeStore((state) => state.deleteAward);
  const setAwardsVisible = useResumeStore((state) => state.setAwardsVisible);
  const toggleSectionExpanded = useResumeStore((state) => state.toggleSectionExpanded);
  const expandedSections = useResumeStore((state) => state.uiState.expandedSections);

  const [newEntry, setNewEntry] = useState({
    title: '',
    organization: '',
    date: '',
    description: '',
  });

  const isExpanded = expandedSections.has('awards');

  const handleAddAward = () => {
    if (newEntry.title.trim() && newEntry.organization.trim()) {
      addAward(newEntry);
      setNewEntry({
        title: '',
        organization: '',
        date: '',
        description: '',
      });
    }
  };

  const handleUpdateField = (key: keyof typeof newEntry, value: any) => {
    setNewEntry({ ...newEntry, [key]: value });
  };

  return (
    <SectionCard
      title={resume.awards.customTitle}
      isVisible={resume.awards.isVisible}
      isExpanded={isExpanded}
      onToggleExpanded={() => toggleSectionExpanded('awards')}
      onToggleVisible={() => setAwardsVisible(!resume.awards.isVisible)}
      onDelete={() => setAwardsVisible(false)}
    >
      <div className="space-y-4">
        {/* Add Form */}
        <div className="bg-slate-50 p-4 rounded-lg border border-slate-200">
          <h4 className="font-semibold text-sm text-slate-700 mb-3">Add Award</h4>
          <div className="space-y-3">
            <div className="grid grid-cols-2 gap-3">
              <FormInput
                label="Award Title"
                placeholder="Employee of the Year"
                value={newEntry.title}
                onChange={(e) => handleUpdateField('title', e.target.value)}
              />
              <FormInput
                label="Organization"
                placeholder="Company Name"
                value={newEntry.organization}
                onChange={(e) => handleUpdateField('organization', e.target.value)}
              />
            </div>

            <FormInput
              label="Date"
              type="month"
              value={newEntry.date}
              onChange={(e) => handleUpdateField('date', e.target.value)}
            />

            <FormTextarea
              label="Description"
              placeholder="What you were awarded for..."
              value={newEntry.description}
              onChange={(e) => handleUpdateField('description', e.target.value)}
              rows={3}
            />

            <Button variant="primary" size="sm" onClick={handleAddAward} className="w-full gap-2">
              <Plus className="w-4 h-4" />
              Add Award
            </Button>
          </div>
        </div>

        {/* List */}
        {resume.awards.items.length > 0 ? (
          <div className="space-y-3">
            {resume.awards.items.map((entry) => (
              <div key={entry.id} className="bg-slate-50 p-3 rounded border border-slate-200">
                <div className="flex justify-between items-start gap-2 mb-1">
                  <div className="flex-1">
                    <h5 className="font-semibold text-sm text-slate-900">{entry.title}</h5>
                    <p className="text-xs text-slate-600">{entry.organization}</p>
                  </div>
                  <button
                    onClick={() => deleteAward(entry.id)}
                    className="p-1 hover:bg-red-50 rounded transition-colors"
                  >
                    <Trash2 className="w-4 h-4 text-red-600" />
                  </button>
                </div>
                {entry.date && <p className="text-xs text-slate-500">{entry.date}</p>}
              </div>
            ))}
          </div>
        ) : (
          <p className="text-sm text-slate-500 text-center py-4">No awards added yet</p>
        )}
      </div>
    </SectionCard>
  );
}
