import clsx from 'clsx';

interface FormTextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  helperText?: string;
}

export default function FormTextarea({
  label,
  error,
  helperText,
  className,
  ...props
}: FormTextareaProps) {
  return (
    <div className="form-group">
      {label && <label className="form-label">{label}</label>}
      <textarea
        className={clsx(
          'input-field resize-none',
          error && 'border-red-500 focus:ring-red-500',
          className
        )}
        {...props}
      />
      {error && <div className="error-text">{error}</div>}
      {helperText && !error && <div className="text-sm text-slate-500 mt-1">{helperText}</div>}
    </div>
  );
}
