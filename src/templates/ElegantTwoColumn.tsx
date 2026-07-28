import { Resume } from '@/types/resume';
import { format } from 'date-fns';

interface ElegantTwoColumnProps {
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

export default function ElegantTwoColumn({ resume }: ElegantTwoColumnProps) {
  const { personal, summary, experience, education, skills, projects, certifications, awards } = resume;

  return (
    <div className="bg-white text-slate-900 font-serif print:p-0 p-0 grid grid-cols-3 gap-0 min-h-screen">
      {/* Sidebar */}
      <div className="bg-slate-900 text-white col-span-1 p-6 space-y-6">
        {/* Contact Info */}
        <div>
          <h2 className="text-xs font-bold uppercase tracking-wide text-slate-300 mb-3">Contact</h2>
          <div className="space-y-1 text-xs">
            {personal.email && <p>{personal.email}</p>}
            {personal.phone && <p>{personal.phone}</p>}
            {personal.location && <p>{personal.location}</p>}
          </div>
        </div>

        {/* Links */}
        {(personal.linkedin || personal.portfolio || personal.github) && (
          <div>
            <h2 className="text-xs font-bold uppercase tracking-wide text-slate-300 mb-3">Links</h2>
            <div className="space-y-1 text-xs">
              {personal.linkedin && (
                <p>
                  <a href={personal.linkedin} className="text-slate-300 hover:text-white">
                    LinkedIn
                  </a>
                </p>
              )}
              {personal.portfolio && (
                <p>
                  <a href={personal.portfolio} className="text-slate-300 hover:text-white">
                    Portfolio
                  </a>
                </p>
              )}
              {personal.github && (
                <p>
                  <a href={personal.github} className="text-slate-300 hover:text-white">
                    GitHub
                  </a>
                </p>
              )}
            </div>
          </div>
        )}

        {/* Skills */}
        {skills.isVisible && skills.items.length > 0 && (
          <div>
            <h2 className="text-xs font-bold uppercase tracking-wide text-slate-300 mb-3">{skills.customTitle}</h2>
            <div className="space-y-2 text-xs">
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
                  <p className="font-semibold text-slate-200">{category}</p>
                  <p className="text-slate-400">{categorySkills.map((s) => s.name).join(', ')}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Main Content */}
      <div className="col-span-2 p-8">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-4xl font-bold text-slate-900">{personal.fullName}</h1>
          {personal.professionalTitle && <p className="text-lg text-slate-600 mt-1">{personal.professionalTitle}</p>}
        </div>

        {/* Summary */}
        {summary.isVisible && summary.content && (
          <div className="mb-6">
            <h2 className="text-sm font-bold uppercase tracking-wide text-slate-700 border-b border-slate-300 pb-2 mb-3">
              {summary.customTitle}
            </h2>
            <p className="text-sm leading-relaxed whitespace-pre-wrap">{summary.content}</p>
          </div>
        )}

        {/* Experience */}
        {experience.isVisible && experience.items.length > 0 && (
          <div className="mb-6">
            <h2 className="text-sm font-bold uppercase tracking-wide text-slate-700 border-b border-slate-300 pb-2 mb-3">
              {experience.customTitle}
            </h2>
            <div className="space-y-4">
              {experience.items.map((exp) => (
                <div key={exp.id}>
                  <div className="flex justify-between items-baseline">
                    <h3 className="font-semibold text-slate-900">{exp.position}</h3>
                    <span className="text-xs text-slate-600">
                      {formatDate(exp.startDate)} – {exp.isCurrentPosition ? 'Present' : formatDate(exp.endDate)}
                    </span>
                  </div>
                  <p className="text-sm text-slate-700">{exp.company}</p>
                  {exp.location && <p className="text-xs text-slate-600">{exp.location}</p>}
                  {exp.responsibilities && <p className="text-sm mt-1 whitespace-pre-wrap">{exp.responsibilities}</p>}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Education */}
        {education.isVisible && education.items.length > 0 && (
          <div className="mb-6">
            <h2 className="text-sm font-bold uppercase tracking-wide text-slate-700 border-b border-slate-300 pb-2 mb-3">
              {education.customTitle}
            </h2>
            <div className="space-y-3">
              {education.items.map((edu) => (
                <div key={edu.id}>
                  <div className="flex justify-between items-baseline">
                    <h3 className="font-semibold text-slate-900">{edu.degree} in {edu.fieldOfStudy}</h3>
                    <span className="text-xs text-slate-600">
                      {formatDate(edu.startDate)} – {formatDate(edu.endDate)}
                    </span>
                  </div>
                  <p className="text-sm text-slate-700">{edu.institution}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Projects */}
        {projects.isVisible && projects.items.length > 0 && (
          <div className="mb-6">
            <h2 className="text-sm font-bold uppercase tracking-wide text-slate-700 border-b border-slate-300 pb-2 mb-3">
              {projects.customTitle}
            </h2>
            <div className="space-y-3">
              {projects.items.map((proj) => (
                <div key={proj.id}>
                  <h3 className="font-semibold text-slate-900">{proj.name}</h3>
                  {proj.description && <p className="text-sm mt-1">{proj.description}</p>}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Certifications */}
        {certifications.isVisible && certifications.items.length > 0 && (
          <div className="mb-6">
            <h2 className="text-sm font-bold uppercase tracking-wide text-slate-700 border-b border-slate-300 pb-2 mb-3">
              {certifications.customTitle}
            </h2>
            <div className="space-y-2">
              {certifications.items.map((cert) => (
                <div key={cert.id}>
                  <h3 className="font-semibold text-sm text-slate-900">{cert.name}</h3>
                  <p className="text-xs text-slate-700">{cert.organization}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Awards */}
        {awards.isVisible && awards.items.length > 0 && (
          <div>
            <h2 className="text-sm font-bold uppercase tracking-wide text-slate-700 border-b border-slate-300 pb-2 mb-3">
              {awards.customTitle}
            </h2>
            <div className="space-y-2">
              {awards.items.map((award) => (
                <div key={award.id}>
                  <h3 className="font-semibold text-sm text-slate-900">{award.title}</h3>
                  <p className="text-xs text-slate-700">{award.organization}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
