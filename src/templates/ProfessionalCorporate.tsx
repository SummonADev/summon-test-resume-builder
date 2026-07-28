import React from 'react';
import { Resume } from '@/types/resume';

interface ProfessionalCorporateProps {
  resume: Resume;
}

export function ProfessionalCorporate({ resume }: ProfessionalCorporateProps) {
  const renderHTML = (html: string) => (
    <div dangerouslySetInnerHTML={{ __html: html }} />
  );

  return (
    <div className="font-lato text-black bg-white" style={{ fontSize: '11px', lineHeight: '1.6' }}>
      {/* Header with black background */}
      <div className="bg-black text-white px-8 py-6 mb-6">
        <h1 className="text-4xl font-bold">{resume.personal.fullName}</h1>
        {resume.personal.professionalTitle && (
          <p className="text-lg font-light mt-2">{resume.personal.professionalTitle}</p>
        )}
        
        {/* Contact Info */}
        <div className="flex flex-wrap gap-6 mt-4 text-xs">
          {resume.personal.email && (
            <a href={`mailto:${resume.personal.email}`} className="text-white hover:underline">
              {resume.personal.email}
            </a>
          )}
          {resume.personal.phone && (
            <a href={`tel:${resume.personal.phone}`} className="text-white hover:underline">
              {resume.personal.phone}
            </a>
          )}
          {resume.personal.location && (
            <span className="text-white">{resume.personal.location}</span>
          )}
        </div>
      </div>

      <div className="px-8">
        {/* Summary */}
        {resume.sections.summary?.isVisible && resume.sections.summary?.content && (
          <div className="mb-6">
            <h2 className="text-sm font-bold text-black border-b-2 border-black pb-2 mb-3">
              {resume.sections.summary?.customTitle || 'PROFESSIONAL SUMMARY'}
            </h2>
            <div className="text-xs text-black leading-relaxed">
              {renderHTML(resume.sections.summary.content)}
            </div>
          </div>
        )}

        {/* Experience */}
        {resume.sections.experience?.isVisible && resume.sections.experience?.items?.length > 0 && (
          <div className="mb-6">
            <h2 className="text-sm font-bold text-black border-b-2 border-black pb-2 mb-3">
              {resume.sections.experience?.customTitle || 'EXPERIENCE'}
            </h2>
            <div className="space-y-4">
              {resume.sections.experience.items.map((exp, idx) => (
                <div key={idx} className="text-xs">
                  <div className="flex justify-between items-baseline">
                    <p className="font-bold text-black">{exp.position}</p>
                    <p className="font-light text-black">{exp.startDate} – {exp.currentPosition ? 'Present' : exp.endDate}</p>
                  </div>
                  <p className="text-black">{exp.company} | {exp.location}</p>
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
          <div className="mb-6">
            <h2 className="text-sm font-bold text-black border-b-2 border-black pb-2 mb-3">
              {resume.sections.education?.customTitle || 'EDUCATION'}
            </h2>
            <div className="space-y-3">
              {resume.sections.education.items.map((edu, idx) => (
                <div key={idx} className="text-xs">
                  <div className="flex justify-between items-baseline">
                    <p className="font-bold text-black">{edu.degree}</p>
                    <p className="font-light text-black">{edu.startDate} – {edu.endDate}</p>
                  </div>
                  <p className="text-black">{edu.institution} • {edu.fieldOfStudy}</p>
                  {edu.gpa && <p className="font-light text-black">GPA: {edu.gpa}</p>}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Skills */}
        {resume.sections.skills?.isVisible && resume.sections.skills?.items?.length > 0 && (
          <div className="mb-6">
            <h2 className="text-sm font-bold text-black border-b-2 border-black pb-2 mb-3">
              {resume.sections.skills?.customTitle || 'SKILLS'}
            </h2>
            <div className="text-xs text-black">
              <div className="grid grid-cols-2 gap-3">
                {resume.sections.skills.items.map((skill, idx) => (
                  <span key={idx} className="flex items-center">• {skill.name}</span>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Projects */}
        {resume.sections.projects?.isVisible && resume.sections.projects?.items?.length > 0 && (
          <div className="mb-6">
            <h2 className="text-sm font-bold text-black border-b-2 border-black pb-2 mb-3">
              {resume.sections.projects?.customTitle || 'PROJECTS'}
            </h2>
            <div className="space-y-3">
              {resume.sections.projects.items.map((project, idx) => (
                <div key={idx} className="text-xs">
                  <div className="flex justify-between items-baseline">
                    <p className="font-bold text-black">{project.name}</p>
                    {project.duration && <p className="font-light text-black">{project.duration}</p>}
                  </div>
                  {project.technologies && <p className="font-light text-black">{project.technologies}</p>}
                  <div className="mt-1 text-black leading-relaxed">
                    {renderHTML(project.description)}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Certifications */}
        {resume.sections.certifications?.isVisible && resume.sections.certifications?.items?.length > 0 && (
          <div className="mb-6">
            <h2 className="text-sm font-bold text-black border-b-2 border-black pb-2 mb-3">
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
          <div className="mb-6">
            <h2 className="text-sm font-bold text-black border-b-2 border-black pb-2 mb-3">
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

        {/* Custom Sections */}
        {resume.customSections?.map((section, sectionIdx) => (
          section.isVisible && (
            <div key={sectionIdx} className="mb-6">
              <h2 className="text-sm font-bold text-black border-b-2 border-black pb-2 mb-3">
                {section.title.toUpperCase()}
              </h2>
              <div className="space-y-2">
                {section.items?.map((item, itemIdx) => (
                  <div key={itemIdx} className="text-xs text-black leading-relaxed">
                    {renderHTML(item.content)}
                  </div>
                ))}
              </div>
            </div>
          )
        ))}
      </div>
    </div>
  );
}
