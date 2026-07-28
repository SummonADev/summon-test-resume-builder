import { Resume } from '@/types/resume';

export interface ValidationError {
  field: string;
  message: string;
}

export function validateResume(resume: Resume): ValidationError[] {
  const errors: ValidationError[] = [];

  // Personal Info Validation
  if (!resume.personal.fullName?.trim()) {
    errors.push({ field: 'personal.fullName', message: 'Full name is required' });
  }

  if (!resume.personal.email?.trim()) {
    errors.push({ field: 'personal.email', message: 'Email is required' });
  } else if (!isValidEmail(resume.personal.email)) {
    errors.push({ field: 'personal.email', message: 'Invalid email format' });
  }

  // URLs Validation
  if (resume.personal.linkedin && !isValidURL(resume.personal.linkedin)) {
    errors.push({ field: 'personal.linkedin', message: 'Invalid LinkedIn URL' });
  }

  if (resume.personal.portfolio && !isValidURL(resume.personal.portfolio)) {
    errors.push({ field: 'personal.portfolio', message: 'Invalid portfolio URL' });
  }

  if (resume.personal.github && !isValidURL(resume.personal.github)) {
    errors.push({ field: 'personal.github', message: 'Invalid GitHub URL' });
  }

  // Check for at least one section with content
  const hasSectionContent =
    resume.summary.isVisible ||
    resume.experience.items.length > 0 ||
    resume.education.items.length > 0 ||
    resume.skills.items.length > 0 ||
    resume.projects.items.length > 0 ||
    resume.certifications.items.length > 0 ||
    resume.awards.items.length > 0 ||
    resume.customSections.length > 0;

  if (!hasSectionContent) {
    errors.push({ field: 'sections', message: 'Add at least one section or entry to your resume' });
  }

  return errors;
}

function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

function isValidURL(url: string): boolean {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
}

export function getResumeCompleteness(resume: Resume): {
  percentage: number;
  completed: number;
  total: number;
} {
  let completed = 0;
  const total = 9; // Total possible sections

  // Personal info
  if (resume.personal.fullName && resume.personal.email) completed++;

  // Summary
  if (resume.summary.isVisible && resume.summary.content) completed++;

  // Experience
  if (resume.experience.items.length > 0) completed++;

  // Education
  if (resume.education.items.length > 0) completed++;

  // Skills
  if (resume.skills.items.length > 0) completed++;

  // Projects
  if (resume.projects.items.length > 0) completed++;

  // Certifications
  if (resume.certifications.items.length > 0) completed++;

  // Awards
  if (resume.awards.items.length > 0) completed++;

  // Custom sections
  if (resume.customSections.length > 0) completed++;

  return {
    percentage: Math.round((completed / total) * 100),
    completed,
    total,
  };
}
