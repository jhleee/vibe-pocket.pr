/**
 * OverlayLayer Component
 *
 * Layer 2 (Top) - Transparent interactive grid
 * Contains all CodeSection components
 * Positioned absolutely over SyntaxLayer
 */

import { CodeSection } from './CodeSection';
import type { CodeSection as CodeSectionType } from '../../types';

interface OverlayLayerProps {
  sections: CodeSectionType[];
  selectedSectionIds: string[];
  onSectionToggle: (sectionId: string) => void;
}

export function OverlayLayer({
  sections,
  selectedSectionIds,
  onSectionToggle,
}: OverlayLayerProps) {
  return (
    <div
      className="absolute inset-0 pointer-events-auto"
      style={{
        zIndex: 10,
      }}
    >
      {sections.map((section) => (
        <CodeSection
          key={section.id}
          section={section}
          isSelected={selectedSectionIds.includes(section.id)}
          onToggle={onSectionToggle}
        />
      ))}
    </div>
  );
}
