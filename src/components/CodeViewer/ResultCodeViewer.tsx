/**
 * ResultCodeViewer Component
 *
 * Shows code with color-coded feedback for results screen
 */

import { SyntaxLayer } from './SyntaxLayer';
import { ResultCodeSection } from './ResultCodeSection';
import type { Challenge, GameResult } from '../../types';

interface ResultCodeViewerProps {
  challenge: Challenge;
  result: GameResult;
  selectedSectionIds: string[];
}

export function ResultCodeViewer({
  challenge,
  result: _result,
  selectedSectionIds,
}: ResultCodeViewerProps) {
  return (
    <div className="relative">
      {/* Layer 1: Syntax Highlighted Code */}
      <SyntaxLayer code={challenge.codeRaw} language={challenge.language} />

      {/* Layer 2: Result Overlays */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ zIndex: 10 }}
      >
        {challenge.sections.map((section) => {
          // Determine section status
          let status: 'correct' | 'missed' | 'false-positive' | 'neutral' =
            'neutral';

          const wasSelected = selectedSectionIds.includes(section.id);
          const isBug = section.isBug;

          if (isBug && wasSelected) {
            // Correctly identified bug
            status = 'correct';
          } else if (isBug && !wasSelected) {
            // Missed bug
            status = 'missed';
          } else if (!isBug && wasSelected) {
            // False positive
            status = 'false-positive';
          }

          return (
            <ResultCodeSection
              key={section.id}
              section={section}
              status={status}
            />
          );
        })}
      </div>
    </div>
  );
}
