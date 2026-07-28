import { Download, FileText, Settings } from 'lucide-react';
import { Button } from './Button';

interface HeaderProps {
  onExportPdf: () => void;
  onExportDocx: () => void;
  onSettings: () => void;
  isExporting: boolean;
  templateName: string;
}

export function Header({ onExportPdf, onExportDocx, onSettings, isExporting, templateName }: HeaderProps) {
  return (
    <header className="border-b border-black bg-white">
      <div className="px-8 py-6 flex items-center justify-between">
        <div className="flex-1">
          <h1 className="text-3xl font-bold text-black">Resume Builder</h1>
          <p className="text-sm text-black mt-2 font-light">Template: {templateName}</p>
        </div>

        <div className="flex items-center gap-6">
          <Button onClick={onSettings} variant="secondary" size="lg" className="flex items-center gap-2">
            <Settings size={20} />
            Manage
          </Button>

          <div className="flex items-center gap-3">
            <Button
              onClick={onExportPdf}
              disabled={isExporting}
              size="lg"
              className="flex items-center gap-2"
            >
              <Download size={20} />
              {isExporting ? 'Exporting...' : 'Export PDF'}
            </Button>

            <Button
              onClick={onExportDocx}
              disabled={isExporting}
              variant="secondary"
              size="lg"
              className="flex items-center gap-2"
            >
              <FileText size={20} />
              Export DOCX
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}
