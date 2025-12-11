/**
 * App Component - Complete Game Flow
 *
 * Implements the full game loop: IDLE → PLAYING → RESULT
 * Based on WORK_PLAN.md Phase 3
 */

import { useState, useEffect } from 'react';
import { Play, RotateCcw } from 'lucide-react';
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
  const [isLandscape, setIsLandscape] = useState(false);

  // Detect landscape orientation
  useEffect(() => {
    const checkOrientation = () => {
      // Check if width > height (landscape)
      setIsLandscape(window.innerWidth > window.innerHeight);
    };

    checkOrientation();
    window.addEventListener('resize', checkOrientation);
    window.addEventListener('orientationchange', checkOrientation);

    return () => {
      window.removeEventListener('resize', checkOrientation);
      window.removeEventListener('orientationchange', checkOrientation);
    };
  }, []);

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

  // Landscape Warning Overlay (priority check)
  if (isLandscape) {
    return (
      <div className="fixed inset-0 z-50 bg-stone-950/95 backdrop-blur-md flex items-center justify-center p-6">
        <div className="text-center animate-fade-in">
          <RotateCcw size={64} className="mx-auto mb-6 text-accent-500 animate-pulse" />
          <h2 className="text-2xl font-bold mb-3 text-stone-100">
            Portrait Mode Only
          </h2>
          <p className="text-stone-400 mb-2">
            Please rotate your device to portrait mode
          </p>
          <p className="text-sm text-stone-500">
            This app is optimized for vertical orientation
          </p>
        </div>
      </div>
    );
  }

  // IDLE State - Welcome screen
  if (gameState === 'IDLE') {
    return (
      <div className="h-screen flex items-center justify-center px-4 sm:px-8">
        <div className="w-full text-center animate-fade-in">
          {/* Logo/Title */}
          <header className="mb-8 sm:mb-12">
            <h1 className="mb-3 sm:mb-4 text-4xl sm:text-5xl md:text-6xl font-bold">POCKET.PR</h1>
            <p className="text-stone-400 text-base sm:text-lg">
              Debug with your Thumb.
            </p>
            <p className="text-stone-500 text-xs sm:text-sm mt-2">
              {mockChallenges.length} challenges available
            </p>
          </header>

          {/* Start Button - Large Touch Target */}
          <button
            onClick={handleStartGame}
            className="inline-flex items-center justify-center gap-3 bg-stone-200 hover:bg-white active:bg-stone-300 text-stone-950 px-8 sm:px-10 py-4 sm:py-5 rounded-lg shadow-[0_0_20px_rgba(255,255,255,0.15)] transition-all font-bold text-lg sm:text-xl min-h-[60px]"
          >
            <Play size={24} className="sm:w-7 sm:h-7" />
            START GAME
          </button>

          {/* Info */}
          <div className="mt-8 sm:mt-12 text-stone-500 text-xs sm:text-sm space-y-1">
            <p>Find bugs in code snippets</p>
            <p>Tap to select suspicious sections</p>
          </div>
        </div>
      </div>
    );
  }

  // PLAYING State - Active challenge
  if (gameState === 'PLAYING' && currentChallenge) {
    return (
      <div className="h-screen flex flex-col overflow-hidden">
        {/* Header - Compact */}
        <header className="flex-shrink-0 bg-stone-950/80 backdrop-blur-md border-b border-stone-800 py-2 px-2 sm:px-3 animate-fade-in">
          {/* Timer & Score Row */}
          <div className="flex items-center justify-between mb-1">
            <Timer timeLeft={timer} timeLimit={currentChallenge.timeLimit} />
            <ScoreBoard
              score={score}
              difficulty={currentChallenge.difficulty}
            />
          </div>

          {/* Challenge Info - Single Line */}
          <h2 className="text-sm sm:text-base font-semibold text-stone-100 line-clamp-1 px-1">
            {currentChallenge.title}
          </h2>
        </header>

        {/* Main - Maximum Code Space */}
        <main className="flex-1 overflow-y-auto px-2 py-2 sm:px-3 sm:py-3 animate-fade-in">
          <div className="bg-stone-900/40 border border-stone-800 rounded-md p-1.5 sm:p-3">
            <CodeViewer
              challenge={currentChallenge}
              selectedSectionIds={selectedSectionIds}
              onSectionToggle={toggleSection}
            />
          </div>
        </main>

        {/* Footer - Compact Thumb Zone */}
        <footer className="flex-shrink-0 bg-stone-950/80 backdrop-blur-md border-t border-stone-800 p-3 sm:p-4 animate-fade-in">
          <button
            onClick={handleSubmit}
            disabled={selectedSectionIds.length === 0}
            className="w-full h-14 sm:h-16 bg-stone-200 hover:bg-white active:bg-stone-300 disabled:bg-stone-800 disabled:text-stone-500 disabled:cursor-not-allowed text-stone-950 px-4 rounded-lg shadow-[0_0_20px_rgba(255,255,255,0.15)] transition-all font-bold text-base sm:text-lg"
          >
            COMMIT REVIEW
          </button>
          <div className="mt-2 text-center text-xs text-stone-500">
            {selectedSectionIds.length > 0
              ? `${selectedSectionIds.length} selected`
              : 'Tap code to select'}
          </div>
        </footer>
      </div>
    );
  }

  // RESULT State - Review results
  if (gameState === 'RESULT' && currentChallenge && lastResult) {
    return (
      <div className="h-screen flex flex-col overflow-hidden">
        {/* Header - Fixed */}
        <header className="flex-shrink-0 px-3 py-3 sm:px-4 sm:py-4 bg-stone-950/80 backdrop-blur-md border-b border-stone-800 animate-fade-in">
          <div className="flex items-center justify-between mb-2">
            <h1 className="text-lg sm:text-xl font-bold">Review Results</h1>
            <ScoreBoard score={score} />
          </div>
          <div className="text-xs sm:text-sm text-stone-400">
            {currentChallenge.title} ({currentChallenge.difficulty})
          </div>
        </header>

        {/* Scrollable Content */}
        <main className="flex-1 overflow-y-auto px-3 py-4 sm:px-4 sm:py-6">
          <ResultScreen
            result={lastResult}
            challenge={currentChallenge}
            selectedSectionIds={selectedSectionIds}
            onNext={handleNext}
            onRetry={handleRetry}
          />
        </main>

        {/* Footer - Fixed Action Buttons (Thumb Zone) */}
        <footer className="flex-shrink-0 bg-stone-950/80 backdrop-blur-md border-t border-stone-800 px-3 py-4 sm:px-4 sm:py-5 animate-fade-in">
          <div className="flex gap-3 sm:gap-4">
            <button
              onClick={handleNext}
              className="flex-1 bg-stone-200 hover:bg-white active:bg-stone-300 text-stone-950 px-6 py-4 rounded-lg shadow-[0_0_20px_rgba(255,255,255,0.15)] transition-all font-bold text-base sm:text-lg min-h-[56px]"
            >
              NEXT CHALLENGE
            </button>
            {!lastResult.correct && (
              <button
                onClick={handleRetry}
                className="bg-stone-800 hover:bg-stone-700 active:bg-stone-750 text-stone-200 px-6 py-4 rounded-lg transition-colors font-bold text-base sm:text-lg min-h-[56px]"
              >
                RETRY
              </button>
            )}
          </div>
        </footer>
      </div>
    );
  }

  // Fallback
  return null;
}

export default App;
