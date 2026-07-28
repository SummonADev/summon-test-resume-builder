import { getResumeCompleteness } from '@/lib/validation';
import { Resume } from '@/types/resume';
import clsx from 'clsx';

interface CompletenessIndicatorProps {
  resume: Resume;
}

export default function CompletenessIndicator({ resume }: CompletenessIndicatorProps) {
  const { percentage, completed, total } = getResumeCompleteness(resume);

  const getColor = () => {
    if (percentage >= 80) return 'bg-gray-900';
    if (percentage >= 60) return 'bg-gray-700';
    if (percentage >= 40) return 'bg-gray-500';
    return 'bg-gray-400';
  };

  const getLabel = () => {
    if (percentage >= 80) return 'Nearly complete';
    if (percentage >= 60) return 'Good progress';
    if (percentage >= 40) return 'Getting started';
    return 'Just beginning';
  };

  return (
    <div className="p-3 bg-gray-50 rounded border border-gray-200">
      <div className="flex items-center justify-between mb-2">
        <h4 className="text-xs font-light text-gray-600 uppercase tracking-wide">Completeness</h4>
        <span className="text-xs text-gray-700">{percentage}%</span>
      </div>

      {/* Progress bar */}
      <div className="w-full bg-gray-200 rounded-full h-1 mb-2 overflow-hidden">
        <div
          className={clsx('h-full transition-all duration-300', getColor())}
          style={{ width: `${percentage}%` }}
        />
      </div>

      <p className="text-xs text-gray-600">
        {getLabel()} • {completed}/{total}
      </p>
    </div>
  );
}
