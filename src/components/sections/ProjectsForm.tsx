import { useState } from 'react';
import FormInput from '../FormInput';
import FormTextarea from '../FormTextarea';
import SectionCard from '../SectionCard';
import Button from '../Button';
import { useResumeStore } from '@/store/resume-store';
import { Trash2, Plus } from 'lucide-react';

export default function ProjectsForm() {
  const resume = useResumeStore((state) => state.resume);
  const addProject = useResumeStore((state) => state.addProject);
  const deleteProject = useResumeStore((state) => state.deleteProject);
  const setProjectsVisible = useResumeStore((state) => state.setProjectsVisible);
  const toggleSectionExpanded = useResumeStore((state) => state.toggleSectionExpanded);
  const expandedSections = useResumeStore((state) => state.uiState.expandedSections);

  const [newEntry, setNewEntry] = useState({
    name: '',
    technologies: '',
    description: '',
    projectUrl: '',
    githubUrl: '',
    startDate: '',
    endDate: '',
  });

  const isExpanded = expandedSections.has('projects');

  const handleAddProject = () => {
    if (newEntry.name.trim()) {
      addProject({
        ...newEntry,
        technologies: newEntry.technologies.split(',').map((t) => t.trim()).filter(Boolean),
      });
      setNewEntry({
        name: '',
        technologies: '',
        description: '',
        projectUrl: '',
        githubUrl: '',
        startDate: '',
        endDate: '',
      });
    }
  };

  const handleUpdateField = (key: keyof typeof newEntry, value: any) => {
    setNewEntry({ ...newEntry, [key]: value });
  };

  return (
    <SectionCard
      title={resume.projects.customTitle}
      isVisible={resume.projects.isVisible}
      isExpanded={isExpanded}
      onToggleExpanded={() => toggleSectionExpanded('projects')}
      onToggleVisible={() => setProjectsVisible(!resume.projects.isVisible)}
      onDelete={() => setProjectsVisible(false)}
    >
      <div className="space-y-4">
        {/* Add Form */}
        <div className="bg-slate-50 p-4 rounded-lg border border-slate-200">
          <h4 className="font-semibold text-sm text-slate-700 mb-3">Add Project</h4>
          <div className="space-y-3">
            <FormInput
              label="Project Name"
              placeholder="My Awesome App"
              value={newEntry.name}
              onChange={(e) => handleUpdateField('name', e.target.value)}
            />

            <FormInput
              label="Technologies"
              placeholder="React, Node.js, PostgreSQL (comma-separated)"
              value={newEntry.technologies}
              onChange={(e) => handleUpdateField('technologies', e.target.value)}
            />

            <FormTextarea
              label="Description"
              placeholder="Brief description of the project and your role..."
              value={newEntry.description}
              onChange={(e) => handleUpdateField('description', e.target.value)}
              rows={3}
            />

            <div className="grid grid-cols-2 gap-3">
              <FormInput
                label="Project URL"
                type="url"
                placeholder="https://example.com"
                value={newEntry.projectUrl}
                onChange={(e) => handleUpdateField('projectUrl', e.target.value)}
              />
              <FormInput
                label="GitHub URL"
                type="url"
                placeholder="https://github.com/user/repo"
                value={newEntry.githubUrl}
                onChange={(e) => handleUpdateField('githubUrl', e.target.value)}
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

            <Button variant="primary" size="sm" onClick={handleAddProject} className="w-full gap-2">
              <Plus className="w-4 h-4" />
              Add Project
            </Button>
          </div>
        </div>

        {/* Projects List */}
        {resume.projects.items.length > 0 ? (
          <div className="space-y-3">
            {resume.projects.items.map((entry) => (
              <div key={entry.id} className="bg-slate-50 p-3 rounded border border-slate-200">
                <div className="flex justify-between items-start gap-2 mb-1">
                  <div className="flex-1">
                    <h5 className="font-semibold text-sm text-slate-900">{entry.name}</h5>
                    {entry.technologies.length > 0 && (
                      <p className="text-xs text-slate-600">{entry.technologies.join(', ')}</p>
                    )}
                  </div>
                  <button
                    onClick={() => deleteProject(entry.id)}
                    className="p-1 hover:bg-red-50 rounded transition-colors"
                  >
                    <Trash2 className="w-4 h-4 text-red-600" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-sm text-slate-500 text-center py-4">No projects added yet</p>
        )}
      </div>
    </SectionCard>
  );
}
