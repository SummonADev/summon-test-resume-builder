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
    <div className="form-group">
      {label && <label className="form-label">{label}</label>}
      <select
        className={clsx(
          'input-field',
          error && 'border-red-500 focus:ring-red-500',
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
      {error && <div className="error-text">{error}</div>}
      {helperText && !error && <div className="text-sm text-slate-500 mt-1">{helperText}</div>}
    </div>
  );
}
