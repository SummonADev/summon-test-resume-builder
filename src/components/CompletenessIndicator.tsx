import { getResumeCompleteness } from '@/lib/validation';
import { Resume } from '@/types/resume';
import clsx from 'clsx';

interface CompletenessIndicatorProps {
  resume: Resume;
}

export default function CompletenessIndicator({ resume }: CompletenessIndicatorProps) {
  const { percentage, completed, total } = getResumeCompleteness(resume);

  const getColor = () => {
    if (percentage >= 80) return 'bg-green-500';
    if (percentage >= 60) return 'bg-blue-500';
    if (percentage >= 40) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  const getLabel = () => {
    if (percentage >= 80) return 'Great! Almost complete';
    if (percentage >= 60) return 'Good progress';
    if (percentage >= 40) return 'Getting there';
    return 'Just getting started';
  };

  return (
    <div className="p-3 bg-slate-50 rounded-lg border border-slate-200">
      <div className="flex items-center justify-between mb-2">
        <h4 className="text-sm font-semibold text-slate-700">Resume Completeness</h4>
        <span className="text-xs font-bold text-slate-600">{percentage}%</span>
      </div>

      {/* Progress bar */}
      <div className="w-full bg-slate-200 rounded-full h-2 mb-2 overflow-hidden">
        <div
          className={clsx('h-full transition-all duration-300', getColor())}
          style={{ width: `${percentage}%` }}
        />
      </div>

      <div className="flex items-center justify-between">
        <p className="text-xs text-slate-600">{getLabel()}</p>
        <p className="text-xs text-slate-500">
          {completed}/{total} sections
        </p>
      </div>
    </div>
  );
}
