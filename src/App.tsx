/**
 * App Component - Complete Game Flow
 *
 * Implements the full game loop: IDLE → PLAYING → RESULT
 * Based on WORK_PLAN.md Phase 3
 */

import { useState } from 'react';
import { Play } from 'lucide-react';
import { CodeViewer } from './components/CodeViewer';
import { Timer, ScoreBoard, ResultScreen } from './components/UI';
import { useGameStore } from './store/gameStore';
import { mockChallenges, getRandomChallenge } from './data/mockChallenges';
import type { GameResult } from './types';

function App() {
  const {
    currentChallenge,
    selectedSectionIds,
    timer,
    score,
    gameState,
    startChallenge,
    toggleSection,
    submitReview,
    nextChallenge,
  } = useGameStore();

  const [lastResult, setLastResult] = useState<GameResult | null>(null);

  // Handle start game
  const handleStartGame = () => {
    const challenge = getRandomChallenge();
    startChallenge(challenge);
  };

  // Handle submit review
  const handleSubmit = () => {
    const result = submitReview();
    setLastResult(result);
  };

  // Handle next challenge
  const handleNext = () => {
    const challenge = getRandomChallenge();
    nextChallenge(challenge);
    setLastResult(null);
  };

  // Handle retry
  const handleRetry = () => {
    if (currentChallenge) {
      startChallenge(currentChallenge);
      setLastResult(null);
    }
  };

  // IDLE State - Welcome screen
  if (gameState === 'IDLE') {
    return (
      <div className="min-h-screen flex items-center justify-center p-8">
        <div className="max-w-2xl w-full text-center animate-fade-in">
          {/* Logo/Title */}
          <header className="mb-12">
            <h1 className="mb-4 text-6xl">POCKET.PR</h1>
            <p className="text-stone-400 text-lg">
              Debug with your Thumb.
            </p>
            <p className="text-stone-500 text-sm mt-2">
              {mockChallenges.length} challenges available
            </p>
          </header>

          {/* Start Button */}
          <button
            onClick={handleStartGame}
            className="inline-flex items-center gap-3 bg-stone-200 hover:bg-white text-stone-950 px-8 py-4 rounded-md shadow-[0_0_15px_rgba(255,255,255,0.1)] transition-all font-bold text-lg"
          >
            <Play size={24} />
            START GAME
          </button>

          {/* Info */}
          <div className="mt-12 text-stone-500 text-sm">
            <p>Find bugs in code snippets</p>
            <p className="mt-1">Tap to select suspicious sections</p>
          </div>
        </div>
      </div>
    );
  }

  // PLAYING State - Active challenge
  if (gameState === 'PLAYING' && currentChallenge) {
    return (
      <div className="min-h-screen flex flex-col">
        {/* Header - Fixed */}
        <header className="bg-stone-950/80 backdrop-blur-md border-b border-stone-800 p-4 animate-fade-in">
          <div className="max-w-4xl mx-auto flex items-center justify-between">
            <Timer timeLeft={timer} timeLimit={currentChallenge.timeLimit} />
            <ScoreBoard
              score={score}
              difficulty={currentChallenge.difficulty}
            />
          </div>
        </header>

        {/* Challenge Info */}
        <div className="bg-stone-900/40 border-b border-stone-800 p-4 animate-fade-in">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-xl font-bold text-stone-100 mb-1">
              {currentChallenge.title}
            </h2>
            {currentChallenge.description && (
              <p className="text-sm text-stone-400">
                {currentChallenge.description}
              </p>
            )}
          </div>
        </div>

        {/* Main - Scrollable Code Viewer */}
        <main className="flex-1 overflow-y-auto p-4 animate-fade-in">
          <div className="max-w-4xl mx-auto">
            <div className="bg-stone-900/40 border border-stone-800 rounded-md p-4">
              <CodeViewer
                challenge={currentChallenge}
                selectedSectionIds={selectedSectionIds}
                onSectionToggle={toggleSection}
              />
            </div>
          </div>
        </main>

        {/* Footer - Fixed (Thumb Zone) */}
        <footer className="bg-stone-950/80 backdrop-blur-md border-t border-stone-800 p-4 animate-fade-in">
          <div className="max-w-4xl mx-auto">
            <button
              onClick={handleSubmit}
              disabled={selectedSectionIds.length === 0}
              className="w-full bg-stone-200 hover:bg-white disabled:bg-stone-800 disabled:text-stone-500 disabled:cursor-not-allowed text-stone-950 px-6 py-4 rounded-md shadow-[0_0_15px_rgba(255,255,255,0.1)] transition-all font-bold text-lg"
            >
              COMMIT REVIEW
            </button>
            <div className="mt-2 text-center text-xs text-stone-500">
              {selectedSectionIds.length > 0
                ? `${selectedSectionIds.length} section(s) selected`
                : 'Select suspicious code sections'}
            </div>
          </div>
        </footer>
      </div>
    );
  }

  // RESULT State - Review results
  if (gameState === 'RESULT' && currentChallenge && lastResult) {
    return (
      <div className="min-h-screen p-4 lg:p-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <header className="mb-8 animate-fade-in">
            <div className="flex items-center justify-between mb-4">
              <h1 className="text-2xl font-bold">Review Results</h1>
              <ScoreBoard score={score} />
            </div>
            <div className="text-sm text-stone-400">
              {currentChallenge.title} ({currentChallenge.difficulty})
            </div>
          </header>

          {/* Result Screen */}
          <ResultScreen
            result={lastResult}
            challenge={currentChallenge}
            onNext={handleNext}
            onRetry={handleRetry}
          />
        </div>
      </div>
    );
  }

  // Fallback
  return null;
}

export default App;
