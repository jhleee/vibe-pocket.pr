# WORK_PLAN: Technical Implementation Roadmap

> **목적**: PRD에 정의된 기능을 기술적으로 어떻게(HOW) 구현할지 상세 설명
> 생성일: 2025-12-11
> 업데이트: Phase 완료 시마다

---

## 문서 역할

이 문서는 **기술적 구현 방법**에 집중합니다:
- **PRD.md**: 무엇을(WHAT), 왜(WHY) 만드는지
- **WORK_PLAN.md** (이 문서): 어떻게(HOW) 구현하는지
- **TODO.md**: 지금(NOW) 무엇을 하는지 (일일 체크리스트)

---

## Phase 1: 프로젝트 인프라 & 데이터 모델

### 상태: ✅ 기본 스케폴딩 완료, 의존성 설치 필요

### 1.1 의존성 설치 전략

**필수 패키지**:
```bash
npm install zustand framer-motion lucide-react
npm install react-syntax-highlighter @types/react-syntax-highlighter
```

**선택 고려 (Post-MVP)**:
- `react-confetti`: 정답 애니메이션
- `react-markdown`: 해설 렌더링

### 1.2 타입 시스템 설계

**파일 구조**:
```
src/
├── types/
│   ├── game.ts        # 게임 관련 타입
│   └── index.ts       # Re-export
```

**핵심 타입 정의** (`src/types/game.ts`):
```typescript
// 난이도 레벨
export type Difficulty = 'JUNIOR' | 'SENIOR' | 'EXPERT';

// 게임 상태
export type GameState = 'IDLE' | 'PLAYING' | 'RESULT';

// 코드 섹션 (인터랙티브 영역)
export interface CodeSection {
  id: string;
  startLine: number; // 1-based
  endLine: number;   // inclusive
  isBug: boolean;    // 정답 여부
  parentId?: string; // 중첩 지원
}

// 챌린지 데이터
export interface Challenge {
  id: string;
  title: string;
  description?: string;
  language: 'javascript' | 'typescript' | 'python' | 'go';
  codeRaw: string;
  sections: CodeSection[];
  explanation: string; // 마크다운 형식
  timeLimit: number;   // 초 단위
  difficulty: Difficulty;
}
```

**Mock Data 구조** (`src/data/mockChallenges.ts`):
- MVP 목표: 9개 챌린지 (3개 언어 × 3개 난이도)
- 초기: 3개 샘플로 시작 (JS Hook 규칙, TS Type 오류, Python Indentation)

---

## Phase 2: Overlay Engine (핵심 기능)

### 상태: ⏳ Pending

### 2.1 아키텍처: 2-Layer System

**문제**: 모바일에서 네이티브 텍스트 선택은 부정확하고 느림.

**해결책**: Stacked Layers with Absolute Positioning

```
┌─────────────────────────────┐
│ Layer 2: Interactive Grid  │ ← 투명 오버레이, 터치 이벤트
│   (absolute, z-index: 10)   │
├─────────────────────────────┤
│ Layer 1: Syntax Highlighter│ ← 읽기 전용 코드
│   (relative)                │
└─────────────────────────────┘
```

### 2.2 컴포넌트 구조

**디렉토리**:
```
src/components/CodeViewer/
├── CodeViewer.tsx       # 메인 컨테이너
├── SyntaxLayer.tsx      # react-syntax-highlighter 래퍼
├── OverlayLayer.tsx     # 인터랙티브 그리드 컨테이너
├── CodeSection.tsx      # 개별 선택 가능 영역
└── index.ts
```

**CodeViewer.tsx** (Pseudo-code):
```typescript
interface CodeViewerProps {
  challenge: Challenge;
  selectedSectionIds: string[];
  onSectionToggle: (sectionId: string) => void;
}

export function CodeViewer({ challenge, selectedSectionIds, onSectionToggle }: CodeViewerProps) {
  return (
    <div className="relative">
      {/* Layer 1: Syntax Highlighted Code */}
      <SyntaxLayer code={challenge.codeRaw} language={challenge.language} />

      {/* Layer 2: Interactive Overlay */}
      <OverlayLayer>
        {challenge.sections.map(section => (
          <CodeSection
            key={section.id}
            section={section}
            isSelected={selectedSectionIds.includes(section.id)}
            onToggle={onSectionToggle}
          />
        ))}
      </OverlayLayer>
    </div>
  );
}
```

### 2.3 핵심 로직: Line-to-Pixel Mapping

**Challenge**: `startLine`, `endLine` → Absolute Position (top, height)

**접근법 1**: Line Height 계산
```typescript
const LINE_HEIGHT = 24; // px (폰트 크기 + line-height)
const top = (startLine - 1) * LINE_HEIGHT;
const height = (endLine - startLine + 1) * LINE_HEIGHT;
```

**접근법 2**: Dynamic Measurement (더 정확, 복잡)
```typescript
// ref로 코드 라인 요소에 접근하여 실제 위치 측정
const codeLineElements = useRef<HTMLElement[]>([]);
const rect = codeLineElements.current[startLine - 1]?.getBoundingClientRect();
```

**MVP 권장**: 접근법 1 (고정 Line Height)

### 2.4 중첩 섹션 처리

**Z-Index 규칙**:
```typescript
function calculateZIndex(section: CodeSection, allSections: CodeSection[]): number {
  const area = (section.endLine - section.startLine + 1);
  // 작은 영역일수록 높은 z-index
  return 10 + (100 - area);
}
```

**이벤트 전파 방지**:
```typescript
function handleClick(e: React.MouseEvent) {
  e.stopPropagation(); // 부모 섹션 이벤트 차단
  onToggle(section.id);
}
```

### 2.5 모바일 터치 최적화

**최소 터치 영역 보장**:
```typescript
// 실제 코드 라인이 작아도 터치 영역은 44px 이상
<div
  className="absolute cursor-pointer"
  style={{
    minHeight: '44px',
    padding: '8px', // Visual보다 큰 Hit-Box
  }}
/>
```

**시각적 피드백**:
```typescript
className={cn(
  "transition-all duration-200",
  isSelected
    ? "bg-blue-500/20 border-2 border-blue-400"
    : "bg-transparent hover:bg-blue-500/10"
)}
```

---

## Phase 3: 게임 로직 & 상태 관리

### 상태: ⏳ Pending (Phase 2 완료 후 시작)

### 3.1 Zustand Store 설계

**파일**: `src/store/gameStore.ts`

**State Shape**:
```typescript
interface GameStore {
  // State
  currentChallenge: Challenge | null;
  selectedSectionIds: string[];
  timer: number; // 남은 시간 (초)
  score: number;
  gameState: GameState;
  hintsUsed: number;

  // Actions
  startChallenge: (challenge: Challenge) => void;
  toggleSection: (sectionId: string) => void;
  submitReview: () => { correct: boolean; missedBugs: string[] };
  resetGame: () => void;
  tick: () => void; // 타이머 감소
}
```

**타이머 로직** (useEffect에서 호출):
```typescript
const tick = () => {
  set((state) => {
    if (state.timer <= 0) {
      return { gameState: 'RESULT' }; // 시간 초과
    }
    return { timer: state.timer - 1 };
  });
};
```

**검증 로직**:
```typescript
const submitReview = () => {
  const { currentChallenge, selectedSectionIds } = get();
  const bugSections = currentChallenge.sections.filter(s => s.isBug);
  const correctSelections = bugSections.filter(s => selectedSectionIds.includes(s.id));
  const missedBugs = bugSections.filter(s => !selectedSectionIds.includes(s.id));

  const isCorrect = correctSelections.length === bugSections.length &&
                    selectedSectionIds.length === bugSections.length;

  set({ gameState: 'RESULT' });

  return { correct: isCorrect, missedBugs: missedBugs.map(b => b.id) };
};
```

### 3.2 게임 플로우 구현

**Phase 1: Analysis**
```typescript
// 챌린지 시작 시
startChallenge(challenge);
// → timer 시작 (setInterval)
// → gameState = 'PLAYING'
```

**Phase 2: Commit**
```typescript
// "COMMIT REVIEW" 버튼 클릭 시
const result = submitReview();
// → 타이머 정지 (clearInterval)
// → gameState = 'RESULT'
```

**Phase 3: Result**
```typescript
// result.correct에 따라 UI 분기
if (result.correct) {
  // 축하 애니메이션
  // score += 100
} else {
  // result.missedBugs 하이라이트
  // 해설 표시
}
```

---

## Phase 4: UI 컴포넌트 & 레이아웃

### 상태: ⏳ Pending

### 4.1 레이아웃 전략

**GameLayout.tsx** (3-Section Layout):
```typescript
<div className="h-screen flex flex-col">
  {/* Header: 10% */}
  <header className="h-[10%]">
    <Timer /> <ScoreBoard />
  </header>

  {/* Main: 60% (Scrollable) */}
  <main className="h-[60%] overflow-y-auto">
    <CodeViewer />
  </main>

  {/* Footer: 30% (Thumb Zone) */}
  <footer className="h-[30%] flex items-center justify-center">
    <Button variant="primary">COMMIT REVIEW</Button>
  </footer>
</div>
```

### 4.2 Button 컴포넌트 디자인

**Variants**:
- **Primary**: 큰 버튼, 하단 고정 (COMMIT REVIEW)
- **Secondary**: 작은 버튼 (HINT, SKIP)

**Props Interface**:
```typescript
interface ButtonProps {
  variant: 'primary' | 'secondary';
  children: React.ReactNode;
  onClick: () => void;
  disabled?: boolean;
}
```

**Tailwind Classes**:
```typescript
const variants = {
  primary: "w-[80%] h-16 bg-blue-600 hover:bg-blue-700 text-white text-xl font-bold",
  secondary: "px-4 py-2 bg-gray-700 hover:bg-gray-600 text-sm"
};
```

### 4.3 Timer 컴포넌트

**Circular Progress Bar** (SVG):
```typescript
function Timer({ timeLeft, timeLimit }: TimerProps) {
  const percentage = (timeLeft / timeLimit) * 100;
  const strokeDashoffset = 283 - (283 * percentage) / 100; // 2πr

  return (
    <svg className="w-16 h-16">
      <circle
        r="45"
        cx="50%"
        cy="50%"
        strokeDasharray="283"
        strokeDashoffset={strokeDashoffset}
        className={timeLeft < 10 ? "stroke-red-500" : "stroke-blue-500"}
      />
      <text x="50%" y="50%" className="text-xl">{timeLeft}s</text>
    </svg>
  );
}
```

---

## Phase 5: 다크 모드 & 테마

### 상태: ⏳ Pending

### 5.1 Tailwind Dark Mode 설정

**tailwind.config.js**:
```javascript
module.exports = {
  darkMode: 'class', // class-based strategy
  theme: {
    extend: {
      colors: {
        // Dracula 테마
        background: '#282a36',
        foreground: '#f8f8f2',
        comment: '#6272a4',
        cyan: '#8be9fd',
        green: '#50fa7b',
        orange: '#ffb86c',
        pink: '#ff79c6',
        purple: '#bd93f9',
        red: '#ff5555',
        yellow: '#f1fa8c',
      }
    }
  }
}
```

**기본값 다크 모드**:
```typescript
// index.html or main.tsx
document.documentElement.classList.add('dark');
```

### 5.2 Syntax Highlighter 테마 동기화

```typescript
import { dracula } from 'react-syntax-highlighter/dist/esm/styles/prism';

<SyntaxHighlighter style={dracula} language={language}>
  {code}
</SyntaxHighlighter>
```

---

## Phase 6: 콘텐츠 & 폴리싱

### 6.1 Mock Data 확장 계획

**목표**: 9개 챌린지 (3개 언어 × 3개 난이도)

**언어별 버그 유형**:
- **JavaScript**: React Hook 규칙, Async/Await 오류, Closure 문제
- **TypeScript**: Type Assertion 남용, Any 사용, Generic 오류
- **Python**: Indentation, Mutable Default Arg, Global Variable

**난이도 기준**:
- **JUNIOR**: 1줄 버그, 명확한 에러
- **SENIOR**: 2-3줄 버그, 논리 오류
- **EXPERT**: 숨겨진 버그, 성능 이슈

### 6.2 애니메이션 전략

**Framer Motion Variants**:
```typescript
// 정답 시
const successVariants = {
  hidden: { scale: 0, opacity: 0 },
  visible: {
    scale: 1,
    opacity: 1,
    transition: { type: 'spring', bounce: 0.5 }
  }
};

// 오답 시
const errorVariants = {
  shake: {
    x: [-10, 10, -10, 10, 0],
    transition: { duration: 0.5 }
  }
};
```

---

## Phase 7: 테스트 & 배포

### 7.1 테스트 전략 (Post-MVP)

**단위 테스트** (Vitest):
- `gameStore` 액션 테스트
- 검증 로직 (`submitReview`) 테스트
- 유틸 함수 테스트

**E2E 테스트** (Playwright - 선택 사항):
- 게임 플로우 시나리오 (시작 → 선택 → 제출 → 결과)

### 7.2 배포 검증

**GitHub Pages 빌드**:
- `vite.config.ts`에서 `base: '/vibe-pocket.pr/'` 설정 ✅
- GitHub Actions 워크플로우 정상 작동 확인 ✅

**모바일 테스트**:
- iOS Safari (최소 iOS 14+)
- Chrome Android (최소 Android 9+)
- Responsive 모드 테스트 (Chrome DevTools)

**Lighthouse 점수 목표**:
- Performance: 90+
- Accessibility: 90+
- Best Practices: 90+

---

## 기술적 결정 로그

### 왜 Zustand를 선택했는가?
- Redux보다 간단 (보일러플레이트 적음)
- Context API보다 성능 좋음 (리렌더링 최적화)
- TypeScript 지원 우수

### 왜 Overlay System을 사용하는가?
- 네이티브 텍스트 선택은 모바일에서 부정확
- 정확한 터치 영역 제어 가능
- 중첩된 선택 지원 가능

### 왜 GitHub Pages를 사용하는가?
- 무료 정적 호스팅
- CI/CD 자동화 쉬움
- 백엔드 불필요 (MVP)

---

## 다음 단계

**현재 우선순위**:
1. Phase 1.2: 의존성 설치 → TODO.md에 추가
2. Phase 1.3: 타입 정의 작성
3. Phase 2: Overlay Engine 프로토타입 (가장 복잡, 먼저 검증 필요)

**진행 추적**: TODO.md에서 일일 작업 체크

---

**Last Updated**: 2025-12-11
**Next Review**: Phase 2 완료 시 (Overlay Engine 검증 후)
