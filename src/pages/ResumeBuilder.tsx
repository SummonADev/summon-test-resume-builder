import { useRef } from 'react';
import { useResumeStore } from '@/store/resume-store';
import { Header } from '@/components/Header';
import { EditorSidebar } from '@/components/EditorSidebar';
import { PreviewPanel } from '@/components/PreviewPanel';

export default function ResumeBuilder() {
  const previewRef = useRef<HTMLDivElement>(null);
  const resume = useResumeStore((state) => state.resume);

  return (
    <div className="flex flex-col h-screen bg-white">
      <Header />
      <div className="flex flex-1 overflow-hidden">
        <EditorSidebar />
        <PreviewPanel previewRef={previewRef} />
      </div>
    </div>
  );
}
