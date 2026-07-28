import React from 'react';
import { Resume } from '@/types/resume';

interface CreativeDesignerProps {
  resume: Resume;
}

export function CreativeDesigner({ resume }: CreativeDesignerProps) {
  const renderHTML = (html: string) => (
    <div dangerouslySetInnerHTML={{ __html: html }} />
  );

  return (
    <div className="font-lato text-black bg-white" style={{ fontSize: '11px', lineHeight: '1.7' }}>
      {/* Header */}
      <div className="mb-8 pb-8 border-b-4 border-black">
        <h1 style={{ fontSize: '40px', fontWeight: 'bold', lineHeight: 1 }} className="text-black">
          {resume.personal.fullName}
        </h1>
        {resume.personal.professionalTitle && (
          <p style={{ fontSize: '18px', fontWeight: '300', marginTop: '8px' }} className="text-black">
            {resume.personal.professionalTitle}
          </p>
        )}
        
        {/* Contact Info */}
        <div className="flex flex-wrap gap-6 mt-6 text-xs">
          {resume.personal.email && (
            <a href={`mailto:${resume.personal.email}`} className="text-black hover:underline">
              {resume.personal.email}
            </a>
          )}
          {resume.personal.phone && (
            <a href={`tel:${resume.personal.phone}`} className="text-black hover:underline">
              {resume.personal.phone}
            </a>
          )}
          {resume.personal.location && (
            <span className="text-black">{resume.personal.location}</span>
          )}
          {resume.personal.linkedin && (
            <a href={resume.personal.linkedin} target="_blank" rel="noopener noreferrer" className="text-black hover:underline">
              LinkedIn
            </a>
          )}
          {resume.personal.portfolio && (
            <a href={resume.personal.portfolio} target="_blank" rel="noopener noreferrer" className="text-black hover:underline">
              Portfolio
            </a>
          )}
          {resume.personal.github && (
            <a href={resume.personal.github} target="_blank" rel="noopener noreferrer" className="text-black hover:underline">
              GitHub
            </a>
          )}
        </div>
      </div>

      {/* Summary */}
      {resume.sections.summary?.isVisible && resume.sections.summary?.content && (
        <div className="mb-8">
          <h2 style={{ fontSize: '14px', fontWeight: 'bold', letterSpacing: '1px' }} className="text-black mb-3">
            {resume.sections.summary?.customTitle || 'PROFESSIONAL SUMMARY'}
          </h2>
          <div className="text-xs text-black leading-relaxed border-l-4 border-black pl-4">
            {renderHTML(resume.sections.summary.content)}
          </div>
        </div>
      )}

      {/* Experience */}
      {resume.sections.experience?.isVisible && resume.sections.experience?.items?.length > 0 && (
        <div className="mb-8">
          <h2 style={{ fontSize: '14px', fontWeight: 'bold', letterSpacing: '1px' }} className="text-black mb-4">
            {resume.sections.experience?.customTitle || 'EXPERIENCE'}
          </h2>
          <div className="space-y-5">
            {resume.sections.experience.items.map((exp, idx) => (
              <div key={idx} className="text-xs pl-4 border-l-2 border-black">
                <div className="flex justify-between items-baseline">
                  <p style={{ fontWeight: 'bold', fontSize: '12px' }} className="text-black">{exp.position}</p>
                  <p className="font-light text-black">{exp.startDate} – {exp.currentPosition ? 'Present' : exp.endDate}</p>
                </div>
                <p className="text-black mt-1">{exp.company} • {exp.location}</p>
                <div className="mt-2 text-black leading-relaxed">
                  {renderHTML(exp.responsibilities)}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Education */}
      {resume.sections.education?.isVisible && resume.sections.education?.items?.length > 0 && (
        <div className="mb-8">
          <h2 style={{ fontSize: '14px', fontWeight: 'bold', letterSpacing: '1px' }} className="text-black mb-4">
            {resume.sections.education?.customTitle || 'EDUCATION'}
          </h2>
          <div className="space-y-4">
            {resume.sections.education.items.map((edu, idx) => (
              <div key={idx} className="text-xs pl-4 border-l-2 border-black">
                <div className="flex justify-between items-baseline">
                  <p style={{ fontWeight: 'bold', fontSize: '12px' }} className="text-black">{edu.degree}</p>
                  <p className="font-light text-black">{edu.startDate} – {edu.endDate}</p>
                </div>
                <p className="text-black mt-1">{edu.institution}</p>
                <p className="font-light text-black">{edu.fieldOfStudy}</p>
                {edu.gpa && <p className="font-light text-black mt-1">GPA: {edu.gpa}</p>}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Skills */}
      {resume.sections.skills?.isVisible && resume.sections.skills?.items?.length > 0 && (
        <div className="mb-8">
          <h2 style={{ fontSize: '14px', fontWeight: 'bold', letterSpacing: '1px' }} className="text-black mb-3">
            {resume.sections.skills?.customTitle || 'SKILLS'}
          </h2>
          <div className="text-xs text-black flex flex-wrap gap-3">
            {resume.sections.skills.items.map((skill, idx) => (
              <span key={idx} className="border border-black px-3 py-1.5">
                {skill.name}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Projects */}
      {resume.sections.projects?.isVisible && resume.sections.projects?.items?.length > 0 && (
        <div className="mb-8">
          <h2 style={{ fontSize: '14px', fontWeight: 'bold', letterSpacing: '1px' }} className="text-black mb-4">
            {resume.sections.projects?.customTitle || 'PROJECTS'}
          </h2>
          <div className="space-y-4">
            {resume.sections.projects.items.map((project, idx) => (
              <div key={idx} className="text-xs pl-4 border-l-2 border-black">
                <div className="flex justify-between items-baseline">
                  <p style={{ fontWeight: 'bold', fontSize: '12px' }} className="text-black">{project.name}</p>
                  {project.duration && <p className="font-light text-black">{project.duration}</p>}
                </div>
                {project.technologies && <p className="font-light text-black mt-1">{project.technologies}</p>}
                <div className="mt-2 text-black leading-relaxed">
                  {renderHTML(project.description)}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Certifications */}
      {resume.sections.certifications?.isVisible && resume.sections.certifications?.items?.length > 0 && (
        <div className="mb-8">
          <h2 style={{ fontSize: '14px', fontWeight: 'bold', letterSpacing: '1px' }} className="text-black mb-3">
            {resume.sections.certifications?.customTitle || 'CERTIFICATIONS'}
          </h2>
          <div className="space-y-2">
            {resume.sections.certifications.items.map((cert, idx) => (
              <div key={idx} className="text-xs">
                <p className="font-bold text-black">{cert.name}</p>
                <p className="font-light text-black">{cert.issuer} • {cert.issueDate}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Awards */}
      {resume.sections.awards?.isVisible && resume.sections.awards?.items?.length > 0 && (
        <div className="mb-8">
          <h2 style={{ fontSize: '14px', fontWeight: 'bold', letterSpacing: '1px' }} className="text-black mb-3">
            {resume.sections.awards?.customTitle || 'AWARDS'}
          </h2>
          <div className="space-y-2">
            {resume.sections.awards.items.map((award, idx) => (
              <div key={idx} className="text-xs">
                <p className="font-bold text-black">{award.title}</p>
                <p className="font-light text-black">{award.organization} • {award.date}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
