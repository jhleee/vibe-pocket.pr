/**
 * ScoreBoard Component
 *
 * Displays current score and difficulty
 */

import { Trophy, Target } from 'lucide-react';
import type { Difficulty } from '../../types';

interface ScoreBoardProps {
  score: number;
  difficulty?: Difficulty;
}

const difficultyColors = {
  JUNIOR: 'text-green-400',
  SENIOR: 'text-amber-400',
  EXPERT: 'text-red-400',
};

const difficultyBgColors = {
  JUNIOR: 'bg-green-500/20',
  SENIOR: 'bg-amber-500/20',
  EXPERT: 'bg-red-500/20',
};

export function ScoreBoard({ score, difficulty }: ScoreBoardProps) {
  return (
    <div className="flex items-center gap-6">
      {/* Score */}
      <div className="flex items-center gap-2">
        <Trophy size={20} className="text-amber-400" />
        <div>
          <div className="text-xs text-stone-500 uppercase tracking-widest">
            Score
          </div>
          <div className="text-2xl font-bold text-stone-100 font-mono">
            {score}
          </div>
        </div>
      </div>

      {/* Difficulty Badge */}
      {difficulty && (
        <div className="flex items-center gap-2">
          <Target size={20} className={difficultyColors[difficulty]} />
          <div
            className={`px-3 py-1 rounded-md ${difficultyBgColors[difficulty]}`}
          >
            <span
              className={`text-xs font-bold uppercase tracking-wider ${difficultyColors[difficulty]}`}
            >
              {difficulty}
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
