/**
 * SyntaxLayer Component
 *
 * Layer 1 (Bottom) - Read-only syntax highlighted code
 * Uses react-syntax-highlighter with Dracula theme (dark mode)
 */

import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { dracula } from 'react-syntax-highlighter/dist/esm/styles/prism';
import type { Language } from '../../types';

interface SyntaxLayerProps {
  code: string;
  language: Language;
}

export function SyntaxLayer({ code, language }: SyntaxLayerProps) {
  return (
    <SyntaxHighlighter
      language={language}
      style={dracula}
      showLineNumbers={true}
      wrapLines={true}
      lineNumberStyle={{
        minWidth: '3em',
        paddingRight: '1em',
        color: '#6272a4', // Dracula comment color
        userSelect: 'none',
      }}
      customStyle={{
        margin: 0,
        padding: '1rem',
        background: '#282a36', // Dracula background
        fontSize: '0.875rem', // text-sm
        fontFamily: '"Fira Code", monospace',
        lineHeight: '1.5rem', // 24px - important for overlay alignment
        borderRadius: '0.375rem',
      }}
      codeTagProps={{
        style: {
          fontFamily: '"Fira Code", monospace',
        },
      }}
    >
      {code}
    </SyntaxHighlighter>
  );
}
