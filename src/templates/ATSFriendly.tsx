import { Resume } from '@/types/resume';

interface ATSFriendlyProps {
  resume: Resume;
}

export default function ATSFriendly({ resume }: ATSFriendlyProps) {
  const { personal, summary, experience, education, skills, projects, certifications, awards } = resume;

  return (
    <div className="bg-white text-slate-900 font-sans print:p-0 p-0" style={{ fontFamily: 'Arial, sans-serif' }}>
      {/* Header */}
      <div className="pb-2 mb-2 border-b border-slate-300">
        <h1 className="text-2xl font-bold">{personal.fullName}</h1>
        {personal.professionalTitle && <p className="text-base mt-1">{personal.professionalTitle}</p>}
      </div>

      {/* Contact Info - Plain text, ATS-friendly */}
      <div className="mb-4 text-sm">
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
          <h2 className="text-lg font-bold">{summary.customTitle}</h2>
          <p className="text-sm whitespace-pre-wrap">{summary.content}</p>
        </div>
      )}

      {/* Experience */}
      {experience.isVisible && experience.items.length > 0 && (
        <div className="mb-4">
          <h2 className="text-lg font-bold">{experience.customTitle}</h2>
          {experience.items.map((exp) => (
            <div key={exp.id} className="mb-2">
              <p className="font-bold text-sm">{exp.position}</p>
              <p className="text-sm">{exp.company}</p>
              {exp.location && <p className="text-sm">{exp.location}</p>}
              <p className="text-xs">
                {exp.startDate} to {exp.isCurrentPosition ? 'Present' : exp.endDate}
              </p>
              {exp.responsibilities && <p className="text-sm whitespace-pre-wrap">{exp.responsibilities}</p>}
              {exp.achievements && <p className="text-sm whitespace-pre-wrap">{exp.achievements}</p>}
            </div>
          ))}
        </div>
      )}

      {/* Education */}
      {education.isVisible && education.items.length > 0 && (
        <div className="mb-4">
          <h2 className="text-lg font-bold">{education.customTitle}</h2>
          {education.items.map((edu) => (
            <div key={edu.id} className="mb-2">
              <p className="font-bold text-sm">{edu.degree} in {edu.fieldOfStudy}</p>
              <p className="text-sm">{edu.institution}</p>
              {edu.gpa && <p className="text-xs">GPA: {edu.gpa}</p>}
              <p className="text-xs">
                {edu.startDate} to {edu.endDate}
              </p>
            </div>
          ))}
        </div>
      )}

      {/* Skills */}
      {skills.isVisible && skills.items.length > 0 && (
        <div className="mb-4">
          <h2 className="text-lg font-bold">{skills.customTitle}</h2>
          <p className="text-sm">{skills.items.map((s) => s.name).join(', ')}</p>
        </div>
      )}

      {/* Projects */}
      {projects.isVisible && projects.items.length > 0 && (
        <div className="mb-4">
          <h2 className="text-lg font-bold">{projects.customTitle}</h2>
          {projects.items.map((proj) => (
            <div key={proj.id} className="mb-2">
              <p className="font-bold text-sm">{proj.name}</p>
              {proj.technologies.length > 0 && <p className="text-sm">Technologies: {proj.technologies.join(', ')}</p>}
              {proj.description && <p className="text-sm">{proj.description}</p>}
            </div>
          ))}
        </div>
      )}

      {/* Certifications */}
      {certifications.isVisible && certifications.items.length > 0 && (
        <div className="mb-4">
          <h2 className="text-lg font-bold">{certifications.customTitle}</h2>
          {certifications.items.map((cert) => (
            <div key={cert.id} className="mb-2">
              <p className="font-bold text-sm">{cert.name}</p>
              <p className="text-sm">{cert.organization}</p>
              {cert.issueDate && <p className="text-xs">Issued: {cert.issueDate}</p>}
            </div>
          ))}
        </div>
      )}

      {/* Awards */}
      {awards.isVisible && awards.items.length > 0 && (
        <div className="mb-4">
          <h2 className="text-lg font-bold">{awards.customTitle}</h2>
          {awards.items.map((award) => (
            <div key={award.id} className="mb-2">
              <p className="font-bold text-sm">{award.title}</p>
              <p className="text-sm">{award.organization}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
