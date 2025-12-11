# TODO - Current Sprint

> **역할**: 지금(NOW) 하고 있는 작업의 체크리스트
> **업데이트**: 매일 작업 시작/종료 시
> **참조**: [WORK_PLAN.md](./WORK_PLAN.md)에서 상세 구현 방법 확인

---

## 📌 현재 스프린트: Phase 1 (인프라 구축)

### 이번 주 목표
Phase 1 완료: 프로젝트 인프라 & 데이터 모델 준비

---

## 🔴 Today (우선순위 높음)

### Phase 1: 의존성 설치 & 타입 정의
- [ ] 필수 패키지 설치
  - [ ] `npm install zustand framer-motion lucide-react`
  - [ ] `npm install react-syntax-highlighter @types/react-syntax-highlighter`
- [ ] `src/types/game.ts` 생성
  - [ ] `Difficulty`, `GameState`, `CodeSection`, `Challenge` 타입 정의
- [ ] `src/data/mockChallenges.ts` 생성
  - [ ] 초기 샘플 챌린지 1개 (JavaScript React Hook 예제)

---

## 🟡 This Week (이번 주 내)

- [ ] Mock Data 2개 추가 (TypeScript, Python 각 1개)
- [ ] Phase 2 준비: `src/components/CodeViewer/` 디렉토리 구조 생성

---

## 🟢 Backlog (다음 스프린트)

- Phase 2: Overlay Engine 프로토타입
- Phase 3: Zustand Store 구현
- Phase 4: UI 컴포넌트

> **상세 계획**: [WORK_PLAN.md](./WORK_PLAN.md) 참조

---

## ✅ Completed This Week

- [x] 2025-12-11: PRD.md 생성 (프로젝트 요구사항 문서화)
- [x] 2025-12-11: WORK_PLAN.md 작성 (기술적 구현 로드맵)
- [x] 2025-12-11: CLAUDE.md 업데이트 (문서 체계 정리)
- [x] 2025-12-11: TODO.md 역할 재정의
- [x] 2025-12-11: 프로젝트 스케폴딩 (Vite + React + TypeScript)
- [x] 2025-12-11: Tailwind CSS 설정 및 DESIGN.md 기반 스타일 적용
- [x] 2025-12-11: GitHub Pages 배포 설정 (GitHub Actions)

---

## 📝 Notes

### 문서 체계
- **PRD.md**: 무엇을(WHAT), 왜(WHY) 만드는지
- **WORK_PLAN.md**: 어떻게(HOW) 구현하는지 (기술적 상세)
- **TODO.md** (이 문서): 지금(NOW) 무엇을 하는지 (일일 체크리스트)
- **CHANGELOG.md**: 무엇이 완료되었는지 (히스토리)

### 다음 단계
1. 의존성 설치 완료
2. 타입 정의 작성 (개발 가이드라인 확립)
3. Phase 2 시작 (Overlay Engine - 가장 복잡한 부분)

---

**Last Updated**: 2025-12-11
