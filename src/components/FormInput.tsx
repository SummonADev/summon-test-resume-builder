import clsx from 'clsx';

interface FormInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
}

export default function FormInput({
  label,
  error,
  helperText,
  className,
  ...props
}: FormInputProps) {
  return (
    <div className="form-group">
      {label && <label className="form-label">{label}</label>}
      <input
        className={clsx(
          'input-field',
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
