# TODO

> **상세 작업 계획**: `WORK_PLAN.md` 참조
> **마지막 업데이트**: 2025-12-11

## 🔴 Critical (MVP 필수 기능)

### Phase 1: 프로젝트 인프라
- [ ] Zustand 설치 및 설정
- [ ] Framer Motion 설치
- [ ] Lucide React 설치
- [ ] React Syntax Highlighter 설치

### Phase 1.3: 타입 정의 & 데이터 스키마
- [ ] `src/types/game.ts` 생성 (Difficulty, CodeSection, Challenge, GameState)
- [ ] `src/data/mockChallenges.ts` 생성 (초기 샘플 데이터 3개)

### Phase 2: Overlay Engine (코어 기능)
- [ ] `src/components/CodeViewer/` 구조 생성
- [ ] CodeViewer 2-Layer 시스템 구현
- [ ] CodeSection Overlay 컴포넌트 작성 (선택 로직, Z-Index 처리)
- [ ] 모바일 터치 이벤트 최적화

### Phase 3: 게임 로직 & 상태 관리
- [ ] `src/store/gameStore.ts` Zustand Store 구현
- [ ] 게임 플로우 Phase 1: Analysis (타이머, 멀티 선택)
- [ ] 게임 플로우 Phase 2: Commit (검증 로직)
- [ ] 게임 플로우 Phase 3: Result (정답/오답 처리)

### Phase 4: 기본 UI 컴포넌트
- [ ] GameLayout 컴포넌트 (Header, Main, Footer 구조)
- [ ] Button 컴포넌트 (Primary/Secondary 스타일)
- [ ] Timer 컴포넌트 (카운트다운 UI)
- [ ] ScoreBoard 컴포넌트

## 🟡 Important (MVP+)

### Phase 4.3: 결과 화면
- [ ] ResultScreen 컴포넌트 (Pass/Fail 애니메이션)
- [ ] 해설 마크다운 렌더링

### Phase 5: 다크 모드 & UX
- [ ] Tailwind Dark Mode 설정 (Dracula/OneDark 테마)
- [ ] Thumb Zone 검증 (하단 30% 액션 배치)
- [ ] Fat-finger 터치 영역 확대

### Phase 6: 콘텐츠 확장
- [ ] Mock Data 확장 (JUNIOR/SENIOR/EXPERT 각 3개)
- [ ] 다양한 언어 커버 (JS, TS, Python 필수)

## 🟢 Nice-to-have (Post-MVP)

- [ ] 접근성 개선 (ARIA labels, 고대비 모드)
- [ ] 애니메이션 강화 (Confetti, Haptic Feedback)
- [ ] PWA Manifest 및 Service Worker
- [ ] 단위 테스트 (Vitest)
- [ ] E2E 테스트 (Playwright)

## ✅ Completed
- [x] 2025-12-11: TODO.md 및 CHANGELOG.md 생성
- [x] 2025-12-11: 프로젝트 스케폴딩 (package.json, tsconfig.json, vite 설정)
- [x] 2025-12-11: 기본 디렉토리 구조 생성 (src/, public/)
- [x] 2025-12-11: 기본 React + TypeScript 컴포넌트 생성
- [x] 2025-12-11: Tailwind CSS 설정 및 DESIGN.md 기반 스타일 적용
- [x] 2025-12-11: 로컬 빌드 테스트 성공
- [x] 2025-12-11: GitHub Pages 배포 설정 (GitHub Actions)
