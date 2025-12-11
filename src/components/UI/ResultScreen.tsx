/**
 * ResultScreen Component
 *
 * Displays review results with explanation
 */

import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, XCircle, AlertCircle } from 'lucide-react';
import confetti from 'canvas-confetti';
import { ResultCodeViewer } from '../CodeViewer';
import type { GameResult, Challenge } from '../../types';

interface ResultScreenProps {
  result: GameResult;
  challenge: Challenge;
  selectedSectionIds: string[];
  onNext: () => void;
  onRetry: () => void;
}

export function ResultScreen({
  result,
  challenge,
  selectedSectionIds,
  onNext,
  onRetry,
}: ResultScreenProps) {
  const { correct, missedBugs, falsePositives, timeSpent } = result;

  // Confetti celebration for correct answers
  useEffect(() => {
    if (correct) {
      // Delay confetti slightly for better effect
      const timer = setTimeout(() => {
        // Fire confetti from both sides
        const duration = 3000;
        const animationEnd = Date.now() + duration;
        const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

        function randomInRange(min: number, max: number) {
          return Math.random() * (max - min) + min;
        }

        const interval = setInterval(() => {
          const timeLeft = animationEnd - Date.now();

          if (timeLeft <= 0) {
            return clearInterval(interval);
          }

          const particleCount = 50 * (timeLeft / duration);

          // Left side
          confetti({
            ...defaults,
            particleCount,
            origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
            colors: ['#D97757', '#E68B6D', '#FFB088', '#4CAF50', '#FFD700'],
          });

          // Right side
          confetti({
            ...defaults,
            particleCount,
            origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
            colors: ['#D97757', '#E68B6D', '#FFB088', '#4CAF50', '#FFD700'],
          });
        }, 250);

        return () => clearInterval(interval);
      }, 300);

      return () => clearTimeout(timer);
    }
  }, [correct]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      {/* Result Header */}
      <div className="text-center">
        {correct ? (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', bounce: 0.5 }}
            className="inline-flex items-center gap-3 px-6 py-3 bg-green-500/20 border-2 border-green-400 rounded-lg"
          >
            <CheckCircle size={32} className="text-green-400" />
            <div className="text-left">
              <div className="text-2xl font-bold text-green-400">
                Perfect! 🎉
              </div>
              <div className="text-sm text-green-300">
                All bugs found in {timeSpent}s
              </div>
            </div>
          </motion.div>
        ) : (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', bounce: 0.3 }}
            className="inline-flex items-center gap-3 px-6 py-3 bg-red-500/20 border-2 border-red-400 rounded-lg"
          >
            <XCircle size={32} className="text-red-400" />
            <div className="text-left">
              <div className="text-2xl font-bold text-red-400">
                Not Quite
              </div>
              <div className="text-sm text-red-300">
                {missedBugs.length > 0 && `Missed ${missedBugs.length} bug(s)`}
                {missedBugs.length > 0 && falsePositives.length > 0 && ', '}
                {falsePositives.length > 0 &&
                  `${falsePositives.length} false positive(s)`}
              </div>
            </div>
          </motion.div>
        )}
      </div>

      {/* Missed Bugs Alert */}
      {!correct && missedBugs.length > 0 && (
        <div className="bg-red-500/10 border border-red-500/30 rounded-md p-4">
          <div className="flex items-start gap-3">
            <AlertCircle size={20} className="text-red-400 mt-0.5" />
            <div>
              <div className="text-sm font-bold text-red-400 mb-1">
                Missed Bugs
              </div>
              <div className="text-sm text-stone-300">
                You missed {missedBugs.length} bug(s). Check the explanation
                below to understand what went wrong.
              </div>
            </div>
          </div>
        </div>
      )}

      {/* False Positives Alert */}
      {!correct && falsePositives.length > 0 && (
        <div className="bg-amber-500/10 border border-amber-500/30 rounded-md p-4">
          <div className="flex items-start gap-3">
            <AlertCircle size={20} className="text-amber-400 mt-0.5" />
            <div>
              <div className="text-sm font-bold text-amber-400 mb-1">
                False Positives
              </div>
              <div className="text-sm text-stone-300">
                You selected {falsePositives.length} section(s) that weren't
                bugs.
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Code Review Visualization */}
      <div className="bg-stone-900/40 border border-stone-800 rounded-md p-4">
        <div className="text-xs text-stone-500 uppercase tracking-widest mb-4">
          Code Review
        </div>
        <ResultCodeViewer
          challenge={challenge}
          result={result}
          selectedSectionIds={selectedSectionIds}
        />
        <div className="mt-4 flex items-center gap-4 text-xs text-stone-400">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-green-500/25 border-2 border-green-500 rounded"></div>
            <span>Correct</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-red-500/25 border-2 border-red-500 rounded"></div>
            <span>Missed</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-amber-500/25 border-2 border-amber-500 rounded"></div>
            <span>False Positive</span>
          </div>
        </div>
      </div>

      {/* Explanation */}
      <div className="bg-stone-900/40 border border-stone-800 rounded-md p-6">
        <div className="text-xs text-stone-500 uppercase tracking-widest mb-4">
          Explanation
        </div>
        <div className="prose prose-invert prose-sm max-w-none">
          <div
            className="text-stone-300 whitespace-pre-line"
            dangerouslySetInnerHTML={{ __html: challenge.explanation }}
          />
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-4">
        <button
          onClick={onNext}
          className="flex-1 bg-stone-200 hover:bg-white text-stone-950 px-6 py-3 rounded-md shadow-[0_0_15px_rgba(255,255,255,0.1)] transition-all font-bold"
        >
          NEXT CHALLENGE
        </button>
        {!correct && (
          <button
            onClick={onRetry}
            className="bg-stone-800 hover:bg-stone-700 text-stone-200 px-6 py-3 rounded-md transition-colors font-bold"
          >
            RETRY
          </button>
        )}
      </div>
    </motion.div>
  );
}
