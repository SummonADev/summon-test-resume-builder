import { Resume } from '@/types/resume';
import { format } from 'date-fns';

interface CreativeDesignerProps {
  resume: Resume;
}

const formatDate = (dateStr: string) => {
  if (!dateStr) return '';
  try {
    const [year, month] = dateStr.split('-');
    return format(new Date(parseInt(year), parseInt(month) - 1), 'MMm yyyy');
  } catch {
    return dateStr;
  }
};

export default function CreativeDesigner({ resume }: CreativeDesignerProps) {
  const { personal, summary, experience, education, skills, projects, certifications, awards } = resume;

  return (
    <div className="bg-white text-gray-900 font-lato print:p-0 p-0">
      {/* Header */}
      <div className="bg-gray-100 px-8 py-8 mb-6 border-b border-gray-300">
        <h1 className="text-3xl font-light text-gray-900 mb-1">{personal.fullName}</h1>
        {personal.professionalTitle && <p className="text-sm text-gray-600 font-light">{personal.professionalTitle}</p>}
        <div className="flex flex-wrap gap-4 mt-4 text-xs text-gray-600">
          {personal.email && <a href={`mailto:${personal.email}`} className="hover:text-gray-900">{personal.email}</a>}
          {personal.phone && <a href={`tel:${personal.phone}`} className="hover:text-gray-900">{personal.phone}</a>}
          {personal.location && <span>{personal.location}</span>}
        </div>
      </div>

      <div className="px-8 pb-8">
        {/* Summary */}
        {summary.isVisible && summary.content && (
          <div className="mb-6 p-4 bg-gray-50 border-l-2 border-gray-900">
            <h2 className="text-sm font-light text-gray-900 uppercase tracking-widest mb-2">{summary.customTitle}</h2>
            <p className="text-xs leading-relaxed text-gray-700 whitespace-pre-wrap">{summary.content}</p>
          </div>
        )}

        {/* Experience */}
        {experience.isVisible && experience.items.length > 0 && (
          <div className="mb-6">
            <h2 className="text-sm font-light text-gray-900 uppercase tracking-widest border-b border-gray-300 pb-2 mb-4">
              {experience.customTitle}
            </h2>
            <div className="space-y-4">
              {experience.items.map((exp) => (
                <div key={exp.id} className="pl-4 border-l border-gray-300">
                  <div className="flex justify-between items-baseline">
                    <h3 className="text-xs font-light text-gray-900">{exp.position}</h3>
                    <span className="text-xs text-gray-500">
                      {formatDate(exp.startDate)} – {exp.isCurrentPosition ? 'Present' : formatDate(exp.endDate)}
                    </span>
                  </div>
                  <p className="text-xs text-gray-600 font-light">{exp.company}</p>
                  {exp.location && <p className="text-xs text-gray-500">{exp.location}</p>}
                  {exp.responsibilities && <p className="text-xs mt-2 text-gray-700 whitespace-pre-wrap">{exp.responsibilities}</p>}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Education */}
        {education.isVisible && education.items.length > 0 && (
          <div className="mb-6">
            <h2 className="text-sm font-light text-gray-900 uppercase tracking-widest border-b border-gray-300 pb-2 mb-4">
              {education.customTitle}
            </h2>
            <div className="space-y-3">
              {education.items.map((edu) => (
                <div key={edu.id} className="pl-4 border-l border-gray-300">
                  <h3 className="text-xs font-light text-gray-900">
                    {edu.degree} in {edu.fieldOfStudy}
                  </h3>
                  <p className="text-xs text-gray-600">{edu.institution}</p>
                  <p className="text-xs text-gray-500">
                    {formatDate(edu.startDate)} – {formatDate(edu.endDate)}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Skills */}
        {skills.isVisible && skills.items.length > 0 && (
          <div className="mb-6 p-4 bg-gray-50">
            <h2 className="text-sm font-light text-gray-900 uppercase tracking-widest mb-3">{skills.customTitle}</h2>
            <div className="flex flex-wrap gap-2">
              {skills.items.map((skill) => (
                <span key={skill.id} className="px-2 py-1 bg-gray-900 text-white text-xs font-light rounded">
                  {skill.name}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Projects */}
        {projects.isVisible && projects.items.length > 0 && (
          <div className="mb-6">
            <h2 className="text-sm font-light text-gray-900 uppercase tracking-widest border-b border-gray-300 pb-2 mb-4">
              {projects.customTitle}
            </h2>
            <div className="space-y-3">
              {projects.items.map((proj) => (
                <div key={proj.id} className="p-3 bg-gray-50 border-l-2 border-gray-900">
                  <h3 className="text-xs font-light text-gray-900">{proj.name}</h3>
                  {proj.technologies.length > 0 && (
                    <p className="text-xs text-gray-600 mt-1">{proj.technologies.join(', ')}</p>
                  )}
                  {proj.description && <p className="text-xs text-gray-700 mt-1">{proj.description}</p>}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Certifications & Awards */}
        <div className="grid grid-cols-2 gap-6">
          {certifications.isVisible && certifications.items.length > 0 && (
            <div>
              <h2 className="text-sm font-light text-gray-900 uppercase tracking-widest border-b border-gray-300 pb-2 mb-3">
                {certifications.customTitle}
              </h2>
              <div className="space-y-2">
                {certifications.items.map((cert) => (
                  <div key={cert.id}>
                    <p className="text-xs font-light text-gray-900">{cert.name}</p>
                    <p className="text-xs text-gray-600">{cert.organization}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {awards.isVisible && awards.items.length > 0 && (
            <div>
              <h2 className="text-sm font-light text-gray-900 uppercase tracking-widest border-b border-gray-300 pb-2 mb-3">
                {awards.customTitle}
              </h2>
              <div className="space-y-2">
                {awards.items.map((award) => (
                  <div key={award.id}>
                    <p className="text-xs font-light text-gray-900">{award.title}</p>
                    <p className="text-xs text-gray-600">{award.organization}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
