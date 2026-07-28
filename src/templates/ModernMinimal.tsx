import React from 'react';
import { Resume } from '@/types/resume';
import { renderRichText } from '@/components/RichText';

interface ModernMinimalProps {
  resume: Resume;
}

export function ModernMinimal({ resume }: ModernMinimalProps) {
  return (
    <div className="font-lato text-black bg-white" style={{ fontSize: '11px', lineHeight: '1.6' }}>
      {/* Header */}
      <div className="border-b-2 border-black pb-4 mb-6">
        <h1 className="text-3xl font-bold text-black">{resume.personalInfo.fullName}</h1>
        {resume.personalInfo.professionalTitle && (
          <p className="text-lg font-light text-black mt-1">{resume.personalInfo.professionalTitle}</p>
        )}

        {/* Contact Info - All Hyperlinkable */}
        <div className="flex flex-wrap gap-6 mt-4 text-xs">
          {resume.personalInfo.email && (
            <a href={`mailto:${resume.personalInfo.email}`} className="text-black hover:underline">
              {resume.personalInfo.email}
            </a>
          )}
          {resume.personalInfo.phone && (
            <a href={`tel:${resume.personalInfo.phone}`} className="text-black hover:underline">
              {resume.personalInfo.phone}
            </a>
          )}
          {resume.personalInfo.location && <span className="text-black">{resume.personalInfo.location}</span>}
          {resume.personalInfo.linkedin && (
            <a
              href={resume.personalInfo.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="text-black hover:underline"
            >
              LinkedIn
            </a>
          )}
          {resume.personalInfo.portfolio && (
            <a
              href={resume.personalInfo.portfolio}
              target="_blank"
              rel="noopener noreferrer"
              className="text-black hover:underline"
            >
              Portfolio
            </a>
          )}
          {resume.personalInfo.github && (
            <a
              href={resume.personalInfo.github}
              target="_blank"
              rel="noopener noreferrer"
              className="text-black hover:underline"
            >
              GitHub
            </a>
          )}
        </div>
      </div>

      {/* Render sections in order */}
      {resume.sectionOrder.map((sectionId) => {
        const section = resume.sections[sectionId];
        if (!section || !section.visible) return null;

        const sectionTitle = section.customTitle || getDefaultSectionTitle(sectionId);

        return (
          <div key={sectionId} className="mb-6">
            <h2 className="text-base font-bold text-black border-b border-black pb-2 mb-3">{sectionTitle}</h2>

            {/* Summary */}
            {sectionId === 'summary' && section.data?.text && (
              <div className="text-xs text-black leading-relaxed">{renderRichText(section.data.text)}</div>
            )}

            {/* Experience */}
            {sectionId === 'experience' && section.data?.experiences && (
              <div className="space-y-4">
                {section.data.experiences.map((exp: any, idx: number) => (
                  <div key={idx} className="text-xs">
                    <div className="flex justify-between items-baseline">
                      <p className="font-bold text-black">{exp.position}</p>
                      <p className="font-light text-black">
                        {exp.startDate} – {exp.currentPosition ? 'Present' : exp.endDate}
                      </p>
                    </div>
                    <p className="font-light text-black">
                      {exp.company} • {exp.location}
                    </p>
                    <div className="mt-2 text-black leading-relaxed">{renderRichText(exp.responsibilities)}</div>
                    {exp.achievements && (
                      <div className="mt-1 text-black leading-relaxed">{renderRichText(exp.achievements)}</div>
                    )}
                  </div>
                ))}
              </div>
            )}

            {/* Education */}
            {sectionId === 'education' && section.data?.education && (
              <div className="space-y-3">
                {section.data.education.map((edu: any, idx: number) => (
                  <div key={idx} className="text-xs">
                    <div className="flex justify-between items-baseline">
                      <p className="font-bold text-black">{edu.degree}</p>
                      <p className="font-light text-black">
                        {edu.startDate} – {edu.endDate}
                      </p>
                    </div>
                    <p className="text-black">
                      {edu.institution} • {edu.fieldOfStudy}
                    </p>
                    {edu.gpa && <p className="font-light text-black">GPA: {edu.gpa}</p>}
                    {edu.description && (
                      <div className="mt-1 text-black leading-relaxed">{renderRichText(edu.description)}</div>
                    )}
                  </div>
                ))}
              </div>
            )}

            {/* Skills */}
            {sectionId === 'skills' && section.data?.skills && (
              <div className="text-xs text-black">
                {section.data.skills.map((skill: any, idx: number) => (
                  <div key={idx} className="mb-2">
                    <p className="font-semibold">{skill.category}:</p>
                    <p>{skill.skills?.join(', ') || ''}</p>
                  </div>
                ))}
              </div>
            )}

            {/* Projects */}
            {sectionId === 'projects' && section.data?.projects && (
              <div className="space-y-3">
                {section.data.projects.map((project: any, idx: number) => (
                  <div key={idx} className="text-xs">
                    <div className="flex justify-between items-baseline">
                      <p className="font-bold text-black">{project.name}</p>
                      {project.duration && <p className="font-light text-black">{project.duration}</p>}
                    </div>
                    {project.technologies && <p className="font-light text-black">Tech: {project.technologies}</p>}
                    <div className="mt-1 text-black leading-relaxed">{renderRichText(project.description)}</div>
                    {(project.projectUrl || project.githubUrl) && (
                      <div className="flex gap-3 mt-2">
                        {project.projectUrl && (
                          <a
                            href={project.projectUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-black hover:underline"
                          >
                            Project
                          </a>
                        )}
                        {project.githubUrl && (
                          <a
                            href={project.githubUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-black hover:underline"
                          >
                            GitHub
                          </a>
                        )}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}

            {/* Certifications */}
            {sectionId === 'certifications' && section.data?.certifications && (
              <div className="space-y-2">
                {section.data.certifications.map((cert: any, idx: number) => (
                  <div key={idx} className="text-xs">
                    <p className="font-bold text-black">{cert.name}</p>
                    <p className="font-light text-black">
                      {cert.organization} • {cert.issueDate}
                    </p>
                    {cert.credentialId && <p className="font-light text-black">ID: {cert.credentialId}</p>}
                    {cert.verificationUrl && (
                      <a
                        href={cert.verificationUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-black hover:underline"
                      >
                        Verify Credential
                      </a>
                    )}
                  </div>
                ))}
              </div>
            )}

            {/* Awards */}
            {sectionId === 'awards' && section.data?.awards && (
              <div className="space-y-2">
                {section.data.awards.map((award: any, idx: number) => (
                  <div key={idx} className="text-xs">
                    <div className="flex justify-between items-baseline">
                      <p className="font-bold text-black">{award.title}</p>
                      <p className="font-light text-black">{award.date}</p>
                    </div>
                    <p className="font-light text-black">{award.organization}</p>
                    {award.description && (
                      <div className="mt-1 text-black leading-relaxed">{renderRichText(award.description)}</div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

function getDefaultSectionTitle(sectionId: string): string {
  const titles: { [key: string]: string } = {
    summary: 'Professional Summary',
    skills: 'Skills',
    experience: 'Work Experience',
    education: 'Education',
    projects: 'Projects',
    certifications: 'Certifications',
    awards: 'Honors & Awards',
  };
  return titles[sectionId] || 'Section';
}
