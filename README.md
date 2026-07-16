# 캠퍼스 과제 일정 도우미 MCP

Codex를 이용해 생성한 MCP 프로젝트입니다. 주제는 수강 과목과 과제 마감일을 기반으로 과제 목록 조회, 주간 학습 계획 생성, 제출 준비도 점검을 제공하는 “캠퍼스 과제 일정 도우미”입니다.

## 구현 범위

- MCP Tool
  - `list_assignments`: 상태, 과목, 기간 조건으로 과제 조회
  - `plan_study_week`: 마감일과 우선순위를 기반으로 주간 학습 시간 배분
  - `check_submission_ready`: 체크리스트 완료 여부로 제출 준비도 점검
- MCP Resource
  - `campus://courses`: 수강 과목 데이터
  - `campus://assignments`: 과제 데이터
  - `campus://grading-rubric`: 제출 평가 기준
- MCP Prompt
  - `assignment_breakdown`: 과제를 작은 실행 단계로 분해하는 프롬프트
  - `weekly_study_coach`: 주간 학습 계획을 요청하는 프롬프트
- Harness 검증
  - `test/harness.mjs`가 MCP 서버를 stdio로 실행하고 Tool, Resource, Prompt를 실제 MCP 클라이언트 호출로 검증합니다.

## 실행 방법

```bash
npm install
npm start
```

서버는 stdio 기반 MCP 서버이므로 일반 터미널에서 `npm start` 실행 시 입력을 기다립니다. 실제 동작 확인은 Harness를 사용합니다.

```bash
npm test
```

성공 시 다음 메시지가 출력됩니다.

```text
MCP Harness 검증 통과
```

## 시연 시나리오

1. `npm test`로 Harness를 실행합니다.
2. Harness가 서버를 자동 실행하고 `tools/list`, `resources/list`, `prompts/list`를 검증합니다.
3. `campus://assignments` Resource를 읽어 과제 데이터를 확인합니다.
4. `list_assignments`, `plan_study_week`, `check_submission_ready` Tool을 호출해 결과를 검증합니다.
5. `assignment_breakdown` Prompt를 가져와 과제 분해 요청 문장이 생성되는지 확인합니다.

## 제출 파일

- [src/server.mjs](src/server.mjs): MCP 서버 엔트리포인트
- [src/campusData.mjs](src/campusData.mjs): Resource와 Tool에서 사용하는 예시 데이터
- [src/planner.mjs](src/planner.mjs): 과제 조회, 학습 계획, 제출 준비도 로직
- [test/harness.mjs](test/harness.mjs): MCP Harness 검증 코드
- [CHANGELOG.md](CHANGELOG.md): 작업 이력
