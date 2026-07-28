import { Document, Packer, Paragraph, Table, TableCell, TableRow, TextRun, AlignmentType, BorderStyle, convertInchesToTwip, HeadingLevel } from 'docx';
import { Resume, ResumeSection } from '@/types/resume';
import { extractLinks } from './link-utils';

/**
 * Convert resume to DOCX document
 */
export async function exportResumeToDocx(resume: Resume, filename: string = 'resume.docx'): Promise<void> {
  const doc = new Document({
    sections: [
      {
        properties: {},
        children: generateDocxContent(resume),
      },
    ],
  });

  const blob = await Packer.toBlob(doc);
  downloadFile(blob, filename);
}

/**
 * Generate DOCX content from resume data
 */
function generateDocxContent(resume: Resume): Paragraph[] {
  const content: Paragraph[] = [];

  // Personal Information
  if (resume.personalInfo) {
    content.push(...generatePersonalInfo(resume.personalInfo));
    content.push(new Paragraph({ text: '', spacing: { after: 200 } }));
  }

  // Visible sections in order
  resume.sectionOrder.forEach((sectionId) => {
    const section = resume.sections[sectionId];
    if (!section || !section.visible) return;

    if (sectionId === 'personal') return; // Already rendered

    const sectionTitle = section.customTitle || getDefaultSectionTitle(sectionId);
    content.push(generateSectionHeading(sectionTitle));

    if (sectionId === 'summary') {
      content.push(...generateSummaryContent(section));
    } else if (sectionId === 'skills') {
      content.push(...generateSkillsContent(section));
    } else if (sectionId === 'experience') {
      content.push(...generateExperienceContent(section));
    } else if (sectionId === 'education') {
      content.push(...generateEducationContent(section));
    } else if (sectionId === 'projects') {
      content.push(...generateProjectsContent(section));
    } else if (sectionId === 'certifications') {
      content.push(...generateCertificationsContent(section));
    } else if (sectionId === 'awards') {
      content.push(...generateAwardsContent(section));
    } else {
      // Custom section
      content.push(...generateCustomSectionContent(section));
    }

    content.push(new Paragraph({ text: '', spacing: { after: 200 } }));
  });

  return content;
}

/**
 * Generate personal information section
 */
function generatePersonalInfo(personalInfo: any): Paragraph[] {
  const paragraphs: Paragraph[] = [];

  if (personalInfo.fullName) {
    paragraphs.push(
      new Paragraph({
        text: personalInfo.fullName,
        size: 32,
        bold: true,
        spacing: { after: 100 },
      }),
    );
  }

  if (personalInfo.professionalTitle) {
    paragraphs.push(
      new Paragraph({
        text: personalInfo.professionalTitle,
        size: 24,
        spacing: { after: 200 },
      }),
    );
  }

  const contactInfo: string[] = [];
  if (personalInfo.email) contactInfo.push(personalInfo.email);
  if (personalInfo.phone) contactInfo.push(personalInfo.phone);
  if (personalInfo.location) contactInfo.push(personalInfo.location);

  if (contactInfo.length > 0) {
    paragraphs.push(
      new Paragraph({
        text: contactInfo.join(' • '),
        spacing: { after: 100 },
      }),
    );
  }

  const links: string[] = [];
  if (personalInfo.linkedin) links.push(personalInfo.linkedin);
  if (personalInfo.portfolio) links.push(personalInfo.portfolio);
  if (personalInfo.github) links.push(personalInfo.github);

  if (links.length > 0) {
    paragraphs.push(
      new Paragraph({
        text: links.join(' • '),
        spacing: { after: 100 },
      }),
    );
  }

  return paragraphs;
}

/**
 * Generate section heading
 */
function generateSectionHeading(title: string): Paragraph {
  return new Paragraph({
    text: title.toUpperCase(),
    bold: true,
    size: 24,
    spacing: { before: 200, after: 100 },
    border: {
      bottom: {
        color: '000000',
        space: 1,
        style: BorderStyle.SINGLE,
        size: 6,
      },
    },
  });
}

/**
 * Generate summary/objective section
 */
function generateSummaryContent(section: ResumeSection): Paragraph[] {
  const content: Paragraph[] = [];
  if (section.data?.text) {
    content.push(
      new Paragraph({
        text: section.data.text,
        spacing: { after: 100 },
      }),
    );
  }
  return content;
}

/**
 * Generate skills section
 */
function generateSkillsContent(section: ResumeSection): Paragraph[] {
  const content: Paragraph[] = [];
  if (section.data?.skills && Array.isArray(section.data.skills)) {
    const groupedSkills: { [key: string]: string[] } = {};

    section.data.skills.forEach((skill: any) => {
      const category = skill.category || 'Technical';
      if (!groupedSkills[category]) {
        groupedSkills[category] = [];
      }
      groupedSkills[category].push(skill.name);
    });

    Object.entries(groupedSkills).forEach(([category, skills]) => {
      content.push(
        new Paragraph({
          text: `${category}: ${skills.join(', ')}`,
          spacing: { after: 100 },
        }),
      );
    });
  }
  return content;
}

/**
 * Generate experience section
 */
function generateExperienceContent(section: ResumeSection): Paragraph[] {
  const content: Paragraph[] = [];
  if (section.data?.experiences && Array.isArray(section.data.experiences)) {
    section.data.experiences.forEach((exp: any, idx: number) => {
      content.push(
        new Paragraph({
          text: exp.position,
          bold: true,
          spacing: { after: 50 },
        }),
      );

      const companyInfo = [exp.company, exp.location].filter(Boolean).join(' • ');
      if (companyInfo) {
        content.push(
          new Paragraph({
            text: companyInfo,
            italics: true,
            spacing: { after: 50 },
          }),
        );
      }

      const dateRange = formatDateRange(exp.startDate, exp.endDate, exp.currentPosition);
      if (dateRange) {
        content.push(
          new Paragraph({
            text: dateRange,
            spacing: { after: 100 },
          }),
        );
      }

      if (exp.responsibilities) {
        content.push(
          new Paragraph({
            text: exp.responsibilities,
            spacing: { after: 100 },
          }),
        );
      }

      if (exp.achievements) {
        content.push(
          new Paragraph({
            text: exp.achievements,
            spacing: { after: 100 },
          }),
        );
      }

      if (idx < section.data.experiences.length - 1) {
        content.push(new Paragraph({ text: '', spacing: { after: 100 } }));
      }
    });
  }
  return content;
}

/**
 * Generate education section
 */
function generateEducationContent(section: ResumeSection): Paragraph[] {
  const content: Paragraph[] = [];
  if (section.data?.education && Array.isArray(section.data.education)) {
    section.data.education.forEach((edu: any, idx: number) => {
      content.push(
        new Paragraph({
          text: edu.institution,
          bold: true,
          spacing: { after: 50 },
        }),
      );

      const degreeInfo = [edu.degree, edu.fieldOfStudy].filter(Boolean).join(' in ');
      if (degreeInfo) {
        content.push(
          new Paragraph({
            text: degreeInfo,
            spacing: { after: 50 },
          }),
        );
      }

      const dateRange = formatDateRange(edu.startDate, edu.endDate);
      if (dateRange) {
        content.push(
          new Paragraph({
            text: dateRange,
            spacing: { after: 50 },
          }),
        );
      }

      if (edu.gpa) {
        content.push(
          new Paragraph({
            text: `GPA: ${edu.gpa}`,
            spacing: { after: 100 },
          }),
        );
      }

      if (edu.description) {
        content.push(
          new Paragraph({
            text: edu.description,
            spacing: { after: 100 },
          }),
        );
      }

      if (idx < section.data.education.length - 1) {
        content.push(new Paragraph({ text: '', spacing: { after: 100 } }));
      }
    });
  }
  return content;
}

/**
 * Generate projects section
 */
function generateProjectsContent(section: ResumeSection): Paragraph[] {
  const content: Paragraph[] = [];
  if (section.data?.projects && Array.isArray(section.data.projects)) {
    section.data.projects.forEach((project: any, idx: number) => {
      content.push(
        new Paragraph({
          text: project.name,
          bold: true,
          spacing: { after: 50 },
        }),
      );

      if (project.technologies) {
        content.push(
          new Paragraph({
            text: `Technologies: ${project.technologies}`,
            spacing: { after: 50 },
          }),
        );
      }

      if (project.description) {
        content.push(
          new Paragraph({
            text: project.description,
            spacing: { after: 50 },
          }),
        );
      }

      const links: string[] = [];
      if (project.projectUrl) links.push(project.projectUrl);
      if (project.githubUrl) links.push(project.githubUrl);
      if (links.length > 0) {
        content.push(
          new Paragraph({
            text: `Links: ${links.join(' • ')}`,
            spacing: { after: 100 },
          }),
        );
      }

      if (project.duration) {
        content.push(
          new Paragraph({
            text: `Duration: ${project.duration}`,
            spacing: { after: 100 },
          }),
        );
      }

      if (idx < section.data.projects.length - 1) {
        content.push(new Paragraph({ text: '', spacing: { after: 100 } }));
      }
    });
  }
  return content;
}

/**
 * Generate certifications section
 */
function generateCertificationsContent(section: ResumeSection): Paragraph[] {
  const content: Paragraph[] = [];
  if (section.data?.certifications && Array.isArray(section.data.certifications)) {
    section.data.certifications.forEach((cert: any, idx: number) => {
      content.push(
        new Paragraph({
          text: cert.name,
          bold: true,
          spacing: { after: 50 },
        }),
      );

      if (cert.organization) {
        content.push(
          new Paragraph({
            text: cert.organization,
            spacing: { after: 50 },
          }),
        );
      }

      const certDates: string[] = [];
      if (cert.issueDate) certDates.push(cert.issueDate);
      if (cert.expirationDate) certDates.push(`Expires: ${cert.expirationDate}`);
      if (certDates.length > 0) {
        content.push(
          new Paragraph({
            text: certDates.join(' • '),
            spacing: { after: 50 },
          }),
        );
      }

      if (cert.credentialId) {
        content.push(
          new Paragraph({
            text: `Credential ID: ${cert.credentialId}`,
            spacing: { after: 50 },
          }),
        );
      }

      if (cert.verificationUrl) {
        content.push(
          new Paragraph({
            text: `Verification: ${cert.verificationUrl}`,
            spacing: { after: 100 },
          }),
        );
      }

      if (idx < section.data.certifications.length - 1) {
        content.push(new Paragraph({ text: '', spacing: { after: 100 } }));
      }
    });
  }
  return content;
}

/**
 * Generate awards section
 */
function generateAwardsContent(section: ResumeSection): Paragraph[] {
  const content: Paragraph[] = [];
  if (section.data?.awards && Array.isArray(section.data.awards)) {
    section.data.awards.forEach((award: any, idx: number) => {
      content.push(
        new Paragraph({
          text: award.title,
          bold: true,
          spacing: { after: 50 },
        }),
      );

      if (award.organization) {
        content.push(
          new Paragraph({
            text: award.organization,
            spacing: { after: 50 },
          }),
        );
      }

      if (award.date) {
        content.push(
          new Paragraph({
            text: award.date,
            spacing: { after: 50 },
          }),
        );
      }

      if (award.description) {
        content.push(
          new Paragraph({
            text: award.description,
            spacing: { after: 100 },
          }),
        );
      }

      if (idx < section.data.awards.length - 1) {
        content.push(new Paragraph({ text: '', spacing: { after: 100 } }));
      }
    });
  }
  return content;
}

/**
 * Generate custom section content
 */
function generateCustomSectionContent(section: ResumeSection): Paragraph[] {
  const content: Paragraph[] = [];
  if (section.data?.items && Array.isArray(section.data.items)) {
    section.data.items.forEach((item: any, idx: number) => {
      if (item.title) {
        content.push(
          new Paragraph({
            text: item.title,
            bold: true,
            spacing: { after: 50 },
          }),
        );
      }

      if (item.subtitle) {
        content.push(
          new Paragraph({
            text: item.subtitle,
            italics: true,
            spacing: { after: 50 },
          }),
        );
      }

      if (item.date) {
        content.push(
          new Paragraph({
            text: item.date,
            spacing: { after: 50 },
          }),
        );
      }

      if (item.description) {
        content.push(
          new Paragraph({
            text: item.description,
            spacing: { after: 100 },
          }),
        );
      }

      if (idx < section.data.items.length - 1) {
        content.push(new Paragraph({ text: '', spacing: { after: 100 } }));
      }
    });
  }
  return content;
}

/**
 * Format date range for display
 */
function formatDateRange(startDate?: string, endDate?: string, isCurrent?: boolean): string {
  const parts: string[] = [];

  if (startDate) {
    parts.push(startDate);
  }

  if (isCurrent) {
    parts.push('Present');
  } else if (endDate) {
    parts.push(endDate);
  }

  return parts.join(' - ');
}

/**
 * Get default section title
 */
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

/**
 * Trigger file download
 */
function downloadFile(blob: Blob, filename: string): void {
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}
