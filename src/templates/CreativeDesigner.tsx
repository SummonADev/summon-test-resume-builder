import { Resume } from '@/types/resume';
import { format } from 'date-fns';

interface CreativeDesignerProps {
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

export default function CreativeDesigner({ resume }: CreativeDesignerProps) {
  const { personal, summary, experience, education, skills, projects, certifications, awards } = resume;

  return (
    <div className="bg-gradient-to-br from-slate-900 to-slate-800 text-white font-sans print:p-0 p-0">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 px-8 py-12 mb-8">
        <h1 className="text-5xl font-bold mb-2">{personal.fullName}</h1>
        {personal.professionalTitle && <p className="text-2xl text-blue-100">{personal.professionalTitle}</p>}
        <div className="flex flex-wrap gap-6 mt-4 text-sm text-blue-100">
          {personal.email && <span>{personal.email}</span>}
          {personal.phone && <span>{personal.phone}</span>}
          {personal.location && <span>{personal.location}</span>}
        </div>
      </div>

      <div className="px-8 pb-8">
        {/* Summary */}
        {summary.isVisible && summary.content && (
          <div className="mb-8 bg-slate-700 rounded-lg p-6">
            <h2 className="text-2xl font-bold text-blue-300 mb-3">{summary.customTitle}</h2>
            <p className="text-slate-100 leading-relaxed whitespace-pre-wrap">{summary.content}</p>
          </div>
        )}

        {/* Experience */}
        {experience.isVisible && experience.items.length > 0 && (
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-blue-300 border-b-2 border-purple-500 pb-3 mb-4">
              {experience.customTitle}
            </h2>
            <div className="space-y-4">
              {experience.items.map((exp, idx) => (
                <div key={exp.id} className={`pl-4 border-l-2 ${idx % 2 === 0 ? 'border-blue-500' : 'border-purple-500'}`}>
                  <div className="flex justify-between items-baseline">
                    <h3 className="text-xl font-bold text-white">{exp.position}</h3>
                    <span className="text-xs text-slate-300">
                      {formatDate(exp.startDate)} – {exp.isCurrentPosition ? 'Present' : formatDate(exp.endDate)}
                    </span>
                  </div>
                  <p className="text-lg text-blue-300 font-semibold">{exp.company}</p>
                  {exp.location && <p className="text-sm text-slate-300">{exp.location}</p>}
                  {exp.responsibilities && <p className="text-sm mt-2 text-slate-200 whitespace-pre-wrap">{exp.responsibilities}</p>}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Education */}
        {education.isVisible && education.items.length > 0 && (
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-blue-300 border-b-2 border-purple-500 pb-3 mb-4">
              {education.customTitle}
            </h2>
            <div className="space-y-3">
              {education.items.map((edu) => (
                <div key={edu.id} className="pl-4 border-l-2 border-purple-500">
                  <h3 className="text-lg font-bold text-white">
                    {edu.degree} in {edu.fieldOfStudy}
                  </h3>
                  <p className="text-blue-300">{edu.institution}</p>
                  <p className="text-xs text-slate-300">
                    {formatDate(edu.startDate)} – {formatDate(edu.endDate)}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Skills */}
        {skills.isVisible && skills.items.length > 0 && (
          <div className="mb-8 bg-slate-700 rounded-lg p-6">
            <h2 className="text-2xl font-bold text-blue-300 mb-4">{skills.customTitle}</h2>
            <div className="flex flex-wrap gap-2">
              {skills.items.map((skill) => (
                <span key={skill.id} className="px-3 py-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full text-sm font-semibold">
                  {skill.name}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Projects */}
        {projects.isVisible && projects.items.length > 0 && (
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-blue-300 border-b-2 border-purple-500 pb-3 mb-4">
              {projects.customTitle}
            </h2>
            <div className="grid grid-cols-1 gap-4">
              {projects.items.map((proj) => (
                <div key={proj.id} className="bg-slate-700 rounded-lg p-4 border-l-4 border-blue-500">
                  <h3 className="text-lg font-bold text-white">{proj.name}</h3>
                  {proj.technologies.length > 0 && (
                    <p className="text-xs text-slate-300 mt-1">{proj.technologies.join(' • ')}</p>
                  )}
                  {proj.description && <p className="text-sm text-slate-200 mt-2">{proj.description}</p>}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Certifications & Awards */}
        <div className="grid grid-cols-2 gap-6">
          {certifications.isVisible && certifications.items.length > 0 && (
            <div>
              <h2 className="text-xl font-bold text-blue-300 border-b-2 border-purple-500 pb-2 mb-3">
                {certifications.customTitle}
              </h2>
              <div className="space-y-2">
                {certifications.items.map((cert) => (
                  <div key={cert.id}>
                    <p className="font-semibold text-white">{cert.name}</p>
                    <p className="text-xs text-slate-300">{cert.organization}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {awards.isVisible && awards.items.length > 0 && (
            <div>
              <h2 className="text-xl font-bold text-blue-300 border-b-2 border-purple-500 pb-2 mb-3">
                {awards.customTitle}
              </h2>
              <div className="space-y-2">
                {awards.items.map((award) => (
                  <div key={award.id}>
                    <p className="font-semibold text-white">{award.title}</p>
                    <p className="text-xs text-slate-300">{award.organization}</p>
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
