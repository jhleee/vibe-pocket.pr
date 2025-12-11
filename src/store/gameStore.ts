/**
 * Game State Management with Zustand
 *
 * Based on WORK_PLAN.md Phase 3.1
 * Manages the complete game loop: IDLE → PLAYING → RESULT
 */

import { create } from 'zustand';
import type { Challenge, GameState, GameResult } from '../types';

interface GameStore {
  // State
  currentChallenge: Challenge | null;
  selectedSectionIds: string[];
  timer: number; // Remaining time in seconds
  score: number;
  gameState: GameState;
  hintsUsed: number;

  // Actions
  startChallenge: (challenge: Challenge) => void;
  toggleSection: (sectionId: string) => void;
  submitReview: () => GameResult;
  resetGame: () => void;
  nextChallenge: (challenge: Challenge) => void;
  tick: () => void;
  setGameState: (state: GameState) => void;
}

export const useGameStore = create<GameStore>((set, get) => ({
  // Initial State
  currentChallenge: null,
  selectedSectionIds: [],
  timer: 0,
  score: 0,
  gameState: 'IDLE',
  hintsUsed: 0,

  // Start a new challenge
  startChallenge: (challenge: Challenge) => {
    set({
      currentChallenge: challenge,
      selectedSectionIds: [],
      timer: challenge.timeLimit,
      gameState: 'PLAYING',
      hintsUsed: 0,
    });
  },

  // Toggle section selection
  toggleSection: (sectionId: string) => {
    const { selectedSectionIds, gameState } = get();

    // Only allow selection during PLAYING state
    if (gameState !== 'PLAYING') return;

    set({
      selectedSectionIds: selectedSectionIds.includes(sectionId)
        ? selectedSectionIds.filter((id) => id !== sectionId)
        : [...selectedSectionIds, sectionId],
    });
  },

  // Submit review and get result
  submitReview: () => {
    const { currentChallenge, selectedSectionIds, timer, score } = get();

    if (!currentChallenge) {
      return {
        correct: false,
        missedBugs: [],
        falsePositives: [],
        timeSpent: 0,
      };
    }

    // Calculate result
    const bugSections = currentChallenge.sections.filter((s) => s.isBug);
    const correctSelections = bugSections.filter((s) =>
      selectedSectionIds.includes(s.id)
    );
    const missedBugs = bugSections
      .filter((s) => !selectedSectionIds.includes(s.id))
      .map((s) => s.id);
    const falsePositives = selectedSectionIds.filter(
      (id) => !bugSections.find((s) => s.id === id)
    );

    const isCorrect =
      correctSelections.length === bugSections.length &&
      selectedSectionIds.length === bugSections.length;

    const timeSpent = currentChallenge.timeLimit - timer;

    // Update score if correct
    if (isCorrect) {
      // Base score: 100
      // Time bonus: up to 50 points (faster = more points)
      const timeBonus = Math.floor((timer / currentChallenge.timeLimit) * 50);
      const totalPoints = 100 + timeBonus;

      set({
        score: score + totalPoints,
        gameState: 'RESULT',
      });
    } else {
      set({
        gameState: 'RESULT',
      });
    }

    return {
      correct: isCorrect,
      missedBugs,
      falsePositives,
      timeSpent,
    };
  },

  // Timer tick (decrease by 1 second)
  tick: () => {
    const { timer, gameState } = get();

    if (gameState !== 'PLAYING') return;

    if (timer <= 0) {
      // Time's up - auto submit
      set({ gameState: 'RESULT' });
      return;
    }

    set({ timer: timer - 1 });
  },

  // Move to next challenge
  nextChallenge: (challenge: Challenge) => {
    set({
      currentChallenge: challenge,
      selectedSectionIds: [],
      timer: challenge.timeLimit,
      gameState: 'PLAYING',
      hintsUsed: 0,
    });
  },

  // Reset entire game
  resetGame: () => {
    set({
      currentChallenge: null,
      selectedSectionIds: [],
      timer: 0,
      score: 0,
      gameState: 'IDLE',
      hintsUsed: 0,
    });
  },

  // Set game state manually
  setGameState: (state: GameState) => {
    set({ gameState: state });
  },
}));
