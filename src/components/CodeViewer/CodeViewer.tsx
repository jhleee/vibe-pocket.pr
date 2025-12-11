/**
 * CodeViewer Component
 *
 * Main container for the 2-layer overlay system
 * Implements the core Overlay Engine architecture
 *
 * Architecture:
 * ┌─────────────────────────────┐
 * │ Layer 2: OverlayLayer       │ ← Transparent, interactive
 * │   (absolute, z-index: 10)   │
 * ├─────────────────────────────┤
 * │ Layer 1: SyntaxLayer        │ ← Read-only code
 * │   (relative)                │
 * └─────────────────────────────┘
 */

import { SyntaxLayer } from './SyntaxLayer';
import { OverlayLayer } from './OverlayLayer';
import type { Challenge } from '../../types';

interface CodeViewerProps {
  challenge: Challenge;
  selectedSectionIds: string[];
  onSectionToggle: (sectionId: string) => void;
}

export function CodeViewer({
  challenge,
  selectedSectionIds,
  onSectionToggle,
}: CodeViewerProps) {
  return (
    <div className="relative w-full">
      {/* Layer 1: Syntax Highlighted Code (Bottom) */}
      <div className="relative">
        <SyntaxLayer code={challenge.codeRaw} language={challenge.language} />
      </div>

      {/* Layer 2: Interactive Overlay (Top) */}
      <OverlayLayer
        sections={challenge.sections}
        selectedSectionIds={selectedSectionIds}
        onSectionToggle={onSectionToggle}
      />
    </div>
  );
}
