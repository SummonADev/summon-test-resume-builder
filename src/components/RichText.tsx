import React from 'react';
import { parseTextWithLinks } from '@/lib/link-utils';

interface RichTextProps {
  text: string;
  className?: string;
  linkClassName?: string;
}

export function RichText({ text, className = '', linkClassName = 'text-black underline hover:opacity-70' }: RichTextProps) {
  if (!text) return null;

  const parts = parseTextWithLinks(text);

  return (
    <span className={className}>
      {parts.map((part, idx) => {
        if (typeof part === 'string') {
          return (
            <span key={idx} className="whitespace-pre-wrap break-words">
              {part}
            </span>
          );
        }
        return (
          <a
            key={idx}
            href={part.url}
            target="_blank"
            rel="noopener noreferrer"
            className={linkClassName}
            onClick={(e) => {
              // Prevent default behavior for mailto links in preview
              if (part.url.startsWith('mailto:')) {
                e.preventDefault();
              }
            }}
          >
            {part.text}
          </a>
        );
      })}
    </span>
  );
}

/**
 * Render text with links for resume templates
 */
export function renderRichText(
  text: string,
  className?: string,
): React.ReactNode {
  if (!text) return null;

  const parts = parseTextWithLinks(text);

  return parts.map((part, idx) => {
    if (typeof part === 'string') {
      return (
        <span key={idx} className="whitespace-pre-wrap break-words">
          {part}
        </span>
      );
    }
    return (
      <a
        key={idx}
        href={part.url}
        target="_blank"
        rel="noopener noreferrer"
        className="text-black underline hover:opacity-70"
      >
        {part.text}
      </a>
    );
  });
}
