/**
 * Default Resume Template
 * Used when creating a new resume or resetting to default state
 */

import { Resume } from '@/types/resume';

export function createDefaultResume(name: string = 'My Resume'): Resume {
  const now = Date.now();

  return {
    id: `resume-${Date.now()}`,
    name,
    template: 'modern-minimal',
    personal: {
      fullName: '',
      professionalTitle: '',
      email: '',
      phone: '',
      location: '',
      linkedin: '',
      portfolio: '',
      github: '',
      profilePhoto: '',
    },
    summary: {
      content: '',
      isVisible: true,
      customTitle: 'Professional Summary',
    },
    skills: {
      items: [],
      isVisible: true,
      customTitle: 'Skills',
      groupByCategory: true,
    },
    experience: {
      items: [],
      isVisible: true,
      customTitle: 'Work Experience',
    },
    education: {
      items: [],
      isVisible: true,
      customTitle: 'Education',
    },
    projects: {
      items: [],
      isVisible: true,
      customTitle: 'Projects',
    },
    certifications: {
      items: [],
      isVisible: true,
      customTitle: 'Certifications',
    },
    awards: {
      items: [],
      isVisible: true,
      customTitle: 'Awards & Honors',
    },
    customSections: [],
    sectionOrder: [
      'personal',
      'summary',
      'experience',
      'education',
      'skills',
      'projects',
      'certifications',
      'awards',
    ],
    createdAt: now,
    updatedAt: now,
  };
}
