/**
 * Timer Component
 *
 * Circular progress bar showing remaining time
 * Based on WORK_PLAN.md Phase 4.3
 */

import { useEffect } from 'react';
import { Clock } from 'lucide-react';
import { useGameStore } from '../../store/gameStore';

interface TimerProps {
  timeLeft: number;
  timeLimit: number;
}

export function Timer({ timeLeft, timeLimit }: TimerProps) {
  const { tick, gameState } = useGameStore();

  // Timer tick effect
  useEffect(() => {
    if (gameState !== 'PLAYING') return;

    const interval = setInterval(() => {
      tick();
    }, 1000);

    return () => clearInterval(interval);
  }, [tick, gameState]);

  const percentage = (timeLeft / timeLimit) * 100;
  const radius = 45;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (circumference * percentage) / 100;

  // Determine color based on time remaining
  const isUrgent = timeLeft < 10;
  const isWarning = timeLeft < 30;

  const strokeColor = isUrgent
    ? '#ef4444' // red-500
    : isWarning
    ? '#f59e0b' // amber-500
    : '#3b82f6'; // blue-500

  const textColor = isUrgent
    ? 'text-red-400'
    : isWarning
    ? 'text-amber-400'
    : 'text-blue-400';

  return (
    <div className="flex items-center gap-3">
      {/* Circular Progress */}
      <div className="relative w-16 h-16">
        <svg className="transform -rotate-90 w-16 h-16">
          {/* Background circle */}
          <circle
            cx="32"
            cy="32"
            r={radius}
            stroke="currentColor"
            strokeWidth="4"
            fill="none"
            className="text-stone-800"
          />
          {/* Progress circle */}
          <circle
            cx="32"
            cy="32"
            r={radius}
            stroke={strokeColor}
            strokeWidth="4"
            fill="none"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            className="transition-all duration-1000 ease-linear"
          />
        </svg>
        {/* Time text */}
        <div
          className={`absolute inset-0 flex items-center justify-center font-mono text-sm font-bold ${textColor}`}
        >
          {timeLeft}
        </div>
      </div>

      {/* Time label */}
      <div className="flex items-center gap-2 text-stone-400">
        <Clock size={16} />
        <span className="text-sm font-mono">
          {Math.floor(timeLeft / 60)}:{(timeLeft % 60).toString().padStart(2, '0')}
        </span>
      </div>
    </div>
  );
}
