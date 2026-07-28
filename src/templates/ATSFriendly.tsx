import { Resume } from '@/types/resume';

interface ATSFriendlyProps {
  resume: Resume;
}

export default function ATSFriendly({ resume }: ATSFriendlyProps) {
  const { personal, summary, experience, education, skills, projects, certifications, awards } = resume;

  return (
    <div className="bg-white text-gray-900 font-lato print:p-0 p-0" style={{ fontFamily: 'Lato, Arial, sans-serif' }}>
      {/* Header */}
      <div className="pb-3 mb-3 border-b border-gray-300">
        <h1 className="text-2xl font-light text-gray-900">{personal.fullName}</h1>
        {personal.professionalTitle && <p className="text-xs mt-1 text-gray-600">{personal.professionalTitle}</p>}
      </div>

      {/* Contact Info - Plain text, ATS-friendly */}
      <div className="mb-4 text-xs space-y-0.5">
        {personal.email && <p>{personal.email}</p>}
        {personal.phone && <p>{personal.phone}</p>}
        {personal.location && <p>{personal.location}</p>}
        {personal.linkedin && <p>{personal.linkedin}</p>}
        {personal.portfolio && <p>{personal.portfolio}</p>}
        {personal.github && <p>{personal.github}</p>}
      </div>

      {/* Summary */}
      {summary.isVisible && summary.content && (
        <div className="mb-4">
          <h2 className="text-sm font-light text-gray-900 uppercase tracking-wide mb-1">{summary.customTitle}</h2>
          <p className="text-xs leading-relaxed whitespace-pre-wrap text-gray-700">{summary.content}</p>
        </div>
      )}

      {/* Experience */}
      {experience.isVisible && experience.items.length > 0 && (
        <div className="mb-4">
          <h2 className="text-sm font-light text-gray-900 uppercase tracking-wide mb-2">{experience.customTitle}</h2>
          {experience.items.map((exp) => (
            <div key={exp.id} className="mb-2">
              <p className="text-xs font-light text-gray-900">{exp.position}</p>
              <p className="text-xs text-gray-600">{exp.company}</p>
              {exp.location && <p className="text-xs text-gray-600">{exp.location}</p>}
              <p className="text-xs text-gray-500">
                {exp.startDate} to {exp.isCurrentPosition ? 'Present' : exp.endDate}
              </p>
              {exp.responsibilities && <p className="text-xs mt-1 text-gray-700 whitespace-pre-wrap">{exp.responsibilities}</p>}
              {exp.achievements && <p className="text-xs mt-1 text-gray-700 whitespace-pre-wrap">{exp.achievements}</p>}
            </div>
          ))}
        </div>
      )}

      {/* Education */}
      {education.isVisible && education.items.length > 0 && (
        <div className="mb-4">
          <h2 className="text-sm font-light text-gray-900 uppercase tracking-wide mb-2">{education.customTitle}</h2>
          {education.items.map((edu) => (
            <div key={edu.id} className="mb-2">
              <p className="text-xs font-light text-gray-900">{edu.degree} in {edu.fieldOfStudy}</p>
              <p className="text-xs text-gray-600">{edu.institution}</p>
              {edu.gpa && <p className="text-xs text-gray-600">GPA: {edu.gpa}</p>}
              <p className="text-xs text-gray-500">
                {edu.startDate} to {edu.endDate}
              </p>
            </div>
          ))}
        </div>
      )}

      {/* Skills */}
      {skills.isVisible && skills.items.length > 0 && (
        <div className="mb-4">
          <h2 className="text-sm font-light text-gray-900 uppercase tracking-wide mb-1">{skills.customTitle}</h2>
          <p className="text-xs text-gray-700">{skills.items.map((s) => s.name).join(', ')}</p>
        </div>
      )}

      {/* Projects */}
      {projects.isVisible && projects.items.length > 0 && (
        <div className="mb-4">
          <h2 className="text-sm font-light text-gray-900 uppercase tracking-wide mb-2">{projects.customTitle}</h2>
          {projects.items.map((proj) => (
            <div key={proj.id} className="mb-2">
              <p className="text-xs font-light text-gray-900">{proj.name}</p>
              {proj.technologies.length > 0 && <p className="text-xs text-gray-600">{proj.technologies.join(', ')}</p>}
              {proj.description && <p className="text-xs mt-0.5 text-gray-700">{proj.description}</p>}
            </div>
          ))}
        </div>
      )}

      {/* Certifications */}
      {certifications.isVisible && certifications.items.length > 0 && (
        <div className="mb-4">
          <h2 className="text-sm font-light text-gray-900 uppercase tracking-wide mb-2">{certifications.customTitle}</h2>
          {certifications.items.map((cert) => (
            <div key={cert.id} className="mb-2">
              <p className="text-xs font-light text-gray-900">{cert.name}</p>
              <p className="text-xs text-gray-600">{cert.organization}</p>
              {cert.issueDate && <p className="text-xs text-gray-600">Issued: {cert.issueDate}</p>}
            </div>
          ))}
        </div>
      )}

      {/* Awards */}
      {awards.isVisible && awards.items.length > 0 && (
        <div className="mb-4">
          <h2 className="text-sm font-light text-gray-900 uppercase tracking-wide mb-2">{awards.customTitle}</h2>
          {awards.items.map((award) => (
            <div key={award.id} className="mb-2">
              <p className="text-xs font-light text-gray-900">{award.title}</p>
              <p className="text-xs text-gray-600">{award.organization}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
