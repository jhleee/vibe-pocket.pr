/**
 * ResultCodeSection Component
 *
 * Shows color-coded feedback for bugs in result screen
 * - Green: Correctly identified bug
 * - Red: Missed bug
 * - Yellow: False positive (incorrectly selected)
 */

import { motion } from 'framer-motion';
import { CheckCircle, XCircle, AlertCircle } from 'lucide-react';
import type { CodeSection as CodeSectionType } from '../../types';

interface ResultCodeSectionProps {
  section: CodeSectionType;
  status: 'correct' | 'missed' | 'false-positive' | 'neutral';
}

// Line height constant (must match SyntaxLayer)
const LINE_HEIGHT = 24; // 1.5rem = 24px

/**
 * Calculate position based on line numbers
 */
function calculatePosition(section: CodeSectionType) {
  const top = (section.startLine - 1) * LINE_HEIGHT;
  const height = (section.endLine - section.startLine + 1) * LINE_HEIGHT;

  return { top, height };
}

/**
 * Get colors based on status
 */
function getStatusStyles(status: ResultCodeSectionProps['status']) {
  switch (status) {
    case 'correct':
      return {
        backgroundColor: 'rgba(76, 175, 80, 0.25)', // green
        borderColor: 'rgb(76, 175, 80)',
        shadowColor: 'rgba(76, 175, 80, 0.6)',
        icon: CheckCircle,
        iconColor: 'text-green-400',
      };
    case 'missed':
      return {
        backgroundColor: 'rgba(244, 67, 54, 0.25)', // red
        borderColor: 'rgb(244, 67, 54)',
        shadowColor: 'rgba(244, 67, 54, 0.6)',
        icon: XCircle,
        iconColor: 'text-red-400',
      };
    case 'false-positive':
      return {
        backgroundColor: 'rgba(255, 152, 0, 0.25)', // yellow/orange
        borderColor: 'rgb(255, 152, 0)',
        shadowColor: 'rgba(255, 152, 0, 0.6)',
        icon: AlertCircle,
        iconColor: 'text-amber-400',
      };
    default:
      return null;
  }
}

export function ResultCodeSection({
  section,
  status,
}: ResultCodeSectionProps) {
  const { top, height } = calculatePosition(section);
  const styles = getStatusStyles(status);

  if (!styles) return null;

  const Icon = styles.icon;

  return (
    <motion.div
      className="absolute left-0 right-0"
      style={{
        top: `${top}px`,
        height: `${height}px`,
        minHeight: '44px',
        zIndex: 5,
      }}
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3, delay: 0.1 }}
    >
      <div
        className="absolute inset-0 rounded-sm border-3"
        style={{
          backgroundColor: styles.backgroundColor,
          borderColor: styles.borderColor,
          boxShadow: `0 0 20px ${styles.shadowColor}, inset 0 0 15px ${styles.backgroundColor}`,
        }}
      >
        {/* Icon Badge */}
        <motion.div
          className={`absolute -left-2 -top-2 w-8 h-8 bg-stone-900 rounded-full flex items-center justify-center shadow-lg border-2`}
          style={{ borderColor: styles.borderColor }}
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: 'spring', bounce: 0.5, delay: 0.2 }}
        >
          <Icon size={18} className={styles.iconColor} />
        </motion.div>

        {/* Pulse effect */}
        <motion.div
          className="absolute inset-0 border-3 rounded-sm"
          style={{
            borderColor: styles.borderColor,
          }}
          animate={{
            opacity: [0.3, 0, 0.3],
            scale: [1, 1.02, 1],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      </div>
    </motion.div>
  );
}
