import { Resume } from '@/types/resume';
import { format } from 'date-fns';

interface ModernMinimalProps {
  resume: Resume;
}

const formatDate = (dateStr: string) => {
  if (!dateStr) return '';
  try {
    const [year, month] = dateStr.split('-');
    return format(new Date(parseInt(year), parseInt(month) - 1), 'MMM yyyy');
  } catch {
    return dateStr;
  }
};

export default function ModernMinimal({ resume }: ModernMinimalProps) {
  const { personal, summary, experience, education, skills, projects, certifications, awards } = resume;

  return (
    <div className="bg-white text-gray-900 font-lato print:p-0 p-0" style={{ fontFamily: 'Lato, sans-serif' }}>
      {/* Header */}
      <div className="pb-4 mb-6 border-b border-gray-300">
        <h1 className="text-4xl font-light text-gray-900 mb-1">{personal.fullName}</h1>
        {personal.professionalTitle && (
          <p className="text-sm text-gray-600 font-light">{personal.professionalTitle}</p>
        )}
        <div className="flex flex-wrap gap-4 text-xs mt-3 text-gray-600">
          {personal.email && <a href={`mailto:${personal.email}`} className="hover:text-gray-900">{personal.email}</a>}
          {personal.phone && <a href={`tel:${personal.phone}`} className="hover:text-gray-900">{personal.phone}</a>}
          {personal.location && <span>{personal.location}</span>}
        </div>
        <div className="flex flex-wrap gap-4 text-xs mt-2">
          {personal.linkedin && (
            <a href={personal.linkedin} className="text-gray-600 hover:text-gray-900 underline">
              LinkedIn
            </a>
          )}
          {personal.portfolio && (
            <a href={personal.portfolio} className="text-gray-600 hover:text-gray-900 underline">
              Portfolio
            </a>
          )}
          {personal.github && (
            <a href={personal.github} className="text-gray-600 hover:text-gray-900 underline">
              GitHub
            </a>
          )}
        </div>
      </div>

      {/* Summary */}
      {summary.isVisible && summary.content && (
        <div className="mb-6">
          <h2 className="text-sm font-light text-gray-900 uppercase tracking-wide mb-2 border-b border-gray-200 pb-2">
            {summary.customTitle}
          </h2>
          <p className="text-xs leading-relaxed text-gray-700 whitespace-pre-wrap">{summary.content}</p>
        </div>
      )}

      {/* Experience */}
      {experience.isVisible && experience.items.length > 0 && (
        <div className="mb-6">
          <h2 className="text-sm font-light text-gray-900 uppercase tracking-wide mb-3 border-b border-gray-200 pb-2">
            {experience.customTitle}
          </h2>
          <div className="space-y-3">
            {experience.items.map((exp) => (
              <div key={exp.id}>
                <div className="flex justify-between items-baseline">
                  <h3 className="text-xs font-light text-gray-900">{exp.position}</h3>
                  <span className="text-xs text-gray-600 ml-2">
                    {formatDate(exp.startDate)} – {exp.isCurrentPosition ? 'Present' : formatDate(exp.endDate)}
                  </span>
                </div>
                <p className="text-xs text-gray-600 font-light">{exp.company}</p>
                {exp.location && <p className="text-xs text-gray-500">{exp.location}</p>}
                {exp.responsibilities && <p className="text-xs mt-1 text-gray-700 whitespace-pre-wrap">{exp.responsibilities}</p>}
                {exp.achievements && <p className="text-xs mt-1 text-gray-700 whitespace-pre-wrap">{exp.achievements}</p>}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Education */}
      {education.isVisible && education.items.length > 0 && (
        <div className="mb-6">
          <h2 className="text-sm font-light text-gray-900 uppercase tracking-wide mb-3 border-b border-gray-200 pb-2">
            {education.customTitle}
          </h2>
          <div className="space-y-3">
            {education.items.map((edu) => (
              <div key={edu.id}>
                <div className="flex justify-between items-baseline">
                  <h3 className="text-xs font-light text-gray-900">
                    {edu.degree} in {edu.fieldOfStudy}
                  </h3>
                  <span className="text-xs text-gray-600 ml-2">
                    {formatDate(edu.startDate)} – {formatDate(edu.endDate)}
                  </span>
                </div>
                <p className="text-xs text-gray-600 font-light">{edu.institution}</p>
                {edu.gpa && <p className="text-xs text-gray-500">GPA: {edu.gpa}</p>}
                {edu.description && <p className="text-xs mt-1 text-gray-700 whitespace-pre-wrap">{edu.description}</p>}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Skills */}
      {skills.isVisible && skills.items.length > 0 && (
        <div className="mb-6">
          <h2 className="text-sm font-light text-gray-900 uppercase tracking-wide mb-2 border-b border-gray-200 pb-2">
            {skills.customTitle}
          </h2>
          {skills.groupByCategory ? (
            <div className="space-y-2">
              {Object.entries(
                skills.items.reduce(
                  (acc, skill) => {
                    if (!acc[skill.category]) acc[skill.category] = [];
                    acc[skill.category].push(skill);
                    return acc;
                  },
                  {} as Record<string, typeof skills.items>
                )
              ).map(([category, categorySkills]) => (
                <div key={category}>
                  <p className="text-xs text-gray-700">
                    <span className="font-light">{category}:</span> {categorySkills.map((s) => s.name).join(', ')}
                  </p>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-xs text-gray-700">{skills.items.map((s) => s.name).join(', ')}</p>
          )}
        </div>
      )}

      {/* Projects */}
      {projects.isVisible && projects.items.length > 0 && (
        <div className="mb-6">
          <h2 className="text-sm font-light text-gray-900 uppercase tracking-wide mb-3 border-b border-gray-200 pb-2">
            {projects.customTitle}
          </h2>
          <div className="space-y-3">
            {projects.items.map((proj) => (
              <div key={proj.id}>
                <h3 className="text-xs font-light text-gray-900">{proj.name}</h3>
                {proj.technologies.length > 0 && (
                  <p className="text-xs text-gray-600 mt-0.5">{proj.technologies.join(', ')}</p>
                )}
                {proj.description && <p className="text-xs mt-1 text-gray-700 whitespace-pre-wrap">{proj.description}</p>}
                <div className="flex gap-3 mt-1 text-xs">
                  {proj.projectUrl && (
                    <a href={proj.projectUrl} className="text-gray-600 hover:text-gray-900 underline">
                      Live
                    </a>
                  )}
                  {proj.githubUrl && (
                    <a href={proj.githubUrl} className="text-gray-600 hover:text-gray-900 underline">
                      GitHub
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Certifications */}
      {certifications.isVisible && certifications.items.length > 0 && (
        <div className="mb-6">
          <h2 className="text-sm font-light text-gray-900 uppercase tracking-wide mb-3 border-b border-gray-200 pb-2">
            {certifications.customTitle}
          </h2>
          <div className="space-y-2">
            {certifications.items.map((cert) => (
              <div key={cert.id}>
                <h3 className="text-xs font-light text-gray-900">{cert.name}</h3>
                <p className="text-xs text-gray-600">{cert.organization}</p>
                {cert.credentialUrl && (
                  <a href={cert.credentialUrl} className="text-xs text-gray-600 hover:text-gray-900 underline">
                    Verify
                  </a>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Awards */}
      {awards.isVisible && awards.items.length > 0 && (
        <div className="mb-6">
          <h2 className="text-sm font-light text-gray-900 uppercase tracking-wide mb-3 border-b border-gray-200 pb-2">
            {awards.customTitle}
          </h2>
          <div className="space-y-2">
            {awards.items.map((award) => (
              <div key={award.id}>
                <h3 className="text-xs font-light text-gray-900">{award.title}</h3>
                <p className="text-xs text-gray-600">{award.organization}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
