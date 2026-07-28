# Quick Start Guide - Resume Builder

## 🚀 Get Up and Running in 5 Minutes

### 1. Install Dependencies
```bash
npm install
```

### 2. Start Development Server
```bash
npm run dev
```
The app opens at `http://localhost:5173`

### 3. Start Building Resumes!
- Fill in your **Personal Information** (required: name & email)
- Add content to sections (experience, education, skills, etc.)
- Preview with different **Templates** (use the Template button in header)
- Reorder sections (click the Settings gear icon in sidebar)
- **Export as PDF** when ready (Export PDF button in header)

## 🎮 Essential Shortcuts

| Shortcut | Action |
|----------|--------|
| `Ctrl+Z` | Undo |
| `Ctrl+Y` | Redo |
| `Ctrl+Shift+S` | Export PDF |

*(Mac: Use `Cmd` instead of `Ctrl`)*

## 📁 Project Structure Quick Reference

```
src/
├── pages/
│   └── ResumeBuilder.tsx          # Main app page
├── components/
│   ├── Header.tsx                 # Top navigation
│   ├── EditorSidebar.tsx          # Left sidebar
│   ├── PreviewPanel.tsx           # Right preview
│   ├── sections/                  # Form components for each section
│   │   ├── PersonalInfoForm.tsx
│   │   ├── ExperienceForm.tsx
│   │   └── ...
│   └── *.tsx                      # Other UI components
├── templates/                     # Resume designs
│   ├── ModernMinimal.tsx
│   ├── ProfessionalCorporate.tsx
│   ├── ElegantTwoColumn.tsx
│   ├── CreativeDesigner.tsx
│   └── ATSFriendly.tsx
├── store/
│   └── resume-store.ts            # Zustand state management
├── lib/
│   ├── template-factory.tsx       # Template rendering
│   ├── pdf-export.ts              # PDF generation
│   ├── validation.ts              # Form validation
│   └── default-resume.ts          # Default data
├── types/
│   └── resume.ts                  # TypeScript types
└── styles/
    └── global.css                 # Tailwind + custom CSS
```

## 🔧 Common Development Tasks

### Adding a New Section Type

1. **Update Type Definition** (`src/types/resume.ts`):
```typescript
export interface MySection {
  items: MyItem[];
  isVisible: boolean;
  customTitle: string;
}
```

2. **Add to Default Resume** (`src/lib/default-resume.ts`):
```typescript
mySection: {
  items: [],
  isVisible: true,
  customTitle: 'My Section',
}
```

3. **Add Store Methods** (`src/store/resume-store.ts`):
```typescript
addMyItem: (item: MyItem) => { /* ... */ },
deleteMyItem: (id: string) => { /* ... */ },
```

4. **Create Form Component** (`src/components/sections/MyForm.tsx`):
```typescript
export default function MyForm() {
  const resume = useResumeStore(state => state.resume);
  // ... form JSX
}
```

5. **Add to Editor** (`src/pages/ResumeBuilder.tsx`):
```typescript
import MyForm from '@/components/sections/MyForm';

// In JSX:
<MyForm />
```

6. **Render in Templates** (`src/templates/ModernMinimal.tsx`):
```typescript
{mySection.isVisible && mySection.items.length > 0 && (
  <div>
    {/* Render my section */}
  </div>
)}
```

### Adding a New Template

1. **Create Template** (`src/templates/MyTemplate.tsx`):
```typescript
interface MyTemplateProps {
  resume: Resume;
}

export default function MyTemplate({ resume }: MyTemplateProps) {
  // Your template JSX
}
```

2. **Register Template** (`src/lib/template-factory.tsx`):
```typescript
import MyTemplate from '@/templates/MyTemplate';

export const TEMPLATES = [
  // ... existing
  {
    id: 'my-template',
    name: 'My Template',
    description: 'My custom template',
  },
];

export function renderTemplate(resume: Resume) {
  switch (resume.template) {
    // ... cases
    case 'my-template':
      return <MyTemplate resume={resume} />;
  }
}
```

3. **Add Type** (`src/types/resume.ts`):
```typescript
export type TemplateName = 
  | 'modern-minimal'
  | 'my-template'  // Add here
  // ... other templates
```

## 🧪 Testing

### Type Check
```bash
npm run typecheck
```

### Build Production
```bash
npm run build
```

### Preview Production Build
```bash
npm run preview
```

## 💾 Data Storage

All resume data is stored in **browser localStorage** under the key `resume-builder-data`:

```javascript
// Access stored data
const stored = localStorage.getItem('resume-builder-data');
const resume = JSON.parse(stored);
```

**Clear all data** (warning - irreversible):
```javascript
localStorage.removeItem('resume-builder-data');
```

## 🎨 Styling

Uses **Tailwind CSS v3** with custom layers:

```css
/* Global styles in src/styles/global.css */
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer components {
  .input-field {
    /* Custom input styling */
  }
}
```

## 🚀 Deployment

### Build Docker Image
```bash
docker build -t resume-builder .
```

### Run Docker Container
```bash
docker run -p 80:80 resume-builder
```

## 🐛 Debugging

### Enable Console Logging
Edit templates to log resume data:
```typescript
console.log('Resume data:', resume);
```

### Check localStorage
```javascript
// Browser console
console.log(JSON.parse(localStorage.getItem('resume-builder-data')));
```

### TypeScript Errors
```bash
npm run typecheck
```

## 📖 Key Files to Know

| File | Purpose |
|------|---------|
| `resume-store.ts` | All state and CRUD logic |
| `template-factory.tsx` | Template selection and rendering |
| `ResumeBuilder.tsx` | Main app layout and orchestration |
| `resume.ts` (types) | All TypeScript interfaces |
| `pdf-export.ts` | PDF generation logic |
| `validation.ts` | Form validation rules |

## 💡 Pro Tips

1. **Use Form Components** – Reuse `FormInput`, `FormTextarea`, `FormSelect`
2. **Keep Store Simple** – All mutations go through Zustand
3. **Avoid Prop Drilling** – Use Zustand for global state
4. **Type Everything** – TypeScript catches errors early
5. **Test Templates Locally** – Switch templates while editing
6. **Save Often** – Auto-save is enabled but manual `saveResume()` is available

## 🆘 Troubleshooting

### App not updating after changes
- Hard refresh: `Ctrl+Shift+R` (or `Cmd+Shift+R` on Mac)
- Clear browser cache
- Check browser console for errors

### PDF export not working
- Check browser console for errors
- Ensure preview element has content
- Try a different browser
- Check available disk space

### Styles not applying
- Clear Tailwind cache
- Rebuild: `npm run build`
- Check `global.css` imports Tailwind

### TypeScript errors
```bash
# Clear node_modules and reinstall
rm -rf node_modules
npm install
npm run typecheck
```

## 📚 Resources

- [React Docs](https://react.dev)
- [TypeScript Docs](https://www.typescriptlang.org)
- [Tailwind CSS](https://tailwindcss.com)
- [Zustand Docs](https://github.com/pmndrs/zustand)
- [dnd-kit Docs](https://docs.dndkit.com)

---

**Happy coding! 🚀**
