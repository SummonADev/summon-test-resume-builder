import React from 'react';
import { Resume } from '@/types/resume';

interface ModernMinimalProps {
  resume: Resume;
}

export function ModernMinimal({ resume }: ModernMinimalProps) {
  const renderHTML = (html: string) => (
    <div dangerouslySetInnerHTML={{ __html: html }} />
  );

  return (
    <div className="font-lato text-black bg-white" style={{ fontSize: '11px', lineHeight: '1.6' }}>
      {/* Header */}
      <div className="border-b-2 border-black pb-4 mb-6">
        <h1 className="text-3xl font-bold text-black">{resume.personal.fullName}</h1>
        {resume.personal.professionalTitle && (
          <p className="text-lg font-light text-black mt-1">{resume.personal.professionalTitle}</p>
        )}
        
        {/* Contact Info */}
        <div className="flex flex-wrap gap-6 mt-4 text-xs">
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
        <div className="mb-6">
          <h2 className="text-base font-bold text-black border-b border-black pb-2 mb-3">
            {resume.sections.summary?.customTitle || 'Professional Summary'}
          </h2>
          <div className="text-xs text-black leading-relaxed">
            {renderHTML(resume.sections.summary.content)}
          </div>
        </div>
      )}

      {/* Experience */}
      {resume.sections.experience?.isVisible && resume.sections.experience?.items?.length > 0 && (
        <div className="mb-6">
          <h2 className="text-base font-bold text-black border-b border-black pb-2 mb-3">
            {resume.sections.experience?.customTitle || 'Experience'}
          </h2>
          <div className="space-y-3">
            {resume.sections.experience.items.map((exp, idx) => (
              <div key={idx} className="text-xs">
                <div className="flex justify-between items-baseline">
                  <p className="font-bold text-black">{exp.position}</p>
                  <p className="font-light text-black">{exp.startDate} – {exp.currentPosition ? 'Present' : exp.endDate}</p>
                </div>
                <p className="font-light text-black">{exp.company} • {exp.location}</p>
                <div className="mt-1 text-black leading-relaxed">
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
          <h2 className="text-base font-bold text-black border-b border-black pb-2 mb-3">
            {resume.sections.education?.customTitle || 'Education'}
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
                {edu.description && (
                  <div className="mt-1 text-black leading-relaxed">
                    {renderHTML(edu.description)}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Skills */}
      {resume.sections.skills?.isVisible && resume.sections.skills?.items?.length > 0 && (
        <div className="mb-6">
          <h2 className="text-base font-bold text-black border-b border-black pb-2 mb-3">
            {resume.sections.skills?.customTitle || 'Skills'}
          </h2>
          <div className="text-xs text-black">
            <div className="flex flex-wrap gap-4">
              {resume.sections.skills.items.map((skill, idx) => (
                <span key={idx}>{skill.name}</span>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Projects */}
      {resume.sections.projects?.isVisible && resume.sections.projects?.items?.length > 0 && (
        <div className="mb-6">
          <h2 className="text-base font-bold text-black border-b border-black pb-2 mb-3">
            {resume.sections.projects?.customTitle || 'Projects'}
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
                {(project.projectUrl || project.githubUrl) && (
                  <div className="flex gap-3 mt-1">
                    {project.projectUrl && (
                      <a href={project.projectUrl} target="_blank" rel="noopener noreferrer" className="text-black hover:underline">
                        Project
                      </a>
                    )}
                    {project.githubUrl && (
                      <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="text-black hover:underline">
                        GitHub
                      </a>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Certifications */}
      {resume.sections.certifications?.isVisible && resume.sections.certifications?.items?.length > 0 && (
        <div className="mb-6">
          <h2 className="text-base font-bold text-black border-b border-black pb-2 mb-3">
            {resume.sections.certifications?.customTitle || 'Certifications'}
          </h2>
          <div className="space-y-2">
            {resume.sections.certifications.items.map((cert, idx) => (
              <div key={idx} className="text-xs">
                <p className="font-bold text-black">{cert.name}</p>
                <p className="font-light text-black">{cert.issuer} • {cert.issueDate}</p>
                {cert.verificationUrl && (
                  <a href={cert.verificationUrl} target="_blank" rel="noopener noreferrer" className="text-black hover:underline">
                    Verify
                  </a>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Awards */}
      {resume.sections.awards?.isVisible && resume.sections.awards?.items?.length > 0 && (
        <div className="mb-6">
          <h2 className="text-base font-bold text-black border-b border-black pb-2 mb-3">
            {resume.sections.awards?.customTitle || 'Awards'}
          </h2>
          <div className="space-y-2">
            {resume.sections.awards.items.map((award, idx) => (
              <div key={idx} className="text-xs">
                <div className="flex justify-between items-baseline">
                  <p className="font-bold text-black">{award.title}</p>
                  <p className="font-light text-black">{award.date}</p>
                </div>
                <p className="font-light text-black">{award.organization}</p>
                {award.description && (
                  <div className="mt-1 text-black leading-relaxed">
                    {renderHTML(award.description)}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Custom Sections */}
      {resume.customSections?.map((section, sectionIdx) => (
        section.isVisible && (
          <div key={sectionIdx} className="mb-6">
            <h2 className="text-base font-bold text-black border-b border-black pb-2 mb-3">
              {section.title}
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
  );
}
