/**
 * App Component - Overlay Engine Test
 *
 * Testing Phase 2: Core Overlay System
 */

import { useState } from 'react';
import { CodeViewer } from './components/CodeViewer';
import { jsHookRulesChallenge } from './data/mockChallenges';

function App() {
  const [selectedSectionIds, setSelectedSectionIds] = useState<string[]>([]);
  const challenge = jsHookRulesChallenge;

  const handleSectionToggle = (sectionId: string) => {
    setSelectedSectionIds((prev) =>
      prev.includes(sectionId)
        ? prev.filter((id) => id !== sectionId)
        : [...prev, sectionId]
    );
  };

  const handleSubmit = () => {
    const bugSections = challenge.sections.filter((s) => s.isBug);
    const correctSelections = bugSections.filter((s) =>
      selectedSectionIds.includes(s.id)
    );
    const missedBugs = bugSections.filter(
      (s) => !selectedSectionIds.includes(s.id)
    );
    const falsePositives = selectedSectionIds.filter(
      (id) => !bugSections.find((s) => s.id === id)
    );

    const isCorrect =
      correctSelections.length === bugSections.length &&
      selectedSectionIds.length === bugSections.length;

    console.log('=== SUBMISSION RESULT ===');
    console.log('Correct:', isCorrect);
    console.log('Selected:', selectedSectionIds);
    console.log('Bugs:', bugSections.map((s) => s.id));
    console.log('Missed bugs:', missedBugs.map((s) => s.id));
    console.log('False positives:', falsePositives);

    alert(
      isCorrect
        ? '🎉 Correct! All bugs found!'
        : `❌ Incorrect.\nMissed: ${missedBugs.length}\nFalse positives: ${falsePositives.length}`
    );
  };

  const handleReset = () => {
    setSelectedSectionIds([]);
  };

  return (
    <div className="min-h-screen p-4 lg:p-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <header className="mb-8 animate-fade-in">
          <h1 className="mb-2">Phase 2: Overlay Engine Test</h1>
          <p className="text-stone-400 text-sm">
            {challenge.title} ({challenge.difficulty})
          </p>
          {challenge.description && (
            <p className="text-stone-500 text-sm mt-1">
              {challenge.description}
            </p>
          )}
        </header>

        {/* CodeViewer - Main Test Area */}
        <main className="mb-8 animate-fade-in">
          <div className="bg-stone-900/40 border border-stone-800 rounded-md p-4">
            <CodeViewer
              challenge={challenge}
              selectedSectionIds={selectedSectionIds}
              onSectionToggle={handleSectionToggle}
            />
          </div>
        </main>

        {/* Controls */}
        <footer className="flex gap-4 animate-fade-in">
          <button
            onClick={handleSubmit}
            className="flex-1 bg-stone-200 hover:bg-white text-stone-950 px-6 py-3 rounded-md shadow-[0_0_15px_rgba(255,255,255,0.1)] transition-all font-bold"
          >
            COMMIT REVIEW
          </button>
          <button
            onClick={handleReset}
            className="bg-stone-800 hover:bg-stone-700 text-stone-200 px-6 py-3 rounded-md transition-colors"
          >
            RESET
          </button>
        </footer>

        {/* Debug Info */}
        <div className="mt-8 p-4 bg-stone-950/30 border border-stone-800 rounded-md">
          <div className="text-xs text-stone-500 uppercase tracking-widest mb-3">
            Debug Info
          </div>
          <div className="font-mono text-sm text-stone-300 space-y-1">
            <div>Selected: {selectedSectionIds.join(', ') || 'None'}</div>
            <div>
              Total Sections: {challenge.sections.length} ({' '}
              {challenge.sections.filter((s) => s.isBug).length} bugs )
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
