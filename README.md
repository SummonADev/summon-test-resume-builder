# Resume Builder - Professional Resume Creation Tool

A modern, production-quality resume builder application built with React, Vite, and TypeScript. Create pixel-perfect resumes with drag-and-drop simplicity and export as PDF.

## ✨ Features

### Core Functionality
- **5 Professional Templates** – Modern Minimal, Professional Corporate, Elegant Two Column, Creative Designer, and ATS-Friendly
- **Drag-and-Drop Section Reordering** – Rearrange resume sections with intuitive drag-and-drop
- **Live Preview** – See changes instantly as you edit
- **Responsive Design** – Desktop, tablet, and mobile preview modes
- **Auto-Save** – All data is automatically saved to your browser
- **Undo/Redo** – 50-level history with Ctrl+Z/Y shortcuts
- **PDF Export** – Download your resume as a pixel-perfect PDF
- **Template Switching** – Switch between templates without losing data

### Resume Sections
- **Personal Information** – Name, contact details, social links (required)
- **Professional Summary** – Overview of your professional background
- **Work Experience** – Job positions with descriptions and achievements
- **Education** – Degrees, institutions, and graduation dates
- **Skills** – Categorized technical and soft skills
- **Projects** – Portfolio projects with technologies and links
- **Certifications** – Professional certifications and credentials
- **Awards & Honors** – Recognition and achievements
- **Custom Sections** – Create unlimited custom sections for additional content

### Section Controls
Each section supports:
- ✓ Show/Hide toggle
- ✓ Custom title renaming
- ✓ Delete (except Personal Information)
- ✓ Collapse/Expand for easy navigation
- ✓ Drag-and-drop reordering

### User Experience
- **Resume Completeness Indicator** – Track how complete your resume is
- **Keyboard Shortcuts** – Ctrl+Z (Undo), Ctrl+Y (Redo), Ctrl+Shift+S (Export PDF)
- **Helpful Hints** – Floating help button with keyboard shortcuts reference
- **Form Validation** – Smart validation with helpful error messages
- **Smooth Animations** – Polish UI transitions and interactions

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ and npm

### Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Type check
npm run typecheck
```

The application will be available at `http://localhost:5173`

## 📝 Usage

### Creating Your Resume

1. **Fill Personal Information** – Start with your name and contact details
2. **Add Content** – Fill in education, experience, skills, and other sections
3. **Customize** – Rename sections, reorder them, and hide what's not needed
4. **Preview** – Switch between different templates and preview modes
5. **Export** – Download your resume as PDF when ready

### Tips

- **Keyboard Shortcuts**
  - `Ctrl+Z` / `Cmd+Z` – Undo last change
  - `Ctrl+Y` / `Cmd+Y` – Redo last change
  - `Ctrl+Shift+S` / `Cmd+Shift+S` – Export to PDF

- **Reordering Sections**
  - Click the Settings icon in the sidebar (gear icon)
  - Drag sections to reorder them
  - Changes apply immediately to the preview

- **Hiding Sections**
  - Click the eye icon on any section to show/hide
  - Hidden sections won't appear in the exported PDF

- **Renaming Sections**
  - Click the gear icon on a section to rename its title
  - Custom names are saved and used across all templates

## 🎨 Templates

### Modern Minimal
Clean, minimalist design with blue accent color. Perfect for most professions.

### Professional Corporate
Traditional business-focused layout with formal typography. Great for corporate roles.

### Elegant Two Column
Sidebar design with contact information on the left and main content on the right.

### Creative Designer
Bold, visually striking layout with gradient backgrounds and color accents. Perfect for creative roles.

### ATS-Friendly
Plain text, simple formatting optimized for Applicant Tracking Systems (ATS).

## 💾 Data Storage

- **Local Storage** – All resume data is stored in your browser's local storage
- **Auto-Save** – Changes are automatically saved as you type
- **No Account Required** – No registration or login needed
- **Privacy** – Your data never leaves your browser

## 🏗️ Architecture

### Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── sections/       # Section-specific forms
│   └── ...
├── pages/              # Page components (routes)
├── store/              # Zustand state management
├── hooks/              # Custom React hooks
├── lib/                # Utilities and helpers
├── templates/          # Resume template components
├── types/              # TypeScript type definitions
└── styles/             # Global CSS with Tailwind
```

### Key Technologies

- **React 19** – UI framework
- **TypeScript** – Type safety
- **Tailwind CSS v3** – Styling
- **Zustand** – State management with 50-level undo/redo history
- **dnd-kit** – Accessible drag-and-drop
- **jsPDF + html2canvas** – PDF generation
- **Lucide React** – Icons
- **date-fns** – Date formatting

### State Management

The application uses Zustand for state management with a single store containing:
- Resume data (personal, sections, template)
- UI state (expanded sections, preview mode, sidebar)
- History management (50-level undo/redo)

All changes trigger auto-save to localStorage.

## 🔧 Development

### Extending with New Features

#### Adding a New Section Type

1. Add to `SectionType` union in `src/types/resume.ts`
2. Add default section to `src/lib/default-resume.ts`
3. Add store methods to `src/store/resume-store.ts`
4. Create form component in `src/components/sections/`
5. Import and render in `src/pages/ResumeBuilder.tsx`
6. Render in templates: `src/templates/`

#### Adding a New Template

1. Create component in `src/templates/TemplateName.tsx`
2. Import and add case to `src/lib/template-factory.tsx`
3. Add to `TEMPLATES` array
4. Add to `TemplateName` union type in `src/types/resume.ts`

## 🌐 Browser Support

- Chrome/Edge 90+
- Firefox 88+
- Safari 15+
- Mobile browsers (iOS Safari, Chrome Mobile)

## 🚀 Future Enhancements

- ✅ User authentication (Supabase)
- ✅ Cloud storage and sync
- ✅ Resume sharing and view-only links
- ✅ Multiple resume management
- ✅ AI-powered suggestions (summaries, skills)
- ✅ ATS compatibility scoring
- ✅ Cover letter builder
- ✅ Import from LinkedIn
- ✅ Version history and recovery
- ✅ Collaboration features
- ✅ Multi-language support
- ✅ Theme customization

## 📄 License

This project is open source and available under the MIT License.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📞 Support

For issues, questions, or suggestions, please open an issue on GitHub.

---

**Made with ❤️ using React, Vite, and TypeScript**
