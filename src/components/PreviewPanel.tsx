import React from 'react';

interface PreviewPanelProps {
  children: React.ReactNode;
}

export function PreviewPanel({ children }: PreviewPanelProps) {
  return (
    <section className="w-full lg:w-3/5 bg-white border-l border-black overflow-y-auto">
      <div className="p-8">
        <h2 className="text-2xl font-bold text-black mb-8">Preview</h2>
        <div className="preview-container bg-white border-2 border-black rounded p-8">
          {children}
        </div>
      </div>
    </section>
  );
}
