/**
 * ResultScreen Component
 *
 * Displays review results with explanation
 */

import { motion } from 'framer-motion';
import { CheckCircle, XCircle, AlertCircle } from 'lucide-react';
import type { GameResult, Challenge } from '../../types';

interface ResultScreenProps {
  result: GameResult;
  challenge: Challenge;
  onNext: () => void;
  onRetry: () => void;
}

export function ResultScreen({
  result,
  challenge,
  onNext,
  onRetry,
}: ResultScreenProps) {
  const { correct, missedBugs, falsePositives, timeSpent } = result;

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
