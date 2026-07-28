import { useState } from 'react';
import FormInput from '../FormInput';
import SectionCard from '../SectionCard';
import Button from '../Button';
import { useResumeStore } from '@/store/resume-store';
import { Trash2, Plus } from 'lucide-react';

export default function SkillsForm() {
  const resume = useResumeStore((state) => state.resume);
  const addSkill = useResumeStore((state) => state.addSkill);
  const deleteSkill = useResumeStore((state) => state.deleteSkill);
  const setSkillsVisible = useResumeStore((state) => state.setSkillsVisible);
  const toggleSectionExpanded = useResumeStore((state) => state.toggleSectionExpanded);
  const expandedSections = useResumeStore((state) => state.uiState.expandedSections);

  const [newSkillName, setNewSkillName] = useState('');
  const [newSkillCategory, setNewSkillCategory] = useState('Technical');

  const isExpanded = expandedSections.has('skills');

  const handleAddSkill = () => {
    if (newSkillName.trim()) {
      addSkill({ name: newSkillName, category: newSkillCategory });
      setNewSkillName('');
    }
  };

  // Group skills by category
  const skillsByCategory = resume.skills.items.reduce(
    (acc, skill) => {
      if (!acc[skill.category]) acc[skill.category] = [];
      acc[skill.category].push(skill);
      return acc;
    },
    {} as Record<string, typeof resume.skills.items>
  );

  return (
    <SectionCard
      title={resume.skills.customTitle}
      isVisible={resume.skills.isVisible}
      isExpanded={isExpanded}
      onToggleExpanded={() => toggleSectionExpanded('skills')}
      onToggleVisible={() => setSkillsVisible(!resume.skills.isVisible)}
      onDelete={() => setSkillsVisible(false)}
    >
      <div className="space-y-4">
        {/* Add Skill */}
        <div className="bg-slate-50 p-4 rounded-lg border border-slate-200">
          <h4 className="font-semibold text-sm text-slate-700 mb-3">Add Skill</h4>
          <div className="space-y-2">
            <FormInput
              label="Skill Name"
              placeholder="e.g., React, Python, Leadership"
              value={newSkillName}
              onChange={(e) => setNewSkillName(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleAddSkill()}
            />

            <FormInput
              label="Category"
              placeholder="e.g., Technical, Soft Skills"
              value={newSkillCategory}
              onChange={(e) => setNewSkillCategory(e.target.value)}
            />

            <Button variant="primary" size="sm" onClick={handleAddSkill} className="w-full gap-2">
              <Plus className="w-4 h-4" />
              Add Skill
            </Button>
          </div>
        </div>

        {/* Skills List */}
        {Object.entries(skillsByCategory).length > 0 ? (
          <div className="space-y-3">
            {Object.entries(skillsByCategory).map(([category, skills]) => (
              <div key={category}>
                <h4 className="font-semibold text-sm text-slate-700 mb-2">{category}</h4>
                <div className="space-y-2">
                  {skills.map((skill) => (
                    <div key={skill.id} className="flex items-center justify-between gap-2 bg-slate-50 p-2 rounded">
                      <span className="text-sm text-slate-700 flex-1">{skill.name}</span>
                      <button
                        onClick={() => deleteSkill(skill.id)}
                        className="p-1 hover:bg-red-50 rounded transition-colors"
                      >
                        <Trash2 className="w-4 h-4 text-red-600" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-sm text-slate-500 text-center py-4">No skills added yet</p>
        )}
      </div>
    </SectionCard>
  );
}
