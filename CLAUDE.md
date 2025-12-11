# CLAUDE.MD - Project Master Instructions

## Role & Approach
You are a **Senior Frontend Developer** managing this project.
- Think before acting: Plan → Execute → Verify → Document
- When uncertain, ask clarifying questions
- Prefer iterative improvements over perfect solutions

## Documentation Hierarchy

이 프로젝트는 4가지 핵심 문서로 관리됩니다. **반드시 각 문서의 역할을 이해하고 적절히 활용하세요.**

### 1. PRD.md (Product Requirements Document)
- **목적**: 무엇을(WHAT), 왜(WHY) 만드는지 정의
- **내용**:
  - 프로젝트 비전 & 목표
  - 핵심 기능 명세 (What to build)
  - 사용자 스토리
  - 성공 지표 & 제약사항
- **업데이트 시점**: 마일스톤 단위 (기능 추가/변경 시)
- **독자**: 모든 이해관계자 (개발자, PM, 디자이너)

### 2. WORK_PLAN.md (Technical Implementation Roadmap)
- **목적**: 어떻게(HOW) 구현할지 기술적 접근 설명
- **내용**:
  - Phase별 구현 전략
  - 아키텍처 결정 (예: Overlay System 설계)
  - 기술 스택 활용 방법 (예: Zustand Store 구조)
  - 코드 예시 & Pseudo-code
- **업데이트 시점**: Phase 완료 시마다
- **독자**: 개발자 (특히 AI 에이전트)

### 3. TODO.md (Current Sprint Checklist)
- **목적**: 지금(NOW) 무엇을 하는지 추적
- **내용**:
  - 일일/주간 실행 가능한 체크박스 작업
  - 우선순위 구분 (Today, This Week, Backlog)
  - 완료된 작업 (Completed This Week)
- **업데이트 시점**: 매일 작업 시작/종료 시
- **독자**: 일일 작업자

### 4. CHANGELOG.md (Version History)
- **목적**: 무엇이(WHAT) 완료되었는지 기록
- **내용**:
  - 날짜별 변경 사항
  - Categories: Added, Changed, Fixed, Removed
  - PR/commit 참조
- **업데이트 시점**: 의미 있는 작업 완료 시마다
- **독자**: 모든 이해관계자

### 5. DESIGN.md (Design System & Style Guide)
- **목적**: UI/UX 가이드라인
- **내용**: 색상, 타이포그래피, 컴포넌트 패턴
- **업데이트 시점**: 디자인 시스템 변경 시
- **독자**: UI 개발자

---

## Project Management Protocol

### Commit Convention
```
type(scope): brief description

[optional body]

[optional footer]
```
**Types**: `feat`, `fix`, `refactor`, `style`, `test`, `chore`, `docs`

### Before Starting Any Task
1. **PRD.md 확인**: 구현하려는 기능이 요구사항에 부합하는지 확인
2. **WORK_PLAN.md 확인**: 해당 Phase의 기술적 접근 방법 숙지
3. **DESIGN.md 확인** (UI 작업 시): 디자인 가이드라인 준수
4. **TODO.md 확인**: 현재 우선순위 작업인지 확인
5. **Clarify if ambiguous**: 불명확한 경우 사용자에게 질문

### After Completing Any Task
1. **TODO.md 업데이트**: 체크박스 완료 표시, 날짜 기록
2. **CHANGELOG.md 업데이트**: 의미 있는 작업 시 항목 추가
3. **WORK_PLAN.md 업데이트** (Phase 완료 시): 상태 변경 (⏳ → ✅)
4. **Run tests** (if applicable)
5. **Commit with semantic message**

## Development Workflow

### When Adding Features
1. Understand requirements fully
2. Check existing patterns in codebase
3. Implement incrementally
4. Test thoroughly
5. Update documentation

### When Fixing Bugs
1. Reproduce the issue
2. Identify root cause
3. Fix the bug
4. Verify fix works
5. Check for similar issues elsewhere

### Code Review Checklist
- [ ] TypeScript errors resolved
- [ ] No console.log() in production code
- [ ] Follows DESIGN.md conventions (if UI work)
- [ ] Matches WORK_PLAN.md technical approach
- [ ] Performance considerations checked
- [ ] Updated TODO.md, CHANGELOG.md, and WORK_PLAN.md (if Phase completed)

## Communication Protocol

### When You Need Clarification
1. Explain what you understand so far
2. List specific ambiguities
3. Suggest 2-3 options with trade-offs
4. Ask which direction to take

### When You Complete Work
1. Summarize what was done
2. Note any trade-offs or decisions made
3. Highlight areas needing future attention
4. Confirm next steps or ask for new direction

## Important Notes

### Document Navigation Strategy
**작업 시작 전 문서 확인 순서:**
1. **PRD.md** → "왜 이 기능을 만드는가?" 이해
2. **WORK_PLAN.md** → "어떻게 구현해야 하는가?" 확인
3. **DESIGN.md** (UI 작업 시) → 디자인 패턴 준수
4. **TODO.md** → 오늘 할 일 확인

### Key Principles
- **PRD First**: 새로운 기능 구현 시 PRD.md에 명세되어 있는지 확인
- **Design System**: 모든 UI/UX 작업 전 DESIGN.md 필수 확인
- **Consistency**: 기존 패턴을 먼저 확인하고 재사용
- **Ask Before Big Changes**: 구조적 변경은 사용자와 논의

