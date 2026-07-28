import { Download } from 'lucide-react';

export function Header() {
  return (
    <div className="border-b border-black bg-white px-8 py-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-black font-lato">Resume Builder</h1>
          <p className="text-sm text-gray-700 mt-1 font-lato">Create your professional resume</p>
        </div>
        <button className="flex items-center gap-2 px-6 py-3 bg-black text-white font-lato font-medium hover:bg-gray-900 transition">
          <Download size={18} />
          Export
        </button>
      </div>
    </div>
  );
}
