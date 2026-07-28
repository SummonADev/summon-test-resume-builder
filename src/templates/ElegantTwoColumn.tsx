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
    <div className="bg-white text-gray-900 font-lato print:p-0 p-0 grid grid-cols-3 gap-0 min-h-screen">
      {/* Sidebar */}
      <div className="bg-gray-100 col-span-1 p-6 space-y-6">
        {/* Contact Info */}
        <div>
          <h2 className="text-xs font-light text-gray-700 uppercase tracking-widest mb-3">Contact</h2>
          <div className="space-y-1 text-xs text-gray-600">
            {personal.email && <p><a href={`mailto:${personal.email}`} className="hover:text-gray-900">{personal.email}</a></p>}
            {personal.phone && <p><a href={`tel:${personal.phone}`} className="hover:text-gray-900">{personal.phone}</a></p>}
            {personal.location && <p>{personal.location}</p>}
          </div>
        </div>

        {/* Links */}
        {(personal.linkedin || personal.portfolio || personal.github) && (
          <div>
            <h2 className="text-xs font-light text-gray-700 uppercase tracking-widest mb-3">Links</h2>
            <div className="space-y-1 text-xs">
              {personal.linkedin && (
                <p>
                  <a href={personal.linkedin} className="text-gray-600 hover:text-gray-900 underline">
                    LinkedIn
                  </a>
                </p>
              )}
              {personal.portfolio && (
                <p>
                  <a href={personal.portfolio} className="text-gray-600 hover:text-gray-900 underline">
                    Portfolio
                  </a>
                </p>
              )}
              {personal.github && (
                <p>
                  <a href={personal.github} className="text-gray-600 hover:text-gray-900 underline">
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
            <h2 className="text-xs font-light text-gray-700 uppercase tracking-widest mb-3">{skills.customTitle}</h2>
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
                  <p className="font-light text-gray-700">{category}</p>
                  <p className="text-gray-600">{categorySkills.map((s) => s.name).join(', ')}</p>
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
          <h1 className="text-3xl font-light text-gray-900">{personal.fullName}</h1>
          {personal.professionalTitle && <p className="text-sm text-gray-600 mt-1 font-light">{personal.professionalTitle}</p>}
        </div>

        {/* Summary */}
        {summary.isVisible && summary.content && (
          <div className="mb-6">
            <h2 className="text-xs font-light text-gray-900 uppercase tracking-widest border-b border-gray-200 pb-2 mb-3">
              {summary.customTitle}
            </h2>
            <p className="text-xs leading-relaxed text-gray-700 whitespace-pre-wrap">{summary.content}</p>
          </div>
        )}

        {/* Experience */}
        {experience.isVisible && experience.items.length > 0 && (
          <div className="mb-6">
            <h2 className="text-xs font-light text-gray-900 uppercase tracking-widest border-b border-gray-200 pb-2 mb-3">
              {experience.customTitle}
            </h2>
            <div className="space-y-4">
              {experience.items.map((exp) => (
                <div key={exp.id}>
                  <div className="flex justify-between items-baseline">
                    <h3 className="text-xs font-light text-gray-900">{exp.position}</h3>
                    <span className="text-xs text-gray-600">
                      {formatDate(exp.startDate)} – {exp.isCurrentPosition ? 'Present' : formatDate(exp.endDate)}
                    </span>
                  </div>
                  <p className="text-xs text-gray-600 font-light">{exp.company}</p>
                  {exp.location && <p className="text-xs text-gray-500">{exp.location}</p>}
                  {exp.responsibilities && <p className="text-xs mt-1 text-gray-700 whitespace-pre-wrap">{exp.responsibilities}</p>}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Education */}
        {education.isVisible && education.items.length > 0 && (
          <div className="mb-6">
            <h2 className="text-xs font-light text-gray-900 uppercase tracking-widest border-b border-gray-200 pb-2 mb-3">
              {education.customTitle}
            </h2>
            <div className="space-y-3">
              {education.items.map((edu) => (
                <div key={edu.id}>
                  <div className="flex justify-between items-baseline">
                    <h3 className="text-xs font-light text-gray-900">{edu.degree} in {edu.fieldOfStudy}</h3>
                    <span className="text-xs text-gray-600">
                      {formatDate(edu.startDate)} – {formatDate(edu.endDate)}
                    </span>
                  </div>
                  <p className="text-xs text-gray-600 font-light">{edu.institution}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Projects */}
        {projects.isVisible && projects.items.length > 0 && (
          <div className="mb-6">
            <h2 className="text-xs font-light text-gray-900 uppercase tracking-widest border-b border-gray-200 pb-2 mb-3">
              {projects.customTitle}
            </h2>
            <div className="space-y-3">
              {projects.items.map((proj) => (
                <div key={proj.id}>
                  <h3 className="text-xs font-light text-gray-900">{proj.name}</h3>
                  {proj.description && <p className="text-xs mt-1 text-gray-700">{proj.description}</p>}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Certifications */}
        {certifications.isVisible && certifications.items.length > 0 && (
          <div className="mb-6">
            <h2 className="text-xs font-light text-gray-900 uppercase tracking-widest border-b border-gray-200 pb-2 mb-3">
              {certifications.customTitle}
            </h2>
            <div className="space-y-2">
              {certifications.items.map((cert) => (
                <div key={cert.id}>
                  <h3 className="text-xs font-light text-gray-900">{cert.name}</h3>
                  <p className="text-xs text-gray-600">{cert.organization}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Awards */}
        {awards.isVisible && awards.items.length > 0 && (
          <div>
            <h2 className="text-xs font-light text-gray-900 uppercase tracking-widest border-b border-gray-200 pb-2 mb-3">
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
    </div>
  );
}
