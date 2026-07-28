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
    <div className="mb-4">
      {label && (
        <label className="block text-sm font-light text-gray-700 mb-1.5">
          {label}
        </label>
      )}
      <textarea
        className={clsx(
          'w-full px-3 py-2 border border-gray-200 rounded text-sm font-light',
          'focus:outline-none focus:ring-1 focus:ring-gray-400 focus:border-transparent',
          'transition-colors placeholder-gray-400 resize-none',
          error && 'border-red-400 focus:ring-red-400',
          className
        )}
        {...props}
      />
      {error && (
        <div className="text-sm text-red-600 mt-1">{error}</div>
      )}
      {helperText && !error && (
        <div className="text-xs text-gray-500 mt-1">{helperText}</div>
      )}
    </div>
  );
}
