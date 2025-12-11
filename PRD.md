# PRD: POCKET.PR

> **Product Requirements Document**
> Version: 1.0.0 (MVP)
> Last Updated: 2025-12-11
> Status: In Development

---

## 1. Executive Summary

### Vision
**POCKET.PR**은 출퇴근 시간을 활용하여 코드 리뷰 스킬을 향상시키는 게임화된 모바일 웹 애플리케이션입니다.

### Tagline
> **"Debug with your Thumb."**

### Core Concept
사용자는 지하철이나 버스에서 짧은 시간 동안 코드 스니펫을 보고, 간단한 터치 제스처로 버그를 식별합니다. 시간 제한이 있어 긴장감을 제공하며, 정답 시 점수를 획득하는 게임화된 학습 경험을 제공합니다.

---

## 2. Problem Statement

### Target User
- **주니어/미드레벨 개발자**: 코드 리뷰 경험을 쌓고 싶지만 실무 기회가 부족
- **출퇴근 시간 활용자**: 지하철/버스에서 짧은 학습 시간을 가진 개발자
- **게임화 학습 선호자**: 재미있는 방식으로 기술을 향상시키고 싶은 사용자

### Pain Points
1. 코드 리뷰 연습 플랫폼 부족
2. 이동 중 학습할 수 있는 모바일 최적화된 도구 부재
3. 지루한 학습 방식으로 인한 낮은 지속성

### Solution
- ✅ **간단한 터치 인터랙션**: 엄지만으로 모든 작업 가능
- ✅ **짧은 세션**: 1문제당 2-3분 (출퇴근 시간 활용)
- ✅ **게임화**: 점수, 연속 정답 스트릭, 난이도 레벨

---

## 3. Product Goals

### Success Metrics (MVP)
- [ ] 10개 이상의 다양한 버그 챌린지 제공
- [ ] 모바일 디바이스에서 60fps 이상 유지
- [ ] 평균 문제 해결 시간: 90-180초
- [ ] 사용자 정답률: 60-70% (적절한 난이도)

### Non-Goals (MVP 제외)
- ❌ 멀티플레이어 / 리더보드
- ❌ 사용자 계정 / 로그인 시스템
- ❌ 백엔드 서버 (정적 배포만)
- ❌ 사용자가 직접 챌린지 업로드

---

## 4. Core Features

### 4.1. Smart Overlay Code Viewer ⭐ (핵심 기능)

**Problem**: 모바일에서 네이티브 텍스트 선택은 부정확하고 느림.

**Solution**: 2-Layer Overlay System
- **Layer 1 (Bottom)**: Syntax Highlighted Code (읽기 전용)
- **Layer 2 (Top)**: 투명한 인터랙티브 그리드 (코드 라인/블록에 매핑)

**Features**:
- 중첩된 섹션 지원 (예: If 블록 안의 변수)
- Z-Index 기반 우선순위 (작은 요소가 큰 요소보다 우선)
- 시각적 피드백:
  - Idle: 완전 투명
  - Selected: 반투명 오버레이 + 테두리 (`bg-blue-500/20`)

### 4.2. Game Loop (리뷰 플로우)

#### Phase 1: Analysis (분석)
- 타이머 시작 (예: 180초)
- 코드 스니펫 표시 (Syntax Highlighting)
- 사용자가 의심스러운 섹션 탭 (멀티 선택 가능)

#### Phase 2: Commit (제출)
- 하단 고정 "COMMIT REVIEW" 버튼 탭
- 제출 시 타이머 정지

#### Phase 3: Result (결과)
- **Pass**:
  - 축하 애니메이션 (Confetti)
  - 점수 증가
  - "다음 문제" 버튼
- **Fail**:
  - 놓친 버그 빨간색 하이라이트
  - 정답 해설 표시 (마크다운 형식)
  - "Retry" 또는 "다음 문제" 버튼

### 4.3. 모바일 최적화 UX

#### Thumb Zone Strategy
- **모든 주요 액션을 화면 하단 30%에 배치**
  - "COMMIT REVIEW" (Primary Button)
  - "HINT", "SKIP" (Secondary Buttons)

#### Touch-Friendly Design
- 최소 터치 영역: 44x44px (Apple HIG)
- Fat-finger 친화적: Visible element보다 큰 Hit-Box

#### Visual Design
- **Dark Mode 기본값**: Dracula 또는 OneDark 테마
- **세로 모드 전용**: Portrait Orientation만 지원

### 4.4. Challenge Data Structure

각 챌린지는 다음 스키마를 따릅니다:

```typescript
type Difficulty = 'JUNIOR' | 'SENIOR' | 'EXPERT';

interface CodeSection {
  id: string;
  startLine: number;
  endLine: number;
  isBug: boolean; // 정답 여부
}

interface Challenge {
  id: string;
  title: string;
  description?: string; // 짧은 컨텍스트
  language: 'javascript' | 'typescript' | 'python' | 'go';
  codeRaw: string;
  sections: CodeSection[]; // 인터랙티브 존
  explanation: string; // 정답 해설
  timeLimit: number; // 초 단위
  difficulty: Difficulty;
}
```

---

## 5. Technical Stack

### Frontend Framework
- **React 19** + **Vite**: 빠른 빌드, 최신 React 기능
- **TypeScript (Strict Mode)**: 타입 안전성

### Styling & UI
- **Tailwind CSS**: 모바일 우선 유틸리티 클래스
- **Framer Motion**: 선택 피드백 & 결과 애니메이션
- **Lucide React**: 아이콘 라이브러리

### State Management
- **Zustand**: 경량 상태 관리 (게임 루프, 선택 상태)

### Code Highlighting
- **react-syntax-highlighter**: 다중 언어 지원

### CI/CD
- **GitHub Actions**: 자동 빌드 & GitHub Pages 배포
- **GitHub Pages**: 정적 호스팅 (무료)

---

## 6. User Stories

### Epic 1: 코드 리뷰 플레이
```
As a 개발자,
I want to 짧은 시간에 코드 버그를 찾는 연습을 하고 싶다,
So that 실무 코드 리뷰 스킬을 향상시킬 수 있다.
```

**Acceptance Criteria**:
- [ ] 타이머가 시작되면 코드 스니펫이 표시됨
- [ ] 의심스러운 라인을 탭하여 선택 가능
- [ ] "COMMIT REVIEW" 버튼으로 제출
- [ ] 정답 여부와 해설이 표시됨

### Epic 2: 모바일 최적화 경험
```
As a 출퇴근하는 개발자,
I want to 지하철에서 한 손으로 편하게 플레이하고 싶다,
So that 이동 시간을 학습 시간으로 활용할 수 있다.
```

**Acceptance Criteria**:
- [ ] 엄지만으로 모든 인터랙션 가능
- [ ] 세로 모드에서 최적화된 레이아웃
- [ ] 어두운 환경(지하철)에서 잘 보이는 다크 모드

### Epic 3: 게임화된 학습
```
As a 학습자,
I want to 게임처럼 재미있게 학습하고 싶다,
So that 지속적으로 연습할 동기를 유지할 수 있다.
```

**Acceptance Criteria**:
- [ ] 점수 시스템
- [ ] 난이도별 챌린지
- [ ] 정답 시 축하 애니메이션

---

## 7. Constraints & Assumptions

### Technical Constraints
- **정적 배포만**: GitHub Pages (서버 없음)
- **모바일 우선**: 데스크톱은 부가 기능
- **오프라인 미지원**: PWA는 Post-MVP

### Design Constraints
- **세로 모드 전용**: 가로 모드는 경고 메시지만
- **다크 모드 기본**: 밝은 테마는 Post-MVP

### Content Constraints (MVP)
- **최소 9개 챌린지**: JUNIOR/SENIOR/EXPERT 각 3개
- **3개 이상 언어 지원**: JavaScript, TypeScript, Python 필수

---

## 8. Out of Scope (Post-MVP)

### Phase 2 Features
- 🔮 **사용자 계정**: 진행 상황 저장
- 🔮 **리더보드**: 글로벌 랭킹
- 🔮 **커뮤니티 챌린지**: 사용자가 문제 업로드
- 🔮 **다국어 지원**: 한국어, 영어 외

### Technical Debt
- 🔮 **PWA 지원**: Service Worker, Offline Mode
- 🔮 **백엔드 통합**: 실시간 데이터, 분석
- 🔮 **테스트 커버리지**: E2E 테스트

---

## 9. Success Criteria

### MVP Launch Checklist
- [ ] 9개 이상의 다양한 챌린지 (3개 언어 × 3개 난이도)
- [ ] 모바일 디바이스 테스트 통과 (iOS, Android)
- [ ] Lighthouse 점수: Performance 90+ (Mobile)
- [ ] GitHub Pages 자동 배포 작동
- [ ] 모든 Critical 기능 구현 완료

### User Validation
- [ ] 5명 이상의 베타 테스터 피드백
- [ ] 평균 세션 길이: 5분 이상
- [ ] 재방문율: 30% 이상 (1주일 내)

---

## 10. Risks & Mitigations

| Risk | Impact | Mitigation |
|------|--------|------------|
| Overlay 시스템 성능 이슈 | 높음 | 초기 프로토타입으로 검증 (Phase 2) |
| 모바일 브라우저 호환성 | 중간 | iOS Safari, Chrome Android 우선 테스트 |
| 챌린지 난이도 불균형 | 중간 | 베타 테스트 후 난이도 조정 |
| GitHub Pages 배포 실패 | 낮음 | CI/CD 파이프라인 초기 구축 (Phase 1) |

---

## 11. Roadmap

### Phase 1: Foundation (Week 1)
- 프로젝트 스케폴딩 ✅
- 타입 정의 & Mock Data
- CI/CD 설정 ✅

### Phase 2: Core Engine (Week 2-3)
- Overlay System 구현 ⭐
- 게임 로직 & Zustand
- 기본 UI 컴포넌트

### Phase 3: Polish (Week 4)
- 다크 모드
- 애니메이션
- 모바일 테스트

### Phase 4: Launch (Week 5)
- 베타 테스트
- 버그 수정
- 공개 배포

---

## 12. Appendix

### Reference Materials
- **DESIGN.md**: UI/UX 가이드라인, 디자인 시스템
- **WORK_PLAN.md**: 상세 구현 계획 (Phase별 기술 접근)
- **CLAUDE.md**: AI 에이전트 관리 프로토콜

### Related Documents
- [WORK_PLAN.md](./WORK_PLAN.md): 기술적 구현 로드맵
- [TODO.md](./TODO.md): 현재 스프린트 작업 목록
- [CHANGELOG.md](./CHANGELOG.md): 버전 히스토리

---

**Last Review**: 2025-12-11
**Next Review**: Phase 2 완료 시 (Overlay Engine 검증 후)
