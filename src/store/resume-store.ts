/**
 * Zustand Store for Resume State Management
 * Handles resume data, UI state, history, and template switching
 */

import { create } from 'zustand';
import { Resume, SectionType, TemplateName, HistoryState, UIState, CustomSection, Skill, ExperienceEntry, EducationEntry, ProjectEntry, CertificationEntry, AwardEntry, CustomSectionItem } from '@/types/resume';
import { createDefaultResume } from '@/lib/default-resume';

const STORAGE_KEY = 'resume-builder-data';
const MAX_HISTORY = 50;

interface ResumeStore {
  // State
  resume: Resume;
  uiState: UIState;
  history: HistoryState[];
  historyIndex: number;

  // Resume actions
  updatePersonal: (updates: Partial<Resume['personal']>) => void;
  updateSummary: (content: string) => void;
  setSummaryVisible: (visible: boolean) => void;
  setSectionCustomTitle: (section: SectionType, title: string) => void;

  // Skills
  addSkill: (skill: Omit<Skill, 'id'>) => void;
  updateSkill: (skillId: string, updates: Partial<Skill>) => void;
  deleteSkill: (skillId: string) => void;
  setSkillsVisible: (visible: boolean) => void;
  setSkillsGroupByCategory: (group: boolean) => void;

  // Experience
  addExperience: (entry: Omit<ExperienceEntry, 'id'>) => void;
  updateExperience: (entryId: string, updates: Partial<ExperienceEntry>) => void;
  deleteExperience: (entryId: string) => void;
  setExperienceVisible: (visible: boolean) => void;

  // Education
  addEducation: (entry: Omit<EducationEntry, 'id'>) => void;
  updateEducation: (entryId: string, updates: Partial<EducationEntry>) => void;
  deleteEducation: (entryId: string) => void;
  setEducationVisible: (visible: boolean) => void;

  // Projects
  addProject: (entry: Omit<ProjectEntry, 'id'>) => void;
  updateProject: (entryId: string, updates: Partial<ProjectEntry>) => void;
  deleteProject: (entryId: string) => void;
  setProjectsVisible: (visible: boolean) => void;

  // Certifications
  addCertification: (entry: Omit<CertificationEntry, 'id'>) => void;
  updateCertification: (entryId: string, updates: Partial<CertificationEntry>) => void;
  deleteCertification: (entryId: string) => void;
  setCertificationsVisible: (visible: boolean) => void;

  // Awards
  addAward: (entry: Omit<AwardEntry, 'id'>) => void;
  updateAward: (entryId: string, updates: Partial<AwardEntry>) => void;
  deleteAward: (entryId: string) => void;
  setAwardsVisible: (visible: boolean) => void;

  // Custom Sections
  addCustomSection: (section: Omit<CustomSection, 'id'>) => void;
  updateCustomSection: (sectionId: string, updates: Partial<CustomSection>) => void;
  deleteCustomSection: (sectionId: string) => void;
  addCustomSectionItem: (sectionId: string, item: Omit<CustomSectionItem, 'id'>) => void;
  updateCustomSectionItem: (sectionId: string, itemId: string, updates: Partial<CustomSectionItem>) => void;
  deleteCustomSectionItem: (sectionId: string, itemId: string) => void;

  // Section Ordering (Drag & Drop)
  reorderSections: (newOrder: SectionType[]) => void;
  reorderSectionItems: (section: SectionType, newOrder: string[]) => void;

  // Template
  setTemplate: (template: TemplateName) => void;

  // Section Visibility
  toggleSectionExpanded: (section: SectionType) => void;

  // UI State
  setPreviewMode: (mode: 'desktop' | 'tablet' | 'mobile') => void;
  toggleSidebar: () => void;

  // History
  undo: () => void;
  redo: () => void;
  canUndo: () => boolean;
  canRedo: () => boolean;

  // Persistence
  loadResume: (resumeId?: string) => void;
  saveResume: () => void;
  createNewResume: (name?: string) => void;
  resetResume: () => void;
}

export const useResumeStore = create<ResumeStore>((set, get) => {
  // Initialize from localStorage
  const loadFromStorage = (): Resume => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        return JSON.parse(stored);
      }
    } catch (e) {
      console.error('Failed to load resume from storage:', e);
    }
    return createDefaultResume();
  };

  const saveToStorage = (resume: Resume) => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(resume));
    } catch (e) {
      console.error('Failed to save resume to storage:', e);
    }
  };

  const addToHistory = (resume: Resume) => {
    set((state) => {
      const newHistory = state.history.slice(0, state.historyIndex + 1);
      newHistory.push({ resume: JSON.parse(JSON.stringify(resume)), timestamp: Date.now() });
      return {
        history: newHistory.slice(-MAX_HISTORY),
        historyIndex: newHistory.length - 1,
      };
    });
  };

  const initialResume = loadFromStorage();

  return {
    resume: initialResume,
    uiState: {
      expandedSections: new Set(['personal', 'experience', 'education']),
      activeTemplatePreview: initialResume.template,
      sidebarOpen: true,
      previewMode: 'desktop',
    },
    history: [{ resume: JSON.parse(JSON.stringify(initialResume)), timestamp: Date.now() }],
    historyIndex: 0,

    // Personal
    updatePersonal: (updates) =>
      set((state) => {
        const updated = { ...state.resume, personal: { ...state.resume.personal, ...updates }, updatedAt: Date.now() };
        saveToStorage(updated);
        addToHistory(updated);
        return { resume: updated };
      }),

    // Summary
    updateSummary: (content) =>
      set((state) => {
        const updated = { ...state.resume, summary: { ...state.resume.summary, content }, updatedAt: Date.now() };
        saveToStorage(updated);
        addToHistory(updated);
        return { resume: updated };
      }),

    setSummaryVisible: (visible) =>
      set((state) => {
        const updated = { ...state.resume, summary: { ...state.resume.summary, isVisible: visible }, updatedAt: Date.now() };
        saveToStorage(updated);
        addToHistory(updated);
        return { resume: updated };
      }),

    setSectionCustomTitle: (section, title) =>
      set((state) => {
        const updated = JSON.parse(JSON.stringify(state.resume));
        if (section in updated && 'customTitle' in updated[section]) {
          updated[section].customTitle = title;
        }
        updated.updatedAt = Date.now();
        saveToStorage(updated);
        addToHistory(updated);
        return { resume: updated };
      }),

    // Skills
    addSkill: (skill) =>
      set((state) => {
        const updated = { ...state.resume, skills: { ...state.resume.skills, items: [...state.resume.skills.items, { ...skill, id: `skill-${Date.now()}` }] }, updatedAt: Date.now() };
        saveToStorage(updated);
        addToHistory(updated);
        return { resume: updated };
      }),

    updateSkill: (skillId, updates) =>
      set((state) => {
        const updated = { ...state.resume, skills: { ...state.resume.skills, items: state.resume.skills.items.map((s) => (s.id === skillId ? { ...s, ...updates } : s)) }, updatedAt: Date.now() };
        saveToStorage(updated);
        addToHistory(updated);
        return { resume: updated };
      }),

    deleteSkill: (skillId) =>
      set((state) => {
        const updated = { ...state.resume, skills: { ...state.resume.skills, items: state.resume.skills.items.filter((s) => s.id !== skillId) }, updatedAt: Date.now() };
        saveToStorage(updated);
        addToHistory(updated);
        return { resume: updated };
      }),

    setSkillsVisible: (visible) =>
      set((state) => {
        const updated = { ...state.resume, skills: { ...state.resume.skills, isVisible: visible }, updatedAt: Date.now() };
        saveToStorage(updated);
        addToHistory(updated);
        return { resume: updated };
      }),

    setSkillsGroupByCategory: (group) =>
      set((state) => {
        const updated = { ...state.resume, skills: { ...state.resume.skills, groupByCategory: group }, updatedAt: Date.now() };
        saveToStorage(updated);
        addToHistory(updated);
        return { resume: updated };
      }),

    // Experience
    addExperience: (entry) =>
      set((state) => {
        const updated = { ...state.resume, experience: { ...state.resume.experience, items: [...state.resume.experience.items, { ...entry, id: `exp-${Date.now()}` }] }, updatedAt: Date.now() };
        saveToStorage(updated);
        addToHistory(updated);
        return { resume: updated };
      }),

    updateExperience: (entryId, updates) =>
      set((state) => {
        const updated = { ...state.resume, experience: { ...state.resume.experience, items: state.resume.experience.items.map((e) => (e.id === entryId ? { ...e, ...updates } : e)) }, updatedAt: Date.now() };
        saveToStorage(updated);
        addToHistory(updated);
        return { resume: updated };
      }),

    deleteExperience: (entryId) =>
      set((state) => {
        const updated = { ...state.resume, experience: { ...state.resume.experience, items: state.resume.experience.items.filter((e) => e.id !== entryId) }, updatedAt: Date.now() };
        saveToStorage(updated);
        addToHistory(updated);
        return { resume: updated };
      }),

    setExperienceVisible: (visible) =>
      set((state) => {
        const updated = { ...state.resume, experience: { ...state.resume.experience, isVisible: visible }, updatedAt: Date.now() };
        saveToStorage(updated);
        addToHistory(updated);
        return { resume: updated };
      }),

    // Education
    addEducation: (entry) =>
      set((state) => {
        const updated = { ...state.resume, education: { ...state.resume.education, items: [...state.resume.education.items, { ...entry, id: `edu-${Date.now()}` }] }, updatedAt: Date.now() };
        saveToStorage(updated);
        addToHistory(updated);
        return { resume: updated };
      }),

    updateEducation: (entryId, updates) =>
      set((state) => {
        const updated = { ...state.resume, education: { ...state.resume.education, items: state.resume.education.items.map((e) => (e.id === entryId ? { ...e, ...updates } : e)) }, updatedAt: Date.now() };
        saveToStorage(updated);
        addToHistory(updated);
        return { resume: updated };
      }),

    deleteEducation: (entryId) =>
      set((state) => {
        const updated = { ...state.resume, education: { ...state.resume.education, items: state.resume.education.items.filter((e) => e.id !== entryId) }, updatedAt: Date.now() };
        saveToStorage(updated);
        addToHistory(updated);
        return { resume: updated };
      }),

    setEducationVisible: (visible) =>
      set((state) => {
        const updated = { ...state.resume, education: { ...state.resume.education, isVisible: visible }, updatedAt: Date.now() };
        saveToStorage(updated);
        addToHistory(updated);
        return { resume: updated };
      }),

    // Projects
    addProject: (entry) =>
      set((state) => {
        const updated = { ...state.resume, projects: { ...state.resume.projects, items: [...state.resume.projects.items, { ...entry, id: `proj-${Date.now()}` }] }, updatedAt: Date.now() };
        saveToStorage(updated);
        addToHistory(updated);
        return { resume: updated };
      }),

    updateProject: (entryId, updates) =>
      set((state) => {
        const updated = { ...state.resume, projects: { ...state.resume.projects, items: state.resume.projects.items.map((p) => (p.id === entryId ? { ...p, ...updates } : p)) }, updatedAt: Date.now() };
        saveToStorage(updated);
        addToHistory(updated);
        return { resume: updated };
      }),

    deleteProject: (entryId) =>
      set((state) => {
        const updated = { ...state.resume, projects: { ...state.resume.projects, items: state.resume.projects.items.filter((p) => p.id !== entryId) }, updatedAt: Date.now() };
        saveToStorage(updated);
        addToHistory(updated);
        return { resume: updated };
      }),

    setProjectsVisible: (visible) =>
      set((state) => {
        const updated = { ...state.resume, projects: { ...state.resume.projects, isVisible: visible }, updatedAt: Date.now() };
        saveToStorage(updated);
        addToHistory(updated);
        return { resume: updated };
      }),

    // Certifications
    addCertification: (entry) =>
      set((state) => {
        const updated = { ...state.resume, certifications: { ...state.resume.certifications, items: [...state.resume.certifications.items, { ...entry, id: `cert-${Date.now()}` }] }, updatedAt: Date.now() };
        saveToStorage(updated);
        addToHistory(updated);
        return { resume: updated };
      }),

    updateCertification: (entryId, updates) =>
      set((state) => {
        const updated = { ...state.resume, certifications: { ...state.resume.certifications, items: state.resume.certifications.items.map((c) => (c.id === entryId ? { ...c, ...updates } : c)) }, updatedAt: Date.now() };
        saveToStorage(updated);
        addToHistory(updated);
        return { resume: updated };
      }),

    deleteCertification: (entryId) =>
      set((state) => {
        const updated = { ...state.resume, certifications: { ...state.resume.certifications, items: state.resume.certifications.items.filter((c) => c.id !== entryId) }, updatedAt: Date.now() };
        saveToStorage(updated);
        addToHistory(updated);
        return { resume: updated };
      }),

    setCertificationsVisible: (visible) =>
      set((state) => {
        const updated = { ...state.resume, certifications: { ...state.resume.certifications, isVisible: visible }, updatedAt: Date.now() };
        saveToStorage(updated);
        addToHistory(updated);
        return { resume: updated };
      }),

    // Awards
    addAward: (entry) =>
      set((state) => {
        const updated = { ...state.resume, awards: { ...state.resume.awards, items: [...state.resume.awards.items, { ...entry, id: `award-${Date.now()}` }] }, updatedAt: Date.now() };
        saveToStorage(updated);
        addToHistory(updated);
        return { resume: updated };
      }),

    updateAward: (entryId, updates) =>
      set((state) => {
        const updated = { ...state.resume, awards: { ...state.resume.awards, items: state.resume.awards.items.map((a) => (a.id === entryId ? { ...a, ...updates } : a)) }, updatedAt: Date.now() };
        saveToStorage(updated);
        addToHistory(updated);
        return { resume: updated };
      }),

    deleteAward: (entryId) =>
      set((state) => {
        const updated = { ...state.resume, awards: { ...state.resume.awards, items: state.resume.awards.items.filter((a) => a.id !== entryId) }, updatedAt: Date.now() };
        saveToStorage(updated);
        addToHistory(updated);
        return { resume: updated };
      }),

    setAwardsVisible: (visible) =>
      set((state) => {
        const updated = { ...state.resume, awards: { ...state.resume.awards, isVisible: visible }, updatedAt: Date.now() };
        saveToStorage(updated);
        addToHistory(updated);
        return { resume: updated };
      }),

    // Custom Sections
    addCustomSection: (section) =>
      set((state) => {
        const newSection = { ...section, id: `custom-${Date.now()}` };
        const updated = { ...state.resume, customSections: [...state.resume.customSections, newSection], sectionOrder: [...state.resume.sectionOrder, newSection.id as any], updatedAt: Date.now() };
        saveToStorage(updated);
        addToHistory(updated);
        return { resume: updated };
      }),

    updateCustomSection: (sectionId, updates) =>
      set((state) => {
        const updated = { ...state.resume, customSections: state.resume.customSections.map((s) => (s.id === sectionId ? { ...s, ...updates } : s)), updatedAt: Date.now() };
        saveToStorage(updated);
        addToHistory(updated);
        return { resume: updated };
      }),

    deleteCustomSection: (sectionId) =>
      set((state) => {
        const updated = { ...state.resume, customSections: state.resume.customSections.filter((s) => s.id !== sectionId), sectionOrder: state.resume.sectionOrder.filter((s) => s !== (sectionId as any)), updatedAt: Date.now() };
        saveToStorage(updated);
        addToHistory(updated);
        return { resume: updated };
      }),

    addCustomSectionItem: (sectionId, item) =>
      set((state) => {
        const updated = { ...state.resume, customSections: state.resume.customSections.map((s) => (s.id === sectionId ? { ...s, items: [...s.items, { ...item, id: `item-${Date.now()}` }] } : s)), updatedAt: Date.now() };
        saveToStorage(updated);
        addToHistory(updated);
        return { resume: updated };
      }),

    updateCustomSectionItem: (sectionId, itemId, updates) =>
      set((state) => {
        const updated = { ...state.resume, customSections: state.resume.customSections.map((s) => (s.id === sectionId ? { ...s, items: s.items.map((i) => (i.id === itemId ? { ...i, ...updates } : i)) } : s)), updatedAt: Date.now() };
        saveToStorage(updated);
        addToHistory(updated);
        return { resume: updated };
      }),

    deleteCustomSectionItem: (sectionId, itemId) =>
      set((state) => {
        const updated = { ...state.resume, customSections: state.resume.customSections.map((s) => (s.id === sectionId ? { ...s, items: s.items.filter((i) => i.id !== itemId) } : s)), updatedAt: Date.now() };
        saveToStorage(updated);
        addToHistory(updated);
        return { resume: updated };
      }),

    // Sections
    reorderSections: (newOrder) =>
      set((state) => {
        const updated = { ...state.resume, sectionOrder: newOrder, updatedAt: Date.now() };
        saveToStorage(updated);
        addToHistory(updated);
        return { resume: updated };
      }),

    reorderSectionItems: (section, newOrder) =>
      set((state) => {
        const updated = JSON.parse(JSON.stringify(state.resume));
        if (section in updated && 'items' in updated[section]) {
          const itemMap = new Map(updated[section].items.map((item: any) => [item.id, item]));
          updated[section].items = newOrder.map((id: string) => itemMap.get(id)).filter(Boolean);
        }
        updated.updatedAt = Date.now();
        saveToStorage(updated);
        addToHistory(updated);
        return { resume: updated };
      }),

    // Template
    setTemplate: (template) =>
      set((state) => {
        const updated = { ...state.resume, template, updatedAt: Date.now() };
        saveToStorage(updated);
        addToHistory(updated);
        return { resume: updated };
      }),

    // UI
    toggleSectionExpanded: (section) =>
      set((state) => {
        const expanded = new Set(state.uiState.expandedSections);
        if (expanded.has(section)) {
          expanded.delete(section);
        } else {
          expanded.add(section);
        }
        return { uiState: { ...state.uiState, expandedSections: expanded } };
      }),

    setPreviewMode: (mode) =>
      set((state) => ({ uiState: { ...state.uiState, previewMode: mode } })),

    toggleSidebar: () =>
      set((state) => ({ uiState: { ...state.uiState, sidebarOpen: !state.uiState.sidebarOpen } })),

    // History
    undo: () =>
      set((state) => {
        if (state.historyIndex > 0) {
          const newIndex = state.historyIndex - 1;
          return { resume: state.history[newIndex].resume, historyIndex: newIndex };
        }
        return state;
      }),

    redo: () =>
      set((state) => {
        if (state.historyIndex < state.history.length - 1) {
          const newIndex = state.historyIndex + 1;
          return { resume: state.history[newIndex].resume, historyIndex: newIndex };
        }
        return state;
      }),

    canUndo: () => {
      const state = get();
      return state.historyIndex > 0;
    },

    canRedo: () => {
      const state = get();
      return state.historyIndex < state.history.length - 1;
    },

    // Persistence
    loadResume: () => {
      // TODO: Implement loading from cloud/database
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const resume = JSON.parse(stored);
        set({ resume, history: [{ resume, timestamp: Date.now() }], historyIndex: 0 });
      }
    },

    saveResume: () => {
      saveToStorage(get().resume);
    },

    createNewResume: (name?: string) =>
      set(() => {
        const newResume = createDefaultResume(name);
        saveToStorage(newResume);
        return { resume: newResume, history: [{ resume: newResume, timestamp: Date.now() }], historyIndex: 0 };
      }),

    resetResume: () =>
      set((state) => {
        const reset = createDefaultResume(state.resume.name);
        saveToStorage(reset);
        return { resume: reset, history: [{ resume: reset, timestamp: Date.now() }], historyIndex: 0 };
      }),
  };
});
