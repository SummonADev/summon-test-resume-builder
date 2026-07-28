import { useResumeStore } from '@/store/resume-store';

interface PreviewPanelProps {
  previewRef?: React.RefObject<HTMLDivElement>;
}

export function PreviewPanel({ previewRef }: PreviewPanelProps) {
  const resume = useResumeStore((state) => state.resume);

  return (
    <div className="w-1/2 bg-white overflow-y-auto border-l border-black">
      <div ref={previewRef} className="p-12 bg-white max-w-4xl mx-auto">
        <div className="font-lato text-black">
          {/* Header */}
          <div className="border-b-2 border-black pb-6 mb-8">
            <h1 className="text-3xl font-bold">{resume.personal.fullName || 'Your Name'}</h1>
            {resume.personal.professionalTitle && (
              <p className="text-lg font-light mt-1">{resume.personal.professionalTitle}</p>
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
              {resume.personal.location && <span>{resume.personal.location}</span>}
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

          {/* Placeholder Text */}
          <div className="text-gray-500 text-sm">
            <p>• Fill in your Personal Information on the left</p>
            <p>• Add your work experience, education, and skills</p>
            <p>• Export as PDF or DOCX when ready</p>
          </div>
        </div>
      </div>
    </div>
  );
}
