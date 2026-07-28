import clsx from 'clsx';

interface FormSelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: string;
  helperText?: string;
  options: Array<{ value: string; label: string }>;
}

export default function FormSelect({
  label,
  error,
  helperText,
  options,
  className,
  ...props
}: FormSelectProps) {
  return (
    <div className="mb-4">
      {label && (
        <label className="block text-sm font-light text-gray-700 mb-1.5">
          {label}
        </label>
      )}
      <select
        className={clsx(
          'w-full px-3 py-2 border border-gray-200 rounded text-sm font-light',
          'focus:outline-none focus:ring-1 focus:ring-gray-400 focus:border-transparent',
          'transition-colors bg-white',
          error && 'border-red-400 focus:ring-red-400',
          className
        )}
        {...props}
      >
        <option value="">-- Select --</option>
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
      {error && (
        <div className="text-sm text-red-600 mt-1">{error}</div>
      )}
      {helperText && !error && (
        <div className="text-xs text-gray-500 mt-1">{helperText}</div>
      )}
    </div>
  );
}
