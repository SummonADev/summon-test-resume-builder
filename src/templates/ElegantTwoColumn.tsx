import React from 'react';
import { Resume } from '@/types/resume';

interface ElegantTwoColumnProps {
  resume: Resume;
}

export function ElegantTwoColumn({ resume }: ElegantTwoColumnProps) {
  const renderHTML = (html: string) => (
    <div dangerouslySetInnerHTML={{ __html: html }} />
  );

  return (
    <div className="font-lato text-black bg-white" style={{ fontSize: '11px', lineHeight: '1.6', display: 'flex', minHeight: '100vh' }}>
      {/* Left Sidebar */}
      <div style={{ width: '35%', backgroundColor: '#f5f5f5', borderRight: '2px solid black', padding: '32px 24px' }}>
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-black">{resume.personal.fullName}</h1>
          {resume.personal.professionalTitle && (
            <p className="text-sm font-light text-black mt-2">{resume.personal.professionalTitle}</p>
          )}
        </div>

        {/* Contact */}
        <div className="mb-8 pb-6 border-b-2 border-black">
          <h3 className="text-xs font-bold text-black mb-3">CONTACT</h3>
          <div className="space-y-2 text-xs text-black">
            {resume.personal.email && (
              <a href={`mailto:${resume.personal.email}`} className="block hover:underline">
                {resume.personal.email}
              </a>
            )}
            {resume.personal.phone && (
              <a href={`tel:${resume.personal.phone}`} className="block hover:underline">
                {resume.personal.phone}
              </a>
            )}
            {resume.personal.location && <p>{resume.personal.location}</p>}
            {resume.personal.linkedin && (
              <a href={resume.personal.linkedin} target="_blank" rel="noopener noreferrer" className="block hover:underline">
                LinkedIn
              </a>
            )}
            {resume.personal.github && (
              <a href={resume.personal.github} target="_blank" rel="noopener noreferrer" className="block hover:underline">
                GitHub
              </a>
            )}
          </div>
        </div>

        {/* Skills */}
        {resume.sections.skills?.isVisible && resume.sections.skills?.items?.length > 0 && (
          <div className="mb-8">
            <h3 className="text-xs font-bold text-black mb-3">
              {resume.sections.skills?.customTitle || 'SKILLS'}
            </h3>
            <div className="space-y-2 text-xs text-black">
              {resume.sections.skills.items.map((skill, idx) => (
                <div key={idx} className="flex items-center">
                  <span className="mr-2">•</span>
                  <span>{skill.name}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Certifications */}
        {resume.sections.certifications?.isVisible && resume.sections.certifications?.items?.length > 0 && (
          <div className="mb-8">
            <h3 className="text-xs font-bold text-black mb-3">
              {resume.sections.certifications?.customTitle || 'CERTIFICATIONS'}
            </h3>
            <div className="space-y-2 text-xs text-black">
              {resume.sections.certifications.items.map((cert, idx) => (
                <div key={idx}>
                  <p className="font-bold">{cert.name}</p>
                  <p className="font-light">{cert.issuer} • {cert.issueDate}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Right Content */}
      <div style={{ width: '65%', padding: '32px 32px' }}>
        {/* Summary */}
        {resume.sections.summary?.isVisible && resume.sections.summary?.content && (
          <div className="mb-8 pb-6 border-b-2 border-black">
            <h2 className="text-sm font-bold text-black mb-3">
              {resume.sections.summary?.customTitle || 'PROFESSIONAL SUMMARY'}
            </h2>
            <div className="text-xs text-black leading-relaxed">
              {renderHTML(resume.sections.summary.content)}
            </div>
          </div>
        )}

        {/* Experience */}
        {resume.sections.experience?.isVisible && resume.sections.experience?.items?.length > 0 && (
          <div className="mb-8 pb-6 border-b-2 border-black">
            <h2 className="text-sm font-bold text-black mb-3">
              {resume.sections.experience?.customTitle || 'EXPERIENCE'}
            </h2>
            <div className="space-y-4">
              {resume.sections.experience.items.map((exp, idx) => (
                <div key={idx} className="text-xs">
                  <div className="flex justify-between items-baseline">
                    <p className="font-bold text-black">{exp.position}</p>
                    <p className="font-light text-black">{exp.startDate} – {exp.currentPosition ? 'Present' : exp.endDate}</p>
                  </div>
                  <p className="text-black">{exp.company} • {exp.location}</p>
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
          <div className="mb-8 pb-6 border-b-2 border-black">
            <h2 className="text-sm font-bold text-black mb-3">
              {resume.sections.education?.customTitle || 'EDUCATION'}
            </h2>
            <div className="space-y-3">
              {resume.sections.education.items.map((edu, idx) => (
                <div key={idx} className="text-xs">
                  <div className="flex justify-between items-baseline">
                    <p className="font-bold text-black">{edu.degree}</p>
                    <p className="font-light text-black">{edu.startDate} – {edu.endDate}</p>
                  </div>
                  <p className="text-black">{edu.institution}</p>
                  <p className="font-light text-black">{edu.fieldOfStudy}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Projects */}
        {resume.sections.projects?.isVisible && resume.sections.projects?.items?.length > 0 && (
          <div className="mb-8">
            <h2 className="text-sm font-bold text-black mb-3">
              {resume.sections.projects?.customTitle || 'PROJECTS'}
            </h2>
            <div className="space-y-3">
              {resume.sections.projects.items.map((project, idx) => (
                <div key={idx} className="text-xs">
                  <p className="font-bold text-black">{project.name}</p>
                  {project.technologies && <p className="text-black">{project.technologies}</p>}
                  <div className="mt-1 text-black leading-relaxed">
                    {renderHTML(project.description)}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Awards */}
        {resume.sections.awards?.isVisible && resume.sections.awards?.items?.length > 0 && (
          <div className="mb-8">
            <h2 className="text-sm font-bold text-black mb-3">
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
    </div>
  );
}
