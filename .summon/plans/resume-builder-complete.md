---
status: pending
---

# Resume Builder - Complete Implementation Plan

## Executive Summary

Build a modern, production-quality resume/CV builder with:
- **5 professional templates** with instant switching
- **9 predefined sections** + unlimited custom sections
- **Full drag-and-drop** reordering
- **Live preview** with pixel-perfect PDF export
- **Rich text editing** with hyperlinks
- **Auto-save to localStorage** with undo/redo
- **Responsive design** (desktop/tablet/mobile)
- **Clean, extensible architecture** for future AI features

---

## 1. Technology Stack & Architecture

### Core Stack
- **React 19** + **Vite** (fast dev/build)
- **TypeScript** (strong typing, maintainability)
- **Tailwind CSS v3** (responsive design, consistent styling)
- **React Router v6** (page/template routing)
- **dnd-kit** (accessible, modern drag-and-drop)
- **Lexical** (rich text editing, production-grade)
- **html2pdf.js** + **jsPDF** + **html2canvas** (PDF generation)
- **date-fns** (date manipulation)
- **Zustand** (lightweight state management)
- **TanStack Query** (optional future: server sync)

### Why These Choices
| Choice | Rationale |
|--------|-----------|
| **dnd-kit** | Accessible, React-native, no jQuery dependencies |
| **Lexical** | Meta's rich text engine, performant, extensible |
| **Zustand** | Lightweight, simple store (vs. Redux bloat) |
| **Tailwind** | Utility-first, responsive-by-default, maintainable |
| **html2pdf** | Client-side PDF generation (no backend needed initially) |

---

## 2. Folder Structure

```
src/
├── assets/
│   ├── fonts/               # Custom fonts for templates
│   ├── logos/               # Brand assets
│   └── placeholder.png
├── components/
│   ├── common/              # Reusable UI
│   │   ├── Button.tsx
│   │   ├── Input.tsx
│   │   ├── DatePicker.tsx
│   │   ├── RichTextEditor.tsx
│   │   ├── SectionHeader.tsx
│   │   └── DragHandle.tsx
│   ├── editor/              # Editor-specific components
│   │   ├── EditorPanel.tsx
│   │   ├── FormSection.tsx
│   │   ├── SectionsList.tsx
│   │   ├── PersonalInfoForm.tsx
│   │   ├── SkillsForm.tsx
│   │   ├── ExperienceForm.tsx
│   │   ├── EducationForm.tsx
│   │   ├── ProjectsForm.tsx
│   │   ├── CertificationsForm.tsx
│   │   ├── HonorsForm.tsx
│   │   └── CustomSectionForm.tsx
│   ├── preview/             # Preview components
│   │   ├── ResumePreview.tsx
│   │   ├── TemplateRenderer.tsx
│   │   └── PDFExport.tsx
│   ├── templates/           # Template definitions
│   │   ├── ModernMinimal.tsx
│   │   ├── ProfessionalCorporate.tsx
│   │   ├── ElegantTwoColumn.tsx
│   │   ├── CreativeDesigner.tsx
│   │   ├── ATSFriendly.tsx
│   │   └── TemplateBase.tsx
│   ├── layout/
│   │   ├── Navbar.tsx
│   │   ├── MainLayout.tsx
│   │   ├── TemplateSelector.tsx
│   │   └── SectionControls.tsx
│   └── modals/
│       ├── AddSectionModal.tsx
│       ├── RenameSectionModal.tsx
│       ├── ConfirmDeleteModal.tsx
│       └── TemplateGalleryModal.tsx
├── hooks/
│   ├── useResume.ts         # Resume data + actions
│   ├── useTemplates.ts      # Template management
│   ├── useUndo.ts           # Undo/redo logic
│   ├── useAutoSave.ts       # localStorage sync
│   ├── useDragDrop.ts       # dnd-kit wrapper
│   └── usePDF.ts            # PDF generation
├── lib/
│   ├── supabase.ts          # Future: DB integration
│   ├── storage.ts           # localStorage helpers
│   ├── validation.ts        # Form validation
│   ├── dateUtils.ts         # Date formatting
│   ├── pdfUtils.ts          # PDF utilities
│   └── constants.ts         # App constants
├── store/
│   ├── resumeStore.ts       # Zustand store (resume data)
│   ├── uiStore.ts           # UI state (modals, panels)
│   └── templatesStore.ts    # Template management
├── types/
│   ├── resume.ts            # Resume data model
│   ├── templates.ts         # Template types
│   ├── ui.ts                # UI component props
│   └── forms.ts             # Form field types
├── pages/
│   ├── ResumeBuilder.tsx    # Main app page
│   ├── TemplateGallery.tsx  # Template selector page
│   └── NotFound.tsx
├── styles/
│   └── global.css           # Tailwind directives
├── App.tsx                  # Router setup
├── main.tsx                 # Entry point
└── vite-env.d.ts

public/
├── templates/               # Template asset files
└── fonts/
```

---

## 3. Data Model

### Core Resume Structure

```typescript
interface Resume {
  id: string;
  name: string;
  templateId: string;
  version: number;
  createdAt: Date;
  updatedAt: Date;
  personalInfo: PersonalInfo;
  sections: ResumeSection[];
  sectionOrder: string[];        // Order of display
  hiddenSections: string[];      // Hidden by user
  customSectionTitles: Record<string, string>;
}

interface PersonalInfo {
  fullName: string;
  professionalTitle?: string;
  email: string;
  phone?: string;
  location?: string;
  linkedin?: string;
  portfolio?: string;
  github?: string;
  profilePhoto?: string;  // Base64 or URL
}

interface ResumeSection {
  id: string;
  type: SectionType;           // 'experience', 'education', 'skills', 'custom', etc.
  title: string;               // Display title (customizable)
  defaultTitle: string;        // Original title
  isVisible: boolean;
  isCustom: boolean;
  data: SectionData;
  metadata?: {
    customColor?: string;
    customIcon?: string;
    collapsed?: boolean;
  };
}

type SectionType = 
  | 'personalInfo'
  | 'summary'
  | 'skills'
  | 'experience'
  | 'education'
  | 'projects'
  | 'certifications'
  | 'honors'
  | 'custom';

type SectionData = 
  | ExperienceData
  | EducationData
  | SkillsData
  | ProjectsData
  | CertificationsData
  | HonorsData
  | CustomSectionData;

// Example: Experience
interface ExperienceEntry {
  id: string;
  company: string;
  position: string;
  location?: string;
  startDate: string;          // 'YYYY-MM'
  endDate: string | 'present';
  description: string;        // Rich text (HTML or markdown)
  achievements: string[];
  isCurrent: boolean;
}

interface ExperienceData {
  entries: ExperienceEntry[];
  title: string;
}

// Example: Skills
interface SkillsEntry {
  id: string;
  category: string;          // 'Technical', 'Soft', 'Languages', etc.
  items: string[];
}

interface SkillsData {
  entries: SkillsEntry[];
  title: string;
}

// Example: Custom Section
interface CustomSectionData {
  title: string;
  entries: CustomEntry[];
}

interface CustomEntry {
  id: string;
  title?: string;
  subtitle?: string;
  date?: string;
  description: string;        // Rich text
  url?: string;
}
```

### Resume History (Undo/Redo)

```typescript
interface ResumeHistory {
  past: Resume[];
  present: Resume;
  future: Resume[];
  maxHistorySize: number;
}
```

### Template Structure

```typescript
interface Template {
  id: string;
  name: string;
  category: TemplateCategory;
  thumbnail: string;
  description: string;
  colors: {
    primary: string;
    secondary: string;
    text: string;
    background: string;
  };
  fonts: {
    heading: string;
    body: string;
  };
  spacing: {
    sectionGap: string;
    itemGap: string;
    padding: string;
  };
  layout: 'single-column' | 'two-column' | 'creative';
  component: React.ComponentType<TemplateProps>;
}

type TemplateCategory = 'modern' | 'professional' | 'elegant' | 'creative' | 'ats';

interface TemplateProps {
  resume: Resume;
  isDraft?: boolean;
}
```

---

## 4. State Management (Zustand)

### Store Architecture

```typescript
// resumeStore.ts - Main resume data
interface ResumeStore {
  // State
  resume: Resume | null;
  history: ResumeHistory;
  isSaving: boolean;
  lastSaved: Date | null;
  
  // Actions
  loadResume: (resume: Resume) => void;
  updatePersonalInfo: (info: Partial<PersonalInfo>) => void;
  addSection: (section: ResumeSection) => void;
  updateSection: (sectionId: string, data: Partial<ResumeSection>) => void;
  deleteSection: (sectionId: string) => void;
  reorderSections: (newOrder: string[]) => void;
  toggleSectionVisibility: (sectionId: string) => void;
  renameSection: (sectionId: string, newTitle: string) => void;
  
  // History
  undo: () => void;
  redo: () => void;
  canUndo: () => boolean;
  canRedo: () => boolean;
  
  // Persistence
  reset: () => void;
}

// uiStore.ts - UI state
interface UIStore {
  selectedTemplate: string;
  activeSection: string | null;
  showPreview: boolean;
  modals: {
    addSection: boolean;
    renameSection: boolean;
    templateSelector: boolean;
    confirmDelete: boolean;
  };
  
  setSelectedTemplate: (id: string) => void;
  setActiveSection: (id: string | null) => void;
  togglePreview: () => void;
  openModal: (modal: string) => void;
  closeModal: (modal: string) => void;
  resetUI: () => void;
}

// templatesStore.ts - Available templates
interface TemplatesStore {
  templates: Template[];
  selectedTemplate: Template | null;
  isLoading: boolean;
  
  loadTemplates: () => void;
  selectTemplate: (id: string) => void;
}
```

---

## 5. Component Hierarchy

```
App
├── Navbar
│   ├── Logo
│   ├── ResumeTitle
│   ├── TemplateSelector (dropdown)
│   ├── AutoSaveIndicator
│   └── ExportButton (PDF)
│
├── MainLayout
│   ├── EditorPanel (left, scrollable)
│   │   ├── SectionsList
│   │   │   └── SortableResume Section (dnd-kit)
│   │   │       ├── SectionHeader
│   │   │       │   ├── DragHandle
│   │   │       │   ├── SectionTitle
│   │   │       │   └── SectionControls
│   │   │       │       ├── ToggleVisibility
│   │   │       │       ├── Rename
│   │   │       │       ├── Duplicate
│   │   │       │       ├── Delete (if not required)
│   │   │       │       └── Collapse/Expand
│   │   │       └── SectionForm (conditional)
│   │   │           ├── PersonalInfoForm
│   │   │           ├── SummaryForm
│   │   │           ├── SkillsForm
│   │   │           ├── ExperienceForm
│   │   │           ├── EducationForm
│   │   │           ├── ProjectsForm
│   │   │           ├── CertificationsForm
│   │   │           ├── HonorsForm
│   │   │           └── CustomSectionForm
│   │   └── AddSectionButton
│   │
│   ├── PreviewPanel (right, scrollable)
│   │   ├── TemplateRenderer
│   │   │   └── [Selected Template Component]
│   │   │       ├── HeaderSection (Personal Info)
│   │   │       ├── SummarySection
│   │   │       ├── SkillsSection
│   │   │       ├── ExperienceSection
│   │   │       ├── EducationSection
│   │   │       ├── ProjectsSection
│   │   │       ├── CertificationsSection
│   │   │       ├── HonorsSection
│   │   │       └── [Dynamic Custom Sections]
│   │   └── PrintButton
│   │
│   └── MobileToggle (tablet/mobile only)
│
├── Modals
│   ├── AddSectionModal
│   ├── RenameSectionModal
│   ├── ConfirmDeleteModal
│   └── TemplateGalleryModal
│
└── FloatingActionBar (mobile only)
    ├── TogglePreview
    ├── AddSection
    └── Export
```

---

## 6. Drag & Drop Architecture

### dnd-kit Implementation Strategy

```typescript
// useDragDrop.ts hook
interface UseDragDropReturn {
  sensors: PointerSensor[];
  collisionDetection: CollisionDetection;
  announcements: Announcements;
  handlers: {
    onDragStart: (event: DragStartEvent) => void;
    onDragEnd: (event: DragEndEvent) => void;
    onDragCancel: (event: DragCancelEvent) => void;
  };
}

// SortableResume Section component
function SortableSectionItem({ section, index }: Props) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } 
    = useSortable({ id: section.id });
  
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };
  
  return (
    <div ref={setNodeRef} style={style} className="section-item">
      <DragHandle {...listeners} {...attributes} />
      <SectionContent section={section} />
    </div>
  );
}

// In SectionsList
<DndContext
  sensors={sensors}
  collisionDetection={closestCenter}
  onDragEnd={handleDragEnd}
>
  <SortableContext items={resume.sectionOrder} strategy={verticalListSortingStrategy}>
    {resume.sections.map((section) => (
      <SortableSectionItem key={section.id} section={section} />
    ))}
  </SortableContext>
  <DragOverlay />
</DndContext>
```

---

## 7. Rich Text Editing Strategy

### Lexical Integration

```typescript
// RichTextEditor.tsx
function RichTextEditor({ value, onChange }: Props) {
  const initialConfig = {
    namespace: 'ResumBuilder',
    theme: resumeEditorTheme,
    onError,
    nodes: [
      QuoteNode,
      MarkNode,
      LinkNode,
      ListNode,
      ListItemNode,
      HeadingNode,
      // ... other nodes
    ],
    editorState: createEditorState(value),
  };
  
  return (
    <LexicalComposer initialConfig={initialConfig}>
      <PlainTextPlugin
        contentEditable={<ContentEditable className="editor" />}
        placeholder={<Placeholder />}
        ErrorBoundary={LexicalErrorBoundary}
      />
      <OnChangePlugin onChange={onChange} />
      <HistoryPlugin />
      <LinkPlugin />
      <ListPlugin />
      <RichTextPlugin />
    </LexicalComposer>
  );
}
```

---

## 8. PDF Export Strategy

### Multi-Stage PDF Generation

```typescript
// usePDF.ts hook
interface UsePDFReturn {
  exportPDF: () => Promise<void>;
  isExporting: boolean;
  error: Error | null;
}

// Process:
// 1. Get resume preview DOM element
// 2. Use html2canvas to convert to image (preserves styling)
// 3. Use jsPDF to create PDF with proper dimensions
// 4. Handle multi-page layout automatically
// 5. Preserve hyperlinks using jsPDF link annotations
// 6. Download file

async function exportResumeToPDF(resume: Resume, templateId: string) {
  // Get the preview element
  const previewElement = document.getElementById('resume-preview');
  
  // Configure canvas options for high quality
  const canvas = await html2canvas(previewElement, {
    scale: 2,
    useCORS: true,
    logging: false,
    backgroundColor: '#ffffff',
  });
  
  // Create PDF with proper dimensions (A4)
  const pdf = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4',
  });
  
  const imgData = canvas.toDataURL('image/png');
  const pageWidth = pdf.internal.pageSize.getWidth();
  const pageHeight = pdf.internal.pageSize.getHeight();
  
  // Handle multi-page
  let heightLeft = canvas.height;
  let position = 0;
  
  while (heightLeft >= 0) {
    const imgHeight = (canvas.width * pageHeight) / pageWidth;
    pdf.addImage(imgData, 'PNG', 0, position, pageWidth, imgHeight);
    heightLeft -= pageHeight;
    position -= pageHeight;
    
    if (heightLeft > 0) {
      pdf.addPage();
    }
  }
  
  // Extract and add hyperlinks
  const links = previewElement.querySelectorAll('a[href]');
  links.forEach((link) => {
    const text = link.innerText;
    const href = link.getAttribute('href');
    // Add link annotation to PDF
    pdf.textWithLink(text, x, y, { pageNumber: pageNum });
  });
  
  pdf.save(`resume-${resume.name}.pdf`);
}
```

---

## 9. Template System

### Template Registry Pattern

```typescript
// templates/registry.ts
export const TEMPLATES: Record<string, Template> = {
  'modern-minimal': {
    id: 'modern-minimal',
    name: 'Modern Minimal',
    category: 'modern',
    component: ModernMinimal,
    colors: { primary: '#000', secondary: '#666', text: '#333', background: '#fff' },
    fonts: { heading: 'Inter', body: 'Inter' },
    // ...
  },
  'professional-corporate': { /* ... */ },
  'elegant-two-column': { /* ... */ },
  'creative-designer': { /* ... */ },
  'ats-friendly': { /* ... */ },
};

// templates/TemplateRenderer.tsx
function TemplateRenderer({ resume, templateId }: Props) {
  const Template = TEMPLATES[templateId]?.component || TEMPLATES['modern-minimal'].component;
  return <Template resume={resume} />;
}

// Template-specific components
function ModernMinimal({ resume }: TemplateProps) {
  return (
    <div className="template-modern-minimal">
      <Header personalInfo={resume.personalInfo} />
      {resume.sections.map((section) => (
        <SectionRenderer key={section.id} section={section} />
      ))}
    </div>
  );
}
```

### Template Switching
- Preserves all resume data
- Only changes visual presentation
- Instant preview update
- No data loss

---

## 10. Auto-Save & Undo/Redo

### Auto-Save Implementation

```typescript
// useAutoSave.ts hook
export function useAutoSave(resume: Resume, debounceMs = 1000) {
  const [isSaving, setIsSaving] = useState(false);
  const [lastSaved, setLastSaved] = useState<Date | null>(null);
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsSaving(true);
      
      // Persist to localStorage
      localStorage.setItem(
        `resume-${resume.id}`,
        JSON.stringify({
          data: resume,
          timestamp: new Date(),
        })
      );
      
      setIsSaving(false);
      setLastSaved(new Date());
    }, debounceMs);
    
    return () => clearTimeout(timer);
  }, [resume]);
  
  return { isSaving, lastSaved };
}

// Undo/Redo in resumeStore
const useResumeStore = create<ResumeStore>((set, get) => ({
  history: {
    past: [],
    present: initialResume,
    future: [],
    maxHistorySize: 50,
  },
  
  undo: () => {
    const { past, present, future } = get().history;
    if (past.length === 0) return;
    
    const newPast = past.slice(0, -1);
    const newPresent = past[past.length - 1];
    const newFuture = [present, ...future];
    
    set((state) => ({
      ...state,
      history: { past: newPast, present: newPresent, future: newFuture.slice(0, 50) },
      resume: newPresent,
    }));
  },
  
  redo: () => {
    const { past, present, future } = get().history;
    if (future.length === 0) return;
    
    const newPresent = future[0];
    const newPast = [...past, present];
    const newFuture = future.slice(1);
    
    set((state) => ({
      ...state,
      history: { past: newPast, present: newPresent, future: newFuture },
      resume: newPresent,
    }));
  },
}));
```

---

## 11. Responsive Design Strategy

### Breakpoints
- **Desktop (≥1024px)**: Editor left, Preview right (50/50 split)
- **Tablet (768px-1023px)**: Stacked, toggle between editor/preview
- **Mobile (<768px)**: Full-width editor, slide-out preview

### Layout Implementation

```tsx
// MainLayout.tsx
export function MainLayout() {
  const [showPreview, setShowPreview] = useUIStore((s) => [s.showPreview, s.setShowPreview]);
  
  return (
    <div className="layout">
      {/* Desktop: Both visible */}
      <div className="hidden lg:grid lg:grid-cols-2 gap-4 h-screen">
        <EditorPanel />
        <PreviewPanel />
      </div>
      
      {/* Tablet: Toggle */}
      <div className="hidden md:block lg:hidden h-screen overflow-hidden">
        {showPreview ? <PreviewPanel /> : <EditorPanel />}
        <ToggleButton onClick={() => setShowPreview(!showPreview)} />
      </div>
      
      {/* Mobile: Stacked */}
      <div className="md:hidden flex flex-col h-screen">
        <EditorPanel maxHeight="70%" />
        <MobilePreviewSlideout>
          <PreviewPanel />
        </MobilePreviewSlideout>
      </div>
    </div>
  );
}
```

---

## 12. Form Validation Strategy

```typescript
// validation.ts
export const validators = {
  email: (value: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value),
  phone: (value: string) => /^[\d\s+\-().]+$/.test(value),
  url: (value: string) => {
    try { new URL(value); return true; } catch { return false; }
  },
  linkedin: (value: string) => value.includes('linkedin.com'),
  github: (value: string) => value.includes('github.com'),
  required: (value: string) => value.trim().length > 0,
};

// Field-level validation in forms
function EmailField({ value, onChange }: Props) {
  const [error, setError] = useState('');
  
  const handleChange = (newValue: string) => {
    onChange(newValue);
    if (newValue && !validators.email(newValue)) {
      setError('Invalid email address');
    } else {
      setError('');
    }
  };
  
  return (
    <Input
      value={value}
      onChange={handleChange}
      error={error}
      placeholder="email@example.com"
    />
  );
}
```

---

## 13. Keyboard Shortcuts

| Shortcut | Action |
|----------|--------|
| `Ctrl/Cmd + Z` | Undo |
| `Ctrl/Cmd + Shift + Z` | Redo |
| `Ctrl/Cmd + E` | Export PDF |
| `Ctrl/Cmd + ,` | Open Settings |
| `Escape` | Close modals |
| `Tab` | Navigate form fields |
| `Enter` | Submit/Add item |

---

## 14. Implementation Milestones

### Phase 1: Foundation (40% - Days 1-3)
- [ ] Project scaffold & folder structure
- [ ] Core data model (Resume, PersonalInfo, Sections)
- [ ] Zustand store setup
- [ ] TypeScript types
- [ ] localStorage persistence
- [ ] Undo/redo system
- [ ] Basic UI components (Input, Button, DatePicker)

### Phase 2: Editor (30% - Days 4-6)
- [ ] Editor panel layout
- [ ] Personal info form
- [ ] Section listing & controls
- [ ] Rich text editor (Lexical)
- [ ] Skills form with categories
- [ ] Experience form with achievements
- [ ] Education form
- [ ] Projects form
- [ ] Certifications form
- [ ] Honors form
- [ ] Custom section support

### Phase 3: Drag & Drop (15% - Days 7)
- [ ] dnd-kit setup
- [ ] Sortable sections
- [ ] Visual feedback (drag preview)
- [ ] Reorder persistence
- [ ] Mobile touch support

### Phase 4: Templates & Preview (20% - Days 8-9)
- [ ] Modern Minimal template
- [ ] Professional Corporate template
- [ ] Elegant Two Column template
- [ ] Creative Designer template
- [ ] ATS Friendly template
- [ ] Template preview rendering
- [ ] Template switching logic
- [ ] Responsive template layouts

### Phase 5: PDF Export (10% - Day 10)
- [ ] html2pdf setup
- [ ] PDF generation
- [ ] Multi-page handling
- [ ] Hyperlink preservation
- [ ] Font embedding
- [ ] Quality testing

### Phase 6: Responsive Design & Polish (10% - Day 11)
- [ ] Mobile layout
- [ ] Tablet layout
- [ ] Touch interactions
- [ ] Animation polish
- [ ] Loading states
- [ ] Error handling
- [ ] Accessibility (a11y)

### Phase 7: Testing & Optimization (5% - Day 12)
- [ ] Cross-browser testing
- [ ] Performance optimization
- [ ] Re-render optimization
- [ ] Accessibility audit
- [ ] User testing

---

## 15. Future Extensibility Points

### Phase 2+: Cloud & Authentication
```typescript
// Already prepared via supabase.ts in lib/
// Just add:
- User authentication (Supabase Auth)
- Multi-resume support
- Cloud storage (Supabase DB)
- Real-time sync
- Resume versioning
```

### Phase 3+: AI Features
```typescript
- AI-generated professional summaries
- Skill suggestions based on experience
- ATS compatibility scoring
- Resume improvement recommendations
- Grammar & tone checking
```

### Phase 4+: Collaboration
```typescript
- Share resume links
- Collaborative editing
- Comments & feedback
- Review workflow
```

### Phase 5+: Advanced
```typescript
- Cover letter builder
- Multiple languages
- Theme marketplace
- LinkedIn import
- LinkedIn sync
- Resume scoring
```

---

## 16. Performance Optimizations

### Rendering
- `React.memo` for template sections
- `useMemo` for expensive computations
- `useCallback` for event handlers
- Virtual scrolling for long lists
- Lazy-load templates

### State
- Zustand for minimal re-renders
- Separate stores for resume vs UI state
- No Redux (lighter bundle)

### Building
- Code splitting by route
- Tree-shaking unused code
- CSS Tailwind purge
- Image optimization
- Font subsetting

---

## 17. Accessibility (WCAG 2.1 AA)

- Semantic HTML
- ARIA labels on form fields
- Keyboard navigation (Tab, Enter, Escape)
- Color contrast ≥4.5:1
- Focus indicators
- Screen reader tested
- Date picker accessibility
- Rich text editor accessibility (Lexical built-in)

---

## 18. Testing Strategy

### Unit Tests
```
- Validation functions
- Data transformations
- Store actions
- Date utilities
```

### Integration Tests
```
- Form submission
- Section reordering
- Template switching
- Undo/redo
- Auto-save
```

### E2E Tests
```
- Full user flow
- PDF export
- All templates
- Mobile responsiveness
```

---

## 19. Deployment

### Build & Serve
- Vite build to static SPA
- Docker + nginx (from scaffold)
- No backend initially (client-side only)
- Ready for future Supabase backend

### Hosting
- Deploy on Sprites (default)
- Or any static host (Vercel, Netlify)
- Env vars for future backend

---

## 20. Dependencies (Final List)

```json
{
  "react": "^19.0.0",
  "react-dom": "^19.0.0",
  "react-router-dom": "^6.x",
  "typescript": "^5.x",
  "vite": "^5.x",
  "@vitejs/plugin-react": "^4.x",
  "tailwindcss": "^3.x",
  "postcss": "^8.x",
  "autoprefixer": "^10.x",
  "@dnd-kit/core": "^8.x",
  "@dnd-kit/utilities": "^3.x",
  "@dnd-kit/sortable": "^8.x",
  "@dnd-kit/accessibility": "^1.x",
  "lexical": "^0.15.x",
  "@lexical/react": "^0.15.x",
  "@lexical/rich-text": "^0.15.x",
  "@lexical/link": "^0.15.x",
  "@lexical/list": "^0.15.x",
  "zustand": "^4.x",
  "date-fns": "^3.x",
  "html2pdf.js": "^0.10.x",
  "jspdf": "^2.5.x",
  "html2canvas": "^1.4.x"
}
```

---

## 21. Architecture Diagram

```
┌─────────────────────────────────────────────────────┐
│                    Resume Builder                    │
├─────────────────────────────────────────────────────┤
│                                                       │
│  ┌──────────────────────────────────────────────┐  │
│  │          React Router (BrowserRouter)        │  │
│  └──────────────────────────────────────────────┘  │
│                       │                              │
│         ┌─────────────┼─────────────┐                │
│         ▼             ▼             ▼                │
│    ┌─────────┐  ┌──────────┐  ┌──────────┐          │
│    │ResumeApp│  │Template  │  │NotFound  │          │
│    │Builder  │  │Gallery   │  │Page     │          │
│    └────┬────┘  └──────────┘  └──────────┘          │
│         │                                             │
│         ▼                                             │
│    ┌────────────────────────────────────┐           │
│    │        Zustand Store Layer         │           │
│    │  ┌────────────────────────────┐   │           │
│    │  │ resumeStore (data)         │   │           │
│    │  │ uiStore (UI state)         │   │           │
│    │  │ templatesStore (templates) │   │           │
│    │  └────────────────────────────┘   │           │
│    └────────────────────────────────────┘           │
│         │                 │                          │
│    ┌────▼─────┐       ┌───▼──────┐                 │
│    │Editor    │       │Preview   │                 │
│    │Panel     │       │Panel     │                 │
│    └────┬─────┘       └───┬──────┘                 │
│         │                 │                         │
│         ▼                 ▼                         │
│    ┌──────────────┐  ┌───────────────┐            │
│    │ dnd-kit      │  │ Template      │            │
│    │ (Drag/Drop)  │  │ Renderer      │            │
│    │              │  │ (5 templates) │            │
│    │ Form Fields  │  │               │            │
│    │ Lexical      │  │ pdf Export    │            │
│    │ Editor       │  │ (jsPDF)       │            │
│    └──────────────┘  └───────────────┘            │
│         │                 │                        │
│    ┌────▼─────────────────▼────┐                  │
│    │   localStorage (auto-save) │                  │
│    │   History (undo/redo)      │                  │
│    └─────────────────────────────┘                  │
│                                                     │
│  ┌────────────────────────────────────────────┐   │
│  │ Future: Supabase Backend                   │   │
│  │ - Authentication                           │   │
│  │ - Cloud Storage                            │   │
│  │ - Multi-resume management                  │   │
│  │ - Real-time sync                           │   │
│  │ - AI features (Edge Functions)             │   │
│  └────────────────────────────────────────────┘   │
│                                                     │
└─────────────────────────────────────────────────────┘
```

---

## 22. Code Quality Standards

### Type Safety
- Zero `any` (except error catches)
- Strict TypeScript config
- Proper generic types
- Discriminated unions for complex data

### Architecture
- Separation of concerns
- No component prop drilling (use store)
- Reusable UI components
- Utility functions for common logic
- Clear naming conventions

### Performance
- Memoization where needed
- Virtualization for long lists
- Code splitting by route
- Lazy loading of templates

### Maintainability
- JSDoc comments on complex functions
- Clear file organization
- Consistent file naming
- No code duplication

---

## 23. Success Criteria

- ✅ 5 professional templates work perfectly
- ✅ All 9 predefined sections + custom sections work
- ✅ Drag-and-drop smooth and intuitive
- ✅ Live preview matches PDF export
- ✅ PDF export preserves hyperlinks
- ✅ Auto-save works without data loss
- ✅ Undo/redo 50 levels deep
- ✅ Fully responsive (desktop/tablet/mobile)
- ✅ All forms validated
- ✅ Keyboard shortcuts work
- ✅ <3s initial load
- ✅ Accessibility passes WCAG AA
- ✅ Zero TypeScript errors
- ✅ Production-ready code quality

---

## 24. Next Steps

1. **Review & approve this plan** ← You are here
2. **Begin Phase 1: Foundation** (scaffold, data model, store)
3. Progress through phases in order
4. Testing & optimization at the end
5. Deploy to production

---

**Ready to build a world-class resume builder! 🚀**
