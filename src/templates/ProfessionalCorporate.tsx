import { Resume } from '@/types/resume';
import { format } from 'date-fns';

interface ProfessionalCorporateProps {
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

export default function ProfessionalCorporate({ resume }: ProfessionalCorporateProps) {
  const { personal, summary, experience, education, skills, projects, certifications, awards } = resume;

  return (
    <div className="bg-white text-slate-900 font-serif print:p-0 p-0" style={{ fontFamily: 'Georgia, serif' }}>
      {/* Header */}
      <div className="bg-slate-800 text-white px-6 py-5 mb-6">
        <h1 className="text-4xl font-bold">{personal.fullName}</h1>
        {personal.professionalTitle && <p className="text-lg mt-1 text-slate-200">{personal.professionalTitle}</p>}
      </div>

      <div className="px-6">
        {/* Contact Info */}
        <div className="flex flex-wrap gap-4 text-sm mb-6 text-slate-700">
          {personal.email && <span>{personal.email}</span>}
          {personal.phone && <span>•</span>}
          {personal.phone && <span>{personal.phone}</span>}
          {personal.location && <span>•</span>}
          {personal.location && <span>{personal.location}</span>}
        </div>

        {/* Links */}
        {(personal.linkedin || personal.portfolio || personal.github) && (
          <div className="flex flex-wrap gap-4 text-sm mb-6">
            {personal.linkedin && (
              <a href={personal.linkedin} className="text-slate-600 hover:text-slate-900">
                LinkedIn
              </a>
            )}
            {personal.portfolio && (
              <a href={personal.portfolio} className="text-slate-600 hover:text-slate-900">
                Portfolio
              </a>
            )}
            {personal.github && (
              <a href={personal.github} className="text-slate-600 hover:text-slate-900">
                GitHub
              </a>
            )}
          </div>
        )}

        {/* Summary */}
        {summary.isVisible && summary.content && (
          <div className="mb-6">
            <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wide border-b-2 border-slate-800 pb-2 mb-3">
              {summary.customTitle}
            </h2>
            <p className="text-sm leading-relaxed whitespace-pre-wrap">{summary.content}</p>
          </div>
        )}

        {/* Experience */}
        {experience.isVisible && experience.items.length > 0 && (
          <div className="mb-6">
            <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wide border-b-2 border-slate-800 pb-2 mb-3">
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
                  <p className="text-sm text-slate-700 font-medium">{exp.company}</p>
                  {exp.location && <p className="text-xs text-slate-600">{exp.location}</p>}
                  {exp.responsibilities && <p className="text-sm mt-1 whitespace-pre-wrap">{exp.responsibilities}</p>}
                  {exp.achievements && <p className="text-sm mt-1 whitespace-pre-wrap">{exp.achievements}</p>}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Education */}
        {education.isVisible && education.items.length > 0 && (
          <div className="mb-6">
            <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wide border-b-2 border-slate-800 pb-2 mb-3">
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

        {/* Skills */}
        {skills.isVisible && skills.items.length > 0 && (
          <div className="mb-6">
            <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wide border-b-2 border-slate-800 pb-2 mb-3">
              {skills.customTitle}
            </h2>
            <p className="text-sm text-slate-700">{skills.items.map((s) => s.name).join(', ')}</p>
          </div>
        )}

        {/* Projects */}
        {projects.isVisible && projects.items.length > 0 && (
          <div className="mb-6">
            <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wide border-b-2 border-slate-800 pb-2 mb-3">
              {projects.customTitle}
            </h2>
            <div className="space-y-3">
              {projects.items.map((proj) => (
                <div key={proj.id}>
                  <h3 className="font-semibold text-slate-900">{proj.name}</h3>
                  {proj.description && <p className="text-sm mt-1 whitespace-pre-wrap">{proj.description}</p>}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Certifications */}
        {certifications.isVisible && certifications.items.length > 0 && (
          <div className="mb-6">
            <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wide border-b-2 border-slate-800 pb-2 mb-3">
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
          <div className="mb-6">
            <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wide border-b-2 border-slate-800 pb-2 mb-3">
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
