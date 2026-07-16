export const courses = [
  {
    id: "mcp-101",
    name: "MCP 응용 프로젝트",
    professor: "김교수",
    weeklyHours: 5,
    focus: "MCP 서버 구현, Harness 검증, 시연 준비"
  },
  {
    id: "ai-writing",
    name: "AI 기반 문서 작성",
    professor: "이교수",
    weeklyHours: 3,
    focus: "프롬프트 설계와 결과물 평가"
  },
  {
    id: "data-lab",
    name: "데이터 분석 실습",
    professor: "박교수",
    weeklyHours: 4,
    focus: "CSV 정제, 시각화, 실험 로그 작성"
  }
];

export const assignments = [
  {
    id: "mcp-demo",
    courseId: "mcp-101",
    title: "Codex 기반 MCP 프로젝트 구축 및 시연",
    dueDate: "2026-07-22",
    priority: "high",
    estimatedHours: 8,
    status: "in-progress",
    checklist: [
      "개별 주제 선정",
      "MCP Tool 구현",
      "MCP Resource 구현",
      "MCP Prompt 구현",
      "Harness 테스트 작성",
      "서버 실행 및 시연"
    ]
  },
  {
    id: "prompt-report",
    courseId: "ai-writing",
    title: "프롬프트 개선 사례 보고서",
    dueDate: "2026-07-25",
    priority: "medium",
    estimatedHours: 4,
    status: "todo",
    checklist: [
      "초안 작성",
      "개선 전후 비교",
      "결론 정리"
    ]
  },
  {
    id: "csv-visual",
    courseId: "data-lab",
    title: "CSV 데이터 정제 및 차트 제출",
    dueDate: "2026-07-28",
    priority: "medium",
    estimatedHours: 5,
    status: "todo",
    checklist: [
      "결측치 점검",
      "요약 통계 계산",
      "차트 생성",
      "실험 로그 첨부"
    ]
  }
];

export const gradingRubric = {
  topic: "캠퍼스 과제 일정 도우미 MCP",
  requiredArtifacts: [
    "MCP 서버 코드",
    "Tool, Resource, Prompt 구현",
    "Harness 기반 테스트 결과",
    "서버 실행 방법",
    "시연 시나리오"
  ],
  scoring: [
    { item: "MCP Tool 동작", points: 25 },
    { item: "MCP Resource 제공", points: 20 },
    { item: "MCP Prompt 설계", points: 20 },
    { item: "Harness 검증", points: 25 },
    { item: "시연 완성도", points: 10 }
  ]
};
