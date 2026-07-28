/**
 * Core Resume Data Model
 * All resume data is stored in a single JSON object that's template-agnostic
 */

export type SectionType =
  | 'personal'
  | 'summary'
  | 'skills'
  | 'experience'
  | 'education'
  | 'projects'
  | 'certifications'
  | 'awards'
  | 'custom';

export type TemplateName =
  | 'modern-minimal'
  | 'professional-corporate'
  | 'elegant-two-column'
  | 'creative-designer'
  | 'ats-friendly';

export interface PersonalInfo {
  fullName: string;
  professionalTitle: string;
  email: string;
  phone: string;
  location: string;
  linkedin: string;
  portfolio: string;
  github: string;
  profilePhoto: string; // base64 or URL
}

export interface SummarySection {
  content: string;
  isVisible: boolean;
  customTitle: string;
}

export interface Skill {
  id: string;
  category: string; // e.g., "Technical", "Soft Skills", "Languages"
  name: string;
}

export interface SkillsSection {
  items: Skill[];
  isVisible: boolean;
  customTitle: string;
  groupByCategory: boolean;
}

export interface ExperienceEntry {
  id: string;
  company: string;
  position: string;
  location: string;
  startDate: string; // YYYY-MM
  endDate: string; // YYYY-MM or "present"
  isCurrentPosition: boolean;
  responsibilities: string; // Rich text
  achievements: string; // Rich text
}

export interface ExperienceSection {
  items: ExperienceEntry[];
  isVisible: boolean;
  customTitle: string;
}

export interface EducationEntry {
  id: string;
  institution: string;
  degree: string;
  fieldOfStudy: string;
  startDate: string; // YYYY-MM
  endDate: string; // YYYY-MM
  gpa: string;
  description: string; // Rich text
}

export interface EducationSection {
  items: EducationEntry[];
  isVisible: boolean;
  customTitle: string;
}

export interface ProjectEntry {
  id: string;
  name: string;
  technologies: string[];
  description: string; // Rich text
  projectUrl: string;
  githubUrl: string;
  startDate: string; // YYYY-MM
  endDate: string; // YYYY-MM or "present"
}

export interface ProjectsSection {
  items: ProjectEntry[];
  isVisible: boolean;
  customTitle: string;
}

export interface CertificationEntry {
  id: string;
  name: string;
  organization: string;
  issueDate: string; // YYYY-MM
  expirationDate: string; // YYYY-MM or empty
  credentialId: string;
  credentialUrl: string;
}

export interface CertificationsSection {
  items: CertificationEntry[];
  isVisible: boolean;
  customTitle: string;
}

export interface AwardEntry {
  id: string;
  title: string;
  organization: string;
  date: string; // YYYY-MM
  description: string;
}

export interface AwardsSection {
  items: AwardEntry[];
  isVisible: boolean;
  customTitle: string;
}

export interface CustomSectionItem {
  id: string;
  title: string;
  startDate: string;
  endDate: string;
  description: string;
}

export interface CustomSection {
  id: string;
  type: 'custom';
  sectionType: 'custom';
  title: string;
  items: CustomSectionItem[];
  isVisible: boolean;
}

export interface Resume {
  id: string;
  name: string;
  template: TemplateName;
  personal: PersonalInfo;
  summary: SummarySection;
  skills: SkillsSection;
  experience: ExperienceSection;
  education: EducationSection;
  projects: ProjectsSection;
  certifications: CertificationsSection;
  awards: AwardsSection;
  customSections: CustomSection[];
  sectionOrder: SectionType[]; // Controls drag-and-drop order
  createdAt: number;
  updatedAt: number;
}

export interface HistoryState {
  resume: Resume;
  timestamp: number;
}

export interface UIState {
  expandedSections: Set<SectionType>;
  activeTemplatePreview: TemplateName;
  sidebarOpen: boolean;
  previewMode: 'desktop' | 'tablet' | 'mobile';
}
