/**
 * Game Type Definitions
 * Based on PRD Section 4.4 and WORK_PLAN Phase 1.2
 */

// Difficulty levels for challenges
export type Difficulty = 'JUNIOR' | 'SENIOR' | 'EXPERT';

// Game state machine
export type GameState = 'IDLE' | 'PLAYING' | 'RESULT';

// Language support
export type Language = 'javascript' | 'typescript' | 'python' | 'go';

/**
 * Interactive code section
 * Represents a selectable area in the code viewer
 */
export interface CodeSection {
  id: string;
  startLine: number; // 1-based line number
  endLine: number;   // inclusive
  isBug: boolean;    // Whether this section contains a bug
  parentId?: string; // For nested sections (e.g., variable inside if-block)
}

/**
 * Code review challenge
 * Main data structure for each problem
 */
export interface Challenge {
  id: string;
  title: string;
  description?: string; // Short context about the code
  language: Language;
  codeRaw: string;      // The actual code to display
  sections: CodeSection[]; // Interactive zones
  explanation: string;  // Answer explanation (markdown format)
  timeLimit: number;    // Time limit in seconds
  difficulty: Difficulty;
}

/**
 * Game result after submission
 */
export interface GameResult {
  correct: boolean;
  missedBugs: string[]; // IDs of bug sections the user missed
  falsePositives: string[]; // IDs of non-bug sections the user selected
  timeSpent: number; // Time taken in seconds
}
