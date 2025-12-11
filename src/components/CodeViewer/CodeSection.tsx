/**
 * CodeSection Component
 *
 * Individual selectable area in the overlay grid
 * Handles touch/click interactions and visual feedback
 */

import { motion } from 'framer-motion';
import type { CodeSection as CodeSectionType } from '../../types';

interface CodeSectionProps {
  section: CodeSectionType;
  isSelected: boolean;
  onToggle: (sectionId: string) => void;
}

// Line height constant (must match SyntaxLayer)
const LINE_HEIGHT = 24; // 1.5rem = 24px

/**
 * Calculate z-index based on section size
 * Smaller sections get higher z-index (so they're clickable over larger sections)
 */
function calculateZIndex(section: CodeSectionType): number {
  const lineCount = section.endLine - section.startLine + 1;
  // Base z-index of 10, smaller sections get higher values
  return 10 + (100 - lineCount);
}

/**
 * Calculate position based on line numbers
 * Using fixed line height approach (WORK_PLAN Phase 2.3)
 */
function calculatePosition(section: CodeSectionType) {
  const top = (section.startLine - 1) * LINE_HEIGHT;
  const height = (section.endLine - section.startLine + 1) * LINE_HEIGHT;

  return { top, height };
}

export function CodeSection({
  section,
  isSelected,
  onToggle,
}: CodeSectionProps) {
  const { top, height } = calculatePosition(section);
  const zIndex = calculateZIndex(section);

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent parent section clicks
    onToggle(section.id);
  };

  return (
    <motion.div
      className="absolute left-0 right-0 cursor-pointer"
      style={{
        top: `${top}px`,
        height: `${height}px`,
        minHeight: '44px', // Minimum touch target size (Apple HIG)
        zIndex,
      }}
      onClick={handleClick}
      initial={false}
      animate={{
        backgroundColor: isSelected
          ? 'rgba(59, 130, 246, 0.2)' // bg-blue-500/20
          : 'transparent',
        borderWidth: isSelected ? '2px' : '0px',
        borderColor: isSelected ? 'rgb(96, 165, 250)' : 'transparent', // border-blue-400
      }}
      whileTap={{ scale: 0.98 }}
      transition={{ duration: 0.2 }}
    >
      {/* Visual feedback on hover (desktop only) */}
      <motion.div
        className="absolute inset-0"
        initial={{ opacity: 0 }}
        whileHover={{ opacity: 1 }}
        transition={{ duration: 0.15 }}
        style={{
          backgroundColor: 'rgba(59, 130, 246, 0.1)', // hover:bg-blue-500/10
          pointerEvents: 'none',
        }}
      />
    </motion.div>
  );
}
