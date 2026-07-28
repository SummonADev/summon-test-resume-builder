import { useState } from 'react';
import FormInput from '../FormInput';
import SectionCard from '../SectionCard';
import Button from '../Button';
import { useResumeStore } from '@/store/resume-store';
import { Trash2, Plus } from 'lucide-react';

export default function CertificationsForm() {
  const resume = useResumeStore((state) => state.resume);
  const addCertification = useResumeStore((state) => state.addCertification);
  const deleteCertification = useResumeStore((state) => state.deleteCertification);
  const setCertificationsVisible = useResumeStore((state) => state.setCertificationsVisible);
  const toggleSectionExpanded = useResumeStore((state) => state.toggleSectionExpanded);
  const expandedSections = useResumeStore((state) => state.uiState.expandedSections);

  const [newEntry, setNewEntry] = useState({
    name: '',
    organization: '',
    issueDate: '',
    expirationDate: '',
    credentialId: '',
    credentialUrl: '',
  });

  const isExpanded = expandedSections.has('certifications');

  const handleAddCertification = () => {
    if (newEntry.name.trim() && newEntry.organization.trim()) {
      addCertification(newEntry);
      setNewEntry({
        name: '',
        organization: '',
        issueDate: '',
        expirationDate: '',
        credentialId: '',
        credentialUrl: '',
      });
    }
  };

  const handleUpdateField = (key: keyof typeof newEntry, value: any) => {
    setNewEntry({ ...newEntry, [key]: value });
  };

  return (
    <SectionCard
      title={resume.certifications.customTitle}
      isVisible={resume.certifications.isVisible}
      isExpanded={isExpanded}
      onToggleExpanded={() => toggleSectionExpanded('certifications')}
      onToggleVisible={() => setCertificationsVisible(!resume.certifications.isVisible)}
      onDelete={() => setCertificationsVisible(false)}
    >
      <div className="space-y-4">
        {/* Add Form */}
        <div className="bg-slate-50 p-4 rounded-lg border border-slate-200">
          <h4 className="font-semibold text-sm text-slate-700 mb-3">Add Certification</h4>
          <div className="space-y-3">
            <div className="grid grid-cols-2 gap-3">
              <FormInput
                label="Certification Name"
                placeholder="AWS Solutions Architect"
                value={newEntry.name}
                onChange={(e) => handleUpdateField('name', e.target.value)}
              />
              <FormInput
                label="Organization"
                placeholder="Amazon Web Services"
                value={newEntry.organization}
                onChange={(e) => handleUpdateField('organization', e.target.value)}
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <FormInput
                label="Issue Date"
                type="month"
                value={newEntry.issueDate}
                onChange={(e) => handleUpdateField('issueDate', e.target.value)}
              />
              <FormInput
                label="Expiration Date (optional)"
                type="month"
                value={newEntry.expirationDate}
                onChange={(e) => handleUpdateField('expirationDate', e.target.value)}
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <FormInput
                label="Credential ID"
                placeholder="ABC-123456"
                value={newEntry.credentialId}
                onChange={(e) => handleUpdateField('credentialId', e.target.value)}
              />
              <FormInput
                label="Credential URL"
                type="url"
                placeholder="https://verify.example.com/..."
                value={newEntry.credentialUrl}
                onChange={(e) => handleUpdateField('credentialUrl', e.target.value)}
              />
            </div>

            <Button variant="primary" size="sm" onClick={handleAddCertification} className="w-full gap-2">
              <Plus className="w-4 h-4" />
              Add Certification
            </Button>
          </div>
        </div>

        {/* List */}
        {resume.certifications.items.length > 0 ? (
          <div className="space-y-3">
            {resume.certifications.items.map((entry) => (
              <div key={entry.id} className="bg-slate-50 p-3 rounded border border-slate-200">
                <div className="flex justify-between items-start gap-2 mb-1">
                  <div className="flex-1">
                    <h5 className="font-semibold text-sm text-slate-900">{entry.name}</h5>
                    <p className="text-xs text-slate-600">{entry.organization}</p>
                  </div>
                  <button
                    onClick={() => deleteCertification(entry.id)}
                    className="p-1 hover:bg-red-50 rounded transition-colors"
                  >
                    <Trash2 className="w-4 h-4 text-red-600" />
                  </button>
                </div>
                <p className="text-xs text-slate-500">
                  {entry.issueDate}
                  {entry.expirationDate && ` - ${entry.expirationDate}`}
                </p>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-sm text-slate-500 text-center py-4">No certifications added yet</p>
        )}
      </div>
    </SectionCard>
  );
}
