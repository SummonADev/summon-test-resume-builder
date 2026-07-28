import React from 'react';
import { Resume } from '@/types/resume';

interface ATSFriendlyProps {
  resume: Resume;
}

export function ATSFriendly({ resume }: ATSFriendlyProps) {
  const renderHTML = (html: string) => (
    <div dangerouslySetInnerHTML={{ __html: html }} />
  );

  return (
    <div className="font-lato text-black bg-white" style={{ fontSize: '12px', lineHeight: '1.5' }}>
      {/* Header */}
      <div className="mb-4">
        <p style={{ fontSize: '16px', fontWeight: 'bold' }}>{resume.personal.fullName}</p>
        {resume.personal.professionalTitle && (
          <p>{resume.personal.professionalTitle}</p>
        )}
        
        {/* Contact Info */}
        <div className="mt-2">
          {resume.personal.email && <p>{resume.personal.email}</p>}
          {resume.personal.phone && <p>{resume.personal.phone}</p>}
          {resume.personal.location && <p>{resume.personal.location}</p>}
        </div>
      </div>

      {/* Summary */}
      {resume.sections.summary?.isVisible && resume.sections.summary?.content && (
        <div className="mb-4">
          <p style={{ fontWeight: 'bold' }}>
            {resume.sections.summary?.customTitle || 'PROFESSIONAL SUMMARY'}
          </p>
          <div className="text-black leading-relaxed mt-1">
            {renderHTML(resume.sections.summary.content)}
          </div>
        </div>
      )}

      {/* Experience */}
      {resume.sections.experience?.isVisible && resume.sections.experience?.items?.length > 0 && (
        <div className="mb-4">
          <p style={{ fontWeight: 'bold' }}>
            {resume.sections.experience?.customTitle || 'EXPERIENCE'}
          </p>
          <div className="mt-1">
            {resume.sections.experience.items.map((exp, idx) => (
              <div key={idx} className="mb-2">
                <p style={{ fontWeight: 'bold' }}>{exp.position} at {exp.company}</p>
                <p>{exp.location} | {exp.startDate} to {exp.currentPosition ? 'Present' : exp.endDate}</p>
                <div className="mt-1 text-black">
                  {renderHTML(exp.responsibilities)}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Education */}
      {resume.sections.education?.isVisible && resume.sections.education?.items?.length > 0 && (
        <div className="mb-4">
          <p style={{ fontWeight: 'bold' }}>
            {resume.sections.education?.customTitle || 'EDUCATION'}
          </p>
          <div className="mt-1">
            {resume.sections.education.items.map((edu, idx) => (
              <div key={idx} className="mb-1">
                <p style={{ fontWeight: 'bold' }}>{edu.degree}</p>
                <p>{edu.institution} - {edu.fieldOfStudy}</p>
                <p>{edu.startDate} to {edu.endDate}</p>
                {edu.gpa && <p>GPA: {edu.gpa}</p>}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Skills */}
      {resume.sections.skills?.isVisible && resume.sections.skills?.items?.length > 0 && (
        <div className="mb-4">
          <p style={{ fontWeight: 'bold' }}>
            {resume.sections.skills?.customTitle || 'SKILLS'}
          </p>
          <p className="mt-1">
            {resume.sections.skills.items.map(skill => skill.name).join(', ')}
          </p>
        </div>
      )}

      {/* Projects */}
      {resume.sections.projects?.isVisible && resume.sections.projects?.items?.length > 0 && (
        <div className="mb-4">
          <p style={{ fontWeight: 'bold' }}>
            {resume.sections.projects?.customTitle || 'PROJECTS'}
          </p>
          <div className="mt-1">
            {resume.sections.projects.items.map((project, idx) => (
              <div key={idx} className="mb-2">
                <p style={{ fontWeight: 'bold' }}>{project.name}</p>
                {project.technologies && <p>Technologies: {project.technologies}</p>}
                <div className="text-black">
                  {renderHTML(project.description)}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Certifications */}
      {resume.sections.certifications?.isVisible && resume.sections.certifications?.items?.length > 0 && (
        <div className="mb-4">
          <p style={{ fontWeight: 'bold' }}>
            {resume.sections.certifications?.customTitle || 'CERTIFICATIONS'}
          </p>
          <div className="mt-1">
            {resume.sections.certifications.items.map((cert, idx) => (
              <p key={idx} className="mb-1">
                {cert.name} - {cert.issuer} ({cert.issueDate})
              </p>
            ))}
          </div>
        </div>
      )}

      {/* Awards */}
      {resume.sections.awards?.isVisible && resume.sections.awards?.items?.length > 0 && (
        <div className="mb-4">
          <p style={{ fontWeight: 'bold' }}>
            {resume.sections.awards?.customTitle || 'AWARDS'}
          </p>
          <div className="mt-1">
            {resume.sections.awards.items.map((award, idx) => (
              <p key={idx} className="mb-1">
                {award.title} - {award.organization} ({award.date})
              </p>
            ))}
          </div>
        </div>
      )}

      {/* Custom Sections */}
      {resume.customSections?.map((section, sectionIdx) => (
        section.isVisible && (
          <div key={sectionIdx} className="mb-4">
            <p style={{ fontWeight: 'bold' }}>{section.title.toUpperCase()}</p>
            <div className="mt-1">
              {section.items?.map((item, itemIdx) => (
                <div key={itemIdx} className="text-black">
                  {renderHTML(item.content)}
                </div>
              ))}
            </div>
          </div>
        )
      ))}
    </div>
  );
}
