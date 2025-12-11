import { useState } from 'react'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="min-h-screen flex items-center justify-center p-8">
      <div className="max-w-4xl w-full">
        {/* Header */}
        <header className="mb-12 animate-fade-in">
          <h1 className="mb-4">Vibe Pocket</h1>
          <p className="text-stone-500 text-sm tracking-widest uppercase">
            Experimental Project
          </p>
        </header>

        {/* Main Content */}
        <main className="animate-fade-in">
          <div className="bg-stone-900/40 border border-stone-800 rounded-md p-8 mb-6">
            <h2 className="mb-6">Welcome to Your Project</h2>

            <div className="space-y-6">
              {/* Counter Demo */}
              <div className="flex items-center gap-4">
                <button
                  onClick={() => setCount(count - 1)}
                  className="bg-stone-800 hover:bg-stone-700 text-stone-200 px-6 py-2 rounded-md transition-colors"
                >
                  -
                </button>
                <div className="font-mono text-2xl text-stone-100 min-w-[60px] text-center">
                  {count}
                </div>
                <button
                  onClick={() => setCount(count + 1)}
                  className="bg-stone-200 hover:bg-white text-stone-950 px-6 py-2 rounded-md shadow-[0_0_15px_rgba(255,255,255,0.1)] transition-all"
                >
                  +
                </button>
              </div>

              {/* Info */}
              <div className="border-t border-stone-800 pt-6">
                <p className="text-stone-400 text-sm">
                  Built with React + TypeScript + Vite + Tailwind CSS
                </p>
                <p className="text-stone-500 text-xs mt-2">
                  Following the design system defined in DESIGN.md
                </p>
              </div>
            </div>
          </div>

          {/* Code Example */}
          <div className="bg-stone-950/30 border border-stone-800 rounded-md p-6">
            <div className="text-xs text-stone-500 uppercase tracking-widest mb-3">
              Quick Start
            </div>
            <pre className="font-mono text-sm text-stone-300 overflow-x-auto">
              <code>{`npm install
npm run dev`}</code>
            </pre>
          </div>
        </main>

        {/* Footer */}
        <footer className="mt-12 text-center text-stone-600 text-sm">
          <p>오직 바이브코딩만 사용하는 실험적 프로젝트입니다.</p>
        </footer>
      </div>
    </div>
  )
}

export default App
