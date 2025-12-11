# POCKET.PR - Work Plan (Feature Implementation)

> **PRD 기반 기능 구현 작업 계획**
> 생성일: 2025-12-11
> 목적: PRD의 핵심 기능을 단계별로 구현하기 위한 상세 작업 계획

---

## Phase 1: 프로젝트 인프라 & 데이터 모델 ✅

### 1.1 프로젝트 스케폴딩 ✅ (완료)
- [x] Vite + React + TypeScript 프로젝트 초기화
- [x] Tailwind CSS 설정
- [x] GitHub Actions 배포 파이프라인 구성

### 1.2 의존성 설치 (Required)
- [ ] Zustand 설치 (`npm install zustand`)
- [ ] Framer Motion 설치 (`npm install framer-motion`)
- [ ] Lucide React 설치 (`npm install lucide-react`)
- [ ] Syntax Highlighter 설치 (`npm install react-syntax-highlighter @types/react-syntax-highlighter`)

### 1.3 타입 정의 & 데이터 스키마
- [ ] `src/types/game.ts` 생성
  - [ ] `Difficulty` 타입 정의
  - [ ] `CodeSection` 인터페이스 정의
  - [ ] `Challenge` 인터페이스 정의
  - [ ] `GameState` 타입 정의 (`'IDLE' | 'PLAYING' | 'RESULT'`)
- [ ] `src/data/mockChallenges.ts` 생성
  - [ ] JavaScript 버그 샘플 (예: React Hook 규칙 위반)
  - [ ] TypeScript 버그 샘플 (예: Type Assertion 남용)
  - [ ] Python 버그 샘플 (예: Indentation 오류)

---

## Phase 2: 코어 엔진 - Overlay System

### 2.1 CodeViewer 컴포넌트 구현
- [ ] `src/components/CodeViewer/` 디렉토리 생성
- [ ] `CodeViewer.tsx` 베이스 컴포넌트 작성
  - [ ] Props 정의: `challenge`, `onSectionSelect`, `selectedSectionIds`
  - [ ] 2-Layer 구조 구현:
    - [ ] Layer 1: Syntax Highlighted Code (react-syntax-highlighter)
    - [ ] Layer 2: Interactive Overlay Grid

### 2.2 CodeSection Overlay 로직
- [ ] `CodeSection.tsx` 컴포넌트 작성
  - [ ] 절대 위치 지정 (absolute positioning)
  - [ ] Line-based 맵핑 로직 구현 (`startLine`, `endLine`)
  - [ ] Z-Index 계산 로직 (Nested Section 지원)
- [ ] 선택 상태 시각화
  - [ ] Idle: 완전 투명 (`bg-transparent`)
  - [ ] Selected: 반투명 오버레이 + 테두리 (`bg-blue-500/20 border-2 border-blue-400`)
- [ ] 터치 이벤트 핸들링
  - [ ] `onClick` → Toggle Selection
  - [ ] `e.stopPropagation()` for Nested Sections

### 2.3 모바일 최적화
- [ ] 최소 터치 영역 보장 (44x44px 이상)
- [ ] 세로 모드 전용 레이아웃 검증
- [ ] Chrome DevTools Mobile Viewport 테스트

---

## Phase 3: 게임 로직 & 상태 관리

### 3.1 Zustand Store 구현
- [ ] `src/store/gameStore.ts` 생성
- [ ] State 정의:
  ```typescript
  {
    currentChallenge: Challenge | null,
    selectedSectionIds: string[],
    timer: number,
    score: number,
    gameState: GameState,
    hintsUsed: number
  }
  ```
- [ ] Actions 정의:
  - [ ] `startChallenge(challenge: Challenge)`
  - [ ] `toggleSection(sectionId: string)`
  - [ ] `submitReview()`
  - [ ] `resetGame()`
  - [ ] `tick()` (타이머 감소)

### 3.2 게임 플로우 구현
- [ ] **Phase 1: Analysis**
  - [ ] 타이머 시작 로직
  - [ ] 실시간 카운트다운 UI
  - [ ] 멀티 선택 허용
- [ ] **Phase 2: Commit (Submission)**
  - [ ] "COMMIT REVIEW" 버튼 컴포넌트
  - [ ] 제출 검증 로직 (selectedSectionIds vs isBug)
  - [ ] 정답률 계산
- [ ] **Phase 3: Result & Diff**
  - [ ] 정답/오답 애니메이션 (Framer Motion)
  - [ ] 놓친 버그 하이라이트 (빨간색 오버레이)
  - [ ] 해설 표시 (`explanation` 필드)

---

## Phase 4: UI 컴포넌트 & 레이아웃

### 4.1 레이아웃 구조
- [ ] `src/layouts/GameLayout.tsx` 생성
  - [ ] Header: 타이머, 점수, 난이도 표시
  - [ ] Main: CodeViewer 영역 (스크롤 가능)
  - [ ] Footer: 액션 버튼 영역 (화면 하단 30%)

### 4.2 공통 UI 컴포넌트
- [ ] `src/components/ui/Button.tsx`
  - [ ] Primary: "COMMIT REVIEW" (큰 버튼, 하단 고정)
  - [ ] Secondary: "HINT", "SKIP" (작은 버튼)
- [ ] `src/components/ui/Timer.tsx`
  - [ ] 원형 프로그레스 바 + 숫자 표시
  - [ ] 10초 이하 시 빨간색 경고
- [ ] `src/components/ui/ScoreBoard.tsx`
  - [ ] 현재 점수, 연속 정답 스트릭

### 4.3 결과 화면
- [ ] `src/components/ResultScreen.tsx`
  - [ ] Pass: 축하 애니메이션 + 다음 문제 버튼
  - [ ] Fail: 오답 분석 + Retry 버튼
  - [ ] 해설 마크다운 렌더링

---

## Phase 5: 다크 모드 & 접근성

### 5.1 테마 시스템
- [ ] Tailwind Dark Mode 설정 (`class` 전략)
- [ ] 기본 테마: Dracula 또는 OneDark 팔레트 적용
- [ ] 코드 하이라이터 테마 동기화

### 5.2 모바일 UX 개선
- [ ] Thumb Zone 검증 (하단 30% 내 모든 주요 액션)
- [ ] Fat-finger friendly 터치 영역 확대
- [ ] 가로 모드 비활성화 또는 경고 메시지

### 5.3 접근성
- [ ] ARIA labels 추가
- [ ] 키보드 네비게이션 지원 (선택 사항, 모바일 우선)
- [ ] 고대비 모드 테스트

---

## Phase 6: 콘텐츠 & 폴리싱

### 6.1 Mock Data 확장
- [ ] JUNIOR 난이도 문제 3개
- [ ] SENIOR 난이도 문제 3개
- [ ] EXPERT 난이도 문제 3개
- [ ] 다양한 언어 커버 (JS, TS, Python, Go 중 최소 3개)

### 6.2 애니메이션 & 사운드
- [ ] 선택 시 Haptic Feedback (가능한 경우)
- [ ] 정답 시 Confetti 애니메이션 (react-confetti 또는 Framer Motion)
- [ ] 오답 시 Shake 애니메이션

### 6.3 성능 최적화
- [ ] Code Splitting (React.lazy)
- [ ] Memoization (React.memo, useMemo)
- [ ] 번들 사이즈 분석 및 최적화

---

## Phase 7: 테스트 & 배포

### 7.1 테스트
- [ ] 단위 테스트 (Vitest)
  - [ ] gameStore 액션 테스트
  - [ ] 검증 로직 테스트
- [ ] E2E 테스트 (Playwright - 선택 사항)
  - [ ] 게임 플로우 시나리오

### 7.2 배포 검증
- [ ] GitHub Pages 빌드 성공 확인
- [ ] 실제 모바일 디바이스 테스트 (iOS, Android)
- [ ] PWA Manifest 및 Service Worker 추가 (선택 사항)

---

## 우선순위 요약

### 🔴 Critical (MVP 필수)
1. Phase 1.2: 의존성 설치
2. Phase 1.3: 타입 & 데이터 스키마
3. Phase 2: Overlay Engine (코어 기능)
4. Phase 3: 게임 로직 & Zustand
5. Phase 4.1~4.2: 기본 UI 컴포넌트

### 🟡 Important (MVP+)
6. Phase 4.3: 결과 화면
7. Phase 5.1: 다크 모드
8. Phase 6.1: Mock Data 확장

### 🟢 Nice-to-have (Post-MVP)
9. Phase 5.3: 접근성
10. Phase 6.2: 애니메이션 강화
11. Phase 7: 테스트 코드

---

## 다음 단계
1. **Phase 1.2부터 시작**: 필요한 패키지 설치
2. **Phase 1.3 완료**: 타입 정의로 개발 가이드라인 확립
3. **Phase 2 집중**: Overlay System이 가장 기술적으로 복잡한 부분이므로 먼저 검증

---

**Note**: 각 Phase 완료 시 TODO.md 업데이트 및 CHANGELOG.md에 기록할 것.
