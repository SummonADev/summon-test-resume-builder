import React from 'react';

interface FormTextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
}

export function FormTextarea({ label, error, ...props }: FormTextareaProps) {
  return (
    <div className="form-group">
      {label && <label className="form-label">{label}</label>}
      <textarea
        {...props}
        className="input-field resize-none"
      />
      {error && <p className="error-text">{error}</p>}
    </div>
  );
}
