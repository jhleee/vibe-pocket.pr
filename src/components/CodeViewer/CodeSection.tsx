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
  selectionIndex?: number; // Position in selection order (1, 2, 3...)
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
  selectionIndex,
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
          ? 'rgba(217, 119, 87, 0.25)' // accent-500 with stronger opacity
          : 'transparent',
        borderWidth: isSelected ? '3px' : '0px',
        borderColor: isSelected ? 'rgb(217, 119, 87)' : 'transparent', // accent-500
        boxShadow: isSelected
          ? '0 0 25px rgba(217, 119, 87, 0.6), inset 0 0 20px rgba(217, 119, 87, 0.2)'
          : '0 0 0 rgba(217, 119, 87, 0)',
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
          backgroundColor: 'rgba(217, 119, 87, 0.15)', // accent-500/15
          pointerEvents: 'none',
        }}
      />

      {/* Selection Number Badge */}
      {isSelected && selectionIndex !== undefined && (
        <motion.div
          className="absolute -left-2 -top-2 w-8 h-8 bg-accent-500 text-white rounded-full flex items-center justify-center font-bold text-sm shadow-lg"
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          exit={{ scale: 0, rotate: 180 }}
          transition={{ type: 'spring', bounce: 0.5, duration: 0.4 }}
        >
          {selectionIndex}
        </motion.div>
      )}

      {/* Pulse animation when selected */}
      {isSelected && (
        <motion.div
          className="absolute inset-0 border-3 rounded-sm"
          style={{
            borderColor: 'rgb(217, 119, 87)',
          }}
          animate={{
            opacity: [0.5, 0, 0.5],
            scale: [1, 1.05, 1],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      )}
    </motion.div>
  );
}
