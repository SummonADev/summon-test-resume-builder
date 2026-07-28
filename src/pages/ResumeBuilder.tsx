import { useResumeStore } from '@/store/resume-store';

export default function ResumeBuilder() {
  const resume = useResumeStore((state) => state.resume);

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-slate-900 mb-4">Resume Builder</h1>
        <p className="text-lg text-slate-600 mb-8">
          Current resume: <span className="font-semibold">{resume.name}</span>
        </p>
        <p className="text-slate-500">Building Phase 1 foundation...</p>
      </div>
    </div>
  );
}
