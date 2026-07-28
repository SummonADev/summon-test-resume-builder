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
    <div className="bg-white text-slate-900 font-serif print:p-0 p-0" style={{ fontFamily: 'system-ui, -apple-system' }}>
      {/* Header */}
      <div className="border-b-2 border-blue-600 pb-4 mb-4">
        <h1 className="text-3xl font-bold">{personal.fullName}</h1>
        {personal.professionalTitle && <p className="text-lg text-blue-600 font-semibold">{personal.professionalTitle}</p>}
        <div className="flex flex-wrap gap-4 text-sm mt-2 text-slate-600">
          {personal.email && <span>{personal.email}</span>}
          {personal.phone && <span>{personal.phone}</span>}
          {personal.location && <span>{personal.location}</span>}
        </div>
        <div className="flex flex-wrap gap-4 text-sm mt-2">
          {personal.linkedin && (
            <a href={personal.linkedin} className="text-blue-600 hover:underline">
              LinkedIn
            </a>
          )}
          {personal.portfolio && (
            <a href={personal.portfolio} className="text-blue-600 hover:underline">
              Portfolio
            </a>
          )}
          {personal.github && (
            <a href={personal.github} className="text-blue-600 hover:underline">
              GitHub
            </a>
          )}
        </div>
      </div>

      {/* Summary */}
      {summary.isVisible && summary.content && (
        <div className="mb-4">
          <h2 className="text-lg font-bold text-blue-600 border-b border-slate-300 pb-1 mb-2">{summary.customTitle}</h2>
          <p className="text-sm leading-relaxed whitespace-pre-wrap">{summary.content}</p>
        </div>
      )}

      {/* Experience */}
      {experience.isVisible && experience.items.length > 0 && (
        <div className="mb-4">
          <h2 className="text-lg font-bold text-blue-600 border-b border-slate-300 pb-1 mb-2">{experience.customTitle}</h2>
          <div className="space-y-3">
            {experience.items.map((exp) => (
              <div key={exp.id}>
                <div className="flex justify-between items-baseline">
                  <h3 className="font-semibold text-slate-900">{exp.position}</h3>
                  <span className="text-xs text-slate-600">
                    {formatDate(exp.startDate)} – {exp.isCurrentPosition ? 'Present' : formatDate(exp.endDate)}
                  </span>
                </div>
                <p className="text-sm text-slate-600">{exp.company}</p>
                {exp.location && <p className="text-xs text-slate-500">{exp.location}</p>}
                {exp.responsibilities && <p className="text-sm mt-1 whitespace-pre-wrap">{exp.responsibilities}</p>}
                {exp.achievements && <p className="text-sm mt-1 whitespace-pre-wrap">{exp.achievements}</p>}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Education */}
      {education.isVisible && education.items.length > 0 && (
        <div className="mb-4">
          <h2 className="text-lg font-bold text-blue-600 border-b border-slate-300 pb-1 mb-2">{education.customTitle}</h2>
          <div className="space-y-3">
            {education.items.map((edu) => (
              <div key={edu.id}>
                <div className="flex justify-between items-baseline">
                  <h3 className="font-semibold text-slate-900">{edu.degree} in {edu.fieldOfStudy}</h3>
                  <span className="text-xs text-slate-600">
                    {formatDate(edu.startDate)} – {formatDate(edu.endDate)}
                  </span>
                </div>
                <p className="text-sm text-slate-600">{edu.institution}</p>
                {edu.gpa && <p className="text-xs text-slate-500">GPA: {edu.gpa}</p>}
                {edu.description && <p className="text-sm mt-1 whitespace-pre-wrap">{edu.description}</p>}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Skills */}
      {skills.isVisible && skills.items.length > 0 && (
        <div className="mb-4">
          <h2 className="text-lg font-bold text-blue-600 border-b border-slate-300 pb-1 mb-2">{skills.customTitle}</h2>
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
                  <h3 className="text-sm font-semibold text-slate-700">{category}:</h3>
                  <p className="text-sm text-slate-600">{categorySkills.map((s) => s.name).join(', ')}</p>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-sm text-slate-600">{skills.items.map((s) => s.name).join(', ')}</p>
          )}
        </div>
      )}

      {/* Projects */}
      {projects.isVisible && projects.items.length > 0 && (
        <div className="mb-4">
          <h2 className="text-lg font-bold text-blue-600 border-b border-slate-300 pb-1 mb-2">{projects.customTitle}</h2>
          <div className="space-y-3">
            {projects.items.map((proj) => (
              <div key={proj.id}>
                <h3 className="font-semibold text-slate-900">{proj.name}</h3>
                {proj.technologies.length > 0 && (
                  <p className="text-xs text-slate-600">Tech: {proj.technologies.join(', ')}</p>
                )}
                {proj.description && <p className="text-sm mt-1 whitespace-pre-wrap">{proj.description}</p>}
                <div className="flex gap-3 mt-1 text-xs">
                  {proj.projectUrl && (
                    <a href={proj.projectUrl} className="text-blue-600 hover:underline">
                      Live
                    </a>
                  )}
                  {proj.githubUrl && (
                    <a href={proj.githubUrl} className="text-blue-600 hover:underline">
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
        <div className="mb-4">
          <h2 className="text-lg font-bold text-blue-600 border-b border-slate-300 pb-1 mb-2">{certifications.customTitle}</h2>
          <div className="space-y-2">
            {certifications.items.map((cert) => (
              <div key={cert.id}>
                <h3 className="font-semibold text-sm text-slate-900">{cert.name}</h3>
                <p className="text-xs text-slate-600">{cert.organization}</p>
                {cert.credentialUrl && (
                  <a href={cert.credentialUrl} className="text-xs text-blue-600 hover:underline">
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
        <div className="mb-4">
          <h2 className="text-lg font-bold text-blue-600 border-b border-slate-300 pb-1 mb-2">{awards.customTitle}</h2>
          <div className="space-y-2">
            {awards.items.map((award) => (
              <div key={award.id}>
                <h3 className="font-semibold text-sm text-slate-900">{award.title}</h3>
                <p className="text-xs text-slate-600">{award.organization}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
